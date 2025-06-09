import CreateTaskDialog from "@/components/workspace/task/create-task-dialog"
import TaskTable from "@/components/workspace/task/task-table"
import { CheckSquare } from "lucide-react"

export default function Tasks() {
  return (
    <div className="min-h-screen bg-gradient-to-bl from-cyan-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Zigzag layout */}
        <div className="space-y-8">
          {/* Header Section - Right aligned */}
          <div className="flex justify-end">
            <div className="w-full max-w-2xl bg-gradient-to-bl from-white/90 to-purple-50/70 backdrop-blur-sm rounded-2xl border border-purple-200/40 p-6 shadow-lg transform rotate-2">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="p-4 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full shadow-md">
                  <CheckSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                    All Tasks
                  </h1>
                  <p className="text-violet-500/70 text-sm mt-1">Manage and track all workspace tasks</p>
                </div>
                <CreateTaskDialog />
              </div>
            </div>
          </div>

          {/* Tasks Table Section - Left aligned */}
          <div className="flex justify-start">
            <div className="w-full bg-gradient-to-br from-white/80 to-cyan-50/60 backdrop-blur-sm rounded-2xl border border-cyan-200/30 shadow-lg transform -rotate-1">
              <div className="p-6">
                <TaskTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
