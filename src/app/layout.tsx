// Seems like _app.tsx
import type { Metadata } from 'next'
import { useState } from 'react'

import { UserContext, UserContextData } from '@/contexts/UserContext'
import { UserData } from '@/types/user'

import { inter } from '../styles/fonts'
import '../styles/globals.scss'

export const metadata: Metadata = {
  title: 'Getrich',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState({} as UserData)

  function updateUser(user: UserData) {
    setUser(user)
  }

  return (
    <UserContext.Provider value={{ ...user, updateUser }}>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>{children}</body>
      </html>
    </UserContext.Provider>
  )
}
