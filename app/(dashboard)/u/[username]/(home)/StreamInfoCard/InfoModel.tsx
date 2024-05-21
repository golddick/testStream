'use client '

import { updateStream } from "@/actions/stream"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

  import { Label } from "@/components/ui/label"
import { ElementRef, useRef, useState, useTransition } from "react"
import { toast } from "sonner"
import { UploadDropzone } from "@/lib/uploadthing"
import { useRouter } from "next/navigation"
import { Hint } from "@/components/hint"
import { Trash } from "lucide-react"
import Image from "next/image"


  

interface InfoModelProps {
    initialName:string
    initialThumbnailUrl:string | null
}

const InfoModel = ( {initialName,initialThumbnailUrl} : InfoModelProps) => {
    const closeRef = useRef<ElementRef<'button'>>(null  )
    const [isPending, startTransition] = useTransition()
    const [name, setName] = useState (initialName)
    const [thumbnailUrl, setThumbnailUrl] = useState (initialThumbnailUrl)
    const router = useRouter()
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }



    const onSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
    
        startTransition(() => {
            updateStream({ name: name })
                .then(() => {
                    toast.success('Stream updated');
                    closeRef?.current?.click(); 
                })
                .catch(() => toast.error('Something went wrong')); 
        });
    }
    const onDeleteThumbnail = () => {

    
        startTransition(() => {
            updateStream({ thumbnailUrl: '' })
                .then(() => {
                    toast.success('thumbnailUrl deleted');
                    closeRef?.current?.click(); 
                })
                .catch(() => toast.error('Something went wrong deleting thumbnail')); 
        });
    }
  return (
   <Dialog>
  <DialogTrigger asChild>
    <Button className="mml-auto" size='sm' variant='link'>
        Edit
    </Button>
    </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Stream Info</DialogTitle>
    </DialogHeader>
    <form  className="space-y-14" onSubmit={onSubmit}>
        <div className="space-y-2">
            <Label>
                Name
            </Label>
            <Input
            placeholder="Stream Name"
            onChange={onChange}
            value={name}
            disabled={isPending}
            />
        </div>
        <div className="space-y-2">
          <Label>
            Thumbnail
          </Label>
      {
        thumbnailUrl ? (

          <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
              <div className="absolute top-2 right-2 z-[10]">
                <Hint label="Remove Thumbnail" asChild side="left">
                  <Button 
                  type="button"
                  disabled={isPending}
                  onClick={onDeleteThumbnail}
                  className="h-auto w-auto p-1"
                  >
                    <Trash className="h-4 w-4"/>
                  </Button>
                </Hint>
              </div>
              <Image
              src={thumbnailUrl}
              alt="Thumbnail"
              fill
              className="object-cover"
              />
          </div>
        ): (

          <div className="rounded-xl border outline-dashed outline-muted">
          <UploadDropzone
          endpoint="thumbnailUploader"
          appearance={{
            label:{color:'#FFFFFF'},
            allowedContent:{color:'#FFFFFF'}
          }}
          onClientUploadComplete={(res) => {
            // Do something with the response
            setThumbnailUrl(res?.[0]?.url)
            console.log("Files: ", res);
            alert("Upload Completed");
            router.refresh();
            closeRef.current?.click()
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
  
            </div>
        )
      }
        

        </div>
        <div className="flex justify-between">
            <DialogClose asChild ref={closeRef}>
                <Button type="button" variant='ghost'>
                    Cancel
                </Button>
            </DialogClose>
            <Button type="submit" variant='primary' disabled={isPending}>
                Submit
            </Button>
        </div>
    </form>
  </DialogContent>
</Dialog>

  )
}

export default InfoModel