// Utility to convert Persian digits to English digits - more performant implementation
const convertToEnglishDigits = (str: string): string => {
  if (!str || typeof str !== "string") return str;

  // Replace all Persian digits with English digits in a single operation
  return str.replace(/[۰-۹]/g, (digit) => {
    // Map of Persian digits to English digits
    const persianToEnglish: Record<string, string> = {
      "۰": "0",
      "۱": "1",
      "۲": "2",
      "۳": "3",
      "۴": "4",
      "۵": "5",
      "۶": "6",
      "۷": "7",
      "۸": "8",
      "۹": "9",
    };

    return persianToEnglish[digit] || digit;
  });
};

// Validate Iranian phone numbers with comprehensive pattern
// Supports formats like:
// - 09123456789 (standard)
// - +989123456789 (international)
// - 989123456789 (without plus)
// - 9123456789 (without leading zero)
export const validateIranianPhoneNumber = (phoneNumber: string): boolean => {
  if (!phoneNumber) return false;

  // Convert Persian digits to English
  const normalizedNumber = convertToEnglishDigits(phoneNumber);

  // More comprehensive pattern supporting various formats
  // This pattern supports all major Iranian mobile operators
  const iranianPhoneNumberPattern =
    /^(0|0098|\+98|98)?9(0[1-5]|[1-3]\d|2[0-3]|9[0-9]|41)\d{7}$/;

  return iranianPhoneNumberPattern.test(normalizedNumber);
};
