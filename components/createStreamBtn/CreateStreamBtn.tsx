'use client'

import React, { startTransition } from 'react'
import { Button } from '../ui/button'
import { connectToDatabase } from '@/lib/database'
import { getLoginUser } from '@/lib/auth-service'
import { PlusCircle } from 'lucide-react'
import { Hint } from '../hint'
import { onCreateStream } from '@/actions/stream'
import { toast } from 'sonner'




const CreateStreamBtn = async () => {

    const handleStream = async () => {
        try {
            // Call onCreateStream
            const streamData = await onCreateStream();
            // Show success message if needed
            toast.success(`Stream created: ${streamData.name}`);
        } catch (error) {
            // Show error message if needed
            toast.error('Something went wrong');
            console.error('Error handling stream creation:', error);
        }
    };
    


  return (
    <Hint label='Create stream' asChild side='top' align='center'>

    <Button variant='ghost' onClick={handleStream}  >
        <PlusCircle className=' flex items-center w-5 h-7'  />
        </Button>
    </Hint>
  
  )
}

export default CreateStreamBtn