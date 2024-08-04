'use client'

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { eventsData } from '@/db/event';
import Link from 'next/link';


const monthsData = [
    { month: "January", days: 31 },
    { month: "February", days: 28 },
    { month: "March", days: 31 },
    { month: "April", days: 30 },
    { month: "May", days: 31 },
    { month: "June", days: 30 },
    { month: "July", days: 31 },
    { month: "August", days: 31 },
    { month: "September", days: 30 },
    { month: "October", days: 31 },
    { month: "November", days: 30 },
    { month: "December", days: 31 },
];

const getMonthData = (currentMonthIndex) => {
    
    const currentMonth = monthsData[currentMonthIndex];
    const precedingMonth = monthsData[(currentMonthIndex === 0 ? 11 : currentMonthIndex - 1)];
    const succeedingMonth = monthsData[(currentMonthIndex === 11 ? 0 : currentMonthIndex + 1)];
  
    return { currentMonth, precedingMonth, succeedingMonth };
};

const DaysOfMonth = ({ totalDays, monthName, year, idx, tooltipMonitor, settooltipMonitor, setmatchingdateTheme, activeEventDisplay, setactiveEventDisplay }) => {
    // Generate an array of numbers from 1 to totalDays
    const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);

    const tooltipMovementHandler = () => {
        const tltooltip = document.querySelector(".tooltip");
        const tltooltipPointer = tltooltip.querySelector("span");
        const currentActiveTL = document.querySelector(`#${tooltipMonitor.id}`);

        const leftEdgeCalc = currentActiveTL.getBoundingClientRect().left;
        const rightEdgeCalc = currentActiveTL.getBoundingClientRect().right;
        const classListCurrent = currentActiveTL.classList;

        const matchEventChecker = eventsData.find((elem) => elem.date === tooltipMonitor.issuer);

        if (matchEventChecker) {
            setmatchingdateTheme(matchEventChecker.theme);
        } else {
            setmatchingdateTheme("");
        }

        if (classListCurrent.contains("starter") && classListCurrent.contains("leftist")) {
            tltooltip.style.top = `0%`;
            tltooltip.style.left = `${leftEdgeCalc}px`;
            tltooltip.style.right = `none`;
            tltooltip.style.transform = `translate(0%, -140%)`;
            tltooltipPointer.style.left = `2%`;
            tltooltipPointer.style.transform = `translate(0%, 90%)`;
        } else if (!classListCurrent.contains("starter") && classListCurrent.contains("rightist")) {
            tltooltip.style.top = `50%`;
            tltooltip.style.left = `none`;
            tltooltip.style.right = `${rightEdgeCalc}px`;
            tltooltip.style.transform = `translate(0%, -140%)`;
            tltooltipPointer.style.left = `90%`;
            tltooltipPointer.style.transform = `translate(0%, 85%)`;
        } else if (!classListCurrent.contains("starter") && classListCurrent.contains("leftist")) {
            tltooltip.style.top = `50%`;
            tltooltip.style.left = `${leftEdgeCalc}px`;
            tltooltip.style.right = `none`;
            tltooltip.style.transform = `translate(0%, -140%)`;
            tltooltipPointer.style.left = `2%`;
            tltooltipPointer.style.transform = `translate(0%, 85%)`;
        } else if (classListCurrent.contains("starter") && !classListCurrent.contains("rightist") && !classListCurrent.contains("leftist")) {
            tltooltip.style.top = `0%`;
            tltooltip.style.left = `${leftEdgeCalc}px`;
            tltooltip.style.right = `none`;
            tltooltip.style.transform = `translate(-45%, -140%)`;
            tltooltipPointer.style.left = `55%`;
            tltooltipPointer.style.transform = `translate(-50%, 100%)`;
        } else {
            tltooltip.style.top = `50%`;
            tltooltip.style.left = `${leftEdgeCalc}px`;
            tltooltip.style.right = `none`;
            tltooltip.style.transform = `translate(-45%, -140%)`;
            tltooltipPointer.style.left = `55%`;
            tltooltipPointer.style.transform = `translate(-50%, 100%)`;
        }
    }
    
    useEffect(() => {
        tooltipMovementHandler();
    }, [tooltipMonitor]);

    const activeDisplaySetter = () => {
        const matchEventChecker = eventsData.find((elem) => elem.date === tooltipMonitor.issuer);

        if (matchEventChecker && activeEventDisplay[activeEventDisplay.length - 1].date !== matchEventChecker.issuer) {
            setactiveEventDisplay(prev => [...prev, matchEventChecker]);
        }
    }
  
    return (
        <>
          {daysArray.map((day, index) => (
            <div 
                key={day} 
                onMouseEnter={() => {settooltipMonitor({
                    id: `${monthName}_${day}_${year}`,
                    issuer: `${day} ${monthName}, ${year}`
                })}} 
                onClick={activeDisplaySetter}
                data-monthtag={`${monthName}, ${year}`} 
                id={`${monthName}_${day}_${year}`} 
                className={
                    `
                        ${index === 0 ? "starter": ""} ${monthName}_${day}_${year} daysUnitBox ${eventsData.find((elem) => elem.date === `${day} ${monthName}, ${year}`) ? "valid" : ""} ${index <= 5 && idx === 0 ? "leftist" : index >= 25 && idx === 2 ? "rightist" : ""} ${activeEventDisplay[activeEventDisplay.length - 1].date === `${day} ${monthName}, ${year}` ? "active" : ""}
                    `
                }
            >
              <span aria-hidden></span>
            </div>
          ))}
        </>
    );
};

