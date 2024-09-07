import Navbar from '@/components/navbar'
import React from 'react'
import Footer from '@/components/Home/Footer'
import FAQAbout from './FAQ'

export const metadata = {
  title: 'About Us | DMayor Fitness & Game Hub',
  description: "Learn more about DMayor Fitness & Game Hub. Discover our mission, values, and how we're redefining fitness and fun.",
  openGraph: {
    type: "website",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
    title: 'About DMayor Fitness & Game Hub',
    description: 'Find out what makes DMayor Fitness & Game Hub unique! Learn about our journey, mission, and the inclusive community we\'re building.',
  },
  twitter: {
    card: "About",
    creator: "@QuadVox",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
    title: 'About DMayor Fitness & Game Hub',
    description: 'Discover our story, mission, and values at DMayor Fitness & Game Hub, where everyone is welcome.',
  },
}

//!!!! - ABOUT PAGE STYLING IS IN THE MEMBERSHIP.CSS FILE

const About = async () => {
  return (
    <main className="membershipGrandCntn">
      <div className="grandHomeCntn">

        <Navbar></Navbar>
        <section className='membershipFisrtSect about' >
          <h1>About</h1>
        </section>
        <section className="about_Sect2">
          <p>DMayor Fitness & Game Hub is your inclusive space to thrive, no matter your fitness level or background. Our mission is to shatter gym stereotypes by fostering a <span>#NOJUDGEMENT</span> environment where personal growth and fun go hand in hand. Lift, play, or connect - DMayor is your home for all things wellness.</p>
          <p>Our commitment to <span>#NOJUDGEMENT</span> is at the heart of everything we do. We celebrate every step of the journey, from small wins to major milestones. Here, it&apos;s not just about physical fitness - it&apos;s about feeling empowered, motivated, and supported in every aspect of your wellness journey. With state-of-the-art facilities, diverse classes, and a team of passionate coaches, DMayor is more than a hub; it&apos;s a movement toward <span>positivity</span>, <span>inclusivity</span>, and a <span>healthier</span>, <span>happier you</span>.</p>
        </section>
        <section className='about_Sect3'>
          <div className="unit_aboutDeatil">
            <div className="about_left">
              <h2>Welcome to the DMayor Family</h2>
              <p>Welcome to the DMayor family! We&apos;re thrilled to have you here and can&apos;t wait to be part of your fitness and gaming journey. At DMayor, you&apos;re more than just a member - you&apos;re family. We&apos;re here to cheer you on, lift you up, and celebrate every victory with you, big or small. Our community is built on the pillars of support, positivity, and inclusiveness, making sure every visit feels like coming home. So, dive in, make new friends, and let&apos;s create some unforgettable memories together. Because at DMayor, it&apos;s all about having fun while feeling your best. Welcome home!</p>
              <p>Positivity, Inclusivity and #NOJUDGEMENT ...</p>
            </div>
            <div className="about_img" style={{backgroundImage: "url(/about_2.jpg)"}}></div>
          </div>
        </section>
        <section className='about_Sect3 flipped'>
          <div className="unit_aboutDeatil">
            <div className="about_img" style={{backgroundImage: "url(/about_1.jpg)"}}></div>
            <div className="about_left">
              <h2>Whence We Came</h2>
              <p>DMayor Fitness & Game Hub was born out of a simple yet powerful idea: to create a space where everyone feels they belong. Our founder, Mayor of Ekiti, envisioned a place where the love of fitness meets the excitement of gaming - a unique fusion designed to inspire and motivate in a new and dynamic way. Frustrated by the intimidating atmosphere of conventional gyms and the lack of inclusivity, Mayor of Ekiti set out to build a community where judgment is left at the door, and fun and fitness go hand in hand. DMayor stands as a testament to the belief that wellness is a journey meant to be enjoyed, not endured. Today, we continue to break norms and set new standards, proving that when you combine fitness with fun, anything is possible.</p>
            </div>
          </div>
        </section>
        <FAQAbout></FAQAbout>
        <Footer></Footer>
      </div>

    </main>
  )
}

export default About
