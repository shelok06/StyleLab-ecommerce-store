'use client'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartFiller, localCart } from '@/lib/features/cart/cartSlice';
import { Toaster, toast } from 'react-hot-toast';
import { FiPlus, FiMinus } from "react-icons/fi";

const Item = ({ params }) => {
  const [keyword, setkeyword] = useState("")
  const [Products, setProducts] = useState([])
  const cart = useSelector(state => state.cart.value)
  const [Loading, setLoading] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    const func = async () => {
      const item = await params
      setkeyword(item.item)
      let res = await fetch(`/api/findProduct?item=${item.item}`)
      let r = await res.json()
      if(r.list.length<1) setLoading("Item not found")
      setProducts(r.list)
    }

    func()
  }, [])

  const handleClick = async (e, index) => {
    const quantity = parseInt(e.currentTarget.parentElement.querySelector(`#q-${index}`).innerText)
    const price = (parseInt(e.currentTarget.parentElement.querySelector(".price").innerText.split("$")[1])) * quantity
    const brand = e.currentTarget.parentElement.querySelector(".brand").innerText
    const product = e.currentTarget.parentElement.querySelector(".product").innerText
    const image = e.currentTarget.parentElement.parentElement.querySelector(".prodImg").src
    let arr = cart.filter(element => {
      if (element.product === product && element.brand === brand) {
        return element
      }
    });

    if (arr.length > 0) {
      return toast.error("Item already exist in cart!")
    }
    else {
      let details = { "price": parseInt(price), "brand": brand, "product": product, "image": image, "quantity": quantity }
      dispatch(cartFiller(details))
      dispatch(localCart())
      toast.success(`${details.product} added to the cart 🛒`)
    }
  }

  const handleAdd = (e, index) => {
    let quantity = parseInt(e.currentTarget.parentElement.querySelector(`#q-${index}`).innerHTML)
    document.getElementById(`q-${index}`).innerHTML = quantity + 1
  }

  const handleDeduct = (e, index) => {
    let quantity = parseInt(e.currentTarget.parentElement.querySelector(`#q-${index}`).innerHTML)
    if (quantity !== 1) {
      document.getElementById(`q-${index}`).innerHTML = quantity - 1
    }
  }

  return (
    <>
      <Toaster />
      <section className='lg:mx-20 lg:px-14 mx-10 px-3.5 sm:px-7 py-10 min-h-screen'>
        <div className='my-10'>
          <h1 className='text-3xl font-bold'>{keyword}</h1>
        </div>

        <div className="card_container my-10 flex lg:justify-start justify-center gap-6 lg:gap-4 flex-wrap">
          {Products.length > 0 ? Products.map((item, index) => {
            return <div key={item._id} className="card rounded-lg bg-gray-100 p-4">
              <div className="relative h-[400px] w-[267px] overflow-hidden transition-all flex items-center">
                <img className="prodImg" src={item.picture} alt="" />
              </div>
              <div className="text flex flex-col my-2.5 gap-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg product">{item.product}</h2>
                </div>
                <p className="text-gray-400 brand">{item.brand}</p>
                <p className="price">{item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Quantity: </h3>
                  <div className="flex items-center gap-4">
                    <button onClick={(e) => handleDeduct(e, index)} className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center"><FiMinus /></button>
                    <div className="quantiy" id={`q-${index}`}>1</div>
                    <button onClick={(e) => handleAdd(e, index)} className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center"><FiPlus /></button>
                  </div>
                </div>
                <button onClick={e => handleClick(e, index)} className="border-2 border-black rounded-full py-3 font-semibold">Add to cart</button>
              </div>
            </div>
          }) : <div>{Loading}</div>}
        </div>
      </section>
    </>
  )
}

export default Item
