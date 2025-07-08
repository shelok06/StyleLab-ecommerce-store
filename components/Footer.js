import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <>
      <footer>
            <ul className='flex gap-2'>
                <Link href="/privacy"><li>Privacy Policy</li></Link>
                <Link href="/terms"><li>Terms & Conditions</li></Link>
            </ul>
      </footer>
    </>
  )
}

export default Footer
