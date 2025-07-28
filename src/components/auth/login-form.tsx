"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { LoginFormData, LoginFormSchema, AuthError } from "@/types/auth"
import { authAPI } from "@/lib/auth/auth-api"
import { useAuthActions } from "@/lib/stores/auth-store"
import { setAccessToken, setRefreshToken } from "@/lib/auth/session-utils"

export function LoginForm() {
  const router = useRouter()
  const { login, setError, setLoading } = useAuthActions()
  const [showPassword, setShowPassword] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [authError, setAuthError] = React.useState<AuthError | null>(null)

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true)
      setLoading(true)
      setError(null)
      setAuthError(null)

      const response = await authAPI.login(data)
      
      // Store tokens
      setAccessToken(response.tokens.accessToken)
      setRefreshToken(response.tokens.refreshToken)
      
      // Update auth store
      const user = {
        ...response.user,
        role: response.user.role as "developer" | "enterprise" | "visitor" | "admin",
        industry: response.user.industry as "healthcare" | "finance" | "ai-research" | "fintech" | "banking" | "insurance" | "government" | "education" | "technology" | "other" | undefined,
        createdAt: new Date(response.user.createdAt),
        lastLoginAt: response.user.lastLoginAt ? new Date(response.user.lastLoginAt) : undefined,
      };
      
      login(user, {
        userId: response.user.id,
        email: response.user.email,
        name: response.user.name,
        role: response.user.role as "developer" | "enterprise" | "visitor" | "admin",
        accessToken: response.tokens.accessToken,
        refreshToken: response.tokens.refreshToken,
        expiresAt: new Date(response.tokens.expiresAt),
        lastActivity: new Date(),
      })

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (error: any) {
      setAuthError(error)
      setError(error)
    } finally {
      setIsSubmitting(false)
      setLoading(false)
    }
  }

  const getErrorMessage = (error: AuthError) => {
    switch (error.code) {
      case 'INVALID_CREDENTIALS':
        return 'Invalid email or password. Please check your credentials and try again.'
      case 'ACCOUNT_LOCKED':
        return 'Your account has been temporarily locked. Please contact support for assistance.'
      case 'EMAIL_NOT_VERIFIED':
        return 'Please verify your email address before logging in. Check your inbox for a verification link.'
      case 'RATE_LIMITED':
        return 'Too many login attempts. Please wait a few minutes before trying again.'
      case 'NETWORK_ERROR':
        return 'Network error. Please check your connection and try again.'
      default:
        return error.message || 'An unexpected error occurred. Please try again.'
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">
          Sign in to your QubitCore account
        </p>
      </div>

      {authError && (
        <div className="rounded-md bg-red-50 p-4 border border-red-200">
          <div className="text-sm text-red-800">
            {getErrorMessage(authError)}
          </div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                    disabled={isSubmitting}
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
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...field}
                      disabled={isSubmitting}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isSubmitting}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal">
                      Remember me
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <Link
              href="/forgot-password"
              className="text-sm text-primary underline underline-offset-4 hover:no-underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">Don't have an account? </span>
        <Link
          href="/signup"
          className="text-primary underline underline-offset-4 hover:no-underline"
        >
          Sign up
        </Link>
      </div>
    </div>
  )
}