import React from 'react'
import NavLogo from './Logo'
import Actions from './Actions'
import { getLoginUser } from '@/lib/auth-service'
import { getUserByUsername } from '@/lib/user.service'

const NavBar = async() => {

  const loggedInUser = await getLoginUser()
  console.log(loggedInUser.username)
  const loggedInByUsername = await getUserByUsername(loggedInUser.username)
  console.log('us', loggedInByUsername.streamData[0].isLive)
  return (
    <div className='fixed top-0 w-full h-20 z-[45] bg-[#252731] px-2 lg:px-4 flex justify-between items-center shadow-sm'>
      <NavLogo/>
      <div>
        <p>is  {loggedInByUsername.streamData[0].isLive.toString()}</p>
      </div>
      <Actions/>
    </div>
  )
}

export default NavBar