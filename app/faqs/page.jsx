import Link from 'next/link';
import Navbar from "@/components/navbar";
import Footer from '@/components/Home/Footer'
import "../contact/contact.css"
import FAQAbout from '../about/FAQ';
import FAQGamehub from '../game_hub/FAQ';
import FAQMembership from '@/components/membership/FAQS';
import FAQGeneral from '@/components/Home/Faq';

export const metadata = {
    title: 'Frequently Asked Questions | DMayor Fitness & Game Hub',
    description: "Find answers to common questions about DMayor Fitness & Game Hub. Learn more about memberships, game hub access, and more.",
    openGraph: {
      type: "website",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/faqs`,
      title: 'FAQs | DMayor Fitness & Game Hub',
      description: 'Get answers to your questions about DMayor Fitness & Game Hub, memberships, and activities.',
    },
    twitter: {
      card: "summary_image_large",
      creator: "@QuadVox",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/faqs`,
      title: 'FAQs | DMayor Fitness & Game Hub',
      description: 'Have questions? Check out our FAQ page for everything you need to know about DMayor Fitness & Game Hub.',
    },
}

const page = () => {
    return (
        <main className="membershipGrandCntn">
            <div className="grandHomeCntn">
                <Navbar></Navbar>
                <div className='contactCntn'>
                    <section className="sect1">
                        <h1>What answers do you seek?</h1>
                    </section>
                    <div className="preSect">
                        <Link href={"/"}>Home</Link>
                        <span><i class="icofont-rounded-right"></i></span>
                        <p>FAQS</p>
                    </div>
                    <FAQGeneral text={"GENERAL"}></FAQGeneral>
                    <FAQMembership text={"MEMBERSHIP"}></FAQMembership>
                    <FAQAbout text={"ABOUT"}></FAQAbout>
                    <FAQGamehub text={"GAME - HUB"}></FAQGamehub>
                    <Footer/>
                </div>
            </div>
    
        </main>
    )
}

export default page
