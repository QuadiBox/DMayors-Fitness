import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='homefooter'>
      <div className="firstFooterSect">
        <div className="topper">
            <h2>DMAYOR FITNESS</h2>
            <span></span>
            <div className="socials_1">
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
                <a href="https://t.me/Ekiti1">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25.83 28.8147C25.5293 28.8147 25.2361 28.7194 24.9868 28.5361L20.6168 25.3319L18.4978 27.4949C18.3511 27.6415 18.1825 27.7368 17.9992 27.8028C17.3393 28.0081 16.6427 27.6489 16.4374 26.9963L14.8097 21.7611L10.425 20.4633C10.0951 20.368 9.82378 20.1114 9.69913 19.7888C9.4865 19.2168 9.77246 18.579 10.3444 18.359L28.5136 11.2761C28.7702 11.1808 29.0488 11.1588 29.3128 11.2174C30.0606 11.3861 30.5299 12.1266 30.3613 12.8745L27.2231 27.6855C27.1864 27.8835 27.0984 28.0741 26.9738 28.2354C26.7465 28.5434 26.4166 28.7414 26.0426 28.7927C25.9766 28.8074 25.9033 28.8147 25.83 28.8147ZM20.5728 24.2907C20.6681 24.2907 20.7561 24.3201 20.8367 24.3787L25.5147 27.8175C25.632 27.9055 25.7713 27.9422 25.9106 27.9128C26.0499 27.8908 26.1746 27.8175 26.2552 27.7075C26.2992 27.6489 26.3286 27.5755 26.3432 27.5022L29.4888 12.6839C29.5181 12.5519 29.4961 12.4199 29.4227 12.3026C29.3494 12.1926 29.2394 12.1119 29.1148 12.0826C29.0195 12.0606 28.9242 12.0679 28.8288 12.1046L10.6597 19.1875C10.5423 19.2315 10.491 19.3562 10.5277 19.4661C10.5497 19.5248 10.6083 19.5761 10.6743 19.5981L15.147 20.9179C15.2203 20.8299 15.3009 20.7566 15.3963 20.7126L25.8886 14.2456C25.9253 14.2236 25.9693 14.2016 26.0133 14.1943C26.3652 14.1063 26.7318 14.3263 26.8198 14.6782C26.8711 14.8762 26.8271 15.0815 26.7025 15.2428L18.1752 22.773L17.2733 26.703C17.332 26.8863 17.5299 26.9816 17.7132 26.9303C17.7646 26.9156 17.8159 26.8863 17.8599 26.8423L20.2428 24.4081C20.3382 24.3347 20.4555 24.2907 20.5728 24.2907ZM15.9841 21.4061C15.8896 21.4643 15.8229 21.5585 15.7995 21.6669V21.6669C15.7851 21.7335 15.7876 21.8027 15.8069 21.8681L16.7845 25.1851L17.31 22.6336C17.4067 22.3333 17.4493 22.245 17.6032 22.1131L23.9969 16.4746L15.9841 21.4061Z" fill="inherit"/>
                </svg>
                </a>
            </div>
        </div>
        <div className="faller">
            <div className="leftFaller">
                <Link href={"/signup"} className="unitoptionFaller"><p>Game.Hub</p></Link>
                <Link href={"/signin"} className="unitoptionFaller"><p>Trainers</p></Link>
                <Link href={"/faqs"} className="unitoptionFaller"><p>FAQs</p></Link>
                <Link href={"/blogs"} className="unitoptionFaller"><p>Blogs</p></Link>
                <Link href={"/contact"} className="unitoptionFaller"><p>Contact</p></Link>
            </div>
            <div className="centerFaller">
                <div>
                    <div className="address_1">
                        <h5>Company</h5>
                        <Link href={"/about"}>About</Link>
                        <Link href={"/game_hub"}>Game Hub</Link>
                        <Link href={"/trainers"}>Trainers</Link>
                        <Link href={"/events"}>Events</Link>
                        <Link href={"/events"}>Blogs</Link>
                        <Link href={"/jobs"}>Jobs</Link>
                    </div>
                    <div className="address_1">
                        <h5>Help</h5>
                        <Link href={"/membership"}>Membership</Link>
                        <Link href={"/contact"}>Contact</Link>
                        <Link href={"/policy/membership"}>Membership policy</Link>
                        <Link href={"/policy/privacy"}>Privacy policy</Link>
                        <Link href={"/faqs"}>FAQs</Link>
                    </div>
                    <div className="address_1">
                        <h5>Accounts</h5>
                        <Link href={"/sign_in"}>Sign in</Link>
                        <Link href={"/sign_up"}>Sign up</Link>
                        <Link href={"/dashboard"}>Dashboard</Link>
                    </div>
                </div>
            </div>
            <div className='fancyBoxCntn'>
                <div className="rightfaller fancybg">
                    <h4>Get Started With DMayor</h4>
                    <Link href={"/sign_up"} className='specBtn borderBtn'>Join Us</Link>
                </div>
            </div>
        </div>
      </div>
        <div className="secndFootersect">
            <div className="left">
                <p>
                    The purpose of this website is solely to display information regarding the products and services available in the DMayors Fitness & Game Hub. It is not intended to offer access to any extra products or services that is not listed therein. You may obtain access to all our products and services on Dmayorsfitnesshub.com only. Beware of scam websites.
                </p>
                <p>
                    Please note that the availability of the products and services on the DMayor Fitness & Game Hub is subject to jurisdictional limitations. DMayor Fitness & Game Hub may not offer certain products, features and/or services on the DMayor Fitness & Game Hub in certain jurisdictions due to potential or actual regulatory restrictions.
                </p>
            </div>
            <div className="right">
            </div>
        </div>
        <div className="thirdfooterSect">
            <p>Copyright © 2023 - 2024 Dmayorsfitnesshub.com All rights reserved.</p>
            <p>#NOJUDGEMENT</p>
        </div>
    </footer>
  )
}

export default Footer
