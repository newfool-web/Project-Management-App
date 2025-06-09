"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom"
import CreateTaskDialog from "../task/create-task-dialog"
import EditProjectDialog from "./edit-project-dialog"
import useWorkspaceId from "@/hooks/use-workspace-id"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getProjectByIdQueryFn } from "@/lib/api"
import PermissionsGuard from "@/components/resuable/permission-guard"
import { Permissions } from "@/constant"
import { FolderOpen } from "lucide-react"

const ProjectHeader = () => {
  const param = useParams()
  const projectId = param.projectId as string

  const workspaceId = useWorkspaceId()

  const { data, isPending, isError } = useQuery({
    queryKey: ["singleProject", projectId],
    queryFn: () =>
      getProjectByIdQueryFn({
        workspaceId,
        projectId,
      }),
    staleTime: Number.POSITIVE_INFINITY,
    enabled: !!projectId,
    placeholderData: keepPreviousData,
  })

  const project = data?.project

  // Fallback if no project data is found
  const projectEmoji = project?.emoji || "📊"
  const projectName = project?.name || "Untitled project"

  const renderContent = () => {
    if (isPending)
      return (
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-purple-100 rounded-full animate-pulse" />
          <div className="h-4 w-24 bg-gradient-to-r from-cyan-100 to-purple-100 rounded animate-pulse" />
        </div>
      )
    if (isError)
      return (
        <div className="flex flex-col items-center gap-2 text-red-600">
          <FolderOpen className="w-6 h-6" />
          <span className="text-sm">Error loading project</span>
        </div>
      )
    return (
      <div className="flex flex-col items-center text-center gap-3">
        <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 via-blue-400 to-purple-500 rounded-full flex items-center justify-center text-3xl shadow-lg border-4 border-white/50">
          {projectEmoji}
        </div>
        <div>
          <h1 className="font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
            {projectName}
          </h1>
          {project?.description && <p className="text-violet-500/70 text-sm mt-1">{project.description}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Curved background shape */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 via-blue-50 to-purple-100 transform -skew-y-1 rounded-3xl"></div>

      <div className="relative bg-gradient-to-br from-white/90 to-purple-50/80 backdrop-blur-sm border border-purple-200/40 rounded-3xl p-8 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 flex justify-center lg:justify-start">{renderContent()}</div>

          <div className="flex flex-col gap-3 items-center lg:items-end">
            <PermissionsGuard requiredPermission={Permissions.EDIT_PROJECT}>
              <EditProjectDialog project={project} />
            </PermissionsGuard>
            <CreateTaskDialog projectId={projectId} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectHeader
