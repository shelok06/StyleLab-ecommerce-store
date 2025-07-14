import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <>
      <footer className='mb-30 mx-2 lg:mb-0 flex justify-between text-slate-600 text-sm'>
            <ul className='flex gap-2 '>
                <Link href="/privacy"><li>Privacy Policy</li></Link>
                <Link href="/terms"><li>Terms & Conditions</li></Link>
            </ul>

            <div>@ 2024 Style Lab. All rights reserved</div>
      </footer>
    </>
  )
}

export default Footer
