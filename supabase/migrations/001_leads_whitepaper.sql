-- leads_whitepaper — captura del formulario /whitepaper-git
-- Spec: ~/.govia/proyectos/_firma_govia/estrategia/spec-landing-whitepaper-git.md §3

create table if not exists public.leads_whitepaper (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nombre text not null,
  email text not null,
  empresa text not null,
  fuente text not null default 'LinkedIn-serie-git-datagovops',
  lead_id text not null unique,
  consentimiento_lpdp boolean not null default false
);

create unique index if not exists leads_whitepaper_email_key
  on public.leads_whitepaper (lower(email));

-- lead_id formato LEAD-YYYYMMDD-NN, NN correlativo por día. Calculado en el
-- servidor (no en el cliente) para evitar colisiones/race conditions.
create or replace function public.set_lead_id()
returns trigger
language plpgsql
as $$
declare
  seq int;
begin
  if new.lead_id is null then
    select count(*) + 1 into seq
    from public.leads_whitepaper
    where created_at::date = current_date;

    new.lead_id := 'LEAD-' || to_char(current_date, 'YYYYMMDD') || '-' || lpad(seq::text, 2, '0');
  end if;
  return new;
end;
$$;

drop trigger if exists trg_set_lead_id on public.leads_whitepaper;
create trigger trg_set_lead_id
  before insert on public.leads_whitepaper
  for each row
  execute function public.set_lead_id();

alter table public.leads_whitepaper enable row level security;

-- El formulario público solo puede INSERTAR (anon key). Sin SELECT/UPDATE/DELETE
-- para anon — lectura de leads es exclusiva del dashboard interno (service role).
drop policy if exists leads_whitepaper_insert_anon on public.leads_whitepaper;
create policy leads_whitepaper_insert_anon
  on public.leads_whitepaper
  for insert
  to anon
  with check (consentimiento_lpdp = true);
