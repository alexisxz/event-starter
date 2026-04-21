"use client";

import { useActionState } from "react";
import { registerAction, type ActionState } from "@/app/actions";
import FormField from "@/components/form/form-field";

const initialState: ActionState = { status: "idle" };

export default function RegistrationForm() {
  const [state, formAction, pending] = useActionState(registerAction, initialState);

  if (state.status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-xl border border-green-200 bg-green-50 p-[var(--spacing-large)] text-center"
      >
        <p className="heading-style-h5 text-green-800">Vielen Dank für Ihre Anmeldung!</p>
        <p className="mt-[var(--spacing-medium)] text-green-700">
          Ihre Anmeldung ist eingegangen. Sie erhalten in Kürze eine Bestätigung per E-Mail.
        </p>
      </div>
    );
  }

  const errors = state.status === "error" ? state.errors : {};

  return (
    <div className="flex flex-col gap-[var(--spacing-large)]">
      <div className="text-center">
        <h2 id="anmeldung-heading" className="heading-style-h2">
          Jetzt anmelden
        </h2>
        <p className="mt-[var(--spacing-medium)] text-gray-600">
          Füllen Sie das Formular aus und sichern Sie sich Ihren Platz.
        </p>
      </div>

      <form action={formAction} noValidate className="flex flex-col gap-[var(--spacing-medium)]">
        <div className="grid grid-cols-1 gap-[var(--spacing-medium)] sm:grid-cols-2">
          <FormField
            id="vorname"
            name="vorname"
            label="Vorname"
            autoComplete="given-name"
            required
            errors={errors.vorname}
          />
          <FormField
            id="nachname"
            name="nachname"
            label="Nachname"
            autoComplete="family-name"
            required
            errors={errors.nachname}
          />
        </div>

        <FormField
          id="email"
          name="email"
          label="E-Mail-Adresse"
          type="email"
          autoComplete="email"
          required
          errors={errors.email}
        />

        <FormField
          id="telefonnummer"
          name="telefonnummer"
          label="Telefonnummer (optional)"
          type="tel"
          autoComplete="tel"
          errors={errors.telefonnummer}
        />

        {errors._form && (
          <p role="alert" aria-live="assertive" className="form_error text-center">
            {errors._form[0]}
          </p>
        )}

        <button type="submit" disabled={pending} className="form_submit mt-[var(--spacing-small)]">
          {pending ? "Wird gesendet…" : "Kostenlos anmelden"}
        </button>

        <p className="text-center text-xs text-gray-400">
          Mit der Anmeldung stimmen Sie unseren Datenschutzbestimmungen zu.
        </p>
      </form>
    </div>
  );
}
