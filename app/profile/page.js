'use client'
import React from 'react'
import { useSession ,signOut, signIn } from 'next-auth/react'

const page = () => {
  const { data: session } = useSession()
  
  return (
    <>
    <div className="signout">
        <button onClick={()=>{signOut()}}>Sign Out</button>
    </div>
    </>
  )
}

export default page
