'use client'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ElementRef, useRef, useState, useTransition } from "react"
import { toast } from "sonner"
import { updateBioUser } from "@/actions/user"

  

interface BioModalProps{
    initialValue:string | null
}

const BioModal = ({initialValue}:BioModalProps) => {
    const  [isPending, startTransition] = useTransition();

    const closeRef = useRef<ElementRef<'button'>>(null)

    const [value, setValue] = useState (initialValue || '')

    const onSubmit = (e:  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        startTransition(() => {
            updateBioUser({bio: value })
            .then(() => { toast.success("e dn happen well ")
            closeRef.current?.click();
        })
            .catch(() => {toast.error ('something bad happen ')})
        })
    }


  return (
    <div>
        <Dialog>
  <DialogTrigger asChild>
    <Button variant='link' size='sm'  className="ml-auto">
        Edit
    </Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit user Bio</DialogTitle>
    </DialogHeader>
    <form onSubmit={onSubmit} className="space-y-4"> 

      <Textarea 
      placeholder="Add bio"
      onChange={(e) => setValue(e.target.value)}
      value={value}
      disabled={isPending}
      />

      <div className="flex justify-between">
        <DialogClose ref={closeRef} asChild>
            <Button type="button" variant="ghost">
                Cancel
            </Button>
        </DialogClose>

        <Button 
        disabled={isPending}
        type="submit"
        variant='primary'
        >
            Save
        </Button>

      </div>
    </form>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default BioModal