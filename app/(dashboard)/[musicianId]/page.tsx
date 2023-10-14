'use client'

import { useUser } from '@clerk/nextjs'

export default function Home() {
  const { user } = useUser()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <strong>Seja bem-vindo {user?.fullName}</strong>
    </main>
  )
}
