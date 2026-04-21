import PageWrapper from "@/components/layout/page-wrapper";
import MainWrapper from "@/components/layout/main-wrapper";
import Section from "@/components/layout/section";
import PaddingGlobal from "@/components/layout/padding-global";
import Container from "@/components/layout/container";
import Hero from "@/components/sections/hero";
import Benefits from "@/components/sections/benefits";
import Footer from "@/components/sections/footer";
import RegistrationForm from "@/components/form/registration-form";

export default function Page() {
  return (
    <PageWrapper>
      <MainWrapper>
        <Section id="hero" variant="large" className="bg-gray-50">
          <PaddingGlobal>
            <Container size="large">
              <Hero />
            </Container>
          </PaddingGlobal>
        </Section>

        <Section id="vorteile" variant="medium">
          <PaddingGlobal>
            <Container size="large">
              <Benefits />
            </Container>
          </PaddingGlobal>
        </Section>

        <Section id="anmeldung" variant="large" className="bg-gray-50">
          <PaddingGlobal>
            <Container size="small">
              <RegistrationForm />
            </Container>
          </PaddingGlobal>
        </Section>
      </MainWrapper>

      <Footer />
    </PageWrapper>
  );
}
