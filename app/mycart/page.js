'use client'
import { React, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { cartFiller, localCart, deleteCart } from '@/lib/features/cart/cartSlice';
import { Toaster, toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { AiOutlineDelete } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import Link from 'next/link';

const mycart = () => {
  const { data: session } = useSession()
  const cart = useSelector(state => state.cart.value)
  const dispatch = useDispatch()
  const [hover, sethover] = useState(false)
  const [message, setMessage] = useState(false)
  const [showCheckout, setshowCheckout] = useState(false)


  const handleDelete = (e) => {
    let message = confirm("Are you sure you want to remove this item from cart ?")
    if (message) {
      let product = e.currentTarget.parentElement.parentElement.querySelector(".product").innerText
      let brand = e.currentTarget.parentElement.parentElement.querySelector(".brand").innerText
      let filter = { "brand": brand, "product": product }

      dispatch(deleteCart(filter))
      dispatch(localCart())
      toast.success('Item removed')
    }
  }

  useEffect(() => {
    console.log(cart)
  })

  const handleCheckout = async () => {
    if (session) {
      setMessage(false)
      let r = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart: cart })
      })
      let res = await r.json()
      console.log(res)
      setshowCheckout(true)
    }
    else {
      setMessage(true)
      setshowCheckout(false)
    }

  }



  return (
    <>
      <Toaster />
      <section className='mx-20 py-10'>
        <h1 className='text-4xl font-extrabold'>My Cart</h1>

        <div className="items my-10">
          {cart.length > 0 ? cart.map((element, index) => {
            return <div key={index} className="card py-5 px-10 bg-[#d1d5dc66] backdrop-blur-md rounded-xl shadow-lg my-5 flex items-center justify-between">
              <div className='flex gap-4 items-center'>
                <div className="image">
                  <img src={element.image} alt="item-picture" className='w-10' />
                </div>
                <div>
                  <div className='product'>{element.product}</div>
                  <div className='brand'>{element.brand}</div>
                </div>
              </div>

              <div className='flex gap-10 items-center'>
                <div>{element.price}</div>
                <button className='cursor-pointer' onClick={(e) => handleDelete(e)}>
                  <AiOutlineDelete className='size-7 hover:text-red-700 hover:scale-125 transition-all' />
                </button>
              </div>
            </div>
          }) : <div>No items in the cart</div>
          }
        </div>
      </section>

      <div className={`${cart.length > 0 ? "flex justify-center items-center" : "hidden"}`}>
        <button onClick={() => handleCheckout()} className="border-2 border-black px-10 py-4 flex items-center gap-2 hover:text-green-500 hover:scale-110 transition-all">
          <p className='text-xl font-semibold'>Checkout</p>
          <BsCartCheck className='size-7' />
        </button>
      </div>

      <div className={`message my-5 text-center ${message ? "block": "hidden"}`}>
        <p className="italic text-gray-900">Please <Link href="/signin" className='underline'>Sign-in</Link> to Checkout</p>
      </div>

      <section className={`mx-20 py-10 my-10 ${showCheckout ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"} transition-all`}>
      <h1 className='text-4xl font-extrabold'>Checkout</h1>

      <form action=""></form>
      </section>
    </>
  )
}

export default mycart
