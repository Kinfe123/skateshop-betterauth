"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useSignIn } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import { toast } from "sonner"
import {  authClient } from "@/lib/auth-client"
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
import { authClient } from "@/lib/auth-client"

type Inputs = z.infer<typeof authSchema>

export function SignInForm() {
  const router = useRouter()
  const { isLoaded, signIn, setActive } = useSignIn()
  const [loading, setLoading] = React.useState(false)
  const [error , setError] = React.useState("")
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
    if (!isLoaded) return

    setLoading(true)

    try {
      const { data, error } = await authClient.signIn.email(
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
           * a url to redirect to after the user verifies their email (optional)
           */
          callbackURL: "/dashboard",
          /**
           * remember the user session after the browser is closed.
           * @default true
           */
          rememberMe: false,
        },
        {
          onRequest: (ctx) => {
            setLoading(true)
          },
          onSuccess: (ctx) => {
            // redirect to the dashboard
            //alert("Logged in successfully");
            toast.message("Check your email", {
                          description: "We sent you a 6-digit verification code.",
                        })
          },
          onError: (ctx) => {
            // display the error message
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
                <Input
                  type="text"
                  placeholder="rodneymullen180@gmail.com"
                  {...field}
                />
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
        <Button type="submit" className="mt-2" disabled={loading}>
          {loading && (
            <Icons.spinner
              className="mr-2 size-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Sign in
          <span className="sr-only">Sign in</span>
        </Button>
      </form>
    </Form>
  )
}
