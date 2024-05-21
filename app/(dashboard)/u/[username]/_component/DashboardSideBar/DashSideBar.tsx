import React from 'react'
import { CreatorWrapper } from './wrapper'
import CreatorToggle from './Toggle'
import DashboardNavigation from './Navigation'

const DashSideBar = () => {
  return (
    <CreatorWrapper>
      <CreatorToggle/>
      <DashboardNavigation/>
    </CreatorWrapper>
  )
}

export default DashSideBar