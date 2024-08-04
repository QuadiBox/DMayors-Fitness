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
                        <h3>How do I join DMayor Fitness?</h3>
                        <i className="icofont-thin-down" style={{rotate: `${activeFAQ === 0? "180deg": "0deg"}`}}></i>
                    </div>
                    <div className="answerBody">
                        <p>Joining us has never been easier. Kindly <Link href={"/"}>click here</Link> to purchase a membership.</p>
                        <p>We&apos;re excited to have you!</p>
                    </div>
                </div>
                <div className="unitQuestion" style={{gridTemplateRows: `max-content ${activeFAQ === 1? "1fr": "0px"}`}}>
                    <div className="questionHeading" onClick={() => {handleFAQToggle(1)}}>
                        <h3>What does my membership include?</h3>
                        <i className="icofont-thin-down" style={{rotate: `${activeFAQ === 1? "180deg": "0deg"}`}}></i>
                    </div>
                    <div className="answerBody">
                        <p>Our gyms boast <span>state-of-the-art</span> cardio and strength equipment. Depending on membership type, you&apos;ll also get to try out our epic classes. Not to mention, we&apos;ve got the best <span>personal trainers</span> in the biz at an affordable rate.</p>
                    </div>
                </div>
                <div className="unitQuestion" style={{gridTemplateRows: `max-content ${activeFAQ === 2? "1fr": "0px"}`}}>
                    <div className="questionHeading" onClick={() => {handleFAQToggle(2)}}>
                        <h3>Do you offer short-term memberships?</h3>
                        <i className="icofont-thin-down" style={{rotate: `${activeFAQ === 2? "180deg": "0deg"}`}} ></i>
                    </div>
                    <div className="answerBody">
                        <p>We'll love you to become a long-term member of our family but if a short-term membership is what suits you, we offer various types of short-term membership packages from 5-days packages to just monthly packages.</p>
                        <p><Link href={"/"}>Click here</Link> to learn more about al our membership packages.</p>
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
                <div className="unitQuestion" style={{gridTemplateRows: `max-content ${activeFAQ === 4? "1fr": "0px"}`}}>
                    <div className="questionHeading" onClick={() => {handleFAQToggle(4)}}>
                        <h3>What is personal training? Is it right for me?</h3>
                        <i className="icofont-thin-down" style={{rotate: `${activeFAQ === 4? "180deg": "0deg"}`}}></i>
                    </div>
                    <div className="answerBody">
                        <p>Personal training is designed to help you crush your fitness goals, regardless of if you&apos;re a novice or a seasoned athlete. We strongly believe that personal training is the fastest and safest way to get great results for all our members. Our individualized fitness programs and nutrition tips put together by our certified instructors will help you achieve the results you&apos;re looking for.</p>
                    </div>
                </div>
                <div className="unitQuestion" style={{gridTemplateRows: `max-content ${activeFAQ === 5? "1fr": "0px"}`}}>
                    <div className="questionHeading" onClick={() => {handleFAQToggle(5)}}>
                        <h3>What is Small Group Training?</h3>
                        <i className="icofont-thin-down" style={{rotate: `${activeFAQ === 5? "180deg": "0deg"}`}}></i>
                    </div>
                    <div className="answerBody">
                        <p>Want the expertise of our personal trainers, but not ready to go at it alone? Small group training is for you! The team environment helps keep you motivated and our certified trainers will keep you challenged and engaged.</p>
                    </div>
                </div>
                <div className="unitQuestion" style={{gridTemplateRows: `max-content ${activeFAQ === 6? "1fr": "0px"}`}}>
                    <div className="questionHeading" onClick={() => {handleFAQToggle(6)}}>
                        <h3>Can I switch personal trainers?</h3>
                        <i className="icofont-thin-down" style={{rotate: `${activeFAQ === 6? "180deg": "0deg"}`}}></i>
                    </div>
                    <div className="answerBody">
                        <p>If you are unhappy with the current personal trainer you have, please speak to your home club to see if this is an option for you!</p>
                    </div>
                </div>
                <div className="unitQuestion" style={{gridTemplateRows: `max-content ${activeFAQ === 7? "1fr": "0px"}`}}>
                    <div className="questionHeading" onClick={() => {handleFAQToggle(7)}}>
                        <h3>What should I bring to the locker room?</h3>
                        <i className="icofont-thin-down" style={{rotate: `${activeFAQ === 7? "180deg": "0deg"}`}}></i>
                    </div>
                    <div className="answerBody">
                        <p>Gym clothes, proper sneakers, a lock, workout towel and a great attitude! Plus, if you want to wash up after your workout, bring your toiletries, a bath towel and shower sandals (optional).</p>
                    </div>
                </div>
                <div className="unitQuestion" style={{gridTemplateRows: `max-content ${activeFAQ === 8? "1fr": "0px"}`}}>
                    <div className="questionHeading" onClick={() => {handleFAQToggle(8)}}>
                        <h3>What is proper gym etiquette when using equipment?</h3>
                        <i className="icofont-thin-down" style={{rotate: `${activeFAQ === 8? "180deg": "0deg"}`}}></i>
                    </div>
                    <div className="answerBody">
                        <p>Make sure to wipe down equipment after use. During peak times, please spend no more than 30 minutes on the cardio machines. Sharing is caring!</p>
                    </div>
                </div>
                <div className="unitQuestion" style={{gridTemplateRows: `max-content ${activeFAQ === 9? "1fr": "0px"}`}}>
                    <div className="questionHeading" onClick={() => {handleFAQToggle(9)}}>
                        <h3>What if I forgot my clothes at home? Can I wear anything on the equipment?</h3>
                        <i className="icofont-thin-down" style={{rotate: `${activeFAQ === 9? "180deg": "0deg"}`}}></i>
                    </div>
                    <div className="answerBody">
                        <p>Proper gym clothing is required to use our machines, that means <span>no heels</span>, <span>open toed</span> or <span>backless shoes</span>, etc. If you forget something at home, DMayors has you covered! You can visit <span>DMayors Clothings</span> where you can get almost everything you&apos;d need to crush your workout safely and comfortably!</p>
                    </div>
                </div>
                <div className="unitQuestion" style={{gridTemplateRows: `max-content ${activeFAQ === 10? "1fr": "0px"}`}}>
                    <div className="questionHeading" onClick={() => {handleFAQToggle(10)}}>
                        <h3>What if I have feedback after I have visited?</h3>
                        <i className="icofont-thin-down" style={{rotate: `${activeFAQ === 10? "180deg": "0deg"}`}}></i>
                    </div>
                    <div className="answerBody">
                        <p>We are always looking to improve our <span>members&apos; experiences</span>. Please contact us if you think there is something we can do to make <span>Dmayors Fitness & Game Hub</span> your <span>favorite place</span> to be!</p>
                    </div>
                </div>
                <p>Have more questions? <Link href="#"> Contact Us</Link></p>
            </div>
        </div>
    </section>
  )
}

export default FAQ
