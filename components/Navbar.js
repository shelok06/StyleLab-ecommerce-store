'use client'
import { React, useState, useEffect } from 'react'
import Link from 'next/link';
import { IoSearchOutline, IoNotificationsOutline, IoCartOutline } from "react-icons/io5";
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useSelector, useDispatch } from 'react-redux';
import { cartFiller } from '@/lib/features/cart/cartSlice';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { data: session } = useSession()
  const pathname = usePathname()
  const showNavbar = ["/signin"].includes(pathname)
  const [keyword, setkeyword] = useState("")
  const router = useRouter()

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

  const handleChange = (e) => {
    setkeyword(e.target.value)
  }

  const handleSearch = (e) => {
    if (e.key === "Enter" && keyword.length > 0) {
      router.push(`/search/${keyword}`)
      setTimeout(() => {
        setkeyword("")
      }, 400);
    }
  }

  const handleSearch2 = () => {
    console.log("hello")
    router.push(`/search/${keyword}`)
    setTimeout(() => {
      setkeyword("")
    }, 400);
    
  }




  return (
    <>{!showNavbar && <nav>
      <div className='flex p-5 justify-between items-center'>
        <div className='flex justify-around items-center gap-10'>
          <Link href="/"><div className="logo flex justify-center items-center">
            <img src="/logo.svg" alt="style-lab" width={50} />
            <h1 className='text-3xl font-bold'>Style Lab</h1>
          </div></Link>
        </div>

        <div className="relative md:flex items-center border border-[#00000078] hidden rounded-full">
          <IoSearchOutline className='size-6 mx-2.5 text-gray-400' />
          <input value={keyword || ""} onKeyPress={(e) => handleSearch(e)} onChange={handleChange} type="text" className="px-2 py-2 border-none outline-none" />
          <button disabled={keyword.length < 1} onClick={() => handleSearch2() } className="mx-2.5 border-l border-l-black px-1 cursor-pointer">Search</button>
        </div>

        <div className="options flex items-center gap-3">
          {!session && <div className="button">
            <Link href="/signin"><button className='flex justify-center items-center gap-1 px-4 py-2 border-2 border-black rounded-full'>Sign in</button></Link>
          </div>}

          {session && <Link href="/profile"><button className='flex justify-center items-center gap-1 p-2 sm:p-4 border-2 border-black rounded-full'>
            <div className="profile border border-black rounded-full overflow-hidden">
              <img src={session.user.image} alt="" className="w-10 h-10" />
            </div>
            <div className="text lg:block hidden">{session.user.name}</div>
          </button></Link>}
        </div>
      </div>

      <div className="mx-5 relative flex items-center border border-[#00000078] md:hidden rounded-full">
        <div className="flex items-center w-full">
          <IoSearchOutline className='size-6 mx-2.5 text-gray-400' />
          <input value={keyword || ""} onKeyPress={(e) => handleSearch(e)} onChange={handleChange} type="text" className="px-2 py-2 border-none outline-none w-[80%]" />
        </div>
        <button disabled={keyword.length < 1} onClick={() => handleSearch2() } className="mx-2.5 border-l border-l-black px-1 w-[20%] cursor-pointer">Search</button>
      </div>
    </nav>
    }
    </>
  )
}

export default Navbar
