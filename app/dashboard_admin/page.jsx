import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { fetchAllDocuments } from '@/app/db/firestoreService';



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
              const filtered_data_paystack = data?.data
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
        const filtered_db_data = documents_from_db.filter((elem) => (elem.status))
        const filtered_data = await fetchSubscription(filtered_db_data);

        const fetchActivePlanName = (vlad) => {
            const active_plans = filtered_data?.filter(elem => elem?.customer?.email === vlad && elem?.status === "active" );
            const currentPlan = active_plans[0]?.plan?.name;

            if (currentPlan) {
                return currentPlan;
            } else {
                return null;
            }
        }

        const users = await fetchAllDocuments('users');
        const users_from_db = users.filter((elem) => elem.email !== undefined && elem.email !== null);

        const notifdocument_from_db = await fetchAllDocuments('adminNotifications');
        const notifs_from_db =  notifdocument_from_db.filter((elem, idx) => ( elem.seen === false ));
        return (
            <>
                <div className="headerSection">
                    <h1> Welcome back, {user?.fullName}</h1>

                    <div className="rightyDashBox">
                        <Link href={"/dashboard_admin/notifications"}><i className="icofont-ui-alarm"></i> <b>{notifs_from_db.length}</b></Link>
                        <Link href={"/dashboard_admin/settings"}><i className="icofont-ui-settings"></i></Link>
                        <Link href={"/dashboard_admin/users"}><img src={user?.imageUrl} alt={`${user?.fullName} profile picture`} /> </Link>
                    </div>

                </div>
                <section className='overview dashprofileCntn dashCntn'>
                        <div className='fancyBorderClass subsActivitiesCntn '>
                            <div className="subsActivities">
                                <h2>Users&apos; Subscriptions</h2>
                                {
                                filtered_data ? (
                                    <>
                                        <div className="sublists">
                                            <ul>
                                                {
                                                    filtered_data.map((elem, idx) => (
                                                        <li key={`usbHistAdmin_${idx}`}>
                                                        <div className="subsDataCntn">
                                                            <p>{idx + 1}</p>
                                                            <div className="subsData">
                                                                <h3>{elem?.plan?.name}</h3>
                                                                <p className='uniPtagsClass'>Expiration Date: <span>{`${new Date(elem?.next_payment_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year:  'numeric', hour: 'numeric', minute: 'numeric', hour12: true})}`}</span></p>
                                                            </div>
                                                        </div>
                                                        <p className="subCode">
                                                            {elem?.subscription_code}
                                                        </p>
                                                        <b className={`${elem?.status}`}>{elem?.status} <i className="icofont-info-square"></i></b>
                                                        {
                                                            elem?.subscription_code ? (
                                                                <Link href={`/dashboard_admin/subs/${elem?.subscription_code}`}>View Details</Link>
                                                            ) : (
                                                                <Link href={`/dashboard_admin/packages/${elem?.id}`}>View Details</Link>
                                                            )
                                                        }
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                        <div className="bottomDeep">
                                            <Link href={"/dashboard_admin/subs"}>See all users&apos; subscriptions</Link>
                                        </div>
                                    </>
                                ) : (
                                    <div className="emptyObjectCntn">
                                        <i className="icofont-angry-monster"></i>
                                        <p>Oi!, you have nothing going on in your subscription history. Wait for users to create subscriptions to see their subscriptions here. Ciao.</p>
                                    </div>
                                )
                                }
                            </div>
                        </div>
                        <div className='fancyBorderClass subsActivitiesCntn'>
                            <div className="subsActivities">
                                <h2>Users</h2>
                                {
                                    users_from_db?.length > 0 ? (
                                    <>
                                        <div className="sublists">
                                            <ul>
                                                {
                                                    users_from_db.map((elem, idx) => (
                                                        <li key={`userOverviewAdmin_${idx}`}>
                                                            <div className="subsDataCntn">
                                                                <p>{idx + 1}</p>
                                                                <div className="subsData">
                                                                    <h3>{elem?.fullName}</h3>
                                                                    <p className='uniPtagsClass'>{elem?.emailAddresses[elem?.emailAddresses.length - 1].emailAddress}</p>
                                                                </div>
                                                            </div>
                                                            <div className="subsDataCntn">
                                                                <div className="subsData">
                                                                    <p className='uniPtagsClass'>Active Plan</p>
                                                                    <h3>
                                                                        {
                                                                            fetchActivePlanName(elem?.emailAddresses[elem?.emailAddresses.length - 1].emailAddress) ? 
                                                                            fetchActivePlanName(elem?.emailAddresses[elem?.emailAddresses.length - 1].emailAddress) :
                                                                            "No Active Plan"
                                                                        }
                                                                    </h3>
                                                                </div>
                                                            </div>
                                                            <p className="subCode">
                                                            {`${new Date(elem?.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year:  'numeric', hour: 'numeric', minute: 'numeric', hour12: true})}`}
                                                            </p>
                                                            {
                                                                elem?.id ? (
                                                                    <Link href={`/dashboard_admin/users/${elem?.id}`}>View Details</Link>
                                                                ) : (
                                                                    <p className='uniPtagsClass'>Undefined ID</p>
                                                                )
                                                            }
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                        <div className="bottomDeep">
                                            <Link href={"/dashboard_admin/users"}>See all users</Link>
                                        </div>
                                    </>
                                ) : (
                                    <div className="emptyObjectCntn">
                                        <i className="icofont-bin"></i>
                                        <p>Oi!, you currently have no user. Wait for users to create accounts to see their profile data here. Ciao.</p>
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
