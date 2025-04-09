import * as React from "react"
import { redirect } from "next/navigation"

import { SiteHeader } from "@/components/layouts/site-header"
import { getUserSession } from "@/lib/auth"

export default async function CartLayout({
  children,
}: React.PropsWithChildren) {
  const session = await getUserSession()
  if (!session) {
    redirect("/signin")
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader user={session?.user} />
      <main className="flex-1">{children}</main>
    </div>
  )
}
