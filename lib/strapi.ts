import { strapi } from "@strapi/client";
import { requireEnv } from "@/lib/env";

export const strapiClient = strapi({
  baseURL: `${requireEnv("STRAPI_URL")}/api`,
  auth: requireEnv("STRAPI_API_TOKEN"),
});

export const eventRegistrations = strapiClient.collection("event-registrations");

export type EventRegistrationInput = {
  vorname: string;
  nachname: string;
  email: string;
  telefonnummer?: string;
};
