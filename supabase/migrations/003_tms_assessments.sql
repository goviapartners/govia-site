-- tms_assessments — captura del formulario /trust-maturity-score
-- Instrumento fuente: proyectos/_firma_govia/categoria-trust-architects/06-instrumento-taf.md
-- Mismo patrón de RLS insert-only + evidencia de consentimiento que 001/002
-- (leads_whitepaper) — ver ese archivo para el razonamiento LPDP.

create table if not exists public.tms_assessments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  lead_id text not null unique,

  nombre text not null,
  email text not null,
  empresa text not null,
  industria text not null,
  tamano_empresa text not null,

  fd_score numeric not null,
  mg_score numeric not null,
  ec_score numeric not null,
  cc_score numeric not null,
  fd_norm int not null,
  mg_norm int not null,
  ec_norm int not null,
  cc_norm int not null,
  tms int not null,
  maturity_level int not null,
  gap_profile text not null,
  respuestas jsonb not null,

  consentimiento_lpdp boolean not null default false,
  acepta_comunicaciones_comerciales boolean not null default false,
  politica_version text,
  consentimiento_ip text
);

create index if not exists tms_assessments_industria_idx
  on public.tms_assessments (industria);

-- lead_id formato TMS-YYYYMMDD-NN, NN correlativo por día. Calculado en el
-- servidor para evitar colisiones/race conditions (mismo patrón que
-- leads_whitepaper.set_lead_id()).
create or replace function public.set_tms_lead_id()
returns trigger
language plpgsql
as $$
declare
  seq int;
begin
  if new.lead_id is null then
    select count(*) + 1 into seq
    from public.tms_assessments
    where created_at::date = current_date;

    new.lead_id := 'TMS-' || to_char(current_date, 'YYYYMMDD') || '-' || lpad(seq::text, 2, '0');
  end if;
  return new;
end;
$$;

drop trigger if exists trg_set_tms_lead_id on public.tms_assessments;
create trigger trg_set_tms_lead_id
  before insert on public.tms_assessments
  for each row
  execute function public.set_tms_lead_id();

alter table public.tms_assessments enable row level security;

-- El formulario público solo puede INSERTAR (anon key). Sin SELECT/UPDATE/DELETE
-- para anon — lectura fila-por-fila queda fuera de alcance de la anon key;
-- el benchmark agregado se sirve vía la función get_tms_benchmark() abajo.
drop policy if exists tms_assessments_insert_anon on public.tms_assessments;
create policy tms_assessments_insert_anon
  on public.tms_assessments
  for insert
  to anon
  with check (consentimiento_lpdp = true);

-- Benchmark agregado (sin exponer filas individuales a la anon key).
-- SECURITY DEFINER bypassa RLS solo dentro de esta función — nunca devuelve
-- filas crudas, solo promedios/conteos. search_path fijado por seguridad
-- (evita search_path hijacking en funciones SECURITY DEFINER).
create or replace function public.get_tms_benchmark(p_industria text)
returns table (
  overall_avg numeric,
  overall_count int,
  industria_avg numeric,
  industria_count int
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_overall_avg numeric;
  v_overall_count int;
  v_industria_avg numeric;
  v_industria_count int;
begin
  select avg(tms), count(*) into v_overall_avg, v_overall_count
  from public.tms_assessments;

  select avg(tms), count(*) into v_industria_avg, v_industria_count
  from public.tms_assessments
  where industria = p_industria;

  if v_industria_count is null or v_industria_count < 5 then
    v_industria_avg := null;
    v_industria_count := coalesce(v_industria_count, 0);
  end if;

  return query select
    coalesce(v_overall_avg, 0),
    coalesce(v_overall_count, 0),
    v_industria_avg,
    v_industria_count;
end;
$$;

grant execute on function public.get_tms_benchmark(text) to anon;
