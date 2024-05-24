import React from 'react'
import { BsFacebook } from "react-icons/bs";
import Link from "next/link";

export default function Header() {
  return (
    <div>
        <header className="w-full bg-gray-200 fixed top-0 z-10">
          <nav className="flex items-center justify-between max-w-5xl mx-auto  h-20">
            <div className="text-xl font-bold">XTRAINCOME</div>
            <ul className="flex space-x-4">
            <li>
                <Link href="/about">
                About
                </Link>
              </li>
              
              <li>
                <Link href="/contact">
                Contact
                </Link>
              </li>
              <li>
                <a href="https://www.facebook.com/groups/1435433233769041/" target="_blank" rel="noopener noreferrer">
                    <BsFacebook size={30} className="text-gray-400 mx-2" aria-label="Facebook" />
                </a>
              </li>
            </ul>
          </nav>
        </header>
    </div>
  )
}
