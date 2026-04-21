import {
  Html,
  Body,
  Container,
  Heading,
  Text,
  Section,
  Row,
  Column,
  Head,
  Preview,
  Hr,
} from "@react-email/components";

type AdminNotificationProps = {
  vorname: string;
  nachname: string;
  email: string;
  telefonnummer?: string;
};

export default function AdminNotification({ vorname, nachname, email, telefonnummer }: AdminNotificationProps) {
  return (
    <Html lang="de">
      <Head />
      <Preview>Neue Anmeldung: {vorname} {nachname}</Preview>
      <Body style={{ backgroundColor: "#f9fafb", fontFamily: "system-ui, sans-serif" }}>
        <Container style={{ maxWidth: "560px", margin: "40px auto", backgroundColor: "#ffffff", borderRadius: "8px", padding: "32px", border: "1px solid #e5e7eb" }}>
          <Heading style={{ fontSize: "20px", fontWeight: "600", color: "#111827", marginBottom: "8px" }}>
            Neue Anmeldung eingegangen
          </Heading>
          <Text style={{ color: "#6b7280", marginBottom: "24px", fontSize: "14px" }}>
            Ein neuer Teilnehmer hat sich für das Event angemeldet.
          </Text>

          <Hr style={{ borderColor: "#e5e7eb", marginBottom: "24px" }} />

          <Section>
            <Row style={{ marginBottom: "12px" }}>
              <Column style={{ width: "140px", color: "#6b7280", fontSize: "14px", fontWeight: "500" }}>Vorname</Column>
              <Column style={{ color: "#111827", fontSize: "14px" }}>{vorname}</Column>
            </Row>
            <Row style={{ marginBottom: "12px" }}>
              <Column style={{ width: "140px", color: "#6b7280", fontSize: "14px", fontWeight: "500" }}>Nachname</Column>
              <Column style={{ color: "#111827", fontSize: "14px" }}>{nachname}</Column>
            </Row>
            <Row style={{ marginBottom: "12px" }}>
              <Column style={{ width: "140px", color: "#6b7280", fontSize: "14px", fontWeight: "500" }}>E-Mail</Column>
              <Column style={{ color: "#111827", fontSize: "14px" }}>{email}</Column>
            </Row>
            {telefonnummer && (
              <Row style={{ marginBottom: "12px" }}>
                <Column style={{ width: "140px", color: "#6b7280", fontSize: "14px", fontWeight: "500" }}>Telefonnummer</Column>
                <Column style={{ color: "#111827", fontSize: "14px" }}>{telefonnummer}</Column>
              </Row>
            )}
          </Section>

          <Hr style={{ borderColor: "#e5e7eb", marginTop: "24px", marginBottom: "16px" }} />

          <Text style={{ color: "#9ca3af", fontSize: "12px", margin: "0" }}>
            Diese E-Mail wurde automatisch durch das Event-Anmeldesystem versandt.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
