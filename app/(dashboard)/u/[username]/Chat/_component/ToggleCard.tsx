'use client'

import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { useTransition } from "react"
import { updateStream  } from "@/actions/stream"
import { Skeleton } from "@/components/ui/skeleton"

type FieldTypes = 'isChatEnabled' | 'isChatDelayed' | 'isChatFollowersOnly'

interface ToggleCardProps {
  label: string
  value: boolean
  field: FieldTypes
}

const ToggleCard = ({field, label, value = false}: ToggleCardProps) => {

  const [isPending, startTransition] = useTransition()

  const onChange = () => {
 startTransition(() => {
  const updatedValue = !value; 
  updateStream({[field]: updatedValue})
  .then(() => toast.success("chat settings updated"))
  .catch(() => toast.error("something went wrong with the updated"))
 })
  }

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
        <Switch checked={value } onCheckedChange={onChange} disabled={isPending}>
          {value? "On" : 'Off'}
        </Switch>
      </div>
      </div>
     
    </div>
  )
}

export default ToggleCard


export const ToggleCardSkeleton = () => {

  return(
    <Skeleton className="rounded-xl p-10 w-full"/>
  )
}