"use client";

import { useActionState } from "react";
import { submitLead, type SubmitLeadState } from "./actions";

const initialState: SubmitLeadState = { status: "idle" };

export function LeadForm() {
  const [state, formAction, pending] = useActionState(submitLead, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-sm border border-[#c9952a]/40 bg-[#fdfcf9] p-6 text-center">
        <p className="font-serif text-xl text-[#0f1f4a]">¡Gracias!</p>
        <p className="mt-2 text-sm text-[#3a4866]">
          Te enviamos el whitepaper a tu correo. Si no llega en unos minutos,
          revisa spam.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-[#0f1f4a]">
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          required
          className="mt-1 w-full rounded-sm border border-[#ece6d6] bg-white px-3 py-2 text-sm text-[#0f1f4a] focus:border-[#c9952a] focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#0f1f4a]">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-sm border border-[#ece6d6] bg-white px-3 py-2 text-sm text-[#0f1f4a] focus:border-[#c9952a] focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="empresa" className="block text-sm font-medium text-[#0f1f4a]">
          Empresa
        </label>
        <input
          id="empresa"
          name="empresa"
          required
          className="mt-1 w-full rounded-sm border border-[#ece6d6] bg-white px-3 py-2 text-sm text-[#0f1f4a] focus:border-[#c9952a] focus:outline-none"
        />
      </div>

      <p className="text-xs leading-relaxed text-[#3a4866]">
        Al enviar este formulario, GOVIA PARTNERS S.A.C.S. tratará tu nombre,
        correo electrónico y empresa para enviarte el whitepaper solicitado.
        Tus datos se almacenan en Supabase y se procesan a través de Vercel y
        Resend, con infraestructura fuera del Perú (Estados Unidos), bajo
        garantías contractuales de protección de datos. Puedes ejercer tus
        derechos de acceso, rectificación, supresión y oposición escribiendo a{" "}
        <a href="mailto:privacidad@goviapartners.com" className="underline hover:text-[#0f1f4a]">
          privacidad@goviapartners.com
        </a>
        . Más información en nuestra{" "}
        <a
          href="/privacidad"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[#0f1f4a]"
        >
          Política de Privacidad
        </a>
        .
      </p>

      {/* Checkbox 1 — obligatorio, gatea el envío. */}
      <label className="flex items-start gap-2 text-xs text-[#3a4866]">
        <input
          type="checkbox"
          name="consentimiento_lpdp"
          required
          className="mt-0.5"
        />
        <span>
          He leído y acepto la{" "}
          <a
            href="/privacidad"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[#0f1f4a]"
          >
            Política de Privacidad
          </a>
          . Autorizo a Govia Partners a tratar mis datos (nombre, correo y
          empresa) para enviarme el whitepaper solicitado.
        </span>
      </label>

      {/* Checkbox 2 — opcional, NO gatea el envío. */}
      <label className="flex items-start gap-2 text-xs text-[#3a4866]">
        <input
          type="checkbox"
          name="acepta_comunicaciones_comerciales"
          className="mt-0.5"
        />
        <span>
          Además, quiero recibir comunicaciones comerciales de Govia Partners
          sobre sus servicios de gobierno de datos y cumplimiento normativo.
          Puedo darme de baja cuando quiera.
        </span>
      </label>

      {state.status === "error" && (
        <p className="text-sm text-red-700">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-sm bg-[#c9952a] px-6 py-3 font-semibold text-[#0f1f4a] transition-colors hover:bg-[#e8b84a] disabled:opacity-60"
      >
        {pending ? "Enviando…" : "Recibir el whitepaper"}
      </button>
    </form>
  );
}
