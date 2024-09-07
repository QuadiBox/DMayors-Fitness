import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { fetchAllDocuments } from '@/app/db/firestoreService';
import NotificationClient from './notificationClient'

export const metadata = {
  title: 'Notifications | Dashboard | DMayor Fitness & Game Hub',
  description: "Access your personal dashboard at DMayor Fitness & Game Hub. Manage your profile, track your progress & subscriptions, and stay engaged.",
  openGraph: {
    type: "website",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard_admin/notifications`,
    title: 'DMayor Fitness Dashboard',
    description: 'Manage your profile, track your fitness journey, and stay engaged with the DMayor Fitness & Game Hub Dashboard.',
  },
  twitter: {
    card: "Notifications - Dashboard",
    creator: "@QuadVox",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard_admin/notifications`,
    title: 'Your Profile | DMayor Fitness',
    description: 'Keep track of your progress and manage your profile with the DMayor Fitness & Game Hub Dashboard.',
  },
}

const Page = async () => {
    const user = await currentUser();

    try {

        const notifdocument_from_db = await fetchAllDocuments('adminNotifications');
        const notifs_from_db =  notifdocument_from_db.filter((elem, idx) => ( elem.seen === false )) || [];

        return (
            <>
                <div className="headerSection">
                  <h1>Notifications</h1>
                </div>
                <div className="sectNavOpt">
                  <Link href={"/dashboard_admin"}>Overview</Link>
                  <i className="icofont-rounded-double-right"></i>
                  <p>Notifications</p>
                </div>
                <section className='notifications dashprofileCntn'>
                  <div className='fancyBorderClass subsActivitiesCntn'>
                      <div className="subsActivities">
                        <h2>Notification History</h2>
                        {
                          notifs_from_db ? (
                              <>
                                <div className="sublists">
                                  <NotificationClient filtered_db_data={notifs_from_db}></NotificationClient>
                                </div>
                              </>
                          ) : (
                            <div className="emptyObjectCntn">
                              {/* <i className="icofont-angry-monster"></i> */}
                              <i className="icofont-ui-alarm"></i>
                              <p>Oi!, you have nothing going on in your notification history. Kindly wait til carry out actions to see various notifications of their actions here. Ciao.</p>
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
