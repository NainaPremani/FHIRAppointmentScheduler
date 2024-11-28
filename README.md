Overview
The FHIR Appointment Scheduler is a web application designed to facilitate the scheduling, managing, and canceling of healthcare appointments. Built using SMART on FHIR, this application securely integrates with FHIR servers to manage patient and practitioner data.

Deployed Application
Check out the deployed version of the application here: https://fhir-appointment-scheduler-ug5w.vercel.app/

Features
Secure OAuth2 Authentication using SMART on FHIR

Schedule new healthcare appointments

View all upcoming appointments

Cancel existing appointments

Fetch and display available doctors

Tech Stack
Frontend: React, Next.js, Bootstrap

Backend: Node.js, Express

API: FHIR Server, SMART on FHIR

Deployment: Vercel

Installation and Setup
To run this project locally, follow these steps:

Clone the repository:

bash
git clone https://github.com/NainaPremani/FHIRAppointmentScheduler.git
cd FHIRAppointmentScheduler
Install dependencies:

bash
npm install
Set up environment variables: Create a .env file in the root directory and add the following environment variables:

env
FHIR_SERVER_URL=https://launch.smarthealthit.org/v/r4/sim/YOUR_SIMULATOR_ID/fhir
PORT=3000
Run the application:

bash
npm run dev
API Endpoints
Appointments
GET /appointments

Fetch all appointments.

GET /appointments/available-doctors

Fetch all available doctors.

POST /appointments

Create a new appointment.

Request body:

json
{
  "reason": "Medical Consultation",
  "specialty": "General Practice",
  "appointmentDate": "2024-12-01T10:00:00Z",
  "patientID": "123456"
}
DELETE /appointments/:id

Cancel an appointment by ID.
