"use client";

import { ChangeEvent, useState } from "react";
import Input from "../Input/Input";
import { validateIranianPhoneNumber } from "@/utils/validation";
import styles from "./PhoneInput.module.scss";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  fullWidth?: boolean;
}

const PhoneInput = ({
  value,
  onChange,
  label = "Phone Number",
  fullWidth = false,
}: PhoneInputProps) => {
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // We no longer restrict to only digits since we now support Persian/Arabic digits
    // and our validation function will handle normalization

    // Clear error when input changes
    if (error) setError("");

    onChange(inputValue);
  };

  const handleBlur = () => {
    if (!value) {
      setError("Phone number is required");
      return;
    }

    if (!validateIranianPhoneNumber(value)) {
      setError(
        "Please enter a valid Iranian phone number. Valid formats include: 09123456789, +989123456789"
      );
    } else {
      setError("");
    }
  };

  return (
    <div className={styles.phoneInput}>
      <Input
        label={label}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="09123456789"
        maxLength={13} // Increased to support international format
        error={error}
        fullWidth={fullWidth}
        dir="ltr" // Ensure left-to-right input for phone numbers
        inputMode="tel" // Use telephone input mode for better mobile keyboard
      />
    </div>
  );
};

export default PhoneInput;
