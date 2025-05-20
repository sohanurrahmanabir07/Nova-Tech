import React from 'react'
import { Navbar } from './Navbar/Navbar'
import { Outlet } from 'react-router-dom'

export const Root = () => {
  return (
    <div>

        <Navbar></Navbar>
        <Outlet></Outlet>



    </div>
  )
}
