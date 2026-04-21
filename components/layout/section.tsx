const paddingMap = {
  small: "padding-section-small",
  medium: "padding-section-medium",
  large: "padding-section-large",
} as const;

type SectionProps = {
  id: string;
  variant?: keyof typeof paddingMap;
  className?: string;
  children: React.ReactNode;
};

export default function Section({ id, variant = "medium", className = "", children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={`${paddingMap[variant]} ${className}`}>
      {children}
    </section>
  );
}
