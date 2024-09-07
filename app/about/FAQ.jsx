'use client'

import { useState, useRef } from 'react';
import Link from 'next/link';

const FAQAbout = ({ text }) => {
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
                <h2><span>F</span>requently <span>A</span>sked <span>Q</span>uestion<span>s</span> {text && (<><br /> {text}</>)}</h2>
            </div>
            <div ref={containerRef} className="rightFAQ">
                <div className="unitQuestion" style={{gridTemplateRows: `max-content ${activeFAQ === 0? "1fr": "0px"}`}}>
                    <div className="questionHeading" onClick={() => {handleFAQToggle(0)}}>
                        <h3>What makes DMayor Fitness & Game Hub different from other gyms?</h3>
                        <i className="icofont-thin-down" style={{rotate: `${activeFAQ === 0? "180deg": "0deg"}`}}></i>
                    </div>
                    <div className="answerBody">
                        <p>At DMayor, it&apos;s all about #NOJUDGEMENT. We combine fitness and fun in a way that&apos;s inclusive, supportive, and tailored to every individual. Whether you're lifting weights, playing games, or just looking to connect, our vibrant community makes every visit an uplifting experience.</p>
                    </div>
                </div>
                <div className="unitQuestion" style={{gridTemplateRows: `max-content ${activeFAQ === 1? "1fr": "0px"}`}}>
                    <div className="questionHeading" onClick={() => {handleFAQToggle(1)}}>
                        <h3>I&apos;m new to fitness - will I fit in?</h3>
                        <i className="icofont-thin-down" style={{rotate: `${activeFAQ === 1? "180deg": "0deg"}`}}></i>
                    </div>
                    <div className="answerBody">
                        <p> Absolutely! We&apos;re here for everyone, no matter where you&apos;re starting. Our friendly team and members are all about encouragement, and our classes cater to all levels. We believe every journey begins with a first step, and we&apos;re excited to take it with you!</p>
                    </div>
                </div>
                <div className="unitQuestion" style={{gridTemplateRows: `max-content ${activeFAQ === 2? "1fr": "0px"}`}}>
                    <div className="questionHeading" onClick={() => {handleFAQToggle(2)}}>
                        <h3>Do I have to choose between fitness and gaming at DMayor?</h3>
                        <i className="icofont-thin-down" style={{rotate: `${activeFAQ === 2? "180deg": "0deg"}`}} ></i>
                    </div>
                    <div className="answerBody">
                        <p>Why choose when you can do both? DMayor is designed to merge fitness with the joy of gaming. Challenge yourself in the gym, then unwind with a game — it&apos;s the perfect balance of sweat and play. Plus, our unique blend keeps you motivated and coming back for more! </p>
                    </div>
                </div>
                <div className="unitQuestion" style={{gridTemplateRows: `max-content ${activeFAQ === 3? "1fr": "0px"}`}}>
                    <div className="questionHeading" onClick={() => {handleFAQToggle(3)}}>
                        <h3>What should I bring for my first visit?</h3>
                        <i className="icofont-thin-down" style={{rotate: `${activeFAQ === 3? "180deg": "0deg"}`}}></i>
                    </div>
                    <div className="answerBody">
                        <p>Just bring your energy and a can-do attitude! Comfortable workout gear and a water bottle will set you up nicely. Our staff will be there to show you around, answer any questions, and make sure you feel right at home from the start. </p>
                    </div>
                </div>
                <div className="unitQuestion" style={{gridTemplateRows: `max-content ${activeFAQ === 4? "1fr": "0px"}`}}>
                    <div className="questionHeading" onClick={() => {handleFAQToggle(4)}}>
                        <h3>How do I get started with classes or training?</h3>
                        <i className="icofont-thin-down" style={{rotate: `${activeFAQ === 4? "180deg": "0deg"}`}}></i>
                    </div>
                    <div className="answerBody">
                        <p>It&apos;s easy! You can browse our schedule online or stop by the front desk when you arrive. Whether you&apos;re into group classes or prefer one-on-one sessions, we&apos;ve got something for everyone. Our coaches are here to help you find the best fit and get rolling right away.</p>
                    </div>
                </div>
                <div className="unitQuestion" style={{gridTemplateRows: `max-content ${activeFAQ === 5? "1fr": "0px"}`}}>
                    <div className="questionHeading" onClick={() => {handleFAQToggle(5)}}>
                        <h3>Is DMayor family-friendly? Can I bring my kids?</h3>
                        <i className="icofont-thin-down" style={{rotate: `${activeFAQ === 5? "180deg": "0deg"}`}}></i>
                    </div>
                    <div className="answerBody">
                        <p>Absolutely! DMayor is all about family vibes, and we welcome members of all ages. We offer programs and activities for kids, teens, and adults alike, so everyone can join in the fun. Fitness is more than just exercise - it's a family affair at DMayor!</p>
                    </div>
                </div>
                <p>Have more questions? <Link href="/contact"> Contact Us</Link></p>
            </div>
        </div>
    </section>
  )
}

export default FAQAbout

