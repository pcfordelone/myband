import { create } from 'zustand'

interface IUseRegisterModal {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useRegisterModal = create<IUseRegisterModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
