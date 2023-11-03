export interface SigninData {
  username: string;
  password: string;
}

export interface User {
  name: string;
  docNumber: string;
  birthDate: Date | dateFns | null;
  username: string;
  password: string;
}
