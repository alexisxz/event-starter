import Container from "@/components/layout/container";
import PaddingGlobal from "@/components/layout/padding-global";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-black/10 padding-section-small">
      <PaddingGlobal>
        <Container size="large">
          <div className="mx-auto flex w-full flex-col items-center gap-[var(--spacing-small)] text-center text-sm text-gray-500">
            <p>© {year} Event Starter. Alle Rechte vorbehalten.</p>
            <p>Erstellt für Veranstalter, die mehr erreichen wollen.</p>
          </div>
        </Container>
      </PaddingGlobal>
    </footer>
  );
}
