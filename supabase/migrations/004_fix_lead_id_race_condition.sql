-- Fix: set_tms_lead_id()/set_lead_id() computed their daily sequence with a
-- plain `select count(*)+1`, which is not atomic — two inserts in the same
-- transaction window (or a mismatch between `current_date` and the
-- `created_at default now()` timestamp actually stored) can compute the
-- same seq and collide on the lead_id unique constraint. Reproduced live
-- while QA-testing tms_assessments (2026-08-14): second-ever insert of the
-- day got assigned the same TMS-YYYYMMDD-01 as the first and failed with
-- "duplicate key value violates unique constraint tms_assessments_lead_id_key".
--
-- Fix: take a per-day advisory transaction lock before counting (serializes
-- concurrent inserts for the same day — released automatically at commit),
-- and derive the date from now()::date instead of current_date so the
-- filter and the label always agree with what created_at actually stores.
-- Applies to both tables — leads_whitepaper had the identical pattern.

create or replace function public.set_tms_lead_id()
returns trigger
language plpgsql
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
