import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { fetchAllDocuments } from '@/app/db/firestoreService';
import NotificationClient from './notificationClient'



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
