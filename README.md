# Event Starter

Reusable German-language event-registration landing page built with Next.js 16, React 19, Tailwind v4, Strapi 5, and Resend.

This repository is meant to be copied and reused for a new client or a new event. The structure stays the same; the event content, CMS fields, email copy, sender identity, and git history can all be replaced.

## What This Template Includes

- A landing page with reusable layout/section primitives and Client First spacing conventions
- A registration form powered by a Next.js Server Action and Zod validation
- A Strapi sidecar project in `cms/` for storing event registrations
- Two React Email templates:
  - internal admin notification
  - attendee confirmation email
- German-first copy and labels across the public UI and emails

## Important Defaults

- All user-facing strings are expected to be German unless you intentionally localize the project.
- The bundled Strapi project in `cms/` is the baseline CMS for this template.
- The checked-in `npm run dev:cms` script is machine-specific because it uses a local Herd Node path. On a new machine, prefer starting Strapi manually from `cms/` unless you replace that script with a portable version.

## Prerequisites

- Node.js for the Next.js app
- Node.js `20` to `24` for Strapi, with `22` recommended because `cms/.nvmrc` is pinned to `22`
- npm
- A Resend account for email delivery
- Ports available locally:
  - `3000` for Next.js
  - `1337` for Strapi

## Create A New Event From This Template

### Recommended Starting Point

Use this repository as a GitHub template or copy it into a new folder for the new client/event. Rename the project before the first client-facing commit.

### 1. Copy The Repository

```bash
git clone <your-new-repo-url> my-new-event
cd my-new-event
```

If you copied the files instead of cloning, enter the copied folder before continuing.

### 2. Rename The Project

Update the project metadata before handing it to a new client:

- Rename the folder if needed
- Update `package.json` `name`
- Update the page metadata in `app/layout.tsx`
- Update visible event copy in the sections and emails listed later in this README

### 3. Install Dependencies

Install the web app dependencies in the project root:

```bash
npm install
```

Install the Strapi dependencies separately:

```bash
cd cms
npm install
cd ..
```

### 4. Create The Root Env File

Copy the root environment template:

```bash
cp .env.example .env
```

Then fill in these values in `.env`:

- `STRAPI_URL`
- `STRAPI_API_TOKEN`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `ADMIN_NOTIFICATION_EMAILS`

For local development, keep `STRAPI_URL=http://localhost:1337`.

### 5. Create The Strapi Env File

Copy the CMS environment template:

```bash
cp cms/.env.example cms/.env
```

Set real values for the Strapi secrets in `cms/.env`. Do not keep the placeholder example values for shared environments.

Minimum required keys:

- `APP_KEYS`
- `API_TOKEN_SALT`
- `ADMIN_JWT_SECRET`
- `TRANSFER_TOKEN_SALT`
- `JWT_SECRET`
- `ENCRYPTION_KEY`

If you want a completely clean local CMS instance for the new event, remove any old SQLite database before the first run:

```bash
rm -f cms/.tmp/data.db
```

### 6. Start The App Locally

Start Next.js from the project root:

```bash
npm run dev:web
```

Start Strapi in a second terminal using a portable command:

```bash
cd cms
npm run develop
```

Open:

- `http://localhost:3000` for the landing page
- `http://localhost:1337/admin` for Strapi admin

## Set Up A Fresh Strapi Instance

This repo already ships with a Strapi project in `cms/`. For a new event, treat it as a fresh CMS instance: new env file, new admin user, new API token, new local database, and new content entries.

### 1. Use A Supported Node Version

Strapi requires Node `20` to `24`. The repo pins `22` in `cms/.nvmrc`.

Example with `nvm`:

```bash
nvm install 22
nvm use 22
```

### 2. Boot Strapi And Create The First Admin User

```bash
cd cms
npm run develop
```

On first boot, open `http://localhost:1337/admin` and create the admin user.

### 3. Create A Full-Access API Token

In Strapi admin:

`Settings -> API Tokens -> Create new API Token`

Recommended values:

- Name: event-starter-local
- Token type: Full access
- Duration: Unlimited for local development, or a limited duration if your team prefers rotation

Paste the generated token into root `.env` as `STRAPI_API_TOKEN`.

### 4. Confirm The Content Type

The template expects the collection type `event-registrations`.

Schema source of truth:

- `cms/src/api/event-registration/content-types/event-registration/schema.json`

Current expected fields:

| Field | Type | Required |
| --- | --- | --- |
| `vorname` | string | yes |
| `nachname` | string | yes |
| `email` | email | yes |
| `telefonnummer` | string | no |

If you edit the schema file directly, restart Strapi so the changes are loaded.

## Set Up A New Resend Configuration

### 1. Create A Resend API Key

Create a new API key in Resend and set it as:

- `RESEND_API_KEY`

### 2. Choose The Sender Identity

Set:

- `RESEND_FROM_EMAIL`

Examples:

- Local testing: `"Event Starter <onboarding@resend.dev>"`
- Production: `"Client Event <noreply@client-domain.de>"`

Use `onboarding@resend.dev` only for local testing. For production, verify your sending domain in Resend first.

### 3. Set Internal Notification Recipients

