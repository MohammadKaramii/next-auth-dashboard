"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import PhoneInput from "@/components/PhoneInput/PhoneInput";
import Button from "@/components/Button/Button";
import { useAuth } from "@/context/AuthContext";
import { validateIranianPhoneNumber } from "@/utils/validation";
import styles from "./auth.module.scss";

export default function AuthPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login, user, isLoading } = useAuth();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate phone number
    if (!phoneNumber) {
      setError("Phone number is required");
      return;
    }

    if (!validateIranianPhoneNumber(phoneNumber)) {
      setError("Please enter a valid Iranian phone number");
      return;
    }

    setError("");

    try {
      await login();
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Login</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <PhoneInput value={phoneNumber} onChange={setPhoneNumber} fullWidth />

          <Button type="submit" fullWidth isLoading={isLoading}>
            Login
          </Button>

          {error && <p className={styles.errorMessage}>{error}</p>}
        </form>
      </div>
    </div>
  );
}
