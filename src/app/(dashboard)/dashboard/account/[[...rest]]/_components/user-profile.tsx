"use client"

import { UserProfile as ClerkUserProfile } from "@clerk/nextjs"
import { useTheme } from "next-themes"

export function UserProfile({ ...props }) {
  return (
    <div>
      <p>Hello World</p>
      <small>hello@gmail.com</small>
    </div>
  )
}
