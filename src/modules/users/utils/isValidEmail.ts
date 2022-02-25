export function isValidEmail(email: string): boolean {
  const validateEmail = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

  if (!validateEmail.test(email)) {
    return false;
  }

  return true;
}
