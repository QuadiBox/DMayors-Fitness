'use client'

import { useState, useRef } from 'react';
import Link from 'next/link';

const FAQGamehub = ({ text }) => {
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
                        <h3>What games can I play at the DMayor Game Hub?</h3>
                        <i className="icofont-thin-down" style={{rotate: `${activeFAQ === 0? "180deg": "0deg"}`}}></i>
                    </div>
                    <div className="answerBody">
                        <p>The Game Hub offers something for everyone! Enjoy a wide variety of video games, classic board games like Monopoly, Chess, and Scrabble, or test your skills in Billiards, Air Hockey, and table soccer. Feeling adventurous? Dive into our immersive VR experiences and more. There&apos;s always something exciting waiting for you!</p>
                    </div>
                </div>
                <div className="unitQuestion" style={{gridTemplateRows: `max-content ${activeFAQ === 1? "1fr": "0px"}`}}>
                    <div className="questionHeading" onClick={() => {handleFAQToggle(1)}}>
                        <h3>Is there a cost to access the Game Hub?</h3>
                        <i className="icofont-thin-down" style={{rotate: `${activeFAQ === 1? "180deg": "0deg"}`}}></i>
                    </div>
                    <div className="answerBody">
                        <p>  If you&apos;re a gym member, you enjoy free access to the Game Hub! Non-members can play any game for just <span>#NGN1,000</span>, or if you&apos;re up for a full day of fun, get access to all games for <span>#NGN10,000</span>. It&apos;s the perfect way to unwind, have fun, and challenge yourself!</p>
                    </div>
                </div>
                <div className="unitQuestion" style={{gridTemplateRows: `max-content ${activeFAQ === 2? "1fr": "0px"}`}}>
                    <div className="questionHeading" onClick={() => {handleFAQToggle(2)}}>
                        <h3>Can I bring my own games or gaming equipment?</h3>
                        <i className="icofont-thin-down" style={{rotate: `${activeFAQ === 2? "180deg": "0deg"}`}} ></i>
                    </div>
                    <div className="answerBody">
                        <p>We&apos;ve got you covered with all the games and equipment you need! However, if there&apos;s a specific game you love and we don&apos;t have it, feel free to bring it along. We&apos;re always happy to see new games and make sure everyone has a great time!</p>
                    </div>
                </div>
                <div className="unitQuestion" style={{gridTemplateRows: `max-content ${activeFAQ === 3? "1fr": "0px"}`}}>
                    <div className="questionHeading" onClick={() => {handleFAQToggle(3)}}>
                        <h3>Is the Game Hub suitable for all ages?</h3>
                        <i className="icofont-thin-down" style={{rotate: `${activeFAQ === 3? "180deg": "0deg"}`}}></i>
                    </div>
                    <div className="answerBody">
                        <p>Absolutely! The Game Hub is designed to be a fun and inclusive space for everyone - kids, teens, and adults alike. We have a wide range of games suitable for all age groups, so bring the whole family and enjoy a fantastic time together!</p>
                    </div>
                </div>
                <div className="unitQuestion" style={{gridTemplateRows: `max-content ${activeFAQ === 4? "1fr": "0px"}`}}>
                    <div className="questionHeading" onClick={() => {handleFAQToggle(4)}}>
                        <h3>Do I need to book in advance to use the Game Hub?</h3>
                        <i className="icofont-thin-down" style={{rotate: `${activeFAQ === 4? "180deg": "0deg"}`}}></i>
                    </div>
                    <div className="answerBody">
                        <p>No need to book — just drop by and jump into the fun! However, if you&apos;re planning a special event or coming with a large group, we recommend calling ahead so we can ensure you have the best experience possible.</p>
                    </div>
                </div>
                <p>Have more questions? <Link href="/contact"> Contact Us</Link></p>
            </div>
        </div>
    </section>
  )
}

export default FAQGamehub

