"use server";

import { z } from "zod";
import { eventRegistrations } from "@/lib/strapi";
import { resend, FROM_EMAIL, ADMIN_RECIPIENTS } from "@/lib/resend";
import AdminNotification from "@/emails/admin-notification";
import Confirmation from "@/emails/confirmation";

const schema = z.object({
  vorname: z.string().trim().min(1, "Bitte geben Sie Ihren Vornamen ein."),
  nachname: z.string().trim().min(1, "Bitte geben Sie Ihren Nachnamen ein."),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein."),
  telefonnummer: z.string().optional(),
});

export type ActionState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      errors: {
        vorname?: string[];
        nachname?: string[];
        email?: string[];
        telefonnummer?: string[];
        _form?: string[];
      };
    };

export async function registerAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = schema.safeParse({
    vorname: formData.get("vorname"),
    nachname: formData.get("nachname"),
    email: formData.get("email"),
    telefonnummer: formData.get("telefonnummer") || undefined,
  });

  if (!parsed.success) {
    const { vorname, nachname, email, telefonnummer } = parsed.error.flatten().fieldErrors;
    return { status: "error", errors: { vorname, nachname, email, telefonnummer } };
  }

  const { vorname, nachname, email, telefonnummer } = parsed.data;

  try {
    await eventRegistrations.create({
      vorname,
      nachname,
      email,
      ...(telefonnummer ? { telefonnummer } : {}),
    });
  } catch {
    return {
      status: "error",
      errors: { _form: ["Die Anmeldung konnte nicht gespeichert werden. Bitte versuchen Sie es erneut."] },
    };
  }

  try {
    await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_RECIPIENTS,
        subject: `Neue Anmeldung: ${vorname} ${nachname}`,
        react: AdminNotification({ vorname, nachname, email, telefonnummer }),
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: [email],
        subject: "Ihre Anmeldung ist bestätigt",
        react: Confirmation({ vorname }),
      }),
    ]);
  } catch {
    // Emails are best-effort; registration already saved — don't surface email errors to the user
  }

  return { status: "success" };
}
