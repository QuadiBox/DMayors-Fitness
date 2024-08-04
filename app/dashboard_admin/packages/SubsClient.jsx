'use client'

import { useState, useEffect } from "react";
import { updateDocument } from "@/app/db/firestoreService";



const SubsClient = ({ sub_data }) => {
    const [substate, setSubstate] = useState(sub_data);

    const [dataStateMonitor, setdataStateMonitor] = useState("default");

    const handleDataUpdate = () => {
        if (dataStateMonitor === "default") {
            setdataStateMonitor("manage");
        } else {
            if (parseInt(substate.remaining_visit_days) === NaN) {
                setSubstate(sub_data);
                setdataStateMonitor("default");
            } else {
                updateDocument('subscriptions', substate?.id, substate)
                setdataStateMonitor("default");
            }
        }
    }
    
    return (
        <div className="fancyBorderClass dashpfpDisplayCntn">
            <div className="firstSection secSection">
                <h2>Package Details</h2>

                <div className="theDataCntn">
                    <div className="unitDataCard">
                        <h4>Plan Name :</h4>
                        <div className="dataValue">{sub_data?.plan.name}</div>
                    </div>
                    <div className="unitDataCard">
                        <h4>Plan Code :</h4>
                        <div className="dataValue">{sub_data?.plan?.plan_code}</div>
                    </div>
                    <div className="unitDataCard">
                        <h4>Plan Interval :</h4>
                        <div className="dataValue">{sub_data?.plan.interval}</div>
                    </div>
                    {
                        sub_data?.subscription_code && (
                            <div className="unitDataCard">
                                <h4>Subscription Code :</h4>
                                <div className="dataValue">{sub_data?.subscription_code}</div>
                            </div>

                        )
                    }
                    {
                        sub_data?.plan.currency && (
                            <div className="unitDataCard">
                                <h4>Currency :</h4>
                                <div className="dataValue">{sub_data?.plan.currency}</div>
                            </div>

                        )
                    }
                    <div className="unitDataCard">
                        <h4>Amount :</h4>
                        <div className="dataValue">{sub_data?.plan.amount.toLocaleString() }</div>
                    </div>
                    <div className="unitDataCard">
                        <h4>Created On :</h4>
                        <div className="dataValue">{`${new Date(`${sub_data?.createdAt}`).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year:  'numeric', hour: 'numeric', minute: 'numeric', hour12: true})}`}</div>
                    </div>
                    <div className="unitDataCard">
                        <h4>Next Payment On :</h4>
                        <div className="dataValue">{`${new Date(`${sub_data?.next_payment_date}`).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year:  'numeric', hour: 'numeric', minute: 'numeric', hour12: true})}`}</div>
                    </div>
                    {
                        sub_data?.cancelledAt && (
                            <div className="unitDataCard">
                                <h4>Cancelled On :</h4>
                                <div className="dataValue">{`${new Date(`${sub_data?.cancelledAt}`).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year:  'numeric', hour: 'numeric', minute: 'numeric', hour12: true})}`}</div>
                            </div>

                        )
                    }
                    {
                        sub_data?.customer.first_name && (
                            <div className="unitDataCard">
                                <h4>Customer's Name :</h4>
                                <div className="dataValue">{sub_data?.customer.first_name} {sub_data?.customer.last_name}</div>
                            </div>

                        )
                    }
                    <div className="unitDataCard">
                        <h4>Customer's Email :</h4>
                        <div className="dataValue">{sub_data?.customer.email}</div>
                    </div>
                    <div className="unitDataCard">
                        <h4>Customer's Id :</h4>
                        <div className="dataValue">{sub_data?.customer.customer_code}</div>
                    </div>
                    <div className="unitDataCard">
                        <h4>Card Number :</h4>
                        <div className="dataValue">{sub_data?.authorization.bin}*****{sub_data?.authorization.last4}</div>
                    </div>
                    <div className="unitDataCard">
                        <h4>Card Expiration :</h4>
                        <div className="dataValue">{sub_data?.authorization.exp_month}/{sub_data?.authorization.exp_year}</div>
                    </div>
                    <div className="unitDataCard">
                        <h4>Card Type :</h4>
                        <div className="dataValue">{sub_data?.authorization.card_type} - {sub_data?.authorization.country_code}</div>
                    </div>
                    <div className="unitDataCard">
                        <h4>Card Issuer :</h4>
                        <div className="dataValue">{sub_data?.authorization.account_name ? sub_data?.authorization.account_name : "Not Specified"}</div>
                    </div>
                    {
                        sub_data?.payments_count && (
                            
                            <div className="unitDataCard">
                                <h4>Payment Count :</h4>
                                <div className="dataValue">{sub_data?.payments_count ? sub_data?.payments_count : "Not Specified"}</div>
                            </div>

                        )
                    }
                    <div className="unitDataCard">
                        <h4>Subscription Status :</h4>
                        <div className={`dataValue ${substate.status}`}>{sub_data?.status}</div>
                    </div>
                    <div className="unitDataCard">
                        <h4>Remaining Visit days :</h4>
                        {
                            dataStateMonitor === "default" ? (
                                <div className={ dataStateMonitor === "default" ? "dataValue" : "dataValue manage"}>{substate?.remaining_visit_days}</div>
                            ) : <input autoFocus onChange={(e) => {setSubstate({...substate, remaining_visit_days: parseInt(e.target.value), status: parseInt(e.target.value) < 1 && parseInt(e.target.value) !== NaN ? "completed" : "active"})}} className="dataValue" type="text" value={substate?.remaining_visit_days}/>
                        }
                    </div>
                </div>
                <div className="bottomDeep">
                    <button onClick={handleDataUpdate}  className="specBtn fillBtn" >{dataStateMonitor === "default" ? "Update Details": "Save Changes"}</button>
                </div>
            </div>
        </div>
    )
};

export default SubsClient;