Set:

- `ADMIN_NOTIFICATION_EMAILS`

Use a comma-separated list, for example:

```env
ADMIN_NOTIFICATION_EMAILS=events@example.de,team@example.de
```

### 4. Preview The Email Templates Locally

From the project root:

```bash
npm run email
```

This opens the local React Email preview for the files in `emails/`.

## Where To Customize A New Event

### Landing Page Content

Update the landing-page structure and event copy in:

- `app/page.tsx` for section order and page composition
- `components/sections/hero.tsx` for hero headline, intro copy, and CTA
- `components/sections/benefits.tsx` for benefits/cards
- `components/sections/footer.tsx` for footer copy

### Registration Form Content

Update form labels, helper text, CTA copy, and success-state text in:

- `components/form/registration-form.tsx`
- `components/form/form-field.tsx`

### Submission Logic

Update validation, saved fields, and email subjects in:

- `app/actions.ts`

### Strapi Client Type

Keep the registration type aligned with the Strapi schema in:

- `lib/strapi.ts`

Look for:

- `eventRegistrations`
- `EventRegistrationInput`

### Resend Configuration

Update sender and internal recipients in:

- `lib/resend.ts`

### Email Copy

Update the actual email content in:

- `emails/admin-notification.tsx`
- `emails/confirmation.tsx`

If the new event changes dates, location, CTA wording, sender branding, or fields shown in the emails, update these files directly.

## How To Add Or Change Fields

When you add or remove a registration field, keep every layer in sync.

### 1. Update The Strapi Schema

Edit:

- `cms/src/api/event-registration/content-types/event-registration/schema.json`

Add, remove, or change the attribute definition there.

Then restart Strapi:

```bash
cd cms
npm run develop
```

### 2. Update Validation And Persistence

Edit:

- `app/actions.ts`

Keep the following aligned:

- Zod validation schema
- values read from `FormData`
- payload sent to `eventRegistrations.create(...)`
- error messages shown to the user

### 3. Update The Shared Strapi Type

Edit:

- `lib/strapi.ts`

Update `EventRegistrationInput` so it reflects the current Strapi schema.

### 4. Update The Form UI

Edit the form components:

- `components/form/registration-form.tsx`
- `components/form/form-field.tsx`

If the field is user-editable, add or update:

- label
- `name`
- autocomplete value if relevant
- required/optional behavior
- error rendering

### 5. Update The Emails If The Field Should Appear There

Edit:

- `emails/admin-notification.tsx`
- `emails/confirmation.tsx`

Also update the props passed into those templates from `app/actions.ts` if needed.

### 6. Re-Test The Full Flow

After changing a field, verify:

- the form accepts and validates it correctly
- Strapi stores it correctly
- the admin notification shows it correctly if expected
- the confirmation email shows it correctly if expected

## Verification Checklist For A New Event

Before handing the project over or deploying it, confirm:

- `http://localhost:3000` loads the landing page
- `http://localhost:1337/admin` loads the Strapi admin
- you can log into Strapi with the new admin account
- `STRAPI_API_TOKEN` is valid and form submissions are saved
- a test registration creates an entry in `event-registrations`
- the admin notification email is sent to `ADMIN_NOTIFICATION_EMAILS`
- the confirmation email is sent to the attendee address
- all visible event copy has been replaced with the new event details
- any added or changed fields appear in the form, Strapi, and emails consistently

## Troubleshooting

### Strapi Will Not Start

Most common cause: unsupported Node version.

Check:

```bash
node -v
cat cms/.nvmrc
```

If needed, switch to Node `22` before starting Strapi.

### The Form Cannot Save To Strapi

Check:

- `STRAPI_URL` points to the correct Strapi server
- `STRAPI_API_TOKEN` exists and has full access
- Strapi is running on port `1337`
- the `event-registrations` collection type exists

### Emails Are Not Sending

Check:

- `RESEND_API_KEY` is valid
- `RESEND_FROM_EMAIL` is allowed by Resend
- your production sending domain is verified
- `ADMIN_NOTIFICATION_EMAILS` is not empty

### The CMS Script Works Only On One Machine

`npm run dev:cms` currently includes a local Herd path in `package.json`. On a new machine, either:

- run Strapi manually with `cd cms && npm run develop`, or
- replace `dev:cms` with a machine-agnostic command that matches your team's Node setup

## New Client Repo / Git Reset

### Recommended Approach

Prefer one of these:

- create a new GitHub repository from this template
- copy the repository contents into a new repo

This keeps the client project clean without manual history surgery.

### Manual Reset Option

If you already copied the repository and want a completely fresh git history:

```bash
rm -rf .git
git init
git add .
git commit -m "Initial commit from Event Starter template"
git branch -M main
git remote add origin <your-new-repo-url>
git push -u origin main
```

After that, review:

- `package.json`
- `README.md`
- `app/layout.tsx`
- any client-specific copy and email branding

## Operator Notes

- Use `README.md` for project setup and handoff steps.
- Use `AGENTS.md` for coding rules and internal implementation guidance.
- When changing registration fields, keep the CMS schema, server action, form UI, shared types, and email templates in sync.
