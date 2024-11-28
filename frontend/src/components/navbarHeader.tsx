import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Link from "next/link";
import styles from "../styles/navbar.module.css";
import { useRouter } from "next/navigation";

export const NavbarHeader = () => {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/");
  };

  return (
    <Navbar expand="lg" bg="primary" variant="dark" className={styles.navbar}>
      <Container>
        <Link href="/scheduler/dashboard" passHref>
          <Navbar.Brand className={styles["navbar-brand"]}>
            Healthcare Scheduler
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className={styles["navbar-collapse"]}
        >
          <Nav className="ms-auto">
            <Link href="/scheduler/add-appointment" passHref>
              <Nav.Item className={styles["nav-link"]}>
                Schedule Appointment
              </Nav.Item>
            </Link>
            <Nav.Item
              className={styles["nav-link"]}
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
            >
              Logout
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
