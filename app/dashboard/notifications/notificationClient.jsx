'use client'

import { useState, useEffect } from "react";
import { updateDocument } from "@/app/db/firestoreService";
import { useUser } from '@clerk/nextjs';



const NotificationClient = ({ filtered_db_data }) => {
    const Unseen_data = filtered_db_data.filter((elem) => elem?.seen === false);

    useEffect(() => {
        if (Unseen_data?.length > 0) {
            Unseen_data.forEach((elem) => {
                updateDocument("notifications", `${elem.id}`, {...elem, seen: true});
            })
        }
    }, []);
    
    return (
        <ul>
            {
                filtered_db_data.map((elem, idx) => (
                    <li key={`notifHist_${idx}`}>
                        <div className="subsDataCntn">
                            <p>{idx + 1}</p>
                            <div className="subsData">
                                <h3>{elem?.message}</h3>
                            </div>
                        </div>
                        <p className="subCode">
                            {`${new Date(elem?.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year:  'numeric'})}`}
                        </p>
                    </li>
                ))
            }
        </ul>
    )
};

export default NotificationClient;