export function isEmailValid(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

const MINIMUN_PASSWORD_LENGTH = 6;
export function isPasswordValid(password) {
  return password.length >= MINIMUN_PASSWORD_LENGTH;
}
