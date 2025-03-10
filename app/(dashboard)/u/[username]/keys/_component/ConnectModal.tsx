'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
  } from "@/components/ui/dialog"
  
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { IngressInput } from "livekit-server-sdk"
import { AlertTriangle } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { ElementRef, useRef, useState, useTransition } from "react"
import { createIngress } from "@/actions/ingress"
import { toast } from "sonner"
  
const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

const ConnectModal = () => {
    const closeRef = useRef <ElementRef<'button'>>(null)
    const [isPending, startTransition] = useTransition()
    const [ingressType, setIngressType] = useState<IngressType>(RTMP)


    const onSubmit = () => {
        startTransition (() => {
            createIngress(parseInt(ingressType))
            .then(() => {toast.success('Ingress Created');
            closeRef?.current?.click()
        })
            .catch(() => toast.error('something went wrong in creating ingress'))
        })
    }

  return ( 
<Dialog>
    <DialogTrigger asChild>
        <Button variant='primary'>
            Generate Connection
        </Button>
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
        <DialogTitle>Generate connections</DialogTitle>
        {/* <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
        </DialogDescription> */}
        </DialogHeader>
        <Select value={ingressType} onValueChange={(value) => setIngressType(value)} disabled={isPending}>
        <SelectTrigger className="w-full">
            <SelectValue placeholder="Ingress Type" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value={RTMP}>RTMP</SelectItem>
            <SelectItem value={WHIP}>WHIP</SelectItem>
        </SelectContent>
        </Select>

        <Alert>
            <AlertTriangle className="h-4 w-4"/>
            <AlertTitle>Warning!!</AlertTitle>
            <AlertDescription>This action will reset all active streams using the current connection</AlertDescription>
        </Alert>
        <div className="flex justify-between">
            <DialogClose>
                <Button variant='ghost' ref={closeRef} asChild>
                    Cancel
                </Button>
            </DialogClose>
            <Button onClick={onSubmit} variant='primary' disabled={isPending}>
                Generate
            </Button>
        </div>
    </DialogContent>
</Dialog>

  )
}

export default ConnectModal