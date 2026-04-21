<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project: Event Starter

Resellable **German-language** event-registration landing page, built for a marketing company to sell to clients. The same template is reused per client, with content swapped in.

This repo is a reusable event template. Operational setup and client handoff instructions belong in [README.md](README.md); keep this file focused on coding constraints and stable implementation touchpoints.

## Language

**All user-facing strings are in German (DE).** Labels, placeholders, error messages, email bodies, page copy. `<html lang="de">` is set in [app/layout.tsx](app/layout.tsx).

## Design system

Apply **Finsweet's Client First** conventions (adapted for Tailwind v4). Invoke the skill before writing or reviewing UI: [.claude/skills/client-first/SKILL.md](.claude/skills/client-first/SKILL.md).

## Template maintenance

- When registration fields change, keep all layers in sync:
  - Strapi schema
  - Zod validation and submit pipeline
  - shared Strapi types
  - form UI
  - email templates
- Git reset / client handoff guidance belongs in [README.md](README.md), not here.

## Customization touchpoints

- Strapi schema: [cms/src/api/event-registration/content-types/event-registration/schema.json](cms/src/api/event-registration/content-types/event-registration/schema.json)
- Submit pipeline and validation: [app/actions.ts](app/actions.ts)
- Strapi client and shared type: [lib/strapi.ts](lib/strapi.ts)
- Resend config: [lib/resend.ts](lib/resend.ts)
- Email templates: [emails/admin-notification.tsx](emails/admin-notification.tsx), [emails/confirmation.tsx](emails/confirmation.tsx)

## Stack map

| Concern | Choice |
|---|---|
| Form submission | Server Action + Zod + React 19 `useActionState` |
| Email sending | `resend` + `@react-email/components` (typed React templates) |
| CMS | Strapi 5 (TypeScript) in [cms/](cms/), accessed via `@strapi/client` |
| Styling | Tailwind v4 (`@import` + `@theme` in [app/globals.css](app/globals.css)) |
| Fonts | Geist Sans + Geist Mono, loaded in [app/layout.tsx](app/layout.tsx) |

## Project layout

```
.
├── app/                  Next.js App Router (pages, layout, globals.css)
├── components/           UI components (layout, sections, form)
├── emails/               @react-email templates
├── lib/
│   ├── env.ts            Env-var guards (requireEnv)
│   ├── strapi.ts         Strapi client + eventRegistrations collection
│   └── resend.ts         Resend client + FROM_EMAIL + ADMIN_RECIPIENTS
├── cms/                  Strapi 5 sidecar (own package.json, .env, node_modules)
│   └── src/api/event-registration/   Content type: vorname, nachname, email, telefonnummer
└── .claude/skills/client-first/SKILL.md
```

## Environment variables

See [.env.example](.env.example). Required:

- `STRAPI_URL` — Strapi base URL (default `http://localhost:1337`).
- `STRAPI_API_TOKEN` — Full-access API token. Create in Strapi admin: Settings → API Tokens.
- `RESEND_API_KEY` — Resend API key from https://resend.com/api-keys.
- `RESEND_FROM_EMAIL` — Sender identity, e.g. `"Event Starter <noreply@example.de>"`. Domain must be verified in Resend for production.
- `ADMIN_NOTIFICATION_EMAILS` — Comma-separated internal recipients that receive new-submission notifications.

## Running locally

**Node version:** The Next.js app runs on any modern Node. **Strapi requires Node 20–24** — see `cms/.nvmrc` (pinned to 22). If your system Node is outside that range, use nvm/Herd to switch before running `cms/`.

```bash
# From project root — starts Next.js (3000) + Strapi (1337) concurrently
npm run dev

# Individually
npm run dev:web
npm run dev:cms

# First-time Strapi setup
cd cms
npm run develop                # creates admin user on first run at http://localhost:1337/admin
# -> In the Strapi admin: Settings -> API Tokens -> Create (Full access, Unlimited)
# -> Paste the token into STRAPI_API_TOKEN in the root .env
```

## Strapi content type

`event-registrations` (plural API id):

| Field | Type | Required |
|---|---|---|
| vorname | string | ✅ |
| nachname | string | ✅ |
| email | email | ✅ |
| telefonnummer | string | |

Schema is declared in [cms/src/api/event-registration/content-types/event-registration/schema.json](cms/src/api/event-registration/content-types/event-registration/schema.json); Strapi picks it up on boot.
