export function valueLengthChecker(value: string, minLength: number): boolean {
  if (value.trim().length < minLength) return false;
  return true;
}

export function emailChecker(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}
