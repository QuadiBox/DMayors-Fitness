'use client'

import { useEffect, useState } from "react";
import Link from "next/link";


const Sect2 = () => {

    const [isSticky, setIsSticky] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

    useEffect(() => {
        const handleScroll = () => {
            const allExpData = document.querySelectorAll('.expdata');
            const allExpImg = document.querySelectorAll('.expImg');
            const fitness_text = document.querySelector('.fitness_text');
            const wellness_text = document.querySelector('.wellness_text');

            const sect5 = document.querySelector('.homeSect5');
            const header = document.querySelector('header');

            if (window.innerWidth > 600) {
    
                allExpData.forEach((elem, idx) => {
                    const rect = elem.getBoundingClientRect();
                    if (rect.top <= 0 && idx !== 6) {
                        allExpImg[idx].style.position = 'fixed';
                    } else {
                        allExpImg[idx].style.position = 'absolute';
                    }

                })

                if (allExpData[0].getBoundingClientRect().top <= 0 && allExpData[3].getBoundingClientRect().top > 0) {
                    fitness_text.style.position = 'fixed';
                } else if (allExpData[0].getBoundingClientRect().top <= 0 && allExpData[3].getBoundingClientRect().top <= 0) {
                    fitness_text.style.position = 'absolute';
                } else {
                    fitness_text.style.position = 'absolute';
                }

                if (allExpData[4].getBoundingClientRect().top <= 0 && allExpData[allExpData.length -1].getBoundingClientRect().top > 0) {
                    wellness_text.style.position = 'fixed';
                } else if (allExpData[4].getBoundingClientRect().top <= 0 && allExpData[allExpData.length -1].getBoundingClientRect().top <= 0) {
                    wellness_text.style.position = 'absolute';
                } else {
                    wellness_text.style.position = 'absolute';
                }

                if(sect5.getBoundingClientRect().top <= 80 && sect5.getBoundingClientRect().top >= -80 ) {
                  header.style.transform = "translate(0%, -100%)"
                } else {
                  header.style.transform = "translate(0%, 0%)"
                }
            } else {
                allExpImg.forEach((elem) => {
                    elem.style.position = 'absolute';
                })
            }

        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isSmallScreen]);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(prev => !prev);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



  return (
    <section className="homeSect2">
          <div className="topHomeSect2">
            <h2>DMAYOR'S EXPERIENCE : Achieve the healthiest, happiest you</h2>
            <p>Any gym can promise a challenging workout. At <span>DMayor Fitness Hub</span>, we think beyond the body. Our <span>19,000 sq.ft</span>, world-class facility provides a personalized, premium fitness experience that's uniquely designed to improve your mind, body, and soul.</p>
          </div>
         <div className="bottomExpCntn">
            <div className="fitness_gym_exp">
              <div className="unitExp rightAlign">
                <div className="expImg" style={{backgroundImage: `linear-gradient(to bottom, #05050339, 70%, var(--dark-clr1)), url(/studioGym.jpg)`}}>
                </div>
                <div className="expdata">
                  <div className="iconSpec">
                    <i className="icofont-brain-alt"></i>
                  </div>
                  <p>DMayor Fitness Hub offers spaces fully integrated in the hub's architecture, characterized by their ample size, comfort and state-of-the-art equipment.</p>
                  <p>Membership plans starts from <span>#3k</span>. </p>
                  <Link className="specBtn fillBtn" href={"/membership"}>Become a member </Link>
                </div>
              </div>
              <div className="unitExp rightAlign">
                <div className="expImg" style={{backgroundImage: `linear-gradient(to bottom, #05050339, 70%, var(--dark-clr1)), url(/studio_2.jpg)`}}>
                </div>
                <div className="expdata">
                  <div className="iconSpec">
                    <i className="icofont-muscle"></i>
                  </div>
                  <h3>Fit Right In</h3>
                  <p>Endless activities available plus spacious large body-building and cardio fitness room. We also offers a <span>.POWER.</span> studio for high intensity workouts and various functional movements.</p>
                  <p>You can <span>.NEVER.</span> get <span>.ENOUGH.</span> at DMayor.</p>
                </div>
              </div>
              <div className="unitExp rightAlign">
                    <div className="expImg" style={{backgroundImage: `linear-gradient(to bottom, #05050339, 70%, var(--dark-clr1)), url(/studio_4.jpg)`}}>
                    </div>
                    <div className="expdata">
                        <div className="iconSpec">
                            <i className="icofont-dumbbells"></i>
                        </div>
                        <h3>Tons To Lift</h3>
                        <p>Bulk up, trim down, or just rock out to your favorite playlist. Our free weights, shiny machines, and <span>cutting-edge</span> equipment are the gear to get you there. We&apos;ve got all the equipment you need to sprint, jog or walk your way to your <span>fitness goals</span>. We&apos;re cheering for you!</p>
                        <p><span>READY.SET.SWEAT</span></p>
                    </div>
              </div>
              <div className="unitExp rightAlign">
                    <div className="expImg" style={{backgroundImage: `linear-gradient(to bottom, #05050339, 70%, var(--dark-clr1)), url(/acts_3.jpg)`}}>
                    </div>
                    <div className="expdata">
                        <div className="iconSpec">
                          <i className="icofont-gym-alt-3"></i>
                        </div>
                        <h3>More To do</h3>
                        <p>Build a sustainable fitness without loosing the fun of life with our lifestyle fitness systems.</p>
                        <p>Dive into our well-tailored programs including: <span>CrossFit</span>, <span>Preg-N-Active</span>, <span>Up.Build</span>, <span>Kids-N-Teens</span></p>
                        <p><span>BEST GET STARTED NOW!</span></p>
                        <Link className="specBtn fillBtn" href={"/activities"}>See all programs <i className="icofont-listing-box"></i></Link>
                    </div>
              </div>
              <h3 className="fitness_text">FITNESS & GYM</h3>
            </div>
            <div className="wellness_health_exp">
              <div className="unitExp leftAlign">
                <div className="expImg" style={{backgroundImage: `linear-gradient(to bottom, #05050339, 70%, var(--dark-clr1)), url(/studio_5.jpg)`}}>
                </div>
                <div className="expdata">
                  <div className="iconSpec">
                    <i className="icofont-swimmer"></i>
                  </div>
                  <h3>Amphibious</h3>
                  <p>The perfect balance between land and water</p>
                  <p>Various water activities available everyday. If your need is a well-deserved aquatic relaxation after a intensive work-out, we've got you.</p>
                  <p><span>REST.RELAX.REPOSE</span></p>
                </div>
              </div>
              <div className="unitExp leftAlign">
                <div className="expImg" style={{backgroundImage: `linear-gradient(to bottom, #05050339, 70%, var(--dark-clr1)), url(/gaming_2.jpeg)`}}>
                </div>
                <div className="expdata">
                  <div className="iconSpec">
                    <i className="icofont-rugby-ball"></i>
                  </div>
                  <h3>Get Your Game face On</h3>
                  <p>Fitness, fun and relaxation is a <span>perfect</span> mix. A whole spectrum of indoor <span>games</span> are always available at your beckon.</p>
                  <p>From computer games, billiards to table tennis, we've got it all.</p>
                  <p><span>COME.PLAY.WIN</span></p>
                </div>
              </div>
              <div className="unitExp leftAlign">
                    <div className="expImg" style={{backgroundImage: `linear-gradient(to bottom, #05050339, 70%, var(--dark-clr1)), url(/cook_3.jpeg)`}}>
                    </div>
                    <div className="expdata">
                        <div className="iconSpec">
                            <i className="icofont-spoon-and-fork"></i>
                        </div>
                        <h3>Guilt-Free Bites</h3>
                        <p>After an intensive workout session, a <span>well-curated</span> meal is essential for a balanced <span>diet</span> and dietary requirements.</p>
                        <p>DMayor Fitness Hub gives you premium access to <span>DMayor Groove</span> where all your nourishment fantasies can be realised and your dietary need fulfiled.</p>
                        <p><span>SWEAT.EAT.STAY HEALTHY</span></p>
                    </div>
              </div>
              <h3 className="wellness_text">Wellness & Fun</h3>
            </div>
         </div>
        </section>
  )
}

export default Sect2
