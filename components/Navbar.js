'use client'
import { React, useState, useEffect } from 'react'
import Link from 'next/link';
import { IoSearchOutline, IoNotificationsOutline, IoCartOutline } from "react-icons/io5";
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useSelector, useDispatch } from 'react-redux';
import { cartFiller } from '@/lib/features/cart/cartSlice';

const Navbar = () => {
  const { data: session } = useSession()
  const pathname = usePathname()
  const showNavbar = ["/signin"].includes(pathname)

  // Adding Items to redux store from localStorage
  const cart = useSelector(state => state.cart.value)
  const dispatch = useDispatch()

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart"))
    if (localCart && cart.length === 0) {
      localCart.forEach(element => {
        dispatch(cartFiller(element))
      });
    }
  }, [])

  return (
    <>{!showNavbar && <nav className='flex p-5 justify-between items-center'>
      <div className='flex justify-around items-center gap-10'>
        <Link href="/"><div className="logo flex justify-center items-center">
          <img src="/logo.svg" alt="style-lab" width={50} />
          <h1 className='text-3xl font-bold'>Style Lab</h1>
        </div></Link>

        <ul className='flex gap-4 text-lg font-semibold'>
          <Link href="/"><li>Home</li></Link>
          <Link href="/shop"><li>Shop</li></Link>
          <Link href="/about"><li>About</li></Link>
          <Link href="/contact"><li>Contact</li></Link>
        </ul>
      </div>

      <div className="options flex items-center gap-3">
        <ul className='flex justify-center items-center gap-4'>
          <li><IoSearchOutline className='size-6' /></li>
          <li><IoNotificationsOutline className='size-6' /></li>
        </ul>

        <Link href="/mycart"><button className='flex justify-center items-center gap-1 px-4 py-2 border-2 border-black rounded-full'>
          <p className='text-lg'>My Cart</p>
          <IoCartOutline className='size-6' />
        </button></Link>

        <div className="line w-[1px] h-8 bg-slate-500"></div>
        {!session && <div className="button">
          <Link href="/signin"><button className='flex justify-center items-center gap-1 px-4 py-2 border-2 border-black rounded-full'>Sign in</button></Link>
        </div>}

        {session && <Link href="/profile"><button className='flex justify-center items-center gap-1 px-4 py-2 border-2 border-black rounded-full'>
          <div className="profile border border-black rounded-full w-10 h-10 overflow-hidden">
            <img src={session.user.image} alt="" />
          </div>
          <div className="text">{session.user.name}</div>
        </button></Link>}
      </div>
    </nav>
    }
    </>
  )
}

export default Navbar
