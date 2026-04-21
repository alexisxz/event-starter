import {
  Html,
  Body,
  Container,
  Heading,
  Text,
  Section,
  Head,
  Preview,
  Hr,
} from "@react-email/components";

type ConfirmationProps = {
  vorname: string;
};

export default function Confirmation({ vorname }: ConfirmationProps) {
  return (
    <Html lang="de">
      <Head />
      <Preview>Ihre Anmeldung ist bestätigt – wir freuen uns auf Sie!</Preview>
      <Body style={{ backgroundColor: "#f9fafb", fontFamily: "system-ui, sans-serif" }}>
        <Container style={{ maxWidth: "560px", margin: "40px auto", backgroundColor: "#ffffff", borderRadius: "8px", padding: "32px", border: "1px solid #e5e7eb" }}>
          <Heading style={{ fontSize: "22px", fontWeight: "700", color: "#111827", marginBottom: "8px" }}>
            Ihre Anmeldung ist bestätigt!
          </Heading>
          <Text style={{ color: "#374151", fontSize: "16px", lineHeight: "1.6", marginBottom: "24px" }}>
            Hallo {vorname},
          </Text>
          <Text style={{ color: "#374151", fontSize: "16px", lineHeight: "1.6", marginBottom: "16px" }}>
            vielen Dank für Ihre Anmeldung. Wir freuen uns sehr, Sie bei unserem Event begrüßen zu dürfen.
          </Text>
          <Text style={{ color: "#374151", fontSize: "16px", lineHeight: "1.6", marginBottom: "24px" }}>
            In Kürze erhalten Sie weitere Informationen zu Datum, Uhrzeit und Veranstaltungsort.
          </Text>

          <Section style={{ backgroundColor: "#f3f4f6", borderRadius: "8px", padding: "16px", marginBottom: "24px" }}>
            <Text style={{ color: "#6b7280", fontSize: "14px", margin: "0 0 4px 0", fontWeight: "500" }}>
              Veranstaltungsdetails
            </Text>
            <Text style={{ color: "#111827", fontSize: "14px", margin: "0" }}>
              Datum und Ort werden in Kürze bekannt gegeben.
            </Text>
          </Section>

          <Hr style={{ borderColor: "#e5e7eb", marginBottom: "16px" }} />

          <Text style={{ color: "#374151", fontSize: "16px", lineHeight: "1.6", marginBottom: "8px" }}>
            Bei Fragen stehen wir Ihnen gerne zur Verfügung.
          </Text>
          <Text style={{ color: "#374151", fontSize: "16px", lineHeight: "1.6" }}>
            Herzliche Grüße,<br />
            Das Event-Team
          </Text>

          <Hr style={{ borderColor: "#e5e7eb", marginTop: "24px", marginBottom: "16px" }} />

          <Text style={{ color: "#9ca3af", fontSize: "12px", margin: "0" }}>
            Sie erhalten diese E-Mail, weil Sie sich für unser Event angemeldet haben.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
