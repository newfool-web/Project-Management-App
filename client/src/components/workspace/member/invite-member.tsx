"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthContext } from "@/context/auth-provider"
import { toast } from "@/hooks/use-toast"
import { CheckIcon, CopyIcon, Loader, UserPlus, Link2 } from "lucide-react"
import { BASE_ROUTE } from "@/routes/common/routePaths"
import PermissionsGuard from "@/components/resuable/permission-guard"
import { Permissions } from "@/constant"

const InviteMember = () => {
  const { workspace, workspaceLoading } = useAuthContext()
  const [copied, setCopied] = useState(false)

  const inviteUrl = workspace
    ? `${window.location.origin}${BASE_ROUTE.INVITE_URL.replace(":inviteCode", workspace.inviteCode)}`
    : ""

  const handleCopy = () => {
    if (inviteUrl) {
      navigator.clipboard.writeText(inviteUrl).then(() => {
        setCopied(true)
        toast({
          title: "Copied",
          description: "Invite url copied to clipboard",
          variant: "success",
        })
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <UserPlus className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Invite Team Members</h3>
          <p className="text-sm text-slate-500 mt-1">Share your workspace with colleagues and collaborators</p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/60">
        <p className="text-sm text-slate-600 leading-relaxed">
          Anyone with an invite link can join this free Workspace. You can also disable and create a new invite link for
          this Workspace at any time.
        </p>
      </div>

      <PermissionsGuard showMessage requiredPermission={Permissions.ADD_MEMBER}>
        {workspaceLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader className="w-8 h-8 animate-spin text-slate-400" />
          </div>
        ) : (
          <div className="space-y-3">
            <Label htmlFor="link" className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Link2 className="w-4 h-4" />
              Invite Link
            </Label>
            <div className="flex gap-3">
              <Input
                id="link"
                disabled={true}
                className="disabled:opacity-100 disabled:pointer-events-none bg-white border-slate-200 text-slate-700 font-mono text-sm"
                value={inviteUrl}
                readOnly
              />
              <Button
                disabled={false}
                className="shrink-0 bg-slate-900 hover:bg-slate-800 text-white px-4 transition-colors duration-200"
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-4 h-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <CopyIcon className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </PermissionsGuard>
    </div>
  )
}

export default InviteMember
