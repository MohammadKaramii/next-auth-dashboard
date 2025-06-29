"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/Button/Button";
import styles from "./dashboard.module.scss";

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  // Redirect to auth page if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

  // If user is not loaded yet, show nothing (will redirect if needed)
  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.userInfo}>
            {user.picture && (
              <img
                src={user.picture.medium}
                alt={`${user.name.first} ${user.name.last}`}
                className={styles.avatar}
              />
            )}
            <div>
              <h1 className={styles.welcome}>Welcome to the Dashboard</h1>
              <p className={styles.name}>
                {user.name.title} {user.name.first} {user.name.last}
              </p>
              <p className={styles.email}>{user.email}</p>
            </div>
          </div>
          <Button onClick={logout} variant="secondary">
            Logout
          </Button>
        </div>

        <div className={styles.card}>
          <h2>Dashboard Content</h2>
          <p>This is a simple dashboard page showing user information.</p>
        </div>
      </div>
    </div>
  );
}
