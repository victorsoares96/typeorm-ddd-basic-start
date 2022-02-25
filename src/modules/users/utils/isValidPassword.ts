export function isValidPassword(password: string): boolean {
  const mustBeAtLeastEightCharactersOneUpperCaseOneNumber =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return mustBeAtLeastEightCharactersOneUpperCaseOneNumber.test(password);
}
