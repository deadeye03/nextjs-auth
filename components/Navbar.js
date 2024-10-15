import React from 'react'
import AuthButton from './AuthButton'
import Link from 'next/link'

function Navbar() {
    return (
        <nav className='w-full fixed top-0 left-0 z-10 h-16 flex justify-between px-12 bg-slate-200 items-center dark:bg-[#00ADB5] '>
            <ul className='flex gap-10 items-center cursor-pointer text-[16px]'>
                
                <li><Link href='/'> Home</Link> </li>
                <li>Blog</li>
                <li>Pricing</li>
                <li>About</li>
            </ul>
            <ul>
                <AuthButton/>
            </ul>
        </nav>
    )
}

export default Navbar
