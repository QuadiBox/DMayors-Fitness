'use client'

import { useEffect, useState } from "react";
import { fetchDocumentWithCondition, updateDocument } from "@/app/db/firestoreService";
import { useUser } from '@clerk/nextjs';


const SettingsClient = () => {
    const [mailSettings, setMailingSettings] = useState({
        newsletter_mailing: true,
        all_mailings: true,
        update_mailings: true
    });

    const { isLoaded, isSignedIn, user} = useUser();


    const handleSettingsManipulation = (vlad) => {
        const settings_data = mailSettings;
        if (vlad === "news") {
            if (settings_data?.email || settings_data?.id) {
                updateDocument("settings", `${settings_data.id}`, {...settings_data, newsletter_mailing: !settings_data.newsletter_mailing, updatedAt: new Date().toISOString()});
            }
            setMailingSettings(prev => ({...prev, newsletter_mailing: !prev.newsletter_mailing}));
        } else if (vlad === "update") {
            if (settings_data?.email || settings_data?.id) {
                updateDocument("settings", `${settings_data.id}`, {...settings_data, update_mailings: !settings_data.update_mailings, updatedAt: new Date().toISOString()});
            }
            setMailingSettings(prev => ({...prev, update_mailings: !prev.update_mailings}));
        } else if (vlad === "all") {
            if (settings_data?.email || settings_data?.id) {
                updateDocument("settings", `${settings_data.id}`, {...settings_data, update_mailings: !settings_data.all_mailings, newsletter_mailing: !settings_data.all_mailings, all_mailings: !settings_data.all_mailings, updatedAt: new Date().toISOString()});
            }
            setMailingSettings(prev => ({...prev, update_mailings: !prev.all_mailings, newsletter_mailing: !prev.all_mailings, all_mailings: !prev.all_mailings}));
        }
    }

    useEffect(() => {
        const fetchSettings = async () => {
            const documents_from_db = await fetchDocumentWithCondition('settings', "email", `${user?.emailAddresses[user?.emailAddresses.length -1].emailAddress}`) || { newsletter_mailing: true, all_mailings: true, update_mailings: true };

            setMailingSettings(documents_from_db);
        };

        if (isLoaded || user) {
            fetchSettings();
        }

    }, [isLoaded, user]);



    return (
        <div className="subsActivities">
            <h2>Settings Configurations <button onClick={() => {handleSettingsManipulation("all")}} className={mailSettings.all_mailings ? "on theToggleBtn": "off theToggleBtn"} type="button"><span></span></button></h2>
            <div className="sublists">
                <ul>
                    <li >
                        <div className="subsDataCntn">
                            <p><i className="icofont-quill-pen"></i></p>
                            <div className="subsData">
                                <h3>Newsletter mailing service</h3>
                                <p>Newsletter mailing service is {mailSettings.newsletter_mailing ? "turned on": "turned off"}</p>
                            </div>
                        </div>
                        <button onClick={() => {handleSettingsManipulation("news")}} className={mailSettings.newsletter_mailing ? "on theToggleBtn": "off theToggleBtn"} type="button"><span></span></button>
                    </li>
                    <li >
                        <div className="subsDataCntn">
                            <p><i className="icofont-info-square"></i></p>
                            <div className="subsData">
                                <h3>Update & Subscription mailing services</h3>
                                <p>Update & Subscription mailing services are {mailSettings.update_mailings ? "turned on": "turned off"}</p>
                            </div>
                        </div>
                        <button onClick={() => {handleSettingsManipulation("update")}} className={mailSettings.update_mailings ? "on theToggleBtn": "off theToggleBtn"} type="button"><span></span></button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SettingsClient;