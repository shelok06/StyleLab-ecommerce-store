'use client'
import React, { useEffect, useState } from 'react'
import { useSession, signOut, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux';
import Link from 'next/link';

const Profile = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const cart = useSelector(state => state.cart.value)
  const [List, setList] = useState([])

  const handleClick = async () => {
    try {
      let r = await fetch("/api/orderList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!r.ok) throw new Error("Fetch failed")
      let res = await r.json()
      setList([...res.orders])
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  useEffect(() => {
    console.log(List)
  }, [List])


  return (
    <>
      {session ? <div className="signout min-h-screen">
        <section className='mx-5 sm:mx-10 my-10 px-2 sm:px-8'>
          <div className="heading my-2.5">
            <h1 className='text-2xl sm:text-4xl font-extrabold my-2.5'>Profile</h1>
          </div>

          <div className="flex flex-col justify-center items-center my-5">
            <div className='rounded-full overflow-hidden w-fit border-2 border-slate-800'>
              <img src={session && session.user.image} alt="profile" className='size-30' />
            </div>

            <div className='my-2.5 text-center'>
              <h2 className='text-lg font-semibold'>{session && session.user.name}</h2>
              <p className='text-slate-600'>{session && session.user.email}</p>
              <Link href="/mycart" className='hover:underline text-slate-600 font-light'><p>{cart.length} items in the cart</p></Link>
            </div>
          </div>

          <div className='my-8'>
            <button onClick={() => handleClick()} className='border-2 border-black px-2 py-1 hover:scale-105 transition-all'>
              <div className='my-2.5 font-semibold text-xl sm:text-2xl'>View Orders</div>
            </button>

            {List && List.map((element, index) => {
              return <div key={index}>
                <details>
                  <summary className='my-2.5 font-bold'>Order id: {element.orderID}</summary>
                  <div className="card py-2.5 sm:py-5 px-3 sm:px-10 bg-[#d1d5dc66] backdrop-blur-md rounded-xl shadow-lg my-5 flex flex-col gap-2">
                    <div>
                      <h3 className='my-2 font-semibold'>Order Details:</h3>
                      <div className='flex gap-4 flex-col text-sm sm:text-base px-2'>
                        <div>
                          <span className='font-semibold mx-1'>Order id:</span>
                          <span>{element.orderID}</span>
                        </div>
                        <div>
                          <span className='font-semibold mx-1'>Order date:</span>
                          <span>{element.updatedAt}</span>
                        </div>
                        <div>
                          <span className='font-semibold mx-1'>Delivery date:</span>
                          <span>{element.deliveryDate}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className='my-2 font-semibold'>Payment Details:</h3>
                      <div className='flex gap-4 flex-col text-sm sm:text-base px-2'>
                        <div>
                          <span className='font-semibold mx-1'>Payment Status:</span>
                          <span className={`${element.payment ? "text-green-500" : "text-slate-600"}`}>{element.payment ? "Completed" : "Pending"}</span>
                        </div>
                        <div>
                          <span className='font-semibold mx-1'>Delivery Status:</span>
                          <span className={`${element.delivery ? "text-green-500" : "text-slate-600"}`}>{element.delivery ? "Completed" : "Pending"}</span>
                        </div>
                        <div>
                          <span className='font-semibold mx-1'>Total:</span>
                          <span>{element.total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className='my-2 font-semibold'>Items Details:</h3>
                      <div className='flex gap-4 flex-col text-sm sm:text-base px-2'>
                        {element.items && element.items.map((item, index) => {
                          return <div key={index}>{item.product} — {item.brand}</div>
                        })}
                      </div>
                    </div>
                  </div>
                </details>
              </div>
            })}
          </div>

          <div className="my-8">
            <button className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 font-bold text-lg' onClick={() => signOut()}>Sign Out</button>
          </div>
        </section>
      </div> : <div className='min-h-screen'><Link href="/signin" className="underline">Please Sign in</Link></div>}
    </>
  )
}

export default Profile
