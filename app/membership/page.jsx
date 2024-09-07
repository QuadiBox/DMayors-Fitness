import Navbar from '@/components/navbar'
import React from 'react'
import Footer from '@/components/Home/Footer'
import Packages from '@/components/membership/Packages'
import FAQMembership from '@/components/membership/FAQS';


export const metadata = {
  title: 'Membership Options | DMayor Fitness & Game Hub',
  description: "Explore our membership plans at DMayor Fitness & Game Hub. Find the perfect fit for your fitness and gaming needs.",
  openGraph: {
    type: "website",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/membership`,
    title: 'DMayor Fitness Membership Plans',
    description: 'Choose the right membership for you at DMayor Fitness & Game Hub. Enjoy exclusive access to our fitness and game hub.',
  },
  twitter: {
    card: "Home",
    creator: "@QuadVox",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/membership`,
    title: 'Membership | DMayor Fitness & Game Hub',
    description: 'Discover the benefits of membership at DMayor Fitness & Game Hub. Get access to both fitness and fun!',
  },
}


const Membership = async () => {

  return (
    <main className="membershipGrandCntn">
      <div className="grandHomeCntn">

        <Navbar></Navbar>
        <section className='membershipFisrtSect' style={{backgroundImage: "url(/membership_1.jpg)"}}>
          <h1>Membership</h1>
        </section>
        <Packages ></Packages>
        <FAQMembership></FAQMembership>
        <Footer></Footer>
      </div>

    </main>
  )
}

export default Membership
