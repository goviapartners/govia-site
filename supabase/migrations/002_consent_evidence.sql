-- Evidencia de consentimiento LPDP (Ley 29733 + Reglamento D.S. 016-2024-JUS art. 9
-- "Consentimiento y carga de la prueba" — la carga de probar el consentimiento
-- recae en Govia, no en el titular).
-- Spec: ~/.govia/proyectos/_firma_govia/compliance/lpdp/consentimiento-y-checklist-landing-whitepaper.md §1.4

alter table public.leads_whitepaper
  add column if not exists acepta_comunicaciones_comerciales boolean not null default false,
  add column if not exists politica_version text,
  add column if not exists consentimiento_ip text;

comment on column public.leads_whitepaper.acepta_comunicaciones_comerciales is
  'Checkbox 2 (opcional) — opt-in a comunicaciones comerciales. NO condiciona el envío del whitepaper.';
comment on column public.leads_whitepaper.politica_version is
  'Fecha de "última actualización" de /privacidad vigente al momento del consentimiento (checkbox 1, obligatorio).';
comment on column public.leads_whitepaper.consentimiento_ip is
  'IP de origen al momento del consentimiento, solo para trazabilidad/prueba del consentimiento — no se usa para ningún otro fin.';
