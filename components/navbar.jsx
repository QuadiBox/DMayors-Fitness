'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs';
import { fetchAllDocuments } from '@/app/db/firestoreService';

import { useUser } from '@clerk/nextjs';


const navDrop = {
    init: {
        y: "-100%",
        opacity: 0
    }, 
    finale: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.4,
            type: "easeOut"
        }
    }, 
    exit: {
        y: "-100%",
        transition: {
            duration: 0.3,
            type: "ease"
        }
    }
}


const Navbar = () => {
    const [openNavbar, setOpenNavbar] = useState(false);
    const [openMobileNav, setopenMobileNav] = useState(false);

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const { isLoaded, isSignedIn, user} = useUser();


    useEffect(() => {
        const comtainer = document.querySelector(".grandHomeCntn");
    
        comtainer?.addEventListener("click", (e) => {
            if (e.target.className === "navbarOpenBtn" || e.target.className === "des-span") {
                setOpenNavbar(true)
                setopenMobileNav(true)

            } else if (e.target.className === "closeNavbarButton" || e.target.className === "icofont-close-line" || e.target.className === "sideNavbarCloseBtn" || e.target.className === "icofont-close") {
                setOpenNavbar(false)
                setopenMobileNav(false)
            }
        })

        return (
            comtainer?.removeEventListener("click", (e) => {
                console.log(e.target.className);
            })
        )

    }, []);


    const fetchSubscription = async (vlad) => {
        try {
            const response = await fetch('/api/getSubs');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const filtered_data_paystack = data?.data.filter(elem => elem.customer.email === user?.emailAddresses[user?.emailAddresses.length - 1].emailAddress && elem.status === "active");
            const filtered_data = [...vlad, ...filtered_data_paystack].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            if (filtered_data.length > 0) {
                setData({planData: filtered_data[0]?.plan?.plan_code ? filtered_data[0].plan : filtered_data[0].plan_object , userData: filtered_data[0].customer});
            } else {
                setData("");
            }


            setError(null);
        } catch (error) {
            setData(null);
            setError(error.message);
        }
    };


    useEffect(() => {


        const fetchData = async () => {
          try {
            const documents_from_db = await fetchAllDocuments('subscriptions') || [];
            const filtered_db_data = documents_from_db?.filter(elem => elem?.customer?.email === user?.emailAddresses[user?.emailAddresses.length - 1].emailAddress);
            return filtered_db_data;
          } catch (error) {
            setError(error.message);
          }
        };
    
        const handle_no_refrence_data = async () => {
            const db_filtered_data = await fetchData();
            fetchSubscription(db_filtered_data);
        };
    
        if (isLoaded || isSignedIn) {
          handle_no_refrence_data();
        }
    
    }, [isLoaded, isSignedIn ]);


  return (
    <header>
        <div className="headerCntn">
            <button className="navbarOpenBtn">
                <span className="des-span"></span>
                <span className="des-span"></span>
                <span className="des-span"></span>
            </button>
            <div className="centerBox">
                <Link href={"/"}> <p>DMAYOR FITNESS <i className="icofont-x"></i></p></Link>
            </div>

            {/* <div><h1>Dear Quadri, <br /> We warmly welcome you to the family</h1><p>Nice having you here.</p><p>Would you care to <a href="https://dmayorsfitness.vercel.app/membership">subscribe</a> and get started right away?</p></div> */}

            <div className="rightBox">
                <SignedOut>
                    <div className="linkSetUp1">
                        <span className="specBtn borderBtn navspec"><SignInButton mode="modal" /></span>
                    </div>

                    <div className="linkSetUp1">
                        <span className="specBtn fillBtn navspec"><SignUpButton mode="modal" /></span>
                    </div>
                </SignedOut>
                <SignedIn>
                    <UserButton></UserButton>
                </SignedIn>
            </div>
        </div>

        <AnimatePresence mode="wait">
            {
                openNavbar && (
                    <motion.div className="navDropper" variants={navDrop} initial="init" animate="finale" exit="exit">
                        <div className="topnavDropperBar">
                            <button className="closeNavbarButton"><i className="icofont-close-line"></i>Click .To .Close</button>
                            <SignedIn>
                                <UserButton showName></UserButton>
                            </SignedIn>
                            <div className="leftTopDBar">
                                <Link href={"/blog"}>HEALTH & WELLNESS BLOG</Link>
                                <Link href={"/events"}>EVENTS</Link>
                                <a className="social" href="https://x.com/Dmayorfithub"><svg width="40" height="40" viewBox="0 0 40 40" fill="white" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.5983 18.31L27.8524 10.8999H26.3704L20.9399 17.3339L16.6026 10.8999H11.6L18.1589 20.6293L11.6 28.3999H13.0821L18.8168 21.6053L23.3974 28.3999H28.4L21.5979 18.31H21.5983ZM19.5683 20.715L18.9037 19.7462L13.6161 12.0371H15.8926L20.1597 18.2586L20.8243 19.2274L26.3711 27.3144H24.0946L19.5683 20.7154V20.715Z" fill="inherit"/>
                                    </svg>
                                </a>
                                <a className="social" href="https://www.instagram.com/dmayorfitness?igshid=NzZlODBkYWE4Ng%3D%3D"><svg width="40" height="40" viewBox="0 0 40 40" fill="white" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M20.0416 24.8745C17.3618 24.8745 15.1885 22.6942 15.1885 20.0215C15.1885 17.3488 17.3689 15.1684 20.0416 15.1684C22.7143 15.1684 24.8946 17.3488 24.8946 20.0215C24.8946 22.6942 22.7143 24.8745 20.0416 24.8745ZM20.0416 16.0335C17.8401 16.0335 16.0536 17.82 16.0536 20.0215C16.0536 22.2229 17.8401 24.0094 20.0416 24.0094C22.243 24.0094 24.0295 22.2229 24.0295 20.0215C24.0295 17.82 22.236 16.0335 20.0416 16.0335Z" fill="inherit"/>
                                        <path d="M26.2309 14.8937C26.2309 15.5502 25.6988 16.0823 25.0423 16.0823C24.3858 16.0823 23.8537 15.5502 23.8537 14.8937C23.8537 14.2372 24.3858 13.7051 25.0423 13.7051C25.6988 13.7051 26.2309 14.2372 26.2309 14.8937Z" fill="inherit"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M24.4656 29.3332H15.8004C12.966 29.3332 10.666 27.0262 10.666 24.1988V15.8009C10.666 12.9664 12.973 10.6665 15.8004 10.6665H24.4656C27.3 10.6665 29.607 12.9735 29.607 15.8009V24.1988C29.5999 27.0262 27.293 29.3332 24.4656 29.3332ZM15.7934 11.5246C13.4372 11.5246 11.5241 13.4377 11.5241 15.7939V24.1917C11.5241 26.5479 13.4372 28.461 15.7934 28.461H24.4585C26.8147 28.461 28.7278 26.5479 28.7278 24.1917V15.7939C28.7278 13.4377 26.8147 11.5246 24.4585 11.5246H15.7934Z" fill="inherit"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <nav className="bottomnavDropperBar">
                            <ul>
                                <li><Link href={"/about"} className="unitNavLink"> <p> <i className="icofont-muscle-weight"></i> ABOUT</p></Link></li>
                                <li><Link href={"/membership"} className="unitNavLink"> <p> <i className="icofont-id-card"></i> MEMBERSHIP</p></Link></li>
                                <li><Link href={"/dashboard"} className="unitNavLink"> <p><i className="icofont-dashboard-web"></i> DASHBOARD</p></Link></li>
                                <li><Link href={"/game_hub"} className="unitNavLink"> <p><i className="icofont-game-controller"></i> GAME .HUB</p></Link></li>
                            </ul>
                        </nav>
                    </motion.div>
                )
            }
            

        </AnimatePresence>
        
        {
            openMobileNav && (
                <motion.div className="mobileSideNavCntn">
                    <div className="mobileSideNav">
                        <div className="topSectSideNav">
                            <>
                                <SignedIn>
                                    <h2>
                                        <UserButton showName></UserButton>
                                    </h2>
                
                                    <p><span>{data && data !== "" ? data?.userData?.id : "101010"}</span> | <span>{data && data !== "" ? data?.planData?.name : "No Active Plan"}</span></p>
                                </SignedIn> 
                                <SignedOut>
                                    <p><SignInButton mode="modal"></SignInButton> | <SignUpButton mode="modal"></SignUpButton></p>
                                </SignedOut>
                            </>
                        </div>
                        <div className="bottomSectSideNav">
                            <Link href={"/about"}>About</Link>
                            <Link href={"/membership"}>Membership</Link>
                            <Link href={`${openMobileNav ? "/dashboard" : "/dashboard_admin"}`}>Dashboard</Link>
                            <Link href={"/game_hub"}>Game.Hub</Link>
                            <a href="#FAQs">FAQs</a>

                        </div>
                    </div>
                    <div className="buttonCntn">
                        <button type="button" className="sideNavbarCloseBtn"><i className="icofont-close"></i></button>
                    </div>
                </motion.div>
            )
        }

    </header>
  )
}

export default Navbar
