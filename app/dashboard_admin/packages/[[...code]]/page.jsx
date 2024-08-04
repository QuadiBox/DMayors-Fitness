
import { fetchDocumentById } from '@/app/db/firestoreService';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';



const Page = async ({ params }) => {
    const user = await currentUser();

    if (!params?.code) {
        return notFound();
    }

    try {

        const sub_data = await fetchDocumentById('subscriptions', params.code[0]) || [];

        if (sub_data?.length <= 0) {
            return notFound();
        }

        return (
            <>
                <div className="headerSection">
                    <h1>Package Details Management</h1>
                </div>
                <div className="sectNavOpt">
                    <Link href={"/dashboard_admin"}>Overview</Link>
                    <i className="icofont-rounded-double-right"></i>
                    <Link href={"/dashboard_admin/subs"}>Subscriptions</Link>
                    <i className="icofont-rounded-double-right"></i>
                    <p>Package Details Management</p>
                </div>
                <section className='subs dashprofileCntn'>
                    <div className="fancyBorderClass dashpfpDisplayCntn">
                        <div className="firstSection">
                            <h2>Welcome to this {sub_data?.plan.name} Details</h2>
                            <span>{sub_data?.customer.first_name ? `${sub_data?.customer.first_name.charAt(0)}${sub_data?.customer.last_name.charAt(0)}` : `${sub_data?.customer.email.charAt(0)}`}</span>
                            {
                                sub_data?.customer.first_name && (
                                    <h4>{sub_data?.customer.first_name} {sub_data?.customer.last_name}</h4>
                                )
                            }
                            <p>{sub_data?.customer.email}</p>
                        </div>
                    </div>
                    <div className="fancyBorderClass dashpfpDisplayCntn">
                        <div className="firstSection secSection">
                            <h2>Package Details</h2>
                            <div className="theDataCntn">
                                <div className="unitDataCard">
                                    <h4>Plan Name :</h4>
                                    <div className="dataValue">{sub_data?.plan.name}</div>
                                </div>
                                <div className="unitDataCard">
                                    <h4>Remaining Visit days :</h4>
                                    <div className="dataValue">{sub_data?.remaining_visit_days}</div>
                                </div>
                                <div className="unitDataCard">
                                    <h4>Plan Code :</h4>
                                    <div className="dataValue">{sub_data?.plan?.plan_code}</div>
                                </div>
                                <div className="unitDataCard">
                                    <h4>Plan Interval :</h4>
                                    <div className="dataValue">{sub_data?.plan.interval}</div>
                                </div>
                                <div className="unitDataCard">
                                    <h4>Subscription Status :</h4>
                                    <div className="dataValue">{sub_data?.status}</div>
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
                                            <h4>Customer&apos;s Name :</h4>
                                            <div className="dataValue">{sub_data?.customer.first_name} {sub_data?.customer.last_name}</div>
                                        </div>

                                    )
                                }
                                <div className="unitDataCard">
                                    <h4>Customer&apos;s Email :</h4>
                                    <div className="dataValue">{sub_data?.customer.email}</div>
                                </div>
                                <div className="unitDataCard">
                                    <h4>Customer&apos;s Id :</h4>
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
                            </div>
                            <div className="bottomDeep">
                                <button className="specBtn fillBtn" >Update Details</button>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )

    } catch (error) {
        console.error(error);
        return <div>Error: {error.message}</div>;
    }

}

export default Page
