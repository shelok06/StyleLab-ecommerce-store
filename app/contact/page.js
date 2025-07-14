'use client'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'react-hot-toast'

const Contact = () => {
  const { register, handleSubmit, watch, setError, formState: { errors, isSubmitting } } = useForm();

  const handleForm = async (data, e) => {
    e.preventDefault()
    try {
      let r = await fetch("/api/saveMessages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: data })
      })
      if (!r.ok) throw new Error("Fetch failed")
      let res = await r.json()
      if (res.success === true) {
        toast.success(res.message)
      } 
      else {
        toast.error(res.message)
      }
    } catch (error) {
      console.error(error)
      throw error
    }

    setTimeout(() => {
      window.location.reload()
    }, 200);
  }


  return (
    <>
      <Toaster />
      <div className='m-10 px-4 sm:px-8'>
        <div className="heading my-2.5">
          <h1 className='text-2xl sm:text-4xl font-extrabold my-2.5'>Contact Us</h1>
        </div>

        <div>
          <form action="" onSubmit={handleSubmit(handleForm)}>
            <div className='flex flex-col my-5 gap-2'>
              <label htmlFor="name" className='font-semibold font-lg'>Name</label>
              {errors.name && <div className='text-red-600'>{errors.name.message}</div>}
              <input type="text" id="name" name='name' placeholder='Your full name e.g. John Doe'
                {...register("name", { required: { value: true, message: "*This field is required" }, minLength: { value: 3, message: "Invalid Input" } })}
                className='bg-gray-100 py-4 px-4 w-1/2 shadow-lg rounded-lg' />
            </div>

            <div className='flex flex-col my-5 gap-2'>
              <label htmlFor="email" className='font-semibold font-lg'>Email</label>
              {errors.email && <div className='text-red-600'>{errors.email.message}</div>}
              <input type="text" id="email" name='email' placeholder='Your email e.g. name@name.com'
                {...register("email", { required: { value: true, message: "*This field is required" }, minLength: { value: 3, message: "Invalid Input" } })}
                className='bg-gray-100 py-4 px-4 w-1/2 shadow-lg rounded-lg' />
            </div>

            <div className='flex flex-col my-5 gap-2'>
              <label htmlFor="subject" className='font-semibold font-lg'>Subject</label>
              {errors.subject && <div className='text-red-600'>{errors.subject.message}</div>}
              <input type="text" id="subject" name='subject' placeholder='The reason of your message'
                {...register("subject", { required: { value: true, message: "*This field is required" }, minLength: { value: 3, message: "Invalid Input" } })}
                className='bg-gray-100 py-4 px-4 w-1/2 shadow-lg rounded-lg' />
            </div>

            <div className='flex flex-col my-5 gap-2'>
              <label htmlFor="name" className='font-semibold font-lg'>Message</label>
              {errors.message && <div className='text-red-600'>{errors.message.message}</div>}
              <textarea id="name" name='name'
                {...register("message", { required: { value: true, message: "*This field is required" }, minLength: { value: 3, message: "Invalid Input" } })}
                className='bg-gray-100 py-4 px-4 w-1/2 shadow-lg rounded-lg'></textarea>
            </div>

            <button><input type="submit" disabled={isSubmitting} value={"Submit"} className='border-2 border-black py-2.5 px-8 text-lg font-bold' /></button>
          </form>
        </div>

      </div>
    </>
  )
}

export default Contact
