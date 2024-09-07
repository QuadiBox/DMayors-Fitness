import { SignIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import React from 'react'
import Link from 'next/link'


export const metadata = {
    title: 'Sign In | DMayor Fitness & Game Hub',
    description: "Sign in to your DMayor Fitness & Game Hub account to access exclusive features and manage your membership.",
    openGraph: {
      type: "website",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/sign-in`,
      title: 'Sign In to DMayor Fitness',
      description: 'Log in to your account at DMayor Fitness & Game Hub to manage your profile and explore more features.',
    },
    twitter: {
      card: "Sign In",
      creator: "@QuadVox",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/sign-in`,
      title: 'Sign In | DMayor Fitness',
      description: 'Access your DMayor Fitness account and manage your membership by signing in now.',
    },
}


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
