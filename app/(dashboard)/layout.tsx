import { Header } from '@/components/header'
import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { musicianId: string }
}) {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const musician = await prisma.musician.findFirst({
    where: {
      id: params.musicianId,
      user_id: userId,
    },
  })

  if (!musician) {
    redirect('/')
  }

  return (
    <div className="h-screen w-full flex-col items-center justify-center">
      <Header />
      {children}
    </div>
  )
}
