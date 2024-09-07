import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { fetchAllDocuments } from '@/app/db/firestoreService';

export const metadata = {
    title: 'Your Dashboard | DMayor Fitness & Game Hub',
    description: "Access your personal dashboard at DMayor Fitness & Game Hub. Manage your profile, track your progress & subscriptions, and stay engaged.",
    openGraph: {
      type: "website",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
      title: 'DMayor Fitness Dashboard',
      description: 'Manage your profile, track your fitness journey, and stay engaged with the DMayor Fitness & Game Hub Dashboard.',
    },
    twitter: {
      card: "Dashboard",
      creator: "@QuadVox",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
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
            //   const filtered_data_paystack = data?.data.filter(elem => elem.customer.email === "quadvox0@gmail.com");
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
        const filtered_db_data = documents_from_db?.filter(elem => elem?.customer?.email === user?.emailAddresses[user?.emailAddresses.length - 1].emailAddress && elem.status === "active");


        const filtered_data = await fetchSubscription(filtered_db_data);

        const notifdocument_from_db = await fetchAllDocuments('notifications') || [];
        const notifs_from_db =  notifdocument_from_db.filter((elem, idx) => (elem.email === user?.emailAddresses[user?.emailAddresses.length - 1].emailAddress && elem.seen === false));
        return (
            <>
                <div className="headerSection">
                    <h1> Welcome back, {user?.fullName}</h1>

                    <div className="rightyDashBox">
                        <Link href={"/dashboard/notifications"}><i className="icofont-ui-alarm"></i> <b>{notifs_from_db.length}</b></Link>
                        <Link href={"/dashboard/settings"}><i className="icofont-ui-settings"></i></Link>
                        <Link href={"/dashboard/profile"}><img src={user?.imageUrl} alt={`${user?.fullName} profile picture`} /> </Link>
                    </div>

                </div>
                <section className='overview dashOverveiwCntn dashCntn'>
                    <div className="firstSect">
                        <div className="lefty">
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
                                                                    <div className="subsData">
                                                                        <h3>{elem?.plan.name}</h3>
                                                                        <p className='uniPtagsClass'>Expiration Date: <span>{`${new Date(elem?.next_payment_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year:  'numeric', hour: 'numeric', minute: 'numeric', hour12: true})}`}</span></p>
                                                                    </div>
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
                                                <div className="bottomDeep">
                                                    <Link href={"/dashboard/subs"}>See all subscriptions</Link>
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
                            <div className="fancyBorderClass">
                                <div className="packageAds">
                                    <div className="leftyPackages">
                                        <h3>Subscribe to a 1-Year Package and get a <span>77%</span> discount</h3>
                                        <p>Offers run for a limited time only</p>
                                    </div>
                                    <a className="specBtn fillBtn" href="https://paystack.com/pay/dmayorfithub_1_year_package" >Subscribe</a>
                                </div>
                            </div>
                        </div>
                        <div className="fancyBorderClass OverviewfirstSectRightyCntn">
                            <div className="righty">
                                <h2>Profile Overview</h2>
                                <div className="profileOverviewData">
                                    <div className="topTop">
                                        <img src={user?.imageUrl} alt={`${user?.fullName} profile picture`} />
                                        <h4>{user?.fullName}</h4>
                                        <p>{user?.emailAddresses[user?.emailAddresses.length - 1].emailAddress}</p>
                                    </div>
                                    <div className="otherProfileData">
                                        <ul>
                                            <li>Username: <span>{user?.username}</span></li>
                                            <li>Created_At: <span>{`${new Date(parseInt(user?.createdAt, 10)).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year:  'numeric', hour: 'numeric', minute: 'numeric', hour12: true})}`}</span></li>
                                            <li>Last Update Time : <span>{`${new Date(parseInt(user?.updatedAt, 10)).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year:  'numeric', hour: 'numeric', minute: 'numeric', hour12: true})}`}</span></li>
                                            <li>Last Login Time: <span>{`${new Date(parseInt(user?.lastActiveAt, 10)).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year:  'numeric', hour: 'numeric', minute: 'numeric', hour12: true})}`}</span></li>
                                            <li>ID: <span>{user?.id}</span></li>
                                            <li>IsAdmin: <span>{user?.publicMetadata.admin ? "True": "False"}</span></li>
                                            {/* <li>Current Plan: <span>{util_data ? util_data[0]?.plan.name : "No Active Plan"}</span></li> */}
                                        </ul>
                                    </div>
                                    <div className="bottomDeep">
                                        <Link href={"/dashboard/profile"}>See all profile details</Link>
                                    </div>
                                </div>
                            </div>
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
