"use client"

import { Link, useNavigate } from "react-router-dom"
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
import { registerMutationFn } from "@/lib/api"
import { toast } from "@/hooks/use-toast"
import { Loader, UserPlus } from "lucide-react"

const SignUp = () => {
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: registerMutationFn,
  })

  const formSchema = z.object({
    name: z.string().trim().min(1, {
      message: "Name is required",
    }),
    email: z.string().trim().email("Invalid email address").min(1, {
      message: "Email is required",
    }),
    password: z.string().trim().min(6, {
      message: "Password must be at least 6 characters",
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isPending) return
    mutate(values, {
      onSuccess: () => {
        navigate("/")
      },
      onError: (error) => {
        console.log(error)
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      },
    })
  }

  return (
    <div className="min-h-svh bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-100 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-br from-purple-200/30 to-violet-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-br from-cyan-200/30 to-blue-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 mb-6 hover:bg-white/90 transition-colors"
          >
            <img src={logo} alt="Team Verge Logo" className="w-8 h-8 object-contain" />
            <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Team Verge
            </span>
          </Link>
        </div>

        {/* Main Card */}
        <Card className="bg-white/90 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
          {/* Gradient top border */}
          <div className="h-1 bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-600"></div>

          <CardHeader className="text-center pt-8 pb-6 px-8">
            <div className="inline-flex p-3 bg-gradient-to-br from-purple-100 to-cyan-100 rounded-2xl mb-4 mx-auto">
              <UserPlus className="w-6 h-6 text-purple-600" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Create your account
            </CardTitle>
            <CardDescription className="text-slate-600 mt-2">
              Join thousands of teams already using Team Sync
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Google OAuth Button */}
                <div className="space-y-4">
                  <GoogleOauthButton label="Sign up with Google" />
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-4 text-slate-500 font-medium">Or create account with email</span>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-slate-700">Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
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
                        <FormLabel className="text-sm font-semibold text-slate-700">Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Create a strong password"
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
                  type="submit"
                  disabled={isPending}
                  className="w-full h-12 bg-gradient-to-r from-purple-500 to-cyan-600 hover:from-purple-600 hover:to-cyan-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {isPending ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin mr-2" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Create Account
                    </>
                  )}
                </Button>

                {/* Sign In Link */}
                <div className="text-center pt-4">
                  <span className="text-slate-600">Already have an account? </span>
                  <Link to="/sign-in" className="font-semibold text-purple-600 hover:text-purple-700 transition-colors">
                    Sign in
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-slate-500">
          <p>
            By creating an account, you agree to our{" "}
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

export default SignUp
