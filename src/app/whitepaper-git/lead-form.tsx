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
        {state.downloadUrl && (
          <a
            href={state.downloadUrl}
            className="mt-4 inline-block rounded-sm bg-[#0f1f4a] px-6 py-2.5 text-sm font-semibold text-[#f4f0e6] transition-colors hover:bg-[#1a3a7a]"
          >
            Descargar ahora
          </a>
        )}
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
      <label className="flex items-start gap-2 text-xs text-[#3a4866]">
        <input
          type="checkbox"
          name="consentimiento_lpdp"
          required
          className="mt-0.5"
        />
        <span>
          Acepto que Govia Partners use estos datos para enviarme el
          whitepaper y comunicaciones comerciales relacionadas, conforme a la{" "}
          <a href="/privacidad" className="underline hover:text-[#0f1f4a]">
            política de privacidad
          </a>
          . Puedo darme de baja cuando quiera.
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
