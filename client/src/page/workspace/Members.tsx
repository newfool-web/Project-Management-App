import { Separator } from "@/components/ui/separator"
import InviteMember from "@/components/workspace/member/invite-member"
import AllMembers from "@/components/workspace/member/all-members"
import WorkspaceHeader from "@/components/workspace/common/workspace-header"
import { Users } from "lucide-react"

export default function Members() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-cyan-50 via-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stepped layout */}
        <div className="space-y-8">
          {/* Header */}
          <div className="transform -rotate-1">
            <div className="bg-gradient-to-r from-white/90 to-purple-50/70 backdrop-blur-sm rounded-2xl border border-purple-200/40 p-6 shadow-lg">
              <WorkspaceHeader />
            </div>
          </div>

          {/* Two column layout with offset */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left column - Members header and invite */}
            <div className="space-y-6 transform rotate-1">
              <div className="bg-gradient-to-br from-white/80 to-cyan-50/60 backdrop-blur-sm rounded-2xl border border-cyan-200/30 shadow-lg">
                <div className="p-6 text-center space-y-4">
                  <div className="inline-flex p-4 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full shadow-md">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                      Workspace Members
                    </h2>
                    <p className="text-violet-500/70 text-sm mt-1">Manage team access and collaboration</p>
                  </div>
                </div>
                <Separator className="bg-cyan-200/60" />
                <div className="p-6">
                  <InviteMember />
                </div>
              </div>
            </div>

            {/* Right column - All members */}
            <div className="transform -rotate-1 lg:mt-12">
              <div className="bg-gradient-to-bl from-white/90 to-purple-50/70 backdrop-blur-sm rounded-2xl border border-purple-200/30 shadow-lg">
                <div className="p-6">
                  <AllMembers />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
