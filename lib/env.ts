const required = [
  "STRAPI_URL",
  "STRAPI_API_TOKEN",
  "RESEND_API_KEY",
  "RESEND_FROM_EMAIL",
  "ADMIN_NOTIFICATION_EMAILS",
] as const;

type RequiredKey = (typeof required)[number];

export function requireEnv(key: RequiredKey): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `Missing environment variable: ${key}. See .env.example for the full list.`,
    );
  }
  return value;
}

export const env = {
  STRAPI_URL: process.env.STRAPI_URL,
  STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
  ADMIN_NOTIFICATION_EMAILS: process.env.ADMIN_NOTIFICATION_EMAILS,
};
