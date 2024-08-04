import { UserProfile } from '@clerk/nextjs';
import Link from 'next/link';
import { dark } from "@clerk/themes";



const Page =  () => {

        
    return (
        <>
            <div className="headerSection">
                <h1>Profile Management</h1>
            </div>
            <div className="sectNavOpt">
                <Link href={"/dashboard"}>Overview</Link>
                <i className="icofont-rounded-double-right"></i>
                <Link href={"/dashboard/profile"}>Profile</Link>
                <i className="icofont-rounded-double-right"></i>
                <p>Profile Management</p>
            </div>
            {/* <section className='profile dashprofileCntn'>
                <div className="fancyBorderClass dashpfpDisplayCntn">
                    <div className="firstSection">
                        
                    </div>
                </div>
            </section> */}
            <div className="profilemanagement">
                <UserProfile
                    appearance={{
                        baseTheme: dark,
                        variables: {
                            colorBackground: "#2a2924",
                            fontSize: "18px",
                            colorInputBackground: "transparent"
                        }
                    }}
                ></UserProfile>
            </div>
        </>
    )


}

export default Page
