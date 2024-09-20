import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { fetchAllDocuments } from '@/app/db/firestoreService';
import NotificationClient from './notificationClient'

export const metadata = {
  title: 'Notifications | Dashboard | DMayor Fitness & Game Hub',
  description: "Access your personal dashboard at DMayor Fitness & Game Hub. Manage your profile, track your progress & subscriptions, and stay engaged.",
  openGraph: {
    type: "website",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/notifications`,
    title: 'DMayor Fitness Dashboard',
    description: 'Manage your profile, track your fitness journey, and stay engaged with the DMayor Fitness & Game Hub Dashboard.',
  },
  twitter: {
    card: "Nsummary_image_large",
    creator: "@QuadVox",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/notifications`,
    title: 'Your Profile | DMayor Fitness',
    description: 'Keep track of your progress and manage your profile with the DMayor Fitness & Game Hub Dashboard.',
  },
}

const Page = async () => {
    const user = await currentUser();

    try {

        const documents_from_db = await fetchAllDocuments('notifications') || [];
        const filtered_db_data = documents_from_db.filter((elem, idx) => (elem.email === user?.emailAddresses[user?.emailAddresses.length - 1].emailAddress));
        return (
            <>
                <div className="headerSection">
                    <h1>Notifications</h1>
                </div>
                <div className="sectNavOpt">
                    <Link href={"/dashboard"}>Overview</Link>
                    <i className="icofont-rounded-double-right"></i>
                    <p>Notifications</p>
                </div>
                <section className='notifications dashprofileCntn'>
                  <div className='fancyBorderClass subsActivitiesCntn'>
                      <div className="subsActivities">
                        <h2>Notification History</h2>
                        {
                          filtered_db_data ? (
                              <>
                                <div className="sublists">
                                  <NotificationClient filtered_db_data={filtered_db_data}></NotificationClient>
                                </div>
                              </>
                          ) : (
                            <div className="emptyObjectCntn">
                              {/* <i className="icofont-angry-monster"></i> */}
                              <i className="icofont-ui-alarm"></i>
                              <p>Oi!, you have nothing going on in your notification history. How about you go on and do something somewhere around here?. Start by <Link href={"/membership"}>Subscribing here</Link> and check back later. Ciao.</p>
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
