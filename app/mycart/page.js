'use client'
import { React, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { cartFiller, localCart, deleteCart } from '@/lib/features/cart/cartSlice';
import { Toaster, toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { AiOutlineDelete } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeComponent from '@/components/StripeComponent';

const Mycart = () => {
  const { data: session } = useSession()
  const cart = useSelector(state => state.cart.value)
  const dispatch = useDispatch()
  const [hover, sethover] = useState(false)
  const [message, setMessage] = useState(false)
  const [showCheckout, setshowCheckout] = useState(false)
  const [fetchedCart, setfetchedCart] = useState([])
  const [Total, setTotal] = useState(1)
  const [clientSecret, setclientSecret] = useState(null)
  const router = useRouter()
  const [orderID, setorderID] = useState("")
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)
  const [Form, setForm] = useState({ name: "", address: "", phone: "", city: "" })
  const [Proceed, setProceed] = useState(false)
  const [disable, setdisable] = useState(false)


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

  const saveCarttoDB = async () => {
    try {
      let r = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart: cart })
      })
      if (!r.ok) throw new Error("Fetch failed")
      let res = await r.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const fetchCart = async (id) => {
    try {
      let r = await fetch("/api/createOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "orderID": id })
      })
      if (!r.ok) throw new Error("Fetch failed")
      let res = await r.json()
    console.log(res)
      setfetchedCart([...res.func.cart])
      setTotal(res.func.total)
      setclientSecret(res.secret)
    } catch (error) {
      console.error(error)
      throw error
    }
  }


  const handleCheckout = async () => {
    setdisable(false)
    const id = uuidv4()
    setorderID(id)
    if (session && !showCheckout) {
      setMessage(false)
      await saveCarttoDB()
      await fetchCart(id)
      setshowCheckout(true)
    }

    if (!session) {
      setMessage(true)
    }
  }

  const handleChange = (e) => {
    setForm({ ...Form, [e.target.name]: e.target.value })
  }

  const handleForm = async () => {
    if (Form.name.match(/[0-9\*\+\-\/\?\%\$\@\!\^]/g) || Form.phone.match(/[A-Z\*\/\?\%\$\@\!\^\&]/gi) || Form.city.match(/[0-9\*\+\-\/\?\%\$\@\!\^]/g)) {
      toast.error('Invalid input!');
      return console.log("error")
    }

    try {
      let r = await fetch("/api/saveOrderForm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "id": orderID, "form": Form })
      })
      if (!r.ok) throw new Error("Fetch failed")
      let res = await r.json()
      if (res.success === false) {
        toast.error(res.message);
      }
      else {
        setProceed(true)
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }



  return (
    <>
      <Toaster />
      <div className="overflow-hidden">
        <section className='sm:mx-20 mx-5 py-10'>
          <h1 className='text-4xl font-extrabold'>My Cart</h1>

          <div className="items my-10">
            {cart.length > 0 ? cart.map((element, index) => {
              return <div key={index} className="card py-2.5 sm:py-5 px-3 sm:px-10 bg-[#d1d5dc66] backdrop-blur-md rounded-xl shadow-lg my-5 flex items-center justify-between">
                <div className='flex gap-4 items-center'>
                  <div className="image">
                    <img src={element.image} alt="item-picture" className='w-10' />
                  </div>
                  <div className="text-sm sm:text-base">
                    <div className='product'>{element.product}</div>
                    <div className='brand'>{element.brand}</div>
                    <div className="quantity">Quantity: {element.quantity}</div>
                  </div>
                </div>

                <div className='flex gap-10 items-center sm:text-base text-sm'>
                  <div>{element.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                  <button className='cursor-pointer' onClick={(e) => handleDelete(e)}>
                    <AiOutlineDelete className='size-5 sm:size-7 hover:text-red-700 hover:scale-125 transition-all' />
                  </button>
                </div>
              </div>
            }) : <div>No items in the cart</div>
            }
          </div>
        </section>

        <div className={`${cart.length > 0 ? "flex justify-center items-center" : "hidden"}`}>
          <button disabled={showCheckout} onClick={() => handleCheckout()} className="border-2 border-black px-10 py-4 flex items-center gap-2 hover:text-green-500 hover:border-green-500 hover:scale-110 transition-all disabled:text-green-500 disabled:border-green-500 disabled:hover:scale-100">
            <p className='text-xl font-semibold'>Checkout</p>
            <BsCartCheck className='size-7' />
          </button>
        </div>

        <div className={`message my-5 text-center ${message ? "block" : "hidden"}`}>
          <p className="italic text-gray-900">Please <Link href="/signin" className='underline'>Sign-in</Link> to Checkout</p>
        </div>

        <section className={`sm:mx-20 mx-5 py-10 my-10 ${showCheckout ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"} transition-all`}>
          <h1 className='text-4xl font-extrabold'>Checkout</h1>

          <div className="my-8">
            <form action={handleForm}>
              <div className="my-6">
                <h2 className="text-2xl font-bold">1. Shipping Address</h2>

                <div className="my-5 flex flex-col gap-2 md:w-1/2">
                  <label htmlFor="name" className="text-lg">Full Name</label>
                  <input value={Form.name || ""} readOnly={Proceed ? true : false} onChange={handleChange} type="text" name="name" id="name" placeholder="Enter your full name" className="px-2.5 py-3 border-2 border-black rounded-sm" />
                </div>

                <div className="my-5 flex flex-col gap-2 md:w-1/2">
                  <label htmlFor="address" className="text-lg">Address</label>
                  <input value={Form.address || ""} readOnly={Proceed ? true : false} onChange={handleChange} type="text" name="address" id="address" placeholder="Enter your Address" className="px-2.5 py-3 border-2 border-black rounded-sm" />
                </div>

                <div className="my-5 flex flex-col gap-2 md:w-1/2">
                  <label htmlFor="phone" className="text-lg">Phone</label>
                  <input value={Form.phone || ""} readOnly={Proceed ? true : false} onChange={handleChange} type="text" name="phone" id="phone" placeholder="Enter your Contact Number" className="px-2.5 py-3 border-2 border-black rounded-sm" />
                </div>

                <div className="my-5 flex flex-col gap-2 md:w-1/2">
                  <label htmlFor="city" className="text-lg">City</label>
                  <input value={Form.city || ""} readOnly={Proceed ? true : false} onChange={handleChange} type="text" name="city" id="city" placeholder="Enter your city" className="px-2.5 py-3 border-2 border-black rounded-sm" />
                </div>
              </div>

              <button className="w-full my-4">
                <input disabled={Proceed || Form.name.length < 3 || Form.address.length < 3 || Form.city.length < 3 || Form.phone.length < 3} type="submit" value="Proceed..." className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-1/2 font-semibold text-lg disabled:bg-blue-400 disabled:cursor-not-allowed" />
              </button>
            </form>

            {Proceed && clientSecret ? <>
              <div className="my-6">
                <h2 className="text-2xl font-bold">2. Order Summary</h2>
                {fetchedCart && fetchedCart.map((element, index) => {
                  return <div key={index} className="card py-2.5 sm:py-5 px-3 sm:px-10 bg-[#d1d5dc66] backdrop-blur-md rounded-xl shadow-lg my-5 flex items-center justify-between">
                    <div className='flex gap-4 items-center'>
                      <div className="image">
                        <img src={element.image} alt="item-picture" className='w-10' />
                      </div>
                      <div className="text-sm sm:text-base">
                        <div className='product'>{element.product}</div>
                        <div className='brand'>{element.brand}</div>
                        <div className="quantity">Quantity: {element.quantity}</div>
                      </div>
                    </div>

                    <div className='flex gap-10 items-center'>
                      <div>{element.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                    </div>
                  </div>
                })
                }

                <div className="my-4">
                  <div className="flex justify-between my-2.5">
                    <h3>Subtotal</h3>
                    <div>{Total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                  </div>

                  <div className="flex justify-between my-2.5">
                    <h3>Shipping</h3>
                    <div>Free</div>
                  </div>

                  <div className="flex justify-between my-2.5 font-semibold text-lg">
                    <h3>Total</h3>
                    <div>{Total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                  </div>
                </div>
              </div>

              <div className="my-6">
                <h2 className="text-2xl font-bold">3. Payment Method</h2>
                <Elements stripe={stripePromise} options={{
                  clientSecret }} >
                  <StripeComponent secret={clientSecret} orderID={orderID} />
                </Elements>
              </div>
            </> : <div></div>}
            <div>
            </div>
          </div>
        </section >
      </div >
    </>
  )
}

export default Mycart
