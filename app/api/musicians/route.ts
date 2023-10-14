import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { name, email, userId, bio } = body

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 })
    }

    if (!email) {
      return new NextResponse('Email is required', { status: 400 })
    }

    const musician = await prisma.musician.create({
      data: {
        name,
        email,
        user_id: userId,
        bio,
      },
    })
    return NextResponse.json(musician)
  } catch (error) {
    console.log('[MUSICIAN_POST', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
