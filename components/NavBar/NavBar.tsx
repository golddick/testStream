import React from 'react'
import NavLogo from './Logo'
import Search from './Search'
import Actions from './Actions'

const NavBar = () => {
  return (
    <div className='fixed top-0 w-full h-20 z-[45] bg-[#252731] px-2 lg:px-4 flex justify-between items-center shadow-sm'>
      <NavLogo/>
      <Search/>
      <Actions/>
    </div>
  )
}

export default NavBar