'use client'
import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { FaFacebook } from "react-icons/fa";
import Link from 'next/link'

const Signin = () => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push(`/profile`)
    }
  }, [session])



  return (
    <>
      <div className='my-10 min-h-screen'>
        <div className='flex flex-col justify-center items-center'>
          <div>
            <Link href="/"><div className="logo flex justify-center items-center">
              <img src="/logo.svg" alt="style-lab" width={50} />
              <h1 className='text-3xl font-bold'>Style Lab</h1>
            </div></Link>
          </div>

          <div className='mx-5 my-10 md:w-[40vw] '>
            <div className="text flex flex-col justify-center items-center my-2.5">
              <h2 className='font-bold text-2xl text-gray-900 gap-3'>Sign in</h2>
              <p>Sign in to continue to your account.</p>
            </div>

            <div className="buttons my-8 flex flex-col justify-center items-center">
              <div className="facebook">
                <button scope="public_profile" onClick={() => signIn("facebook")} className='border-2 border-black px-10 py-4 flex justify-between items-center gap-5'>
                  <FaFacebook className='size-10' />
                  <p>Continue with Facebook</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signin
