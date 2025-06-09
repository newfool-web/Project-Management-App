"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "../../ui/textarea"
import EmojiPickerComponent from "@/components/emoji-picker"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useWorkspaceId from "@/hooks/use-workspace-id"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createProjectMutationFn } from "@/lib/api"
import { toast } from "@/hooks/use-toast"
import { Loader, Plus } from "lucide-react"

export default function CreateProjectForm({
  onClose,
}: {
  onClose: () => void
}) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const workspaceId = useWorkspaceId()

  const [emoji, setEmoji] = useState("📊")

  const { mutate, isPending } = useMutation({
    mutationFn: createProjectMutationFn,
  })

  const formSchema = z.object({
    name: z.string().trim().min(1, {
      message: "Project title is required",
    }),
    description: z.string().trim(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  const handleEmojiSelection = (emoji: string) => {
    setEmoji(emoji)
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isPending) return
    const payload = {
      workspaceId,
      data: {
        emoji,
        ...values,
      },
    }
    mutate(payload, {
      onSuccess: (data) => {
        const project = data.project
        queryClient.invalidateQueries({
          queryKey: ["allprojects", workspaceId],
        })

        toast({
          title: "Success",
          description: "Project created successfully",
          variant: "success",
        })

        navigate(`/workspace/${workspaceId}/project/${project._id}`)
        setTimeout(() => onClose(), 500)
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      },
    })
  }

  return (
    <div className="w-full h-auto max-w-full">
      <div className="h-full">
        <div className="mb-6 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Plus className="w-4 h-4 text-emerald-600" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Create New Project</h1>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            Organize and manage tasks, resources, and team collaboration
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Project Icon</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="size-16 p-0 border-2 border-slate-200 hover:border-slate-300 rounded-2xl transition-colors duration-200"
                  >
                    <span className="text-3xl">{emoji}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0 border-slate-200">
                  <EmojiPickerComponent onSelectEmoji={handleEmojiSelection} />
                </PopoverContent>
              </Popover>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-slate-700">Project Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Website Redesign"
                      className="h-12 border-slate-200 focus:border-slate-400 bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-slate-700">
                    Project Description
                    <span className="text-xs font-normal text-slate-500 ml-2">Optional</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Describe your project goals and objectives"
                      className="border-slate-200 focus:border-slate-400 bg-white resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-4">
              <Button
                disabled={isPending}
                className="bg-slate-900 hover:bg-slate-800 text-white px-6 h-11 font-semibold transition-colors duration-200"
                type="submit"
              >
                {isPending && <Loader className="animate-spin mr-2 w-4 h-4" />}
                Create Project
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
