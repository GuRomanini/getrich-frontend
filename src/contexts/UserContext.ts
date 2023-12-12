import { createContext } from 'react'
import { UserData } from '@/types/user'

export type UserContextData = {
  person_name: string,
  document_number: string,
  date_of_birth: Date | string | null,
  username: string,
  updateUser: (user: UserData) => void
}

export const UserContext = createContext({} as UserContextData)
