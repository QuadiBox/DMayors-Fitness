import Link from 'next/link';
import { fetchAllDocuments } from '@/app/db/firestoreService';
import SubsClient from './SubsClient';

export const metadata = {
    title: 'Profiles | Dashboard | DMayor Fitness & Game Hub',
    description: "Access your personal dashboard at DMayor Fitness & Game Hub. Manage your profile, track your progress & subscriptions, and stay engaged.",
    openGraph: {
      type: "website",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard_admin/users`,
      title: 'DMayor Fitness Dashboard',
      description: 'Manage your profiles, track your fitness journey, and stay engaged with the DMayor Fitness & Game Hub Dashboard.',
    },
    twitter: {
      card: "summary_image_large",
      creator: "@QuadVox",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard_admin/users`,
      title: 'Your Profile | DMayor Fitness',
      description: 'Keep track of your progress and manage your profile with the DMayor Fitness & Game Hub Dashboard.',
    },
}

const Page = async () => {

    try {
        const users = await fetchAllDocuments('users');
        const users_from_db = users.filter((elem) => elem.email !== undefined && elem.email !== null);

        const fetchSubscription = async (vlad) => {
            try {
    
              const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getSubs`);
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
    
              const data = await response.json();
              const filtered_data_paystack = data?.data.filter(elem => elem.customer.email === users_from_db?.emailAddresses[users_from_db?.emailAddresses.length - 1].emailAddress && elem.status === "active");
            //   const filtered_data_paystack = data?.data.filter(elem => elem.customer.email === "quadvox0@gmail.com" && elem.status === "active");
              const filtered_data = [...vlad, ...filtered_data_paystack].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
              if (filtered_data.length > 0) {
                  return filtered_data;
                } else {
                    return null;
              }
        
            } catch (error) {
              console.error(error.message);
            }
        };

        const documents_from_db = await fetchAllDocuments('subscriptions') || [];
        const filtered_db_data = documents_from_db?.filter(elem => elem?.status !== null && elem?.status !== undefined);

        const filtered_data = await fetchSubscription(filtered_db_data);


        return (
            <>
                <div className="headerSection">
                    <h1>Users</h1>
                </div>
                <div className="sectNavOpt">
                    <Link href={"/dashboard_admin"}>Overview</Link>
                    <i className="icofont-rounded-double-right"></i>
                    <p>Users</p>
                </div>
                <section className='profile dashprofileCntn'>
                    <div className="fancyBorderClass subsActivitiesCntn">
                        <SubsClient subs_db_data={users_from_db} filtered_data={filtered_data}></SubsClient>
                    </div>
                </section>
            </>
        )

    } catch (error) {
        console.error(error);
        return <div>Error: {error.message}</div>;
    }

}

export default Page
