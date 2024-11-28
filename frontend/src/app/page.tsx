"use client";

import Login from "@/components/loginComponent";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Healthcare Appointment Scheduler</h1>
        <p className={styles.subtitle}>
          Easily manage your healthcare appointments.
        </p>
      </header>
      <main className={styles.main}>
        <Login />
      </main>
      <footer className={styles.footer}>
        <p>
          &copy; 2024 Healthcare Appointment Scheduler. All rights reserved.
        </p>
        <div className={styles.footerLinks}>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}
