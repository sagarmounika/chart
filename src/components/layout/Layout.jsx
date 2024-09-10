import React from "react"
import {Outlet} from "react-router-dom"


export default function Layout() {
  return (
    <>
      
      <div width="100%" height="100%" style={{width: "100%", height: "100%"}}>
        <Outlet />
      </div>
    </>
  )
}
