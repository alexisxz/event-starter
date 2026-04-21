const benefits = [
  {
    icon: "🎯",
    title: "Exklusives Wissen",
    description:
      "Erhalten Sie wertvolle Einblicke von führenden Experten aus der Branche und erweitern Sie Ihr Wissen gezielt.",
  },
  {
    icon: "🤝",
    title: "Starkes Netzwerk",
    description:
      "Knüpfen Sie Kontakte zu Gleichgesinnten und bauen Sie ein nachhaltiges professionelles Netzwerk auf.",
  },
  {
    icon: "🚀",
    title: "Neue Impulse",
    description:
      "Nehmen Sie frische Ideen und konkrete Handlungsempfehlungen mit, die Sie sofort in die Praxis umsetzen können.",
  },
];

export default function Benefits() {
  return (
    <div className="flex flex-col gap-[var(--spacing-large)]">
      <div className="text-center">
        <h2 id="vorteile-heading" className="heading-style-h2">
          Warum Sie dabei sein sollten
        </h2>
        <p className="mx-auto mt-[var(--spacing-medium)] max-w-xl text-gray-600">
          Unser Event bietet Ihnen die perfekte Plattform, um sich weiterzuentwickeln und neue Perspektiven zu gewinnen.
        </p>
      </div>
      <ul className="grid grid-cols-1 gap-[var(--spacing-large)] md:grid-cols-3" role="list">
        {benefits.map((benefit) => (
          <li
            key={benefit.title}
            className="flex flex-col gap-[var(--spacing-medium)] rounded-xl border border-black/10 p-[var(--spacing-large)]"
          >
            <span className="text-3xl" aria-hidden="true">
              {benefit.icon}
            </span>
            <h3 className="heading-style-h5">{benefit.title}</h3>
            <p className="text-gray-600 text-base">{benefit.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
