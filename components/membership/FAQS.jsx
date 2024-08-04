'use client'

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const FAQ = () => {
    const containerRef = useRef(null);
    const [activeFAQ, setActiveFAQ] = useState(-1);

    const handleFAQToggle = (vlad) => {
        if (activeFAQ === vlad) {
            setActiveFAQ(-1);
        } else {
            setActiveFAQ(vlad);
        }
    };

  return (
    <section id='FAQ' className='FAQ'>
        <div className="questionCntn">
            <div className="leftFAQ">
                <h2><span>F</span>requently <span>A</span>sked <span>Q</span>uestion<span>s</span></h2>
            </div>
            <div ref={containerRef} className="rightFAQ">
                <div className="unitQuestion" style={{gridTemplateRows: `max-content ${activeFAQ === 0? "1fr": "0px"}`}}>
                    <div className="questionHeading" onClick={() => {handleFAQToggle(0)}}>
                        <h3>Can I buy a subscription for friend?</h3>
                        <i className="icofont-thin-down" style={{rotate: `${activeFAQ === 0? "180deg": "0deg"}`}}></i>
                    </div>
                    <div className="answerBody">
                        <p>This feature is incoming and will be available very shortly. All you&apos;ll be needing is their Account's Identification number</p>
                        <p>We&apos;ll keep you posted!</p>
                    </div>
                </div>
                <div className="unitQuestion" style={{gridTemplateRows: `max-content ${activeFAQ === 1? "1fr": "0px"}`}}>
                    <div className="questionHeading" onClick={() => {handleFAQToggle(1)}}>
                        <h3>What happens after 3 months and i still have days left on my IV-package plan?</h3>
                        <i className="icofont-thin-down" style={{rotate: `${activeFAQ === 1? "180deg": "0deg"}`}}></i>
                    </div>
                    <div className="answerBody">
                        <p>The IV-Package plan expires after 3 months, so even with unused days left on the plan after 3 months, the plan is rendered invalid. Those unused days are inaccessible</p>
                        <p>Kindly try to complete your 10 days visits within the span of 3 month if you are subscribed to the IV-Package plan.</p>
                    </div>
                </div>
                <div className="unitQuestion" style={{gridTemplateRows: `max-content ${activeFAQ === 2? "1fr": "0px"}`}}>
                    <div className="questionHeading" onClick={() => {handleFAQToggle(2)}}>
                        <h3>Can I rollover unused days from an expired IV-package if I buy a new plan immediately?</h3>
                        <i className="icofont-thin-down" style={{rotate: `${activeFAQ === 2? "180deg": "0deg"}`}} ></i>
                    </div>
                    <div className="answerBody">
                        <p>Users get a rollover of unused days in an expired IV-package plan when a new IV-package plan is purchased within 5 days of the last expiration date. </p>
                    </div>
                </div>
                <div className="unitQuestion" style={{gridTemplateRows: `max-content ${activeFAQ === 3? "1fr": "0px"}`}}>
                    <div className="questionHeading" onClick={() => {handleFAQToggle(3)}}>
                        <h3>Can I bring a guest with me?</h3>
                        <i className="icofont-thin-down" style={{rotate: `${activeFAQ === 3? "180deg": "0deg"}`}}></i>
                    </div>
                    <div className="answerBody">
                        <p>Certain memberships have free guest privileges. The best way to find out about your membership guest policy to read the privilegesof the current membership you're on <Link href={"/"}>here.</Link> or to contact us <Link href={"/"}>here</Link> for detailed guide. </p>
                    </div>
                </div>
                <p>Have more questions? <Link href="#"> Contact Us</Link></p>
            </div>
        </div>
    </section>
  )
}

export default FAQ

