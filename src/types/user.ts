export interface SigninData {
  username: string;
  user_password: string;
}

export type NewUser = {
  person_name: string;
  document_number: string;
  date_of_birth: Date | null | string;
  username: string;
  user_password: string;
}

export type UserData = {
  id: number;
  person_name: string;
  document_number: string;
  date_of_birth: Date | null | string;
  username: string;
}
