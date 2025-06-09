import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuthContext } from "@/context/auth-provider"
import { Loader } from "lucide-react"

const WorkspaceHeader = () => {
  const { workspaceLoading, workspace } = useAuthContext()
  return (
    <div className="w-full max-w-3xl mx-auto pb-6">
      {workspaceLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader className="w-8 h-8 animate-spin text-slate-400" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center gap-5">
            <Avatar className="size-16 rounded-2xl font-bold shadow-sm ring-1 ring-slate-200/50">
              <AvatarFallback className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white text-2xl font-semibold">
                {workspace?.name?.split(" ")?.[0]?.charAt(0) || "W"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{workspace?.name}</h1>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Free Plan
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WorkspaceHeader
