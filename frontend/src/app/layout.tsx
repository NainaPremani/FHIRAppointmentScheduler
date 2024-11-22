export const metadata = {
  title: "FHIR Appointment Scheduler",
  description: "A SMART on FHIR app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
