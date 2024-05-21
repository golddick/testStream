
import React, { Suspense } from 'react'
import { getLoginUser } from "@/lib/auth-service";
import CreateStreamBtn from '@/components/createStreamBtn/CreateStreamBtn';
import StreamResult, { StreamResultSkeleton } from './_component/StreamResult';
const Home =  async () => {
  const loggedInUser = await getLoginUser()

  const streamData = loggedInUser?.streamData


  console.log(loggedInUser)


  return (
    <main className='h-full p-8 max-w-screen-2xl mx-auto'>
      <Suspense fallback={<StreamResultSkeleton/>}>

     <StreamResult/>
      </Suspense>
      </main>
  )
}

export default Home
