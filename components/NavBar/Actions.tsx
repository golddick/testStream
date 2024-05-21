import { SignInButton, UserButton } from '@clerk/nextjs'
import { auth, currentUser } from '@clerk/nextjs/server'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Clapperboard } from 'lucide-react'
import { getLoginUser } from '@/lib/auth-service'
import CreateStreamBtn from '../createStreamBtn/CreateStreamBtn'



const Actions =  async() => {

    const loggedInUser = await getLoginUser()
    // Retrieve the user object
    const user = await currentUser();

    // Access the username property if the user object exists
    const username = user?.username;

    console.log('username:', loggedInUser);

    const streamData = loggedInUser?.streamData[0]

    const hasStreamData = !!streamData 

    const hasStreamAndUser = hasStreamData && loggedInUser

    const streamAndUser = !!hasStreamAndUser
    console.log(hasStreamData)
    console.log(streamAndUser)


  return (
    <div className='flex items-center justify-end gap-x-2 ml-4 lg: ml-0'>
            {
                !user && (
                    <SignInButton>
                        <Button variant='primary' size='sm'>
                            Sign-In
                        </Button>
                    </SignInButton>

                )
            }
            {
                user && (
                    <div className='flex'>
                   {
                    streamAndUser && ( 
                        <Button 
                        size='sm'
                        variant='ghost'
                        className='text-muted-foreground hover:text-primary'
                        asChild
                        >
                            <Link href={`/u/${user?.username}`}>
                            <Clapperboard className='h-5 w-5 lg:mr-2'/>
                            <span className='hidden lg:block'>Dashboard</span>
                            </Link>
                        </Button>
                     )
                   } 
                        <UserButton
                        afterSignOutUrl='/'
                        />


            {
                
                !hasStreamData &&(
                    <div  >
                        <CreateStreamBtn />
                    </div>
                )
            }
                    </div>
                )
            }
        
            
    </div>
  )
}

export default Actions