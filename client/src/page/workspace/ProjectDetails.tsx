import ProjectAnalytics from "@/components/workspace/project/project-analytics"
import ProjectHeader from "@/components/workspace/project/project-header"
import TaskTable from "@/components/workspace/task/task-table"

const ProjectDetails = () => {
  return (
    <div className="min-h-screen bg-slate-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <ProjectHeader />

          <div className="space-y-8">
            <ProjectAnalytics />

            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Project Tasks</h3>
                    <p className="text-sm text-slate-600">Manage and track all project tasks</p>
                  </div>
                </div>
                <TaskTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails
