// import CreateStreamBtn from '@/components/createStreamBtn/CreateStreamBtn'
import { getLoginUser } from '@/lib/auth-service'
import { getStreamByUserId } from '@/lib/stream-servic'
import React from 'react'
import ToggleCard from './_component/ToggleCard'


interface ChatProps{
    _id:string

}

const page = async ({_id}: ChatProps) => {

    const loggedInUser = await getLoginUser()
    const stream = await getStreamByUserId(loggedInUser._id)

    console.log('chat', loggedInUser)
    console.log('chat stream', stream)

    if (!stream) {
        throw new Error("Stream not found");
        
    }

  return (
    <div className='p-6'>
         <div className='mb-4 flex justify-between '>
            <h1 className='text-2xl font-bold'>Chat Settings</h1>
         </div>

         <div className='space-y-4'>
            <ToggleCard
            field="isChatEnabled"
            label="Enable chat for Your stream?"
            value= {stream.isChatEnabled}
            />
            <ToggleCard
            field="isChatDelayed"
            label="Delay Chat?"
            value= {stream.isChatDelayed}
            />
            <ToggleCard
            field="isChatFollowersOnly"
            label="Must follow user To chat!"
            value= {stream.isChatFollowersOnly}
            />
         </div>
    </div>
  )
}

export default page