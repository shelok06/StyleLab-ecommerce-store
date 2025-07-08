'use client'
import React, { useEffect } from 'react'
import { useSession ,signOut, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Profile = () => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session) {
      router.push("/")
    }
  }, [session])
  
  
  return (
    <>
    <div className="signout">
        <button onClick={()=>{signOut()}}>Sign Out</button>
    </div>
    </>
  )
}

export default Profile
