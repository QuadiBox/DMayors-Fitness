'use client'

import Link from 'next/link';

import { useState } from "react";


const SubsClient = ({ subs_db_data, filtered_data }) => {
    const [searchValue, setSearchValue] = useState('');
    const [sortOrder, setSortOrder] = useState(false);
    const [criteria, setCriteria] = useState("name");

    const [showSortOptions, setshowSortOptions] = useState(false);

    // Function to sort subscriptions
    const sortSubscriptions = (subscriptions, criteria, order) => {
    return subscriptions.sort((a, b) => {
        let fieldA, fieldB;

        switch (criteria) {
        case "name":
            fieldA = a.fullName.toLowerCase();
            fieldB = b.fullname.toLowerCase();
            break;
        case "email":
            fieldA = a.emailAddresses[a.emailAddresses.length - 1].emailAddress.toLowerCase();
            fieldB = b.emailAddresses[b.emailAddresses.length - 1].emailAddress.toLowerCase();
            break;
        case "user_name":
            fieldA = a.username.toLowerCase();
            fieldB = b.username.toLowerCase();
            break;
        // Add more cases as needed
        default:
            fieldA = new Date(parseInt(a.createdAt, 10));
            fieldB = new Date(parseInt(b.createdAt, 10));
        }

        if (fieldA < fieldB) return order === "ascending" ? -1 : 1;
        if (fieldA > fieldB) return order === "ascending" ? 1 : -1;
        return 0;
    });
    };

    // Sort usage
    const order = sortOrder ? "ascending" : "descending"; // Replace with the selected order from dropdown
    const sortedSubscriptions = sortSubscriptions(subs_db_data, criteria, order);

    const filter_value = sortedSubscriptions?.filter((elem) => (
        elem?.fullname?.toLowerCase()?.includes(searchValue?.toLowerCase()) ||
        elem?.username?.toLowerCase()?.includes(searchValue?.toLowerCase()) ||
        elem?.emailAddresses[elem.emailAddresses.length - 1].emailAddress?.toLowerCase()?.includes(searchValue?.toLowerCase())
    ));

    const fetchActivePlanName = (vlad) => {
        const active_plans = filtered_data?.filter(elem => elem?.customer?.email === vlad && elem?.status === "active" );
        const currentPlan = active_plans[0]?.plan?.name;

        if (currentPlan) {
            return currentPlan;
        } else {
            return null;
        }
    }
    
    return (
        <div className="subsActivities">
            <h2>User Profiles</h2>
            {
                subs_db_data?.length > 0 ? (
                    <>
                        <div className="search_filter_OptionsCntn">
                            <div className="fancyBorderClass search">
                                <div className="searchbox">
                                    <input value={searchValue} onChange={(e) => {setSearchValue(e.target.value)}} type="search" name="searchbox" id="searchbox" placeholder="Enter your search" />
                                    <button type="button"><i className="icofont-search"></i></button>
                                </div>
                            </div>

                            <div className="fancyBorderClass">
                                <button onFocus={() => {setshowSortOptions(prev => !prev)}} onBlur={() => {setshowSortOptions(prev => !prev)}} className='subsSortButton' type="button">
                                    <i className="icofont-sort"></i> Sort by.

                                    {
                                        showSortOptions && (
                                            <div className="sortOptionCntn">

                                                <div className="ascDescCntn">
                                                    <div onClick={() => { setSortOrder(prev => !prev)}} className={`ascDescBtn ${sortOrder ? "on" : "off"}`}>
                                                        <div className="ascBtn">Ascen.</div>
                                                        <div className="ascBtn">Desce.</div>
                                                    </div>
                                                </div>
                                                <ul>
                                                    <li onClick={() => { setCriteria("name")}} className={`sortOpt ${criteria === "name" ? "active" : ""}`}>User's Name</li>
                                                    <li onClick={() => { setCriteria("email")}} className={`sortOpt ${criteria === "email" ? "active" : ""}`}>User's Name</li>
                                                    <li onClick={() => { setCriteria("user_name")}} className={`sortOpt ${criteria === "user_name" ? "active" : ""}`}>Username Code</li>
                                                    <li onClick={() => { setCriteria("date")}} className={`sortOpt ${criteria === "date" ? "active" : ""}`}>Account Creation Date</li>
                                                </ul>
                                            </div>
                                        )
                                    }
                                </button>
                            </div>
                        </div>
                        <div className="sublists">
                            <ul>
                                {
                                    filter_value.length > 0 ? (
                                            filter_value.map((elem, idx) => (
                                                <li key={`userOverviewAdmin_${idx}`}>
                                                    <div className="subsDataCntn">
                                                        <p>{idx + 1}</p>
                                                        <div className="subsData">
                                                            <h3>{elem?.fullName}</h3>
                                                            <p className='uniPtagsClass'>{elem?.emailAddresses[elem?.emailAddresses.length - 1].emailAddress}</p>
                                                        </div>
                                                    </div>
                                                    <div className="subsDataCntn">
                                                        <div className="subsData">
                                                            <p className='uniPtagsClass'>Active Plan</p>
                                                            <h3>
                                                                {
                                                                    fetchActivePlanName(elem?.emailAddresses[elem?.emailAddresses.length - 1].emailAddress) ? 
                                                                    fetchActivePlanName(elem?.emailAddresses[elem?.emailAddresses.length - 1].emailAddress) :
                                                                    "No Active Plan"
                                                                }
                                                            </h3>
                                                        </div>
                                                    </div>
                                                    <p className="subCode">
                                                        {`${new Date(elem?.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year:  'numeric', hour: 'numeric', minute: 'numeric', hour12: true})}`}
                                                    </p>
                                                    {
                                                        elem?.id ? (
                                                            <Link href={`/dashboard_admin/users/${elem?.id}`}>View Details</Link>
                                                        ) : (
                                                            <p className='uniPtagsClass'>Undefined ID</p>
                                                        )
                                                    }
                                                </li>
                                            ))
                                    ) : (
                                        <h2 className='theEmptyFilter'>Nothing matches "<span>{searchValue}</span>" in the list of users</h2>
                                    )
                                }
                            </ul>
                        </div>
                    </>
                ) : (
                    <div className="emptyObjectCntn">
                        <i className="icofont-bin"></i>
                        <p>Oi!, you currently have no user. Wait for users to create accounts to see their profile data here. Ciao.</p>
                    </div>
                )
            }
        </div>
    )
};

export default SubsClient;