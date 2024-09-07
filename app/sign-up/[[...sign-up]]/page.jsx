import { SignUp } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import React from 'react'
import Link from 'next/link'

export const metadata = {
    title: 'Sign Up | DMayor Fitness & Game Hub',
    description: "Create an account at DMayor Fitness & Game Hub and start your journey towards a healthier, more active lifestyle!",
    openGraph: {
      type: "website",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/sign-up`,
      title: 'Join DMayor Fitness Today!',
      description: 'Sign up at DMayor Fitness & Game Hub and become part of our inclusive, motivating community.',
    },
    twitter: {
      card: "Sign Up",
      creator: "@QuadVox",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/sign-up`,
      title: 'Sign Up | DMayor Fitness',
      description: 'Ready to join us? Sign up at DMayor Fitness & Game Hub and be part of a fitness revolution!',
    },
}


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
