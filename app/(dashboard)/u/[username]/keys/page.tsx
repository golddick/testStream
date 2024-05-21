
import React from 'react'
import UrlCard from './_component/UrlCard'
import { getLoginUser } from '@/lib/auth-service';
import { getStreamByUserId } from '@/lib/stream-servic';
import KeyCard from './_component/KeyCard';
import ConnectModal from './_component/ConnectModal';

const KeyPage = async () => {

  const loggedInUser = await getLoginUser();
  const stream = await getStreamByUserId(loggedInUser._id)
  console.log('logged in info', loggedInUser)
  console.log('stream info', stream)

  if (!stream) {
    throw new Error("stream not found here at keys");
    
  }

  return (
    <div className='p-6'>
        <div className='flex items-center justify-between mb-4'>
            <h1 className='text-2xl font-bold'>Keys & URLs</h1>
            <ConnectModal/>
        </div>
        <div className='space-y-4'>
          <UrlCard value={stream.serverUrl}/>
          <KeyCard value={stream.streamKey}/>
        </div>
    </div>
  )
}

export default KeyPage


