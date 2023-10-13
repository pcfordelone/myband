import { UserButton } from '@clerk/nextjs'
import { ThemeToggle } from './theme-toggle'

export const Header = () => {
  return (
    <header className="flex items-center justify-between border-b border-muted p-4">
      <h1 className="font-bold text-2xl">My-Band</h1>
      <div className="flex gap-4 items-center justify-center">
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  )
}
