import Link from 'next/link';
import Navbar from "@/components/navbar";
import Footer from '@/components/Home/Footer'
import Form from "./Form";
import "./contact.css"

export const metadata = {
    title: 'Contact Us | DMayor Fitness & Game Hub',
    description: "Get in touch with DMayor Fitness & Game Hub. We're here to help you with any inquiries or support you need.",
    openGraph: {
      type: "website",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
      title: 'Contact DMayor Fitness & Game Hub',
      description: 'Reach out to us for any questions, support, or feedback. DMayor Fitness & Game Hub is here for you.',
    },
    twitter: {
      card: "Contact",
      creator: "@QuadVox",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
      title: 'DMayor Fitness & Game Hub',
      description: 'Need help or have a question? Contact DMayor Fitness & Game Hub today!',
    },
}

const Contact = () => {

  return (
    <main className="membershipGrandCntn">
        <div className="grandHomeCntn">
            <Navbar></Navbar>
            <div className='contactCntn'>
                <section className="sect1">
                    <h1>What can we help you with?</h1>
                </section>
                <div className="preSect">
                    <Link href={"/"}>Home</Link>
                    <span><i class="icofont-rounded-right"></i></span>
                    <p>Contact</p>
                </div>
                <Form></Form>
                <Footer/>
            </div>
        </div>

    </main>
  )
}

export default Contact
