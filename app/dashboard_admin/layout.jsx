import Link from "next/link";
import { currentUser } from '@clerk/nextjs/server';
import { fetchAllDocuments } from '@/app/db/firestoreService';
import { SignOutButton } from "@clerk/nextjs";
import DashMenuBtn from "./DashMenuBtn";

import { redirect } from "next/navigation";



export default async function RootLayout({ children }) {
    const user = await currentUser();

    if (!user?.publicMetadata?.admin) {
        redirect("/dashboard");
    }

    const notifdocument_from_db = await fetchAllDocuments('adminNotifications') || [];
    const notifs_from_db =  notifdocument_from_db.filter((elem, idx) => (elem.email === user?.emailAddresses[user?.emailAddresses.length - 1].emailAddress && elem.seen === false));
    
    return (
        <div className="dashboardGrandCntn">
            <div className="dashNavGrandCntn desktop">

                <div className="fancyBorderClass dashNavCntn">
                    <nav>
                        <div className="topDashNav">
                            <Link href={"/"}>DMAYORS FITNESS</Link>
                            <div className="pfpDisplay">
                                <img src={user?.imageUrl} alt={`${user?.fullName} profile picture`} />
                                <div className="pfpData">
                                    <h2>{user?.fullName}</h2>
                                    <p>{user?.emailAddresses[user?.emailAddresses.length - 1].emailAddress}</p>
                                </div>
                            </div>
                            <p className="joinOn">Joined on: <span>{`${new Date(parseInt(user?.createdAt, 10)).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year:  'numeric', hour: 'numeric', minute: 'numeric', hour12: true})}`}</span></p>
                        </div>
                        <ul>
                            <div className="listCntn">
                                <li><Link className="active" href={"/dashboard"}> <i className="icofont-dashboard-web"></i> Overview</Link></li>
                                <li><Link href={"/dashboard_admin/users"}><i className="icofont-user"></i> Users</Link></li>
                                <li><Link href={"/dashboard_admin/subs"}><i className="icofont-sub-listing"></i>Subscriptions</Link></li>
                                <li><Link href={"/dashboard_admin/notifications"}><i className="icofont-ui-alarm"></i> Notifications <b className="notifNum">{notifs_from_db.length}</b></Link></li>
                                <li><Link href={"/dashboard_admin/settings"}><i className="icofont-ui-settings"></i>Settings</Link></li>

                                <span></span>
                            </div>
                            <div className="specBtn borderBtn navspec">
                                <SignOutButton></SignOutButton>
                            </div>

                        </ul>
                    </nav>
                </div>
            </div>
            <DashMenuBtn data={notifs_from_db}></DashMenuBtn>
            <main className='dashboardCntn'>
                { children }
                <footer>
                    <div className="fancyBorderClass dashfooter">
                        <div className="footerSection">
                            <p>Copyright © 2023 Dmayorfitnesshub.com. All rights reserved.</p>
                            <p>#NOJUDGEMENT</p>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}