import Link from 'next/link';
import { fetchAllDocuments } from '@/app/db/firestoreService';
import SubsClient from './SubsClient';



const Page = async () => {

    try {
        const fetchSubscription = async (vlad) => {
            try {
    
              const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getSubs`);
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
    
              const data = await response.json();
              const filtered_data_paystack = data?.data;
              // const filtered_data_paystack = data?.data.filter(elem => elem.customer.email === "quadvox0@gmail.com");
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
        // const filtered_data = null;
        return (
            <>
                <div className="headerSection">
                    <h1>Subscriptions</h1>
                </div>
                <div className="sectNavOpt">
                    <Link href={"/dashboard_admin"}>Overview</Link>
                    <i className="icofont-rounded-double-right"></i>
                    <p>Subscriptions</p>
                </div>
                <section className='subs dashprofileCntn'>
                  <div className='fancyBorderClass subsActivitiesCntn'>
                      <SubsClient subs_db_data={filtered_data} utilData={filtered_db_data}></SubsClient>
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
