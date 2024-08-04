import Navbar from '@/components/navbar'
import React from 'react'
import FAQ from '@/components/membership/FAQS'
import Footer from '@/components/Home/Footer'
import Packages from '@/components/membership/Packages'
// import { currentUser } from '@clerk/nextjs/server';

const Membership = async () => {

  // const user = await currentUser();
  // console.log(user);
  return (
    <main className="membershipGrandCntn">
      <div className="grandHomeCntn">

        <Navbar></Navbar>
        <section className='membershipFisrtSect'>
          <h1>Membership</h1>
        </section>
        <Packages ></Packages>
        <FAQ></FAQ>
        <Footer></Footer>
      </div>

    </main>
  )
}

export default Membership
