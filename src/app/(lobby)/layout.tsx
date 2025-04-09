import { headers } from "next/headers"

import { auth } from "@/lib/auth"
import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"

interface LobyLayoutProps
  extends React.PropsWithChildren<{
    modal: React.ReactNode
  }> {}

export default async function LobyLayout({ children, modal }: LobyLayoutProps) {
  const user = await auth.api.getSession({
    headers: await headers(),
  })
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader user={user?.user} />
      <main className="flex-1">
        {children}
        {modal}
      </main>
      <SiteFooter />
    </div>
  )
}
