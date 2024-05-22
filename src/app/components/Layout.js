import React from 'react'
import '../../app/globals.css'

import Link from "next/link";
import Header from './Header'
import Footer from './Footer'

function Layout(props) {
  
  return (
        <>
            <Header />
            {props.children}
            <Footer />
        </>
       
  )
}

export default Layout