import React from "react";
import { Outlet } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer";




const Layout = () => {

  return (
    <div className={`bg-gray-50`}>
    
      <Navbar/>
      <main className="container  min-h-screen">
      <Outlet/>
      </main>
      <Footer/>
      
    </div>
  )
}

export default Layout