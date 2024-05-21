'use client'

import { Input } from "@/components/ui/input"
import CopyBtn from "./CopyBtn"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface KeyCardProps {
    value:string | null
}

const KeyCard = ({value}: KeyCardProps) => {

    const [show, setShow] = useState(false)

  return (
    <div className=' rounded-xl bg-muted p-6'>
        <div className='flex items-center gap-x-10'>
            <p className='font-semibold shrink-0'> Stream Key</p>
            <div className='space-y-2 w-full'>
                <div className='w-full flex items-center gap-x-2'>
                    <Input value={value || ''} disabled placeholder='Stream Key' type={show ? "text" : 'password'}/>
                    <CopyBtn value={value || ''}/>
                </div>
                <Button size='sm' variant='link' onClick={() => setShow(!show)}>
                    {show ? "Hide" : "Show"}
                </Button>
            </div>
        </div>
    </div>
  )
}

export default KeyCard