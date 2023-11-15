import React from 'react'
import { Outlet } from 'react-router-dom'
import Map from '../Map/Map'

function AppLayout() {
  return (
    <div className='AppLayout'>
      <div className='sidebar'>
        <Outlet />
      </div>
      <Map />
    </div>
  )
}

export default AppLayout