const DaysOfMonthMobile = ({ totalDays, monthName, year}) => {
    // Generate an array of numbers from 1 to totalDays
    const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);

    
  
    return (
        <>
          {daysArray.map((day, index) => (
            <div 
                key={day} 
                data-daytag={`${day}`} 
                data-monthtag={`${monthName}, ${year}`} 
                id={`${monthName}_${day}_${year}`} 
                className={`${index === 0 ? "starter": ""} unitDayEvent`}
            >
              <span aria-hidden></span>
              {
                eventsData.find((elem) => elem.date === `${day} ${monthName}, ${year}`) && (
                    <div className="miniEventDisplayCntn" style={{top: `${daysArray.length - index > 3 ? "0" : "none"}`, bottom: `${daysArray.length - index < 3 ? "0" : "none"}`, borderTop: `${daysArray.length - index > 3 ? "1px solid var(--lightgreen-clr)" : "none"}`, borderBottom: `${daysArray.length - index < 3 ? "1px solid var(--lightgreen-clr)" : "none"}` }}>
                        <Link href={"/"} className="miniEventDisplay">
                            <div className="miniEventimg" style={{backgroundImage : `url(${eventsData.find((elem) => elem.date === `${day} ${monthName}, ${year}`).imageUrl})`}}></div>
                            <div className="miniEventsData">
                                <h4>{eventsData.find((elem) => elem.date === `${day} ${monthName}, ${year}`).displayDetails.heading}</h4>
                                <p>{eventsData.find((elem) => elem.date === `${day} ${monthName}, ${year}`).displayDetails.para[0]}</p>
                            </div>
                        </Link>
                    </div>
                )
              }
            </div>
          ))}
        </>
    );
};

