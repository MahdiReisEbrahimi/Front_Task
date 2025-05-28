export function valueLengthChecker(value: string, minLength: number): boolean {
  if (value.trim().length < minLength) return false;
  return true;
}

export function emailChecker(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

// For styling inputs => adding red border to them:
export function getInputClass(fieldName: string, errors: string[]) {
  const hasError = errors.some((err) =>
    err.toLowerCase().includes(fieldName.toLowerCase())
  );

  return `w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
    hasError ? "border-red-400" : "border-black"
  }`;
}
