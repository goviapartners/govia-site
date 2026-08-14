-- Real root cause of the lead_id collisions (004 fixed a real but secondary
-- issue — the actual bug was this one, confirmed live in production logs
-- 2026-08-14): set_tms_lead_id()/set_lead_id() run as the `anon` role
-- (whoever performs the INSERT), and RLS on tms_assessments/leads_whitepaper
-- only grants anon an INSERT policy — there is no SELECT policy. So the
-- trigger's own `select count(*) from ...` was silently RLS-filtered to
-- always see 0 rows, regardless of how many actually existed. Every insert
-- after the first computed seq=1 and collided with row #1 forever — this
-- was NOT a timing race, it reproduced 100% of the time on the second
-- submission of any day, confirmed by re-testing after 004 was applied and
-- still failing identically.
--
-- Fix: mark both trigger functions SECURITY DEFINER (same pattern already
-- used correctly by get_tms_benchmark() in 003) so their internal SELECT
-- bypasses RLS and sees the true row count. search_path pinned per
-- SECURITY DEFINER best practice. The advisory-lock fix from 004 stays —
-- it's still correct defense-in-depth against genuine concurrent inserts,
-- just wasn't the actual blocker here.

create or replace function public.set_tms_lead_id()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  seq int;
  today date := now()::date;
begin
  if new.lead_id is null then
    perform pg_advisory_xact_lock(hashtext('tms_lead_id:' || to_char(today, 'YYYYMMDD')));

    select count(*) + 1 into seq
    from public.tms_assessments
    where created_at::date = today;

    new.lead_id := 'TMS-' || to_char(today, 'YYYYMMDD') || '-' || lpad(seq::text, 2, '0');
  end if;
  return new;
end;
$$;

create or replace function public.set_lead_id()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  seq int;
  today date := now()::date;
begin
  if new.lead_id is null then
    perform pg_advisory_xact_lock(hashtext('leads_whitepaper_lead_id:' || to_char(today, 'YYYYMMDD')));

    select count(*) + 1 into seq
    from public.leads_whitepaper
    where created_at::date = today;

    new.lead_id := 'LEAD-' || to_char(today, 'YYYYMMDD') || '-' || lpad(seq::text, 2, '0');
  end if;
  return new;
end;
$$;
