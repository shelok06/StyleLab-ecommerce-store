'use client'
import Link from 'next/link'
import { React, useState, useEffect } from 'react'
import { RiArrowDropDownLine } from "react-icons/ri";
import { useSelector, useDispatch } from 'react-redux';
import { cartFiller, localCart } from '@/lib/features/cart/cartSlice';
import { Toaster, toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';

const shop = () => {
  const { data: session } = useSession()
  const [categoryDropdown, setCatdropdown] = useState(false)
  const [priceDropdown, setPricedropdown] = useState(false)
  const [productList, setproductList] = useState([])

  const cart = useSelector(state => state.cart.value)
  const dispatch = useDispatch()

  const handleClick = async (e) => {
    const price = e.currentTarget.parentElement.querySelector(".price").innerText.split(".")[1]
    const brand = e.currentTarget.parentElement.querySelector(".brand").innerText
    const product = e.currentTarget.parentElement.querySelector(".product").innerText
    const image = e.currentTarget.parentElement.parentElement.querySelector(".prodImg").src
    let arr = []
    cart.forEach(element => {
      if (element.product === product && element.price === price && element.brand === brand) {
        arr.push(element)
      }
    });

    if (arr.length > 0) {
      return toast.error("Item already exist in cart!")
    }
    else {
      let details = { "price": parseInt(price), "brand": brand, "product": product, "image": image }
      dispatch(cartFiller(details))
      dispatch(localCart())
      toast.success(`${details.product} added to the cart 🛒`)
    }
  }

  useEffect(() => {
    console.log(cart)
    console.log(productList)
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let res = await fetch("/api/products")
        if (!res.ok) throw new Error("Fetch failed")
        let r = await res.json()
        setproductList([...r.result])
      } catch (error) {
        console.error(error)
        throw error
      }
    }

    fetchProducts()
  }, [])



  return (
    <>
      <Toaster />
      <section className='mx-20 px-14 py-10'>
        <div className='flex items-center font-semibold text-lg '>
          <Link href="/" className='text-slate-500'>Home</Link>
          /
          <Link href="/shop">Shop</Link>
        </div>

        <div className='my-10'>
          <h1 className='text-3xl font-bold'>Shop</h1>
          <div className="options my-5 flex gap-5">
            <div className="category relative">
              <button onClick={() => { setCatdropdown(!categoryDropdown) }} onBlur={
                () => {
                  setTimeout(() => {
                    setCatdropdown(false)
                  }, 100);
                }
              } className="bg-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center" type="button">
                <p>Category</p>
                <RiArrowDropDownLine className='size-6' />
              </button>

              <div className={`z-10 ${categoryDropdown ? "" : "hidden"} w-32 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600 absolute -bottom-42`}>
                <ul className="px-2 py-1 text-sm text-gray-700 dark:text-gray-200">
                  <li className="my-2.5 font-semibold hover:bg-gray-200 p-2.5 rounded-lg cursor-pointer">
                    Men
                  </li>
                  <li className="my-2.5 font-semibold hover:bg-gray-200 p-2.5 rounded-lg cursor-pointer">
                    Women
                  </li>
                  <li className="my-2.5 font-semibold hover:bg-gray-200 p-2.5 rounded-lg cursor-pointer">
                    Children
                  </li>
                </ul>
              </div>
            </div>

            <div className="price relative">
              <button onClick={() => { setPricedropdown(!priceDropdown) }} onBlur={
                () => {
                  setTimeout(() => {
                    setPricedropdown(false)
                  }, 100);
                }
              } className="bg-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center" type="button">
                <p>Price</p>
                <RiArrowDropDownLine className='size-6' />
              </button>

              <div className={`z-10 ${priceDropdown ? "" : "hidden"} w-32 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600 absolute -bottom-30`}>
                <ul className="px-2 py-1 text-sm text-gray-700 dark:text-gray-200">
                  <li className="my-2.5 font-semibold hover:bg-gray-200 p-2.5 rounded-lg cursor-pointer">
                    Low to high
                  </li>
                  <li className="my-2.5 font-semibold hover:bg-gray-200 p-2.5 rounded-lg cursor-pointer">
                    High to low
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card_container my-10 flex gap-4 flex-wrap">
            {productList && productList.map((item) => {
              return <div key={item._id} className="card rounded-lg bg-gray-100 p-4">
                <div className="relative h-[400px] w-[267px] overflow-hidden transition-all">
                  <img className="prodImg" src={item.picture} alt="" />
                </div>
                <div className="text flex flex-col my-2.5 gap-2">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg product">{item.product}</h2>
                  </div>
                  <p className="text-gray-400 brand">{item.brand}</p>
                  <p className="price">RS.{item.price}</p>
                  <div className="flex">
                    <h3 className="font-semibold">Size: </h3>
                    <div className="flex mx-2">
                      <p className="cursor-pointer">S</p>
                      <div className="line w-[0.5px] h-4 mx-2 bg-slate-500 self-center"></div>
                      <p className="cursor-pointer">M</p>
                      <div className="line w-[0.5px] h-4 mx-2 bg-slate-500 self-center"></div>
                      <p className="cursor-pointer">L</p>
                      <div className="line w-[0.5px] h-4 mx-2 bg-slate-500 self-center"></div>
                      <p className="cursor-pointer">XL</p>
                    </div>
                  </div>
                  <button onClick={e => handleClick(e)} className="border-2 border-black rounded-full py-3 font-semibold">Add to cart</button>
                </div>
              </div>
            })
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default shop
