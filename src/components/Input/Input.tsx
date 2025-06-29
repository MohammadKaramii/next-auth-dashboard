"use client";

import React, { InputHTMLAttributes, useState } from "react";
import styles from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  className,
  fullWidth = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`${styles.container} ${fullWidth ? styles.fullWidth : ""}`}>
      {label && <label className={styles.label}>{label}</label>}
      <div
        className={`${styles.inputContainer} ${error ? styles.error : ""} ${
          isFocused ? styles.focused : ""
        }`}
      >
        <input
          className={`${styles.input} ${className || ""}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default Input;
