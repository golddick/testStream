'use client'

import { useParticipants } from "@livekit/components-react"
import { useMemo, useState } from "react"
import { useDebounceValue } from "usehooks-ts"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import CommunityItem from "./CommunityItem"
import { LocalParticipant, RemoteParticipant } from "livekit-client"


interface ChatCommunityProps {
    viwerName:string
    hostName:string
    isHidden:boolean
}

const ChatCommunity = ({viwerName,hostName,isHidden}:ChatCommunityProps) => {

const [value, setValue] = useState('')
const debounceValue = useDebounceValue<string>(value, 500)

const participants = useParticipants()

const onChange = (newValue: string) => {
    setValue(newValue)
}
// console.log(isHidden)

const filteredParticipants = useMemo (() => {
    const deduped = participants.reduce((acc, participant) => {
        const hostAsViewer = `host-${participant.identity}`;
        if (!acc.some((p) => p.identity === hostAsViewer)) {
            acc.push(participant)
        }
        return acc;
    }, [] as (RemoteParticipant | LocalParticipant)[])

    return deduped.filter((participant) => {
        return participant.name?.toLowerCase().includes(debounceValue[0].toLowerCase())
    })

}, [participants,debounceValue])

if (!isHidden) {
    return(
        <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-muted-foreground">
                Community is disabled
            </p>
        </div>
    )
}

  return (
    <>
   
    <div className="p-4">
        <Input
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search community"
        className="border-white/10"
        />

        <ScrollArea className="gap-y-2 mt-4">
            <p className="text-center text-sm text-muted-foreground hidden last:block p-2"> No Result</p>
            {filteredParticipants.map((participant) => (
                <CommunityItem
                key={participant.identity}
                hostName={hostName}
                viewerName={viwerName}
                participantName={participant.name}
                participantId={participant.identity}
                />
            ))}

        </ScrollArea>
    </div>
  </>
  )
}

export default ChatCommunity