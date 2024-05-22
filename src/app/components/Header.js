import React from 'react'

import Link from "next/link";

export default function Header() {
  return (
    <div>
        <header className="w-full bg-gray-200 fixed top-0 z-10">
          <nav className="flex items-center justify-between max-w-5xl mx-auto  h-20">
            <div className="text-xl font-bold">WFG EVENTS</div>
            <ul className="flex space-x-4">
            <li>
                <Link href="/about">
                About
                </Link>
              </li>
              <li>
                <Link href="/">
                  Events
                </Link>
              </li>
              
              <li>
                <Link href="/contact">
                Contact
                </Link>
              </li>
            </ul>
          </nav>
        </header>
    </div>
  )
}
