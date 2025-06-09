import WorkspaceHeader from "@/components/workspace/common/workspace-header"
import EditWorkspaceForm from "@/components/workspace/edit-workspace-form"
import DeleteWorkspaceCard from "@/components/workspace/settings/delete-workspace-card"
import { Permissions } from "@/constant"
import withPermission from "@/hoc/with-permission"
import { SettingsIcon } from "lucide-react"
import { memo } from "react"

const Settings = memo(() => {
  return (
    <div className="min-h-screen bg-gradient-to-bl from-cyan-50 via-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Header section */}
          <div className="lg:col-span-3">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-purple-200/40 p-6 shadow-lg">
              <WorkspaceHeader />
            </div>
          </div>

          {/* Settings icon and title */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-cyan-200/30 p-6 shadow-lg text-center space-y-4">
                <div className="inline-flex p-4 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-full shadow-md">
                  <SettingsIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-cyan-700 tracking-tight">
                    Workspace Settings
                  </h2>
                  <p className="text-violet-500/70 text-sm mt-2">Configure your workspace</p>
                </div>
              </div>
            </div>
          </div>

          {/* Settings content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-purple-200/30 shadow-lg">
              <div className="p-6">
                <EditWorkspaceForm />
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-cyan-200/30 shadow-lg">
              <div className="p-6">
                <DeleteWorkspaceCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

Settings.displayName = "Settings"

const SettingsWithPermission = withPermission(Settings, Permissions.MANAGE_WORKSPACE_SETTINGS)

export default SettingsWithPermission
