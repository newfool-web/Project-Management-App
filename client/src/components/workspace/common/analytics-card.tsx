import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, TrendingUp, TrendingDown, Loader } from "lucide-react"

const AnalyticsCard = (props: {
  title: string
  value: number
  isLoading: boolean
}) => {
  const { title, value, isLoading } = props

  const getArrowIcon = () => {
    if (title === "Overdue Task") {
      return value > 0 ? (
        <TrendingDown className="h-4 w-4 text-red-500" />
      ) : (
        <TrendingUp className="h-4 w-4 text-emerald-500" />
      )
    }
    if (title === "Completed Task" || title === "Total Task") {
      return value > 0 ? (
        <TrendingUp className="h-4 w-4 text-emerald-500" />
      ) : (
        <TrendingDown className="h-4 w-4 text-red-500" />
      )
    }
    return null
  }

  return (
    <Card className="border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-200 bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center gap-2">
          <CardTitle className="text-sm font-semibold text-slate-700">{title}</CardTitle>
          {getArrowIcon()}
        </div>
        <div className="p-2 bg-slate-50 rounded-lg">
          <Activity className="h-4 w-4 text-slate-500" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-3xl font-bold text-slate-900 tracking-tight">
          {isLoading ? <Loader className="w-6 h-6 animate-spin text-slate-400" /> : value}
        </div>
      </CardContent>
    </Card>
  )
}

export default AnalyticsCard
