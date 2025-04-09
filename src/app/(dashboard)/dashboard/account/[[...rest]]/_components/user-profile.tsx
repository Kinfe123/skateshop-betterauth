"use client"

import { useState } from "react"
import { ChevronDown, Edit, Laptop, Plus } from "lucide-react"
import { useTheme } from "next-themes"

import { auth } from "@/lib/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

type Session = typeof auth.$Infer.Session
export function UserProfile({ session }: { session: Session }) {
  const [expanded, setExpanded] = useState<string[]>([])

  const toggleSection = (section: string) => {
    if (expanded.includes(section)) {
      setExpanded(expanded.filter((s) => s !== section))
    } else {
      setExpanded([...expanded, section])
    }
  }
  return (
    <div>
      <div className="min-h-screen bg-black p-6 text-white md:p-10">
        <div className="mr-auto max-w-3xl space-y-8">
          {/* Profile Section */}
          <section>
            <h2 className="mb-6 text-xl font-medium">Profile</h2>
            <div className="mb-2 flex items-center gap-4">
              <Avatar className="h-20 w-20 border-2 border-neutral-700">
                <AvatarImage
                  src="/placeholder.svg?height=80&width=80"
                  alt="Profile picture"
                />
                <AvatarFallback className="bg-neutral-800">KF</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-bold tracking-wide">KINFISH</h3>
              </div>
            </div>
          </section>

          <Separator className="bg-neutral-800" />

          {/* Email Addresses Section */}
          <section>
            <h2 className="mb-6 text-xl font-medium">Email addresses</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <span>kinfetare83@gmail.com</span>
                  <Badge className="bg-blue-600 text-xs font-normal hover:bg-blue-700">
                    Primary
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleSection("email")}
                >
                  <ChevronDown className="h-5 w-5 text-neutral-400" />
                </Button>
              </div>

              <Button
                variant="ghost"
                className="flex items-center gap-2 pl-0 text-blue-500 hover:text-blue-400"
              >
                <Plus className="h-4 w-4" />
                Add an email address
              </Button>
            </div>
          </section>

          <Separator className="bg-neutral-800" />

          {/* Connected Accounts Section */}
          <section>
            <h2 className="mb-6 text-xl font-medium">Connected accounts</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center">
                    <svg viewBox="0 0 24 24" className="h-6 w-6">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                      <path d="M1 1h22v22H1z" fill="none" />
                    </svg>
                  </div>
                  <div>
                    <span>Google (kinfetare83@gmail.com)</span>
                    <Badge className="ml-2 bg-red-500/90 text-xs font-normal hover:bg-red-500">
                      Requires action
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleSection("google")}
                >
                  <ChevronDown className="h-5 w-5 text-neutral-400" />
                </Button>
              </div>

              <Button
                variant="ghost"
                className="flex items-center gap-2 pl-0 text-blue-500 hover:text-blue-400"
              >
                <Plus className="h-4 w-4" />
                Connect account
              </Button>
            </div>
          </section>

          <Separator className="bg-neutral-800" />

          {/* Password Section */}
          <section>
            <h2 className="mb-6 text-xl font-medium">Password</h2>
            <div className="space-y-4">
              <div className="py-2">
                <span className="text-lg">••••••••</span>
              </div>

              <Button
                variant="ghost"
                className="flex items-center gap-2 pl-0 text-blue-500 hover:text-blue-400"
              >
                <Edit className="h-4 w-4" />
                Change password
              </Button>
            </div>
          </section>

          <Separator className="bg-neutral-800" />

          {/* Active Devices Section */}
          <section>
            <h2 className="mb-6 text-xl font-medium">Active devices</h2>
            <div className="space-y-4">
              <div className="flex items-start justify-between py-2">
                <div className="flex gap-4">
                  <div className="pt-1">
                    <Laptop
                      className="h-10 w-10 text-neutral-300"
                      strokeWidth={1}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Macintosh</span>
                      <Badge className="bg-blue-600 text-xs font-normal hover:bg-blue-700">
                        This device
                      </Badge>
                    </div>
                    <div className="mt-1 text-sm text-neutral-400">
                      Chrome 135.0.0.0
                    </div>
                    <div className="text-sm text-neutral-400">
                      51.158.54.205 (Paris, FR)
                    </div>
                    <div className="text-sm text-neutral-400">
                      Today at 9:46 AM
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleSection("device")}
                >
                  <ChevronDown className="h-5 w-5 text-neutral-400" />
                </Button>
              </div>
            </div>
          </section>

          <Separator className="bg-neutral-800" />

          {/* Danger Zone */}
          <section>
            <h2 className="mb-6 text-xl font-medium text-red-500">Danger</h2>
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="font-medium">Delete Account</h3>
                <p className="text-sm text-neutral-400">
                  Delete your account and all its associated data
                </p>
              </div>
              <Button className="bg-red-500 text-white hover:bg-red-600">
                DELETE ACCOUNT
              </Button>
            </div>
          </section>
        </div>
      </div>

      <p>Hello World</p>
      <small>hello@gmail.com</small>
    </div>
  )
}
