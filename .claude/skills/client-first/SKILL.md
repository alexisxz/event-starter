---
name: client-first
description: Apply Finsweet's Client First conventions (naming, page structure, spacing system, typography, responsive scaling, form patterns) when building or reviewing UI in this Next.js 16 + Tailwind v4 codebase. Invoke before writing any page, section, or component.
---

# Client First (adapted for Next.js 16 + Tailwind v4)

Finsweet's Client First is a Webflow-origin methodology. The spirit — clarity over brevity, systematic spacing, fluid responsive scaling, accessibility-first — translates cleanly to Tailwind v4. The Webflow-specific global-class mechanics do not. This skill describes the adapted rules that apply in this codebase.

## 1. Philosophy (never compromise)

1. **Descriptive over short.** No abbreviations. A non-technical client should be able to read a class name and understand what the element is (`hero_headline`, not `hh`).
2. **Separation of concerns.** Utility tokens (spacing, typography, color) live in `@theme`. Component-scoped custom classes use underscore naming. Tailwind utilities sit on top for one-offs.
3. **Rem-based fluid scaling.** All sizing in rem. Root `font-size` is the single knob; adjust it per breakpoint and the whole design reflows. Respects user zoom and browser font preferences.
4. **Accessibility-first defaults.** Semantic HTML (`<main>`, `<section>`, `<nav>`, `<header>`, `<footer>`). Focus-visible styling globally. Form inputs never inherit the browser 14px default — always explicit font-size.
5. **Consistency over flexibility.** Pick the pattern that the next developer can navigate without asking.

## 2. Page structure (use these wrappers, in this order)

```tsx
// app/page.tsx
<PageWrapper>
  <MainWrapper>
    <Section id="hero" variant="large">
      <PaddingGlobal>
        <Container size="large">
          {/* content */}
        </Container>
      </PaddingGlobal>
    </Section>
  </MainWrapper>
</PageWrapper>
```

- **`PageWrapper`** — outermost `<div>`. Page-wide background, overflow behavior.
- **`MainWrapper`** — semantic `<main>`. Everything between header and footer.
- **`<Section>`** — semantic `<section>` with an id/aria-label; carries vertical `padding-section-*`.
- **`PaddingGlobal`** — horizontal gutters (applies `--spacing-global` left+right).
- **`Container`** — max-width + `mx-auto`. Sizes: `small`, `medium`, `large`.

Build these once as small React components, then reuse everywhere. Don't re-derive the structure per page.

## 3. Spacing tokens (define in `app/globals.css @theme`)

Use the rem-based scale in `@theme`. In this repo, prefer the wrapper classes above for page-level spacing and use CSS variable values directly for local spacing, e.g. `gap-[var(--spacing-large)]` or `mt-[var(--spacing-medium)]`.

```css
@theme {
  /* vertical section padding */
  --spacing-section-small: 3rem;
  --spacing-section-medium: 5rem;
  --spacing-section-large: 8rem;

  /* horizontal gutters */
  --spacing-global: 1.5rem;

  /* inline scale for margin/padding on small elements */
  --spacing-0: 0;
  --spacing-small: 0.5rem;
  --spacing-medium: 1rem;
  --spacing-large: 2rem;
  --spacing-xlarge: 4rem;
  --spacing-xxhuge: 8rem;

  /* container max-widths */
  --container-small: 40rem;   /* 640px */
  --container-medium: 60rem;  /* 960px */
  --container-large: 80rem;   /* 1280px */
}
```

Define the reusable wrapper utilities in `globals.css` and use them consistently:

```css
@layer utilities {
  .padding-global { padding-inline: var(--spacing-global); }
  .padding-section-small { padding-block: var(--spacing-section-small); }
  .padding-section-medium { padding-block: var(--spacing-section-medium); }
  .padding-section-large { padding-block: var(--spacing-section-large); }
  .container-small { max-width: var(--container-small); }
  .container-medium { max-width: var(--container-medium); }
  .container-large { max-width: var(--container-large); }
}
```

Scale root font-size at breakpoints to get fluid rem scaling:

```css
html { font-size: 16px; }
@media (max-width: 991px)  { html { font-size: 15px; } }
@media (max-width: 479px)  { html { font-size: 14px; } }
```

## 4. Naming rules

- **Inline Tailwind utilities** — first choice. Use them directly in JSX for everything that isn't repeated.
- **Custom classes** — once a utility combo appears 3+ times, extract to a class in `globals.css` using the underscore pattern:
  - `hero_headline` (single scope + element)
  - `team-list_headshot-wrapper` (scope + subsection + element)
  - `footer_copyright-text` (page section + unique element)
