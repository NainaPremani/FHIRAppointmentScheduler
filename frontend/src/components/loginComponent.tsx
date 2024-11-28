"use client";

import { useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { oauth2 as SMART } from "fhirclient";
import { useRouter } from "next/navigation";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
    const scope = process.env.NEXT_PUBLIC_SCOPE;
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
    const iss = process.env.NEXT_PUBLIC_FHIR_ISS;

    // Check if necessary environment variables are defined
    if (!clientId || !scope || !redirectUri || !iss) {
      console.error("Environment variables are missing.");
      return;
    }

    setLoading(true);
    SMART.authorize({
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
      iss: iss,
    })
      .then(() => {
        setLoading(false);
        router.push(redirectUri);
      })
      .catch((error) => {
        console.error("Error during login:", error);
        setLoading(false);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Card>
        <Card.Body>
          <Card.Title className="text-center mb-4">
            <h4>FHIR Appointment Scheduler</h4>
          </Card.Title>
          <Card.Text className="text-center mb-4">
            Please log in to manage your appointments and access your healthcare
            data.
          </Card.Text>

          {loading ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <div className="text-center">
              <Button onClick={handleLogin} variant="primary">
                Login with SMART on FHIR
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
