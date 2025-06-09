"use client"

import { Plus, LayoutDashboard } from "lucide-react"

import { Button } from "@/components/ui/button"
import useCreateProjectDialog from "@/hooks/use-create-project-dialog"
import WorkspaceAnalytics from "@/components/workspace/workspace-analytics"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RecentProjects from "@/components/workspace/project/recent-projects"
import RecentTasks from "@/components/workspace/task/recent-tasks"
import RecentMembers from "@/components/workspace/member/recent-members"

const WorkspaceDashboard = () => {
  const { onOpen } = useCreateProjectDialog()

  return (
    <div className="min-h-screen bg-gradient-to-tr from-cyan-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Asymmetric layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left sidebar - Header */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-gradient-to-br from-white/90 to-purple-50/70 backdrop-blur-sm rounded-2xl border border-purple-200/40 p-6 shadow-lg transform -rotate-2">
                <div className="text-center space-y-4">
                  <div className="inline-flex p-4 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full shadow-md">
                    <LayoutDashboard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                      Workspace Overview
                    </h1>
                    <p className="text-violet-500/70 text-sm mt-2">Monitor your team's progress</p>
                  </div>
                  <Button
                    onClick={onOpen}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Project
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right content area */}
          <div className="lg:col-span-3 space-y-8">
            {/* Analytics Section */}
            <div className="bg-gradient-to-bl from-white/80 to-cyan-50/60 backdrop-blur-sm rounded-2xl border border-cyan-200/30 p-6 shadow-lg transform rotate-1">
              <WorkspaceAnalytics />
            </div>

            {/* Tabs Section with vertical orientation */}
            <div className="bg-gradient-to-br from-white/90 to-purple-50/70 backdrop-blur-sm rounded-2xl border border-purple-200/30 shadow-lg overflow-hidden">
              <Tabs defaultValue="projects" className="w-full" orientation="vertical">
                <div className="flex">
                  {/* Vertical tab list */}
                  <div className="w-48 bg-gradient-to-b from-cyan-50/50 to-purple-50/50 border-r border-purple-200/40">
                    <TabsList className="flex flex-col h-full w-full bg-transparent border-0 p-2 space-y-2">
                      <TabsTrigger
                        className="w-full justify-start data-[state=active]:bg-gradient-to-r data-[state=active]:from-white data-[state=active]:to-purple-50 data-[state=active]:border-r-4 data-[state=active]:border-purple-500 data-[state=active]:shadow-sm rounded-lg px-4 py-3 font-medium"
                        value="projects"
                      >
                        Recent Projects
                      </TabsTrigger>
                      <TabsTrigger
                        className="w-full justify-start data-[state=active]:bg-gradient-to-r data-[state=active]:from-white data-[state=active]:to-purple-50 data-[state=active]:border-r-4 data-[state=active]:border-purple-500 data-[state=active]:shadow-sm rounded-lg px-4 py-3 font-medium"
                        value="tasks"
                      >
                        Recent Tasks
                      </TabsTrigger>
                      <TabsTrigger
                        className="w-full justify-start data-[state=active]:bg-gradient-to-r data-[state=active]:from-white data-[state=active]:to-purple-50 data-[state=active]:border-r-4 data-[state=active]:border-purple-500 data-[state=active]:shadow-sm rounded-lg px-4 py-3 font-medium"
                        value="members"
                      >
                        Recent Members
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  {/* Content area */}
                  <div className="flex-1 p-6">
                    <TabsContent value="projects" className="mt-0">
                      <RecentProjects />
                    </TabsContent>
                    <TabsContent value="tasks" className="mt-0">
                      <RecentTasks />
                    </TabsContent>
                    <TabsContent value="members" className="mt-0">
                      <RecentMembers />
                    </TabsContent>
                  </div>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkspaceDashboard
