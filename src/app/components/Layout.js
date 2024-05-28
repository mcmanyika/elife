import React from 'react'
import '../../app/globals.css'
import Link from "next/link";
import Header from './Header'
import Footer from './Footer'

function Layout({ loggedIn, login, logout, children }) {
  return (
    <>
      <Header loggedIn={loggedIn} login={login} logout={logout} />
      {children}
      
      <Footer />
    </>
  );
}

export default Layout;