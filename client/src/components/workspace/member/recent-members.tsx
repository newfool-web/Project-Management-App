import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useGetWorkspaceMembers from "@/hooks/api/use-get-workspace-members"
import useWorkspaceId from "@/hooks/use-workspace-id"
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper"
import { format } from "date-fns"
import { Loader, Users } from "lucide-react"

const RecentMembers = () => {
  const workspaceId = useWorkspaceId()
  const { data, isPending } = useGetWorkspaceMembers(workspaceId)

  const members = data?.members || []

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-slate-100 rounded-lg">
          <Users className="w-4 h-4 text-slate-600" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Recent Members</h3>
      </div>

      {isPending ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="w-8 h-8 animate-spin text-slate-400" />
        </div>
      ) : (
        <div className="space-y-3">
          {members.map((member, index) => {
            const name = member?.userId?.name || ""
            const initials = getAvatarFallbackText(name)
            const avatarColor = getAvatarColor(name)
            return (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl border border-slate-200/60 bg-white hover:bg-slate-50/50 transition-colors duration-200"
              >
                <Avatar className="h-10 w-10 ring-2 ring-slate-100">
                  <AvatarImage src={member.userId.profilePicture || ""} alt="Avatar" />
                  <AvatarFallback className={`${avatarColor} font-medium`}>{initials}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{member.userId.name}</p>
                  <p className="text-sm text-slate-500 capitalize">{member.role.name.toLowerCase()}</p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-slate-400 font-medium">Joined</p>
                  <p className="text-xs text-slate-600">{member.joinedAt ? format(member.joinedAt, "MMM dd") : null}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default RecentMembers
