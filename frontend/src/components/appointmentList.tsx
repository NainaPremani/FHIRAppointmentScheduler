/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import styles from "../styles/appointmentList.module.css";
import { deleteAppointment, fetchAppointments } from "@/utility/api";

interface Appointment {
  id: string;
  date: string;
  specialty: string;
  doctor: string;
  address: string;
  status: string;
}

const AppointmentList: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadAppointments = async () => {
      setLoading(true);
      try {
        setError(null);
        const data = await fetchAppointments();
        console.log("Fetched Appointments:", data);

        // Filter appointments with status 'booked' and ensure they have description and date
        const validAppointments: Appointment[] = data
          .filter(
            (item: any) =>
              item.resource.status === "booked" &&
              item.resource.description &&
              item.resource.start
          )
          .map((item: any) => {
            const doctorDetails = item.resource?.doctorDetails || {};
            const doctorName = `${
              doctorDetails?.name?.[0]?.prefix?.join(" ") ?? ""
            } ${doctorDetails?.name?.[0]?.given?.join(" ") ?? ""} ${
              doctorDetails?.name?.[0]?.family ?? "Unknown"
            }`;
            const address = doctorDetails.address?.[0] || {};
            const formattedAddress = `${address.line?.join(", ") || ""}, ${
              address.city || ""
            }, ${address.state || ""}, ${address.postalCode || ""}, ${
              address.country || ""
            }`;

            return {
              id: item.resource.id,
              date: item.resource.start,
              specialty: item.resource.description,
              doctor: doctorName.trim() || "No name available",
              address: formattedAddress.trim() || "No address available",
              status: item.resource.status,
            };
          });

        setAppointments(validAppointments);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  const handleCancel = async (id: string) => {
    try {
      setError(null);
      setSuccess(null);

      await deleteAppointment(id);
      setSuccess("Appointment canceled successfully!");

      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== id)
      );
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col lg={10} md={10} sm={12}>
          {loading && (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Row>
            {appointments.map((appointment) => (
              <Col key={appointment.id} lg={6} md={6} sm={12} className="mb-4">
                <Card className={styles.appointmentCard}>
                  <Card.Body>
                    <Card.Title>
                      Service Type: {appointment.specialty}
                    </Card.Title>
                    <Card.Text>
                      <strong>Date:</strong>{" "}
                      {new Date(appointment.date).toLocaleString()}
                      <br />
                    </Card.Text>
                    <Button
                      variant="danger"
                      onClick={() => handleCancel(appointment.id)}
                    >
                      Cancel
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AppointmentList;
