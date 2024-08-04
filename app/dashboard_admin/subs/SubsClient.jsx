'use client'

import Link from 'next/link';

import { useState, useEffect } from "react";
import { updateDocument } from "@/app/db/firestoreService";



const SubsClient = ({ subs_db_data, utilData }) => {
    const [searchValue, setSearchValue] = useState('');
    const [sortOrder, setSortOrder] = useState(false);
    const [criteria, setCriteria] = useState("plan_exp");

    const [showSortOptions, setshowSortOptions] = useState(false);

    // Function to sort subscriptions
    const sortSubscriptions = (subscriptions, criteria, order) => {
    return subscriptions.sort((a, b) => {
        let fieldA, fieldB;

        switch (criteria) {
        case "plan_name":
            fieldA = a.plan.name.toLowerCase();
            fieldB = b.plan.name.toLowerCase();
            break;
        case "plan_code":
            fieldA = a.plan.plan_code.toLowerCase();
            fieldB = b.plan.plan_code.toLowerCase();
            break;
        case "status":
            fieldA = a.status.toLowerCase();
            fieldB = b.status.toLowerCase();
            break;
        case "first_name":
            fieldA = a.customer.first_name.toLowerCase();
            fieldB = b.customer.first_name.toLowerCase();
            break;
        case "last_name":
            fieldA = a.customer.last_name.toLowerCase();
            fieldB = b.customer.last_name.toLowerCase();
            break;
        case "plan_exp":
            fieldA = new Date(a.next_payment_date);
            fieldB = new Date(b.next_payment_date);
            break;
        // Add more cases as needed
        default:
            fieldA = new Date(a.createdAt);
            fieldB = new Date(b.createdAt);
        }

        if (fieldA < fieldB) return order === "ascending" ? -1 : 1;
        if (fieldA > fieldB) return order === "ascending" ? 1 : -1;
        return 0;
    });
    };

    // Example usage
    const order = sortOrder ? "ascending" : "descending"; // Replace with the selected order from dropdown
    const sortedSubscriptions = sortSubscriptions(subs_db_data, criteria, order);

    const filter_value = sortedSubscriptions?.filter((elem) => (
        elem?.plan?.name?.toLowerCase()?.includes(searchValue?.toLowerCase()) ||
        elem?.plan?.plan_code?.toLowerCase()?.includes(searchValue?.toLowerCase()) ||
        elem?.status?.toLowerCase()?.includes(searchValue?.toLowerCase()) ||
        elem?.customer?.first_name?.toLowerCase()?.includes(searchValue?.toLowerCase()) ||
        elem?.customer?.last_name?.toLowerCase()?.includes(searchValue?.toLowerCase())
    ));

    useEffect(() => {
        if (utilData?.length > 0) {
            utilData.forEach((elem) => {
                if (new Date(elem.next_payment_date) > new Date()){
                    updateDocument("subscriptions", `${elem.id}`, {...elem, status: "expired"});
                }
            })
        }
    }, []);
    
    return (
        <div className="subsActivities">
            <h2>Subscription History</h2>
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
                                                    <li onClick={() => { setCriteria("first_name")}} className={`sortOpt ${criteria === "first_name" ? "active" : ""}`}>First Name</li>
                                                    <li onClick={() => { setCriteria("last_name")}} className={`sortOpt ${criteria === "last_name" ? "active" : ""}`}>Last Name</li>
                                                    <li onClick={() => { setCriteria("plan_name")}} className={`sortOpt ${criteria === "plan_name" ? "active" : ""}`}>Plan Name</li>
                                                    <li onClick={() => { setCriteria("plan_code")}} className={`sortOpt ${criteria === "plan_code" ? "active" : ""}`}>Plan Code</li>
                                                    <li onClick={() => { setCriteria("status")}} className={`sortOpt ${criteria === "status" ? "active" : ""}`}>Plan Status</li>
                                                    <li onClick={() => { setCriteria("plan_date")}} className={`sortOpt ${criteria === "plan_date" ? "active" : ""}`}>Plan Creation Date</li>
                                                    <li onClick={() => { setCriteria("plan_exp")}} className={`sortOpt ${criteria === "plan_exp" ? "active" : ""}`}>Plan Expiration Date</li>
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
                                            <li key={`usbHist_${idx}`}>
                                                <div className="subsDataCntn">
                                                <p>{idx + 1}</p>
                                                <div className="subsData">
                                                    <h3>{elem?.plan.name}</h3>
                                                    <p className='uniPtagsClass'>Expiration Date: <span>{`${new Date(elem?.next_payment_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year:  'numeric', hour: 'numeric', minute: 'numeric', hour12: true})}`}</span></p>
                                                </div>
                                                </div>
                                                <p className="subCode">
                                                    {elem?.subscription_code}
                                                </p>
                                                <b className={`${elem?.status}`}>{elem?.status} <i className="icofont-info-square"></i></b>
                                                {
                                                    elem?.subscription_code ? (
                                                        <Link href={`/dashboard_admin/subs/${elem?.subscription_code}`}>View Details</Link>
                                                    ) : (
                                                        <Link href={`/dashboard_admin/packages/${elem?.id}`}>View Details</Link>
                                                    )
                                                }
                                            </li>
                                            ))
                                    ) : (
                                        <h2 className='theEmptyFilter'>Nothing matches "<span>{searchValue}</span>" in the subcriptions list</h2>
                                    )
                                }
                            </ul>
                        </div>
                    </>
                ) : (
                    <div className="emptyObjectCntn">
                        <i className="icofont-angry-monster"></i>
                        <p>Oi!, you have nothing going on in your subscription history. <Link href={"/membership"}>Subscribe here</Link> and check back later. Ciao.</p>
                    </div>
                )
            }
        </div>
    )
};

export default SubsClient;