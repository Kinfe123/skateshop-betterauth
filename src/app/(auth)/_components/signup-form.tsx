"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

import { authClient } from "@/lib/auth-client"
import { showErrorToast } from "@/lib/handle-error"
import { authSchema } from "@/lib/validations/auth"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import { PasswordInput } from "@/components/password-input"

type Inputs = z.infer<typeof authSchema>

export function SignUpForm() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: Inputs) {
    const { email, password } = data
    setLoading(true)

    try {
      const { data, error } = await authClient.signUp.email(
        {
          /**
           * The user email
           */
          email,
          /**
           * The user password
           */
          password,
          /**
           * remember the user session after the browser is closed.
           * @default true
           */
          name: "N/A",
        },
        {
          onRequest: (ctx) => {
            setLoading(true)
          },
          onSuccess: (ctx) => {
            toast.message("Check your email", {
              description: "We sent you a 6-digit verification code.",
            })
            router.push("/login")
          },
          onError: (ctx) => {
            setError(ctx.error.message)
            setLoading(false)
          },
        }
      )
    } catch (err) {
      showErrorToast(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="rodneymullen180@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-2" disabled={loading}>
          {loading && (
            <Icons.spinner
              className="mr-2 size-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Continue
          <span className="sr-only">Continue to email verification page</span>
        </Button>
      </form>
    </Form>
  )
}
