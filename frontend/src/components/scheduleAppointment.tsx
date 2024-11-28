/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Modal,
} from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";
import styles from "../styles/scheduleAppointment.module.css";
import { createAppointment, fetchDoctorIds } from "@/utility/api";

// Define types for form data
interface FormData {
  reason: string;
  specialty: string;
  appointmentDate: Date | null;
}

// Define types for doctor data
interface Doctor {
  id: string;
  name: string;
}

const ScheduleAppointment: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    reason: "",
    specialty: "",
    appointmentDate: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [availableDoctors, setAvailableDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const loadDoctorIds = async () => {
      try {
        const ids = await fetchDoctorIds();
        setAvailableDoctors(ids);
      } catch (error: any) {
        setError(error.message);
      }
    };

    loadDoctorIds();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({ ...prev, appointmentDate: date }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation for required fields
    if (!formData.reason || !formData.specialty || !formData.appointmentDate) {
      setError("Please fill out all required fields.");
      return;
    }

    try {
      setError(null);
      setSuccess(null);

      // Randomly assign an available doctor
      const randomDoctor =
        availableDoctors[Math.floor(Math.random() * availableDoctors.length)];

      // Retrieve user details from session storage
      const keyString = sessionStorage.getItem("SMART_KEY");
      const dummy = JSON.parse(keyString || "");
      const userDetailsString = sessionStorage.getItem(dummy || "");
      const userDetails = JSON.parse(userDetailsString || "");
      const patientID = userDetails?.tokenResponse?.patient;

      // Prepare form data with assigned doctor and patient ID
      const appointmentData = {
        reason: formData.reason,
        specialty: formData.specialty,
        doctorID: randomDoctor.id,
        patientID,
        appointmentDate: formData.appointmentDate
          ? formData.appointmentDate.toISOString()
          : "", // Ensure correct formatting
      };

      console.log("Request Payload:", appointmentData); // Debugging log

      // Make POST request to backend API to create an appointment
      const createdAppointment = await createAppointment(appointmentData);
      setSuccess("Appointment scheduled successfully!");
      setShowModal(true);
      console.log("Appointment created:", createdAppointment);
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "There was an error scheduling your appointment."
      );
      console.error("Error scheduling appointment:", error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    // Redirect to dashboard
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col lg={6} md={8} sm={10}>
          <h1 className="mb-4 text-center">Schedule an Appointment</h1>
          <Form onSubmit={handleSubmit} className={styles.appointmentForm}>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form.Group controlId="reason" className="mb-3">
              <Form.Label>Reason for Appointment</Form.Label>
              <Form.Control
                type="text"
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                required
                placeholder="Enter the reason for your appointment"
              />
            </Form.Group>

            <Form.Group controlId="specialty" className="mb-3">
              <Form.Label>Specialty</Form.Label>
              <Form.Control
                as="select"
                name="specialty"
                value={formData.specialty}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a Specialty</option>
                <option value="General Practice">General Practice</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Gynecology">Gynecology</option>
                <option value="Orthopedics">Orthopedics</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="appointmentDate" className="mb-3">
              <Form.Label>Date</Form.Label>
              <ReactDatePicker
                selected={formData.appointmentDate}
                onChange={handleDateChange}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                className="form-control"
                placeholderText="Select a date and time"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Schedule Appointment
            </Button>
          </Form>

          <Modal show={showModal} onHide={handleModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Appointment Scheduled</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Your appointment has been successfully booked.</p>
            </Modal.Body>
            <Modal.Footer>
              <Link href="/scheduler/dashboard" passHref>
                <Button variant="primary" onClick={handleModalClose}>
                  OK
                </Button>
              </Link>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default ScheduleAppointment;
