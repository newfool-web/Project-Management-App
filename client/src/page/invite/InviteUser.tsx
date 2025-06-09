"use client"

import { Loader, UserPlus } from "lucide-react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import { BASE_ROUTE } from "@/routes/common/routePaths"
import useAuth from "@/hooks/api/use-auth"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { invitedUserJoinWorkspaceMutationFn } from "@/lib/api"
import { toast } from "@/hooks/use-toast"

const InviteUser = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const param = useParams()
  const inviteCode = param.inviteCode as string

  const { data: authData, isPending } = useAuth()
  const user = authData?.user

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: invitedUserJoinWorkspaceMutationFn,
  })

  const returnUrl = encodeURIComponent(`${BASE_ROUTE.INVITE_URL.replace(":inviteCode", inviteCode)}`)

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    mutate(inviteCode, {
      onSuccess: (data) => {
        queryClient.resetQueries({
          queryKey: ["userWorkspaces"],
        })
        navigate(`/workspace/${data.workspaceId}`)
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
    <div className="min-h-screen bg-gradient-to-tr from-cyan-100 via-blue-100 to-purple-100 flex items-center justify-center p-4">
      {/* Diagonal layout */}
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Logo and welcome */}
        <div className="text-center lg:text-left space-y-6 transform -rotate-2">
          <div className="bg-gradient-to-br from-white/80 to-purple-50/60 backdrop-blur-sm rounded-2xl border border-purple-200/40 p-8 shadow-lg">
            <Link
              to="/"
              className="inline-flex items-center gap-3 font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent hover:from-cyan-500 hover:to-purple-500 transition-all"
            >
              <Logo />
              Team Verge
            </Link>
            <div className="mt-6 space-y-3">
              <h2 className="font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                Welcome to TeamSync
              </h2>
              <p className="text-violet-500/70">
                Collaborate seamlessly with your team on projects and tasks in a modern workspace environment.
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Invitation card */}
        <div className="transform rotate-2">
          <Card className="border-purple-200/50 shadow-2xl bg-gradient-to-bl from-white via-cyan-50/30 to-purple-50/30 rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400"></div>
            <CardHeader className="text-center space-y-6 pb-6 pt-8">
              <div className="mx-auto p-4 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full shadow-lg">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-2">
                <CardTitle className="font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                  You're Invited!
                </CardTitle>
                <CardDescription className="text-violet-500/70 leading-relaxed">
                  Your invitation to join <span className="font-semibold">Team Verge</span> is waiting! <br />
                  Join a TeamSync workspace and start collaborating with your team.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="pt-0 pb-8">
              {isPending ? (
                <div className="flex items-center justify-center py-8">
                  <Loader className="w-8 h-8 animate-spin text-purple-500" />
                </div>
              ) : (
                <div className="space-y-6">
                  {user ? (
                    <div className="space-y-6">
                      <div className="p-4 bg-gradient-to-br from-cyan-100/50 to-purple-100/50 rounded-xl border border-purple-200/50">
                        <p className="text-violet-600 text-center">
                          Welcome back, <span className="font-semibold">{user.name}</span>!
                        </p>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          {isLoading && <Loader className="w-5 h-5 animate-spin mr-2" />}
                          Join Workspace
                        </Button>
                      </form>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <p className="text-violet-500/70 text-center text-sm">
                        Please sign in to your account to join this workspace.
                      </p>
                      <div className="space-y-3">
                        <Link to={`/sign-up?returnUrl=${returnUrl}`} className="w-full block">
                          <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
                            Sign Up
                          </Button>
                        </Link>
                        <Link to={`/?returnUrl=${returnUrl}`} className="w-full block">
                          <Button
                            variant="outline"
                            className="w-full border-purple-200 hover:bg-purple-50 font-semibold rounded-xl transition-colors duration-200"
                          >
                            Sign In
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default InviteUser
