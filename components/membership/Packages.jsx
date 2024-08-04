'use client'
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { addDocument, fetchAllDocuments } from '@/app/db/firestoreService';

import { useUser } from '@clerk/nextjs';


const Packages = () => {
  const searchParams = useSearchParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [btnMonitor, setBtnMonitor] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  const { isLoaded, isSignedIn, user} = useUser();
  
  const reference = searchParams.get('reference');

  const hasFetchedData = useRef(false);


  const verifyTransaction = async (reference) => {
    try {
      const response = await fetch(`/api/getTransactionRef?reference=${reference}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const utilObj = {
        name: "IV-Package",
        plan_code: "PLN_uniqueIV-Plan",
        id: "101111",
        amount: 20000,
        domain: "test",
        interval: "quarterly"
      }

      if (data.data.plan_object.name) {
        setData({planData: data.data.plan_object, userData: data.data.customer});
      } else {
        setData({planData: utilObj, userData: data.data.customer});
        const currentdataDate = new Date(data.data.transaction_date);

        const currentdataDay = currentdataDate.getDate();
        const currentdataMonth = (currentdataDate.getMonth() + 1) > 9 ? (currentdataDate.getMonth() + 4) - 12 : currentdataDate.getMonth() + 4;
        const currentdataYear = currentdataDate.getFullYear();
        const expiryMonth = currentdataMonth > 9 ? `${currentdataMonth}` : `0${currentdataMonth}`;
        const expiryYear = currentdataMonth > 9 ? currentdataYear + 1 : currentdataYear;
        //format the future expiry date to sent to db - 3 months
        const expiryDate = `${expiryYear}-${expiryMonth}-${currentdataDay}`;
        //autofill the customer data with first & last name before sending to db
        const to_db_customer_object = {...data.data.customer, first_name: user?.firstName, last_name: user?.lastName};
        //now autofill the data object to db with the new data
        const to_db_Formatted_data = {...data?.data, plan: {
          name: "IV-Package",
          plan_code: "PLN_uniquehbagf52",
          id: "101111",
          amount: 20000,
        }, customer: to_db_customer_object, next_payment_date: `${new Date(expiryDate)}`, status: "active", 
        remaining_visit_days: 10};
        
        if (hasFetchedData.current) return;
        hasFetchedData.current = true;
        const docs = await fetchAllDocuments('subscriptions') || [];
        const matchingDBDate = docs.findIndex(elem => elem?.data?.reference === data?.data?.reference);
        setShowLoader(false);
        try {
          if (matchingDBDate <= -1)  {
            const docId = await addDocument('subscriptions', to_db_Formatted_data);
            console.log(`Document added with ID: ${docId}`, to_db_Formatted_data);
          } else {
            console.error("Data already exists in database");
          }
        } catch (error) {
          setError(error.message);
        }

      }
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setData(null);
      setError(error);
    }
  };

  const fetchSubscription = async (vlad) => {
    try {
      const response = await fetch('/api/getSubs');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const filtered_data_paystack = data?.data.filter(elem => elem.customer.email === user?.emailAddresses[user?.emailAddresses.length - 1].emailAddress && elem.status === "active");
      const filtered_data = [...vlad, ...filtered_data_paystack].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      if (filtered_data.length > 0) {
        setData({planData: filtered_data[0]?.plan?.plan_code ? filtered_data[0].plan : filtered_data[0].plan_object , userData: filtered_data[0].customer});
      } else {
        setData("");
      }

      setShowLoader(false);

      setError(null);
    } catch (error) {
      setData(null);
      setError(error.message);
    }
  };

  useEffect(() => {


    const fetchData = async () => {
      try {
        const documents_from_db = await fetchAllDocuments('subscriptions') || [];
        const filtered_db_data = documents_from_db?.filter(elem => elem?.customer?.email === user?.emailAddresses[user?.emailAddresses.length - 1].emailAddress && elem.status === "active");
        return filtered_db_data;
      } catch (error) {
        setError(error.message);
      }
    };

    const handle_no_refrence_data = async () => {
      if (!reference) {
        const db_filtered_data = await fetchData();
        fetchSubscription(db_filtered_data);
      } else {
        verifyTransaction(reference);
      }
    };

    if (isLoaded || isSignedIn) {
      handle_no_refrence_data();
    }

  }, [isLoaded, isSignedIn, searchParams]);


  const initializeTransaction = async (vlad, clad) => {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: vlad,
          amount: clad,
        })
      };
      
      setBtnMonitor(prev => !prev);
      try {
        const response = await fetch('/api/initializeSub', options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.status) {
          //after the response is successfully received
          // Redirect to paystack's authorization_url to checkout
          window.location.href = data.data.authorization_url;
        } else {
          setError('Failed to initialize transaction.');
        }
      } catch (error) {
        console.error('Error:', error);
        setError(error);
      }
  };

  if (!isLoaded || !isSignedIn) {
    return null;
  }


  return (
    <section className='membershipSecondSect'>
          <h2>Our Packages</h2>
          <p>Select from best plans, ensuring a perfect match. Need more or less?  <br />Customize your subscription for a seamless fit.</p>
          
          {/*- show skeleton loader while fetching data from db and Paystack -*/}
          {
            showLoader && (
              <div className="PackageGrandCntn scaffold_Loader">
            {
              
                <div className="notificationCardCntn">
                  <div className="notificationCard">
                    <span className='noticon'></span>
                    <p className='whiteBG_animated'></p>
                  </div>
                </div>
            }
            <div className="groupPackageCntn">
              <div className="unitPackageCntn rec">
                <div className="unitPackage rec">
                  <div className="topTop">
                    <p className='whiteBG_animated'></p>
                    <p> <b className='lightgreenBG_animated'></b> <span className='yellowBG_animated'></span></p>
                  </div>
                  <div className="hoizontalDivider"></div>
                  <ul className="perks">
                    <li> <span className='lightgreenBG_animated'></span> <b className='whiteBG_animated'></b></li>
                    <li> <span className='lightgreenBG_animated'></span> <b className='whiteBG_animated'></b></li>
                    <li> <span className='lightgreenBG_animated'></span> <b className='whiteBG_animated'></b></li>
                    <li> <span className='lightgreenBG_animated'></span> <b className='whiteBG_animated'></b></li>
                    <li> <span className='lightgreenBG_animated'></span> <b className='whiteBG_animated'></b></li>
                  </ul>

                  <button className='lightgreenBG_animated'></button>

                </div>
              </div>
              <div className="unitPackageCntn ">
                <div className="unitPackage ">
                  <div className="topTop">
                    <p className='whiteBG_animated'></p>
                    <p> <b className='lightgreenBG_animated'></b> <span className='yellowBG_animated'></span></p>
                  </div>
                  <div className="hoizontalDivider"></div>
                  <ul className="perks">
                    <li> <span className='lightgreenBG_animated'></span> <b className='whiteBG_animated'></b></li>
                    <li> <span className='lightgreenBG_animated'></span> <b className='whiteBG_animated'></b></li>
                    <li> <span className='lightgreenBG_animated'></span> <b className='whiteBG_animated'></b></li>
                    <li> <span className='lightgreenBG_animated'></span> <b className='whiteBG_animated'></b></li>
                    <li> <span className='lightgreenBG_animated'></span> <b className='whiteBG_animated'></b></li>
                  </ul>

                  <button className='lightgreenBG_animated'></button>

                </div>
              </div>
              <div className="unitPackageCntn ">
                <div className="unitPackage ">
                  <div className="topTop">
                    <p className='whiteBG_animated'></p>
                    <p> <b className='lightgreenBG_animated'></b> <span className='yellowBG_animated'></span></p>
                  </div>
                  <div className="hoizontalDivider"></div>
                  <ul className="perks">
                    <li> <span className='lightgreenBG_animated'></span> <b className='whiteBG_animated'></b></li>
                    <li> <span className='lightgreenBG_animated'></span> <b className='whiteBG_animated'></b></li>
                    <li> <span className='lightgreenBG_animated'></span> <b className='whiteBG_animated'></b></li>
                    <li> <span className='lightgreenBG_animated'></span> <b className='whiteBG_animated'></b></li>
                    <li> <span className='lightgreenBG_animated'></span> <b className='whiteBG_animated'></b></li>
                  </ul>

                  <button className='lightgreenBG_animated'></button>

                </div>
              </div>
              <div className="unitPackageCntn ">
                <div className="unitPackage ">
                  <div className="topTop">
                    <p className='whiteBG_animated'></p>
                    <p> <b className='lightgreenBG_animated'></b> <span className='yellowBG_animated'></span></p>
                  </div>
                  <div className="hoizontalDivider"></div>
                  <ul className="perks">
                    <li> <span className='lightgreenBG_animated'></span> <b className='whiteBG_animated'></b></li>
                    <li> <span className='lightgreenBG_animated'></span> <b className='whiteBG_animated'></b></li>
                    <li> <span className='lightgreenBG_animated'></span> <b className='whiteBG_animated'></b></li>
                    <li> <span className='lightgreenBG_animated'></span> <b className='whiteBG_animated'></b></li>
                    <li> <span className='lightgreenBG_animated'></span> <b className='whiteBG_animated'></b></li>
                  </ul>

                  <button className='lightgreenBG_animated'></button>

                </div>
              </div>
              
            </div>
          </div>
            )
          }
          {
            !showLoader && (
              <div className="PackageGrandCntn">
                {
                  data || data === "" && (
                    <div className="notificationCardCntn">
                      <div className="notificationCard">
                        <span className='noticon'>
                          <i className="icofont-info"></i>
                        </span>
                        <p>{data !== "" ? <>{data?.userData?.first_name} {data?.userData?.last_name}, your <span>{data?.planData?.name}</span> is currently active.</> : <> {user?.fullName}, you currently have <span>No Plan</span> active.</>}</p>
                      </div>
                    </div>
                  )
                }
                <div className="groupPackageCntn">
                  <div className="unitPackageCntn rec">
                    <div className="unitPackage rec">
                      <div className="topTop">
                        <p>1-Year Package</p>
                        <p>#259K <span>Save 77%</span></p>
                      </div>
                      <div className="hoizontalDivider"></div>
                      <ul className="perks">
                        <li><i className="icofont-tick-mark"></i> Access to our weekly health & wellness newletters</li>
                        <li><i className="icofont-tick-mark"></i> 4 free monthly guest passes</li>
                        <li><i className="icofont-tick-mark"></i> Full access to the game hub</li>
                        <li><i className="icofont-tick-mark"></i> Premium access to Dmayors groove</li>
                        <li><i className="icofont-tick-mark"></i> Annual complimentary gifts</li>
                      </ul>

                      <a className="specBtn fillBtn" href="https://paystack.com/pay/dmayorfithub_1_year_package"  >Subscribe</a>

                    </div>
                  </div>
                  <div className="unitPackageCntn">
                    <div className="unitPackage">
                      <div className="topTop">
                        <p>6-Months Package</p>
                        <p>#130K <span>Save 76%</span></p>
                      </div>
                      <div className="hoizontalDivider"></div>
                      <ul className="perks">
                        <li><i className="icofont-tick-mark"></i> Access to our weekly health & wellness newletters</li>
                        <li><i className="icofont-tick-mark"></i> 2 free monthly guest passes</li>
                        <li><i className="icofont-tick-mark"></i> Full access to the game hub</li>
                        <li><i className="icofont-tick-mark"></i> Premium access to Dmayors groove</li>
                      </ul>

                      <a className="specBtn borderBtn" href="https://paystack.com/pay/dmayorfithub_6_months_package">Subscribe</a>
                    </div>
                  </div>
                  <div className="unitPackageCntn">
                    <div className="unitPackage">
                      <div className="topTop">
                        <p>3-Months Package</p>
                        <p>#70K <span>Save 74%</span></p>
                      </div>
                      <div className="hoizontalDivider"></div>
                      <ul className="perks">
                        <li><i className="icofont-tick-mark"></i> Access to our weekly health & wellness newletters</li>
                        <li><i className="icofont-tick-mark"></i> 2 free monthly guest passes</li>
                        <li><i className="icofont-tick-mark"></i> Full access to the game hub</li>
                        <li><i className="icofont-tick-mark"></i> Premium access to Dmayors groove</li>
                      </ul>

                      <a className="specBtn borderBtn" href="https://paystack.com/pay/dmayorfithub_3_months_package">Subscribe</a>
                    </div>
                  </div>
                  <div className="unitPackageCntn">
                    <div className="unitPackage">
                      <div className="topTop">
                        <p>1-Month Package</p>
                        <p>#25K <span>Save 72%</span></p>
                      </div>
                      <div className="hoizontalDivider"></div>
                      <ul className="perks">
                        <li><i className="icofont-tick-mark"></i> Access to our weekly health & wellness newletters</li>
                        <li><i className="icofont-tick-mark"></i> 1 free monthly guest passes</li>
                        <li><i className="icofont-tick-mark"></i> Full access to the game hub</li>
                      </ul>

                      <a className="specBtn borderBtn" href="https://paystack.com/pay/dmayorfithub_1_month_package">Subscribe</a>
                    </div>
                  </div>
                  <div className="unitPackageCntn">
                    <div className="unitPackage">
                      <div className="topTop">
                        <p>Weekly Package</p>
                        <p>#12K <span>Save 43%</span></p>
                      </div>
                      <div className="hoizontalDivider"></div>
                      <ul className="perks">
                        <li><i className="icofont-tick-mark"></i> Access to our weekly health & wellness newletters</li>
                        <li><i className="icofont-tick-mark"></i> Full access to the game hub</li>
                      </ul>

                      <a className="specBtn borderBtn" href="https://paystack.com/pay/dmayorfithub_1_week_package">Subscribe</a>
                    </div>
                  </div>
                  <div className="unitPackageCntn">
                    <div className="unitPackage">
                      <div className="topTop">
                        <p>Daily Package</p>
                        <p>#3K</p>
                      </div>
                      <div className="hoizontalDivider"></div>
                      <ul className="perks">
                        <li><i className="icofont-tick-mark"></i> Access to our weekly health & wellness newletters</li>
                        <li><i className="icofont-tick-mark"></i> Full access to the game hub</li>
                      </ul>

                      <a className="specBtn borderBtn" href="https://paystack.com/pay/dmayorfithub_1_day_package">Subscribe</a>
                    </div>
                  </div>
                  <div className="unitPackageCntn IVpackage">
                    <div className="unitPackage IVpackage">
                      <div className="topTop">
                        <p>IV - Package</p>
                        <p>#20K</p>
                      </div>
                      <div className="hoizontalDivider"></div>
                      <ul className="perks">
                        <li><i className="icofont-tick-mark"></i> 10 times visit</li>
                        <li><i className="icofont-tick-mark"></i> Expires in 3 months</li>
                      </ul>

                      <button className="specBtn fillBtn" type="button" onClick={() => {initializeTransaction(user?.emailAddresses[user?.emailAddresses.length - 1].emailAddress, "2000000")}}>{btnMonitor ? <i class="icofont-spinner-alt-2"></i> : "Purchase"}</button>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
    </section>
  )
}

export default Packages
