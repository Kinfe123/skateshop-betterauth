import type { Metadata } from "next"
import { headers } from "next/headers"
import { env } from "@/env.js"

import { auth } from "@/lib/auth"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shell"

import { UserProfile } from "./_components/user-profile"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Account",
  description: "Manage your account settings",
}

export default async function AccountPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  console.log({ session })
  return (
    <Shell variant="sidebar" className="overflow-hidden">
      <PageHeader>
        <PageHeaderHeading size="sm">Account</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage your account settings
        </PageHeaderDescription>
      </PageHeader>
      <ScrollArea className="w-full pb-3.5">
        <UserProfile session={session} />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Shell>
  )
}
