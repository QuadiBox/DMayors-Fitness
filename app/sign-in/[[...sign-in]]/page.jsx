import { SignIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import React from 'react'
import Link from 'next/link'


const Signin = () => {
  return (
    <div className='signInCntn'>
        <div className="top_top">
            <div className='centerBox'>
                <Link href={"/"}> <p>DMAYOR FITNESS </p></Link>
            </div>
        </div>
        <div className="bottom">
            <SignIn
                appearance={{
                    baseTheme: dark
                }}
            ></SignIn>
        </div>
    </div>
  )
}

export default Signin
