import { notFound } from 'next/navigation'
import Navbar from "@/components/navbar";
import Footer from '@/components/Home/Footer'
import Privacy from './Privacy';
import "./policy.css"
import Membership from './membership';
import Guidelines from './guidelines';
import Terms from './terms_of_use';


export const metadata = {
    title: 'Policy | DMayor Fitness & Game Hub',
    description: "Review the policies at DMayor Fitness & Game Hub. Stay informed to enjoy the best experience.",
    openGraph: {
      type: "website",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/policy`,
      title: 'Policy | DMayor Fitness & Game Hub',
      description: 'Review the policies at DMayor Fitness & Game Hub. Stay informed to enjoy the best experience.',
    },
    twitter: {
      card: "Policy",
      creator: "@QuadVox",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/policy`,
      title: 'DMayor Fitness & Game Hub',
      description: 'Review the policies at DMayor Fitness & Game Hub. Stay informed to enjoy the best experience.',
    },
}

const Page = ({ params }) => {

    if (params.slug[0] !== "privacy" && params.slug[0] !== "membership" && params.slug[0] !== "membership_guidelines" && params.slug[0] !== "terms_of_use") {
        return notFound();
    }

    return (
        <main className="membershipGrandCntn">
            <div className="grandHomeCntn">
                <Navbar></Navbar>
                {
                    params.slug[0] === "privacy" && (
                        <Privacy></Privacy>
                    )
                }
                {
                    params.slug[0] === "membership" && (
                        <Membership></Membership>
                    )
                }
                {
                    params.slug[0] === "membership_guidelines" && (
                        <Guidelines></Guidelines>
                    )
                }
                {
                    params.slug[0] === "terms_of_use" && (
                        <Terms></Terms>
                    )
                }
                <Footer></Footer>
            </div>
        </main>
    )
}

export default Page