- **Utility-extension classes** (no underscore) — for system-level styles that aren't built into Tailwind: `heading-style-h1..h6`, `text-style-allcaps`, `form_input` (note: `form_*` are custom even without a leading scope because they're repeated across forms).

Custom classes go in `globals.css` under a dedicated layer:

```css
@layer components {
  .hero_headline { @apply text-5xl font-bold tracking-tight; }
  .form_input   { @apply w-full rounded-md border border-black/15 bg-white px-4 py-3 text-base; }
  .form_submit  { @apply rounded-md bg-black px-6 py-3 text-base font-medium text-white hover:bg-black/90; }
}
```

## 5. Typography

Decouple visual size from semantic tag. Use `heading-style-h{n}` utilities so a semantic `<h1>` can visually look like an h3:

```css
@layer utilities {
  .heading-style-h1 { @apply text-5xl font-bold leading-tight; }
  .heading-style-h2 { @apply text-4xl font-semibold leading-tight; }
  .heading-style-h3 { @apply text-3xl font-semibold leading-snug; }
  .heading-style-h4 { @apply text-2xl font-semibold leading-snug; }
  .heading-style-h5 { @apply text-xl font-medium leading-normal; }
  .heading-style-h6 { @apply text-lg font-medium leading-normal; }

  .text-style-allcaps { @apply uppercase tracking-wider; }
  .text-style-italic  { @apply italic; }
}
```

## 6. Forms

Non-negotiable rules:

- **Explicit font-size on every input.** Browser defaults to 14px in some form controls — always set it yourself (`text-base` or `text-size-medium`).
- **Labels and placeholders in German (DE).** `Vorname`, `Nachname`, `E-Mail-Adresse`, `Telefonnummer`.
- **German error messages.** Examples: `Bitte geben Sie Ihren Vornamen ein.`, `Bitte geben Sie eine gültige E-Mail-Adresse ein.`, `Die Telefonnummer ist ungültig.`
- **`aria-describedby`** on inputs that have errors, pointing at the error element.
- **Focus-visible** must be obvious — don't remove the outline without replacing it with a visible alternative.
- **Use `form_input`, `form_submit`, `form_label`, `form_error`** as the reusable custom classes. Define once in `globals.css`.

Autocomplete hints (ship them):
- `autocomplete="given-name"` on Vorname
- `autocomplete="family-name"` on Nachname
- `autocomplete="email"` on E-Mail
- `autocomplete="tel"` on Telefonnummer

## 7. Responsive breakpoints (DE-first)

- **Mobile portrait:** ≤ 479px
- **Mobile landscape / small tablet:** 480–767px
- **Tablet:** 768–991px
- **Desktop:** 992–1439px
- **Large desktop:** ≥ 1440px

Prefer rem-scaling via root font-size over peppering every utility with `md:`/`lg:` prefixes. Use Tailwind breakpoint prefixes only for layout changes (grid columns, flex direction, element visibility), not for font/spacing tweaks.

## 8. File layout (React components)

```
app/
  actions.ts               // server action + zod validation + submit pipeline
components/
  layout/
    page-wrapper.tsx
    main-wrapper.tsx
    section.tsx
    padding-global.tsx
    container.tsx
  sections/
    hero.tsx
    benefits.tsx
    footer.tsx
  form/
    registration-form.tsx   // 'use client' — uses useActionState
    form-field.tsx
emails/
  admin-notification.tsx
  confirmation.tsx
```

Colocate section-specific subcomponents under the section's folder. Shared primitives live in `components/layout/` and `components/form/`. If a form field changes, the UI is not the only place to update: keep `app/actions.ts`, `lib/strapi.ts`, and `emails/*` aligned with the rendered form.

## 9. Quick checklist before committing UI

- [ ] All copy is in German.
- [ ] Section uses `<PageWrapper><MainWrapper><Section><PaddingGlobal><Container>` structure.
- [ ] Spacing comes from `--spacing-*` tokens, not magic numbers.
- [ ] Page-level spacing uses `padding-global`, `padding-section-*`, and `container-*`; local spacing uses `var(--spacing-...)`.
- [ ] Class combos repeated 3+ times are extracted to `globals.css`.
- [ ] Semantic tags: `<main>`, `<section>`, `<nav>`, `<header>`, `<footer>`, heading hierarchy correct.
- [ ] Focus-visible works with keyboard.
- [ ] Forms: explicit input font-size, autocomplete hints, German errors, `aria-describedby`.
- [ ] If registration fields changed, the Strapi schema, `app/actions.ts`, `lib/strapi.ts`, form UI, and emails were updated together.
- [ ] Tested at mobile (≤479px), tablet (768px), desktop (≥1440px).
