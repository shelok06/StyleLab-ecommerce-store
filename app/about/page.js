import React from 'react'
import { RiLeafLine, RiHeartLine, RiGroupLine } from "react-icons/ri";

const About = () => {
  return (
    <>
      <div className='m-10 px-4 sm:px-8'>
        <div className="heading">
          <h1 className='text-2xl sm:text-4xl font-extrabold my-2.5'>About Style Lab</h1>
          <p className='my-2.5 text-slate-950 sm:text-lg text-base'>
            At Style Lab, we believe that fashion is more than just clothing; it&apso;s a form of self-expression.
            Our journey began with a simple idea: to curate a collection of high-quality,
            stylish pieces that empower individuals to embrace their unique style.
            We&apso;re passionate about providing a seamless shopping experience,
            from browsing our carefully selected items to receiving your order at your doorstep.
          </p>
        </div>

        <div className='my-8'>
          <h2 className='my-2.5 font-semibold text-xl sm:text-2xl'>Our Mission</h2>
          <p className='my-2.5 text-slate-950 text-base sm:text-lg'>
            Our mission is to inspire confidence and individuality through fashion.
            We strive to offer a diverse range of styles that cater to different tastes and preferences,
            ensuring that everyone can find something they love.
            We&apso;re committed to sustainability and ethical practices,
            working with suppliers who share our values.
          </p>
        </div>

        <div className='my-8'>
          <h2 className='my-2.5 font-semibold text-xl sm:text-2xl'>Meet the Team</h2>

          <div className='flex justify-evenly items-center my-2.5 flex-wrap'>
            <div className='m-4'>
              <div className='rounded-full overflow-hidden'>
                <img src="/profile1.png" alt="" className='size-50 sm:size-80' />
              </div>

              <div className="text text-center my-2.5">
                <h3 className='font-semibold'>Sarah Chen</h3>
                <p className='text-slate-600'>Head of Design</p>
              </div>
            </div>

            <div className='m-4'>
              <div className='rounded-full overflow-hidden'>
                <img src="/profile2.png" alt="" className='size-50 sm:size-80' />
              </div>

              <div className="text text-center my-2.5">
                <h3 className='font-semibold'>David Lee</h3>
                <p className='text-slate-600'>CEO & Founder</p>
              </div>
            </div>

            <div className='m-4'>
              <div className='rounded-full overflow-hidden'>
                <img src="/profile3.png" alt="" className='size-50 sm:size-80' />
              </div>

              <div className="text text-center my-2.5">
                <h3 className='font-semibold'>Emily Rodriguez</h3>
                <p className='text-slate-600'>Marketing Director</p>
              </div>
            </div>
          </div>
        </div>

        <div className="my-8">
          <h2 className='my-5 font-semibold text-2xl'>Our Values</h2>

          <div className='flex justify-evenly items-center my-2.5 flex-wrap'>
            <div className='w-[400px] h-[200px] px-1.5 py -1.5 sm:px-4 sm:py-4 flex flex-col gap-4 rounded-md m-4 bg-gray-50 shadow-xl'>
              <RiLeafLine className='size-8 text-green-500' />
              <h3 className='font-semibold text-lg'>Sustainability</h3>
              <p>We prioritize eco-friendly materials and ethical production practices.</p>
            </div>

            <div className='w-[400px] h-[200px] px-1.5 py -1.5 sm:px-4 sm:py-4 flex flex-col gap-4 rounded-md m-4 bg-gray-50 shadow-xl'>
              <RiHeartLine className='size-8 text-red-600' />
              <h3 className='font-semibold text-lg'>Sustainability</h3>
              <p>We prioritize eco-friendly materials and ethical production practices.</p>
            </div>

            <div className='w-[400px] h-[200px] px-1.5 py -1.5 sm:px-4 sm:py-4 flex flex-col gap-4 rounded-md m-4 bg-gray-50 shadow-xl'>
              <RiGroupLine className='size-8 text-blue-500' />
              <h3 className='font-semibold text-lg'>Sustainability</h3>
              <p>We prioritize eco-friendly materials and ethical production practices.</p>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default About
