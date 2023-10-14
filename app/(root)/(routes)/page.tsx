'use client'

import { useRegisterModal } from '@/hooks/use-register-modal'
import { useEffect } from 'react'

const SetupPage = () => {
  const onOpen = useRegisterModal((state) => state.onOpen)
  const isOpen = useRegisterModal((state) => state.isOpen)

  useEffect(() => {
    if (!isOpen) {
      onOpen()
    }
  }, [onOpen, isOpen])

  return null
}

export default SetupPage
