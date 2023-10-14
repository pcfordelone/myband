'use client'

import { RegisterModal } from '@/components/modals/register-modal'
import { useEffect, useState } from 'react'

export const RegisterModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <RegisterModal />
    </>
  )
}
