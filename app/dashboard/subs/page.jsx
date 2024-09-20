import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { fetchAllDocuments } from '@/app/db/firestoreService';

export const metadata = {
  title: 'Your Subscriptions | DMayor Fitness & Game Hub',
  description: "Access your personal dashboard at DMayor Fitness & Game Hub. Manage your profile, track your progress & subscriptions, and stay engaged.",
  openGraph: {
    type: "website",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/subs`,
    title: 'DMayor Fitness Dashboard',
    description: 'Manage your profile, track your fitness journey, and stay engaged with the DMayor Fitness & Game Hub Dashboard.',
  },
  twitter: {
    card: "summary_image_large",
    creator: "@QuadVox",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/subs`,
    title: 'Your Profile | DMayor Fitness',
    description: 'Keep track of your progress and manage your profile with the DMayor Fitness & Game Hub Dashboard.',
  },
}

const Page = async () => {
    const user = await currentUser();

    try {
        const fetchSubscription = async (vlad) => {
            try {
    
              const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getSubs`);
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
    
              const data = await response.json();
              const filtered_data_paystack = data?.data.filter(elem => elem.customer.email === user?.emailAddresses[user?.emailAddresses.length - 1].emailAddress );
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
        const filtered_db_data = documents_from_db?.filter(elem => elem?.customer?.email === user?.emailAddresses[user?.emailAddresses.length - 1].emailAddress);


        const filtered_data = await fetchSubscription(filtered_db_data);
        // const filtered_data = null;
        return (
            <>
                <div className="headerSection">
                    <h1>Subscriptions</h1>
                </div>
                <div className="sectNavOpt">
                    <Link href={"/dashboard"}>Overview</Link>
                    <i className="icofont-rounded-double-right"></i>
                    <p>Subscriptions</p>
                </div>
                <section className='subs dashprofileCntn'>
                  <div className='fancyBorderClass subsActivitiesCntn'>
                      <div className="subsActivities">
                        <h2>Subscription History</h2>
                        {
                          filtered_data ? (
                              <>
                                <div className="sublists">
                                  <ul>
                                    {
                                      filtered_data.map((elem, idx) => (
                                        <li key={`usbHist_${idx}`}>
                                          <div className="subsDataCntn">
                                            <p>{idx + 1}</p>
                                            <div className="subsData">
                                                <h3>{elem?.plan.name}</h3>
                                                <p className='uniPtagsClass'>Expiration Date: <span>{`${new Date(elem?.next_payment_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year:  'numeric', hour: 'numeric', minute: 'numeric', hour12: true})}`}</span></p>
                                            </div>
                                          </div>
                                          <p className="subCode">
                                            {elem?.subscription_code}
                                          </p>
                                          <b className={`${elem?.status}`}>{elem?.status} <i className="icofont-info-square"></i></b>
                                          {
                                              elem?.subscription_code ? (
                                                  <Link href={`/dashboard/subs/${elem?.subscription_code}`}>View Details</Link>
                                              ) : (
                                                  <p className='uniPtagsClass'>Visit days left : {elem?.remaining_visit_days}</p>
                                              )
                                          }
                                        </li>
                                      ))
                                    }
                                  </ul>
                                </div>
                              </>
                          ) : (
                            <div className="emptyObjectCntn">
                              <i className="icofont-angry-monster"></i>
                              <p>Oi!, you have nothing going on in your subscription history. <Link href={"/membership"}>Subscribe here</Link> and check back later. Ciao.</p>
                            </div>
                          )
                        }
                      </div>
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
