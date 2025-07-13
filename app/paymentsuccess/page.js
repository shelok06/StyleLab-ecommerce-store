'use client'
import React, { useEffect, useState } from 'react'

const PaymentSuccess = () => {
  const [orderID, setorderID] = useState(null)
  const [Order, setOrder] = useState(null)
  const [Date, setDate] = useState("")
  const [Amount, setAmount] = useState("")
  const [Email, setEmail] = useState("")
  const [Name, setName] = useState("")

  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const orderID = urlParams.get('orderID')
    setorderID(orderID)

    const orderDetails = async () => {
      try {
        let r = await fetch("/api/getOrder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: orderID })
        })
        if (!r.ok) throw new Error("Fetch failed")
        let res = await r.json()
        setOrder(res.order)
      } catch (error) {
        console.error(error)
        throw error
      }
    }
    orderDetails()
  }, [])

  useEffect(() => {
    if (Order) {
      setDate(Order.updatedAt)
      setAmount(Order.total.toLocaleString('en-US', { style: 'currency', currency: 'USD' }))
      setEmail(Order.email)
      setName(Order.name)
    }
  }, [Order])



  return (
    <>
      {Order ? <section className='my-10 flex justify-center items-center'>
        <div className='rounded-xl bg-gray-100 shadow-2xl w-[600px] flex flex-col items-center'>
          <div className="image bg-green-500 rounded-full w-fit p-2 my-15">
            <img src="/complete.gif" alt="tick" className='size-20' />
          </div>

          <div className="heading my-4">
            <h1 className='text-4xl font-bold'>Payment completed</h1>
          </div>

          <div className='flex justify-start my-3'>
            <div className='mx-2.5'>Order ID: </div>
            <p>{orderID}</p>
          </div>

          <div className='my-4 flex flex-col items-center'>
            <h2 className='font-semibold text-xl'>Transaction Details</h2>


            <div className='px-10 py-4 bg-gray-200 my-3'>
              <div className='flex justify-start my-3'>
                <div className='mx-2.5'>Name: </div>
                <p>{Name}</p>
              </div>

              <div className='flex justify-start'>
                <div className='mx-2.5'>Data: </div>
                <p>{Date}</p>
              </div>



              <div className='flex justify-start my-3'>
                <div className='mx-2.5'>Email: </div>
                <p>{Email}</p>
              </div>

              <div className='flex justify-start my-3'>
                <div className='mx-2.5'>Total: </div>
                <p>{Amount}</p>
              </div>

            </div>
          </div>

          <div className='my-10 self-start mx-5'>
            <p className='font-semibold'>For further inquiries, please contact: </p>
            <p className='italic'>03123456789</p>
            <p className='italic'>example@example.com</p>
          </div>

        </div>
      </section> : <div>No Order</div>
      }
    </>
  )
}

export default PaymentSuccess