const Sect5 = () => {
    const [monthsToShow, setMonthsToShow] = useState([]);
    const [totalDaysSum, setTotalDaysSum] = useState(0);
    const [tooltipMonitor, settooltipMonitor] = useState({});
    const [matchingdateTheme, setmatchingdateTheme] = useState("");

    const [activeEventDisplay, setactiveEventDisplay] = useState([{}]);

    const [monthsToShowMobile, setMonthsToShowMobile] = useState([]);
    const [totalDaysSumMobile, setTotalDaysSumMobile] = useState(0);
    const [ activeEventMobile, setactiveEventMobile] = useState({});

    const sortedEvent = eventsData.sort((a, b) => new Date(a.date) - new Date(b.date));
    let currentDisplayInEvents = sortedEvent.findIndex(elem => elem.date === activeEventDisplay[activeEventDisplay.length -1].date);

    useEffect(() => {
        const firstUpcomingEvent = eventsData.sort((a, b) => new Date(a.date) - new Date(b.date)).find((elem) => new Date(elem.date) > new Date()) || eventsData.sort((a, b) => new Date(a.date) - new Date(b.date))[eventsData.length - 1];
        const currentDate = new Date(firstUpcomingEvent.date);
        settooltipMonitor({
            id: `${monthsData[currentDate.getMonth()].month}_${currentDate.getDate()}_${currentDate.getFullYear()}`,
            issuer: firstUpcomingEvent.date
        })
        setmatchingdateTheme(firstUpcomingEvent.theme);
        setactiveEventDisplay([firstUpcomingEvent]);
        const currentMonthIndex = currentDate.getMonth(); // 0-11 for Jan-Dec
        const { currentMonth, precedingMonth, succeedingMonth } = getMonthData(currentMonthIndex);

        const months = [precedingMonth, currentMonth, succeedingMonth];
        setMonthsToShow(months);
        setMonthsToShowMobile([currentMonth])

        // Calculate the sum of days using reduce
        const sum = months.reduce((acc, month) => acc + month.days, 0);
        setTotalDaysSum(sum);

        // mobile display eventys configurations
        const sumMobile = [currentMonth].reduce((acc, month) => acc + month.days, 0);
        setTotalDaysSumMobile(sumMobile);
        setactiveEventMobile(firstUpcomingEvent.date);
    }, []);

    useEffect(() => {
        if (activeEventDisplay.length > 2) {
            activeEventDisplay.shift();
        }
        const nextBtn = document.querySelector(".tlBtn_next");
        const prevBtn = document.querySelector(".tlBtn_prev");

        if (currentDisplayInEvents === sortedEvent.length -1) {
            nextBtn.setAttribute("disabled", "true");
            prevBtn.removeAttribute("disabled");
        } else if (currentDisplayInEvents === 0) {
            prevBtn.setAttribute("disabled", "true");
            nextBtn.removeAttribute("disabled");
        } else {
            nextBtn.removeAttribute("disabled");
            prevBtn.removeAttribute("disabled");
        }
    }, [activeEventDisplay]);

    const prevNextEventHandler = (vlad) => {
        const sortedEvent = eventsData.sort((a, b) => new Date(a.date) - new Date(b.date));
        let firstUpcomingEvent = sortedEvent.find((elem) => new Date(elem.date) > new Date()) || sortedEvent[eventsData.length - 1];
        let currentDisplayInEvents = sortedEvent.findIndex(elem => elem.date === activeEventDisplay[activeEventDisplay.length -1].date);
        if (vlad === "next") {
            firstUpcomingEvent = sortedEvent[currentDisplayInEvents + 1];
        } else if(vlad === "prev") {
            firstUpcomingEvent = sortedEvent[currentDisplayInEvents - 1];
        }

        const currentDate = new Date(firstUpcomingEvent.date);
        settooltipMonitor({
            id: `${monthsData[currentDate.getMonth()].month}_${currentDate.getDate()}_${currentDate.getFullYear()}`,
            issuer: firstUpcomingEvent.date
        })
        setmatchingdateTheme(firstUpcomingEvent.theme);
        setactiveEventDisplay(prev => [...prev, firstUpcomingEvent]);
        const currentMonthIndex = currentDate.getMonth(); // 0-11 for Jan-Dec
        const { currentMonth, precedingMonth, succeedingMonth } = getMonthData(currentMonthIndex);

        const months = [precedingMonth, currentMonth, succeedingMonth];
        setMonthsToShow(months);

        // Calculate the sum of days using reduce
        const sum = months.reduce((acc, month) => acc + month.days, 0);
        setTotalDaysSum(sum);
    }

    const prevNextHandlerMobile = (vlad) => {
        let firstUpcomingEvent = sortedEvent.find((elem) => new Date(elem.date) > new Date()) || sortedEvent[eventsData.length - 1];
        let currentDisplayInEventIndex = sortedEvent.findIndex(elem => elem.date === activeEventMobile);

        if (vlad === "next") {
            firstUpcomingEvent = sortedEvent[currentDisplayInEventIndex + 1];
        } else if(vlad === "prev") {
            firstUpcomingEvent = sortedEvent[currentDisplayInEventIndex - 1];
        }

        const currentDate = new Date(firstUpcomingEvent.date);
        const currentMonthIndex = currentDate.getMonth(); // 0-11 for Jan-Dec
        
        const { currentMonth } = getMonthData(currentMonthIndex);
        setMonthsToShowMobile([currentMonth])
        // mobile display eventys configurations
        const sumMobile = [currentMonth].reduce((acc, month) => acc + month.days, 0);
        setTotalDaysSumMobile(sumMobile);
        setactiveEventMobile(firstUpcomingEvent?.date);
    }


    return (
        <section className="homeSect5">
            <div>
                <div className="bgeventsImg">
                    {activeEventDisplay.map((elem, idx) => (
                        <div key={`displayUnit_${idx}`} className="eventDisplayUnit opening" style={{backgroundImage: `linear-gradient(to bottom, var(--opac-d03), var(--opac-d05)), url(${elem?.imageUrl})`}}>
                            <h2>{elem?.displayDetails?.heading}</h2>
                            {elem?.displayDetails?.para.map((elem, idx) => (<p dangerouslySetInnerHTML={{__html: elem}} key={`eventText_${idx}`}></p>))}
                            <div className="flex-Div">
                                {
                                    elem?.displayDetails?.links && (
                                        elem?.displayDetails?.links.map((elem, idx) => (<Link key={`eventText_${idx}`} className={`${idx % 2 !== 0 ? "specBtn fillBtn": "specBtn borderBtn"}`} href={elem.href}>{elem.text}</Link>))
                                    )
                                }
                            </div>
                            <span className="fancyDesign"></span>
                        </div>
                    ))}
                </div>
                <div className="overlayEventTimeline">
                    <div className="timelineCntn" style={{gridTemplateColumns: `repeat(${totalDaysSum}, minmax(2px, 1fr)`}}>
                        {monthsToShow.map((monthData, index) => (
                            <DaysOfMonth
                                key={`${index}_tmmapping`}
                                totalDays={monthData.days}
                                monthName={monthData.month}
                                year={new Date().getFullYear()} // Pass the current year as a prop
                                idx={index}
                                tooltipMonitor={tooltipMonitor}
                                settooltipMonitor={settooltipMonitor}
                                setmatchingdateTheme={setmatchingdateTheme}
                                activeEventDisplay={activeEventDisplay}
                                setactiveEventDisplay={setactiveEventDisplay}
                            />
                        ))}

                        <div className={`tooltip ${tooltipMonitor.issuer === activeEventDisplay[activeEventDisplay.length - 1].date ? "active" : ""}`} >
                            {
                                matchingdateTheme !== "" && (
                                    <h4>{matchingdateTheme}</h4>
                                )
                            }
                            <p>{tooltipMonitor.issuer}</p>
                            <span></span>
                        </div>
                    </div>
                </div>
                <h3>Events</h3>
                <button title='Next Event' className='tlBtn_next' type="button" onClick={() => {prevNextEventHandler("next")}}><i className="icofont-dotted-right"></i></button>
                <button title='Previous Event' className='tlBtn_prev' type="button" onClick={() => {prevNextEventHandler("prev")}}><i className="icofont-dotted-left"></i></button>

            </div>

            <div className="mobileEventView">
                <h2>Events</h2>
                <div className="mainEventDisplayCntn">
                    <div className="asideEvents"></div>
                    <div className="mainEvents" style={{gridTemplateRows: `repeat(${totalDaysSumMobile}, minmax(2px, 1fr)`}}>
                        {monthsToShowMobile.map((monthData, index) => (
                            <DaysOfMonthMobile
                                key={`${index}_tMmmapping`}
                                totalDays={monthData.days}
                                monthName={monthData.month}
                                year={new Date().getFullYear()} // Pass the current year as a prop
                                idx={index}
                            />
                        ))}
                    </div>

                    {activeEventMobile !== sortedEvent[0].date && (
                        <button title='Previous Event' className='tlBtnMobile_prev' type="button" onClick={() => {prevNextHandlerMobile("prev")}}><i className="icofont-dotted-left"></i></button>
                    )}
                    {activeEventMobile !== sortedEvent[sortedEvent.length -1].date && (
                        <button title='Next Event' className='tlBtnMobile_next' type="button" onClick={() => {prevNextHandlerMobile("next")}}><i className="icofont-dotted-right"></i></button>
                    )}

                </div>
            </div>
        </section>
    )
}

export default Sect5
