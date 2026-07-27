import React from 'react'
import { Outlet } from 'react-router'

const AppLayout = () => {
  return (
    <div>
      <h1>Nav Bar</h1>
      <Outlet />
    </div>
  )
}

export default AppLayout