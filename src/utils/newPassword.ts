import bcrypt from "bcrypt";
const MIN_LENGTH = 6;
type Password = string | null;

export function validateNewPassword(password: Password) {
  if (typeof password !== "string" || password.length < MIN_LENGTH) {
    return `Password must be at least ${MIN_LENGTH} characters`;
  }
  return null; //يعني الباسوورد سليم , كمل بقا
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}
