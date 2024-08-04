import Link from 'next/link';
import { fetchAllDocuments, fetchDocumentById } from '@/app/db/firestoreService';
import { notFound } from 'next/navigation';



const Page = async ({ params }) => {

    try {
        const users_from_db = await fetchDocumentById("users", params.id) || [];

        if (users_from_db.length <= 0){
            return notFound();
        }

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
        const filtered_db_data = documents_from_db?.filter(elem => elem?.customer?.email === users_from_db?.emailAddresses[users_from_db?.emailAddresses.length - 1].emailAddress && elem.status === "active");

        const filtered_data = await fetchSubscription(filtered_db_data);

        return (
            <>
                <div className="headerSection">
                    <h1>Profile</h1>
                </div>
                <div className="sectNavOpt">
                    <Link href={"/dashboard_admin"}>Overview</Link>
                    <i className="icofont-rounded-double-right"></i>
                    <Link href={"/dashboard_admin/users"}>Users</Link>
                    <i className="icofont-rounded-double-right"></i>
                    <p>User Details</p>
                </div>
                <section className='profile dashprofileCntn'>
                    <div className="fancyBorderClass dashpfpDisplayCntn">
                        <div className="firstSection">
                            <h2>Welcome back, {users_from_db?.username}</h2>
                            <img src={users_from_db?.imageUrl} alt={`${users_from_db?.fullName} profile picture`} />
                            <h4>{users_from_db?.fullName}</h4>
                            <p>{users_from_db?.emailAddresses[users_from_db?.emailAddresses.length - 1].emailAddress}</p>
                        </div>
                    </div>
                    <div className="fancyBorderClass dashpfpDisplayCntn">
                        <div className="firstSection secSection">
                            <h2>User Details</h2>
                            <div className="theDataCntn">
                                <div className="unitDataCard">
                                    <h4>First Name :</h4>
                                    <div className="dataValue">{users_from_db?.firstName}</div>
                                </div>
                                <div className="unitDataCard">
                                    <h4>Last Name :</h4>
                                    <div className="dataValue">{users_from_db?.lastName}</div>
                                </div>
                                <div className="unitDataCard">
                                    <h4>Username :</h4>
                                    <div className="dataValue">{users_from_db?.username}</div>
                                </div>
                                <div className="unitDataCard">
                                    <h4>ID Number:</h4>
                                    <div className="dataValue">{users_from_db?.id}</div>
                                </div>
                                <div className="unitDataCard">
                                    <h4>Email Address :</h4>
                                    <div className="dataValue">{users_from_db?.emailAddresses[users_from_db?.emailAddresses.length - 1].emailAddress}</div>
                                </div>
                                <div className="unitDataCard">
                                    <h4>Current Plan :</h4>
                                    <div className="dataValue">{filtered_data ? filtered_data[0].plan.name : "No Active Plan"}</div>
                                </div>
                                <div className="unitDataCard">
                                    <h4>Plan Expiration Date :</h4>
                                    <div className="dataValue">{filtered_data ? filtered_data[0].next_payment_date : "No Active Plan"}</div>
                                </div>
                                <div className="unitDataCard">
                                    <h4>Created On :</h4>
                                    <div className="dataValue">{`${new Date(parseInt(users_from_db?.createdAt, 10)).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year:  'numeric', hour: 'numeric', minute: 'numeric', hour12: true})}`}</div>
                                </div>
                                <div className="unitDataCard">
                                    <h4>Updated On :</h4>
                                    <div className="dataValue">{`${new Date(parseInt(users_from_db?.updatedAt, 10)).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year:  'numeric', hour: 'numeric', minute: 'numeric', hour12: true})}`}</div>
                                </div>
                                <div className="unitDataCard">
                                    <h4>Last Login :</h4>
                                    <div className="dataValue">{`${new Date(parseInt(users_from_db?.updatedAt, 10)).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year:  'numeric', hour: 'numeric', minute: 'numeric', hour12: true})}`}</div>
                                </div>
                            </div>
                            {
                                filtered_data && (
                                    <div className="bottomDeep">
                                        {
                                            filtered_data[0].plan.subscription_code ? (
                                                <Link href={`/dashboard_admin/subs/${filtered_data[0].plan.subscription_code}`}>Current Subscription</Link>
                                            ) : (
                                                <Link href={`/dashboard_admin/packages/${filtered_data[0].id}`}>Current Subscription</Link>
                                            )
                                        }
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
