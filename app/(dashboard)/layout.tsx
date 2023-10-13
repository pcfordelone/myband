import { Header } from "@/components/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen w-full flex-col items-center justify-center">
      <Header />
      {children}
    </div>
  )
}