// import { auth, currentUser } from '@clerk/nextjs/server'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {  LogOut } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'

const Actions =  async() => {

    // Retrieve the user object
    // const user = await currentUser();

    // Access the username property if the user object exists
    // const username = user?.username;

    // console.log('username:', username);


  return (
        <div className='flex items-center justify-end gap-x-2'>
            <Button size='sm' variant='ghost' className='text-muted-foreground hover:text-primary' asChild>
                <Link href='/'>
                <LogOut className='h-5 w-5 '/>
                </Link>
            </Button>

            <UserButton
            afterSignOutUrl='/'
            />
        </div>
  )
}

export default Actions