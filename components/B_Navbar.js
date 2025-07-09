'use client'
import React from 'react'
import Link from 'next/link'
import { IoCartOutline } from "react-icons/io5";
import { FaShoppingBag } from "react-icons/fa";
import { RiContactsBook3Fill } from "react-icons/ri";
import { AiOutlineTeam } from "react-icons/ai";
import { IoMdHome } from "react-icons/io";
import { usePathname } from 'next/navigation';


const B_Navbar = () => {
  const pathname = usePathname()
  console.log(pathname)

  return (
    <>
      <nav className='fixed -bottom-1 w-full border-t-4 border-neutral-800 bg-[#f5f5f5b3] backdrop-blur-2xl block lg:hidden z-20 sm:px-5 p-2.5 sm:py-3'>
        <div className='flex items-center justify-evenly xs:justify-center'>
          <div className='flex justify-between items-center gap-4 xs:gap-8 sm:gap-15 mx-1 xs:mx-2.5'>
            <Link href="/" className={pathname === "/" ? "bg-neutral-200 p-2.5 rounded-xl flex flex-col justify-center items-center" : " flex flex-col justify-center items-center"}>
              <button>
                <IoMdHome className='size-6 sm:size-8' />
              </button>
              <div className='text-sm sm:text-base'>Home</div>
            </Link>

            <Link href="/shop" className={pathname === "/shop" ? "bg-neutral-200 p-2.5 rounded-xl flex flex-col justify-center items-center" : " flex flex-col justify-center items-center"}>
              <button>
                <FaShoppingBag className='size-6 sm:size-8' />
              </button>
              <div className='text-sm sm:text-base'>Shop</div>
            </Link>
          </div>

          <Link href="/mycart"><div className="circle rounded-full border-4 border-neutral-800 p-3 mx-1 xs:mx-2.5 sm:mx-10">
            <button>
              <img src="/cart.gif" alt="cart" className='size-10' />
            </button>
          </div></Link>

          <div className='flex justify-between items-center gap-4 xs:gap-8 sm:gap-15 mx-1 xs:mx-2.5'>
            <Link href="/about" className={pathname === "/about" ? "bg-neutral-200 p-2.5 rounded-xl flex flex-col justify-center items-center" : " flex flex-col justify-center items-center"}>
              <button>
                <AiOutlineTeam className='size-6 sm:size-8' />
              </button>
              <div className='text-sm sm:text-base'>About</div>
            </Link>
            <Link href="/contact" className={pathname === "/contact" ? "bg-neutral-200 p-2.5 rounded-xl flex flex-col justify-center items-center" : " flex flex-col justify-center items-center"}>
              <button>
                <RiContactsBook3Fill className='size-6 sm:size-8' />
              </button>
              <div className='text-sm sm:text-base'>Contact</div>
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default B_Navbar
