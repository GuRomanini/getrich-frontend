export interface SigninData {
  username: string;
  user_password: string;
}

export interface User {
  person_name: string;
  document_number: string;
  date_of_birth: Date | null | string;
  username: string;
  user_password: string;
}
