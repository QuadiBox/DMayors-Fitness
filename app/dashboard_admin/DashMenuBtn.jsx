'use client'
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";



const DashMenuBtn = ({ data }) => {
    const [openMobileNav, setopenMobileNav] = useState(false);
    const { isLoaded, isSignedIn, user} = useUser();



    useEffect(() => {
        const comtainer = document.querySelector(".dashboardGrandCntn");

        const handleClick = (e) => {
            if (e.target.className === "closeDashMneu" || e.target.className === "icofont-close") {
                setopenMobileNav(false);
                document.body.style.overflow = '';
            } else if (e.target.className === "openDashSideMenu" || e.target.className === "icofont-indent" ) {
                setopenMobileNav(true)
                document.body.style.overflow = 'hidden';
            } else {
                setopenMobileNav(false)
                document.body.style.overflow = '';
            }
        };
      

        comtainer?.addEventListener("click", handleClick);
        
        // Cleanup the event listener on component unmount
        return () => {
            if (comtainer) {
                comtainer.removeEventListener('click', handleClick);
            }
        };

    }, []);

    //Animation variable
    const dashNavSlide = {
        init: {
            x: "-100%",
        }, 
        finale: {
            x: 0,
            transition: {
                duration: 0.4,
                type: "easeOut"
            }
        }, 
        exit: {
            x: "-100%",
            transition: {
                duration: 0.3,
                type: "ease"
            }
        }
    }

    return (
        <>
            <button className="open_Sesame" type="button"><i className="icofont-indent"></i></button>

            <AnimatePresence>
                {
                    openMobileNav && (
                        <motion.div variants={dashNavSlide} initial="init" animate="finale" exit="exit" className="dashNavGrandCntn mobile">
            
                            <div className="fancyBorderClass dashNavCntn">
                                <nav>
                                    <div className="topDashNav">
                                        <button className="closeDashMneu" type="button"><i className="icofont-close"></i></button>
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
                                            <li><Link href={"/dashboard/profile"}><i className="icofont-user"></i> Profile</Link></li>
                                            <li><Link href={"/dashboard/subs"}><i className="icofont-sub-listing"></i>Subscriptions</Link></li>
                                            <li><Link href={"/dashboard/notifications"}><i className="icofont-ui-alarm"></i> Notifications <b className="notifNum">{data.length}</b></Link></li>
                                            <li><Link href={"/dashboard/settings"}><i className="icofont-ui-settings"></i>Settings</Link></li>
                
                                            <span></span>
                                        </div>
                                        <div className="specBtn borderBtn navspec">
                                            <SignOutButton></SignOutButton>
                                        </div>
                
                                    </ul>
                                </nav>
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </>
    )
}

export default DashMenuBtn
