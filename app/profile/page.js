'use client'
import React, { useEffect } from 'react'
import { useSession ,signOut, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Profile = () => {
  const { data: session } = useSession()
  const router = useRouter()

  // useEffect(() => {
  //   if (!session) {
  //     router.push("/")
  //   }
  // }, [session])

  useEffect(() => {
    const date = new Date()
    let newDate = date.setDate(date.getDate() + 7)
    console.log(new Date(newDate))
  }, [])
  
  
  
  return (
    <>
    <div className="signout min-h-screen">
        <button onClick={()=>{signOut()}}>Sign Out</button>
    </div>
    </>
  )
}

export default Profile
