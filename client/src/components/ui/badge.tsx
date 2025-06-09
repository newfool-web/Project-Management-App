import type React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

export enum TaskStatusEnum {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  DONE = "DONE",
}

export enum TaskPriorityEnum {
  HIGH = "HIGH",
  URGENT = "URGENT",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow hover:from-pink-600 hover:to-orange-600",
        secondary:
          "border-transparent bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-700 hover:to-gray-800",
        destructive:
          "border-transparent bg-gradient-to-r from-red-500 to-red-600 text-white shadow hover:from-red-600 hover:to-red-700",
        outline: "text-foreground border-gray-700",
        [TaskStatusEnum.BACKLOG]: "bg-gray-800 text-gray-300 border-gray-700",
        [TaskStatusEnum.TODO]: "bg-[#1A365D] text-[#63B3ED] border-[#2C5282]",
        [TaskStatusEnum.IN_PROGRESS]: "bg-yellow-900 text-yellow-300 border-yellow-800",
        [TaskStatusEnum.IN_REVIEW]: "bg-purple-900 text-purple-300 border-purple-800",
        [TaskStatusEnum.DONE]: "bg-green-900 text-green-300 border-green-800",
        [TaskPriorityEnum.HIGH]: "bg-orange-900 text-orange-300 border-orange-800",
        [TaskPriorityEnum.URGENT]: "bg-red-900 text-red-300 border-red-800",
        [TaskPriorityEnum.MEDIUM]: "bg-yellow-900 text-yellow-300 border-yellow-800",
        [TaskPriorityEnum.LOW]: "bg-gray-800 text-gray-300 border-gray-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, className }))} {...props} />
}

export { Badge, badgeVariants }
