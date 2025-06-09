"use client"

import { useParams } from "react-router-dom"
import AnalyticsCard from "../common/analytics-card"
import useWorkspaceId from "@/hooks/use-workspace-id"
import { useQuery } from "@tanstack/react-query"
import { getProjectAnalyticsQueryFn } from "@/lib/api"
import { BarChart3 } from "lucide-react"

const ProjectAnalytics = () => {
  const param = useParams()
  const projectId = param.projectId as string

  const workspaceId = useWorkspaceId()

  const { data, isPending } = useQuery({
    queryKey: ["project-analytics", projectId],
    queryFn: () => getProjectAnalyticsQueryFn({ workspaceId, projectId }),
    staleTime: 0,
    enabled: !!projectId,
  })

  const analytics = data?.analytics

  return (
    <div className="space-y-6">
      {/* Vertical header layout */}
      <div className="text-center space-y-3">
        <div className="inline-flex p-4 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-full shadow-lg">
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="font-semibold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
            Project Analytics
          </h2>
          <p className="text-violet-500/60 text-sm">Track your project's progress and performance</p>
        </div>
      </div>

      {/* Staggered card layout */}
      <div className="space-y-4">
        <div className="transform rotate-1">
          <AnalyticsCard isLoading={isPending} title="Total Task" value={analytics?.totalTasks || 0} />
        </div>
        <div className="transform -rotate-1 ml-8">
          <AnalyticsCard isLoading={isPending} title="Overdue Task" value={analytics?.overdueTasks || 0} />
        </div>
        <div className="transform rotate-1 ml-4">
          <AnalyticsCard isLoading={isPending} title="Completed Task" value={analytics?.completedTasks || 0} />
        </div>
      </div>
    </div>
  )
}

export default ProjectAnalytics
