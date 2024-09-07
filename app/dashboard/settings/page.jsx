import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { fetchAllDocuments } from '@/app/db/firestoreService';
import SettingsClient from './settingsClient';

export const metadata = {
  title: 'Settings | Dashboard | DMayor Fitness & Game Hub',
  description: "Access your personal dashboard at DMayor Fitness & Game Hub. Manage your profile, track your progress & subscriptions, and stay engaged.",
  openGraph: {
    type: "website",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/settings`,
    title: 'DMayor Fitness Dashboard',
    description: 'Manage your profile, track your fitness journey, and stay engaged with the DMayor Fitness & Game Hub Dashboard.',
  },
  twitter: {
    card: "Settings - Dashboard",
    creator: "@QuadVox",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/settings`,
    title: 'Your Profile | DMayor Fitness',
    description: 'Keep track of your progress and manage your profile with the DMayor Fitness & Game Hub Dashboard.',
  },
}

const Page =  () => {

  return (
      <>
          <div className="headerSection">
              <h1>Settings</h1>
          </div>
          <div className="sectNavOpt">
              <Link href={"/dashboard"}>Overview</Link>
              <i className="icofont-rounded-double-right"></i>
              <p>Settings</p>
          </div>
          <section className='settings dashprofileCntn'>
            <div className='fancyBorderClass subsActivitiesCntn'>
              <SettingsClient></SettingsClient>
            </div>
          </section>
      </>
  )
}

export default Page
