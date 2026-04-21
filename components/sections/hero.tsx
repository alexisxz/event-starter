export default function Hero() {
  return (
    <div className="flex flex-col items-center gap-[var(--spacing-large)] text-center">
      <div className="flex flex-col gap-[var(--spacing-medium)]">
        <p className="text-style-allcaps text-sm text-gray-500">Exklusives Event</p>
        <h1 id="hero-heading" className="heading-style-h1 max-w-2xl">
          Ihr Einstieg in die Welt der Möglichkeiten
        </h1>
        <p className="mx-auto max-w-xl text-lg text-gray-600">
          Sichern Sie sich jetzt Ihren Platz bei unserem exklusiven Event und erleben Sie inspirierende Vorträge,
          wertvolle Netzwerke und unvergessliche Momente.
        </p>
      </div>
      <a
        href="#anmeldung"
        className="rounded-md bg-black px-8 py-3 text-base font-medium text-white hover:bg-black/80 transition-colors"
      >
        Jetzt kostenlos anmelden
      </a>
    </div>
  );
}
