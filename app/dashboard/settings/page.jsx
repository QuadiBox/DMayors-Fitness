import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { fetchAllDocuments } from '@/app/db/firestoreService';
import SettingsClient from './settingsClient';



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
