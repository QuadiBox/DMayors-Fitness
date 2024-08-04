import { SignUp } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import React from 'react'
import Link from 'next/link'

const Signup = () => {
  return (
    <div className='signInCntn'>
        <div className="top_top">
            <div className='centerBox'>
            <Link href={"/"}> <p>DMAYOR FITNESS </p></Link>
            </div>
        </div>
        <div className="bottom">
            <SignUp
                appearance={{
                    baseTheme: dark
                }}
            ></SignUp>
        </div>
    </div>
  )
}

export default Signup
