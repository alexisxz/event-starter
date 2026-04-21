import { Resend } from "resend";
import { requireEnv } from "@/lib/env";

export const resend = new Resend(requireEnv("RESEND_API_KEY"));

export const FROM_EMAIL = requireEnv("RESEND_FROM_EMAIL");

export const ADMIN_RECIPIENTS = requireEnv("ADMIN_NOTIFICATION_EMAILS")
  .split(",")
  .map((email) => email.trim())
  .filter(Boolean);
