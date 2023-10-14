import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const musician = await prisma.musician.findFirst({
    where: {
      user_id: userId,
    },
  })

  if (musician) {
    redirect(`/${musician.id}`)
  }

  return <>{children}</>
}
