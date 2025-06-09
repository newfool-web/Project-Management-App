"use client"

import { Edit3 } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import EditProjectForm from "./edit-project-form"
import type { ProjectType } from "@/types/api.type"
import { useState } from "react"

const EditProjectDialog = (props: { project?: ProjectType }) => {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => {
    setIsOpen(false)
  }
  return (
    <div>
      <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="mt-1.5" asChild>
          <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200 text-slate-600 hover:text-slate-900">
            <Edit3 className="w-4 h-4" />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg border-0 shadow-xl">
          <EditProjectForm project={props.project} onClose={onClose} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EditProjectDialog
