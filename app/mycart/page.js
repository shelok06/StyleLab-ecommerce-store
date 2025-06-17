'use client'
import { React, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { cartFiller, localCart, deleteCart } from '@/lib/features/cart/cartSlice';
import { Toaster, toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { AiOutlineDelete } from "react-icons/ai";

const mycart = () => {
  const { data: session } = useSession()
  const cart = useSelector(state => state.cart.value)
  const dispatch = useDispatch()
  const [hover, sethover] = useState(false)


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
      let r = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart: cart })
      })
      let res = await r.json()
      console.log(res)
    }
    else {
      
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
                  <img src="./product.png" alt="" className='w-10' />
                </div>
                <div>
                  <div className='product'>{element.product}</div>
                  <div className='brand'>{element.brand}</div>
                </div>
              </div>

              <div className='flex gap-10 items-center'>
                <div>{element.price}</div>
                <button className='cursor-pointer' onClick={(e) => handleDelete(e)}>
                  <lord-icon
                    src="https://cdn.lordicon.com/jzinekkv.json"
                    trigger="hover"
                    stroke="bold"
                    colors="primary:#000000,secondary:#000000">
                  </lord-icon>
                </button>
              </div>
            </div>
          }) : <div>No items in the cart</div>
          }
        </div>
      </section>

      <div className="flex justify-center items-center">
        <button onClick={() => handleCheckout()} className="border-2 border-black px-10 py-4 flex items-center gap-2">
          <p className='text-xl font-semibold'>Checkout</p>
          <lord-icon
            src="https://cdn.lordicon.com/ggirntso.json"
            trigger="hover"
            stroke="bold"
            colors="primary:#000000,secondary:#000000"
            className="size-8" >
          </lord-icon>
        </button>
      </div>

      <section className='mx-20 py-10'>
      </section>
      <script src="https://cdn.lordicon.com/lordicon.js"></script>
    </>
  )
}

export default mycart
