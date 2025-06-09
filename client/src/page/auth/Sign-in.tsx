"use client"

import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import logo from "@/assets/logo.jpg"

import GoogleOauthButton from "@/components/auth/google-oauth-button"
import { useMutation } from "@tanstack/react-query"
import { loginMutationFn } from "@/lib/api"
import { toast } from "@/hooks/use-toast"
import { Loader, LogIn } from "lucide-react"

const SignIn = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const returnUrl = searchParams.get("returnUrl")

  const { mutate, isPending } = useMutation({
    mutationFn: loginMutationFn,
  })

  const formSchema = z.object({
    email: z.string().trim().email("Invalid email address").min(1, {
      message: "Email is required",
    }),
    password: z.string().trim().min(1, {
      message: "Password is required",
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isPending) return

    mutate(values, {
      onSuccess: (data) => {
        const user = data.user
        console.log(user)
        const decodedUrl = returnUrl ? decodeURIComponent(returnUrl) : null
        navigate(decodedUrl || `/workspace/${user.currentWorkspace}`)
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      },
    })
  }

  return (
    <div className="min-h-svh bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-100 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-cyan-200/30 to-blue-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-violet-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 mb-6">
            
              <img src={logo} alt="Team Verge Logo" className="w-6 h-6 object-contain" />
              
            <span className="font-bold text-xl bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
              Team Verge
            </span>
          </div>
        </div>

        {/* Main Card */}
        <Card className="bg-white/90 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
          {/* Gradient top border */}
          <div className="h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"></div>

          <CardHeader className="text-center pt-8 pb-6 px-8">
            <div className="inline-flex p-3 bg-gradient-to-br from-cyan-100 to-purple-100 rounded-2xl mb-4 mx-auto">
              <LogIn className="w-6 h-6 text-purple-600" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
              Welcome back
            </CardTitle>
            <CardDescription className="text-slate-600 mt-2">Sign in to your account to continue</CardDescription>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Google OAuth Button */}
                <div className="space-y-4">
                  <GoogleOauthButton label="Sign in with Google" />
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-4 text-slate-500 font-medium">Or continue with email</span>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-slate-700">Email Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            className="h-12 border-slate-200 focus:border-purple-400 bg-white rounded-xl transition-colors"
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
                        <div className="flex items-center justify-between">
                          <FormLabel className="text-sm font-semibold text-slate-700">Password</FormLabel>
                          <Link
                            to="/forgot-password"
                            className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your password"
                            className="h-12 border-slate-200 focus:border-purple-400 bg-white rounded-xl transition-colors"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  disabled={isPending}
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {isPending ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin mr-2" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </>
                  )}
                </Button>

                {/* Sign Up Link */}
                <div className="text-center pt-4">
                  <span className="text-slate-600">Don't have an account? </span>
                  <Link to="/sign-up" className="font-semibold text-purple-600 hover:text-purple-700 transition-colors">
                    Create account
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-slate-500">
          <p>
            By signing in, you agree to our{" "}
            <Link to="" className="text-purple-600 hover:text-purple-700 font-medium">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="" className="text-purple-600 hover:text-purple-700 font-medium">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
