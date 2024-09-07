import Link from 'next/link'
import React from 'react'

const Privacy = () => {
    return (
        <>
            <section className='membershipFisrtSect privacy'>
                <h1>Privacy Policy</h1>
            </section>
            <section className="privacy_Sect2">
                <div className="unitPolicy">
                    <p>
                    At DMayor we respect your privacy. This privacy policy explains how DMayor, through its website or app, may collect, use, and share information about you. Since this policy may change over time as we modify or expand our services, we suggest that you check from time to time in order to understand how we treat your personal information. Your use of this website and its services constitute your agreement to DMayor Fitness & Game Hub using information about you in accordance with this privacy policy.
                    </p>
                </div>
                <div className="unitPolicy">
                    <h2>I. What information do we collect?</h2>
                    <p>
                    Currently, {process.env.NEXT_PUBLIC_BASE_URL.replace("http://", "")} gathers information from you (such as name, e-mail address, business and/or home address, age, zip code, and travel preferences) strictly for contact purposes when users opt to fill out an e-mail submission form to inquire about our company and about membership. In some cases we ask for other optional information including additional contact information and certain demographic information (such as phone number and gender).
                    </p>
                </div>
                <div className="unitPolicy">
                    <h2>II. How do we use your information?</h2>
                    <p>
                    We may use your information for purposes, including, to provide and service your DMayor Fitness membership, to provide member support, to provide and service the DMayor Fitness website and app, to communicate special offers, promotions and information about our company to you via email and/or via text message, and to compile usage statistics and other data regarding the use of the Web site services.
                    </p>
                </div>
                <div className="unitPolicy">
                    <h2>III. How do we use your email information?</h2>
                    <p>
                    At DMayor Fitness we respect your concerns about privacy. We collect email information to provide a more personalized and relevant experience. If you give us your email address when you inquire about membership, request a free trial guest pass, or sign up, we will send you emails about exclusive offers, news at DMayor Fitness and new club openings. If you have previously opted out of receiving emails from us, providing updated information will act as an 'opt back-in'. If you want to opt-out of receiving promotional emails, simply click on the unsubscribe link located on the bottom of all of our emails. Although we strive to update our email list as frequently as possible, you might receive another contact before we are able to remove you. Please note that you will continue to receive Member Services related communications as it pertains to your member account. DMayor Fitness may use any of your contact information held on file (including Email, Mailing, Phone & Fax) to communicate with you in relation to day to day administrative activities, such as freeze requests, online purchases and important service alerts.
                    </p>
                </div>
                <div className="unitPolicy">
                    <h2>IV. How do we use your phone number?</h2>
                    <p>If you provide your mobile telephone number you are providing consent to receive SMS text alerts from DMayor Fitness and you confirm that you are the customary user of the phone number submitted. Text alerts may be sent using an automated dialing system. Your consent is not a condition of purchasing any goods or services, and may be revoked at any time, including by responding STOP to any SMS text alert you receive. Message and data rates may apply.
                    </p>
                </div>
                <div className="unitPolicy">
                    <h2>V. How we share your information:</h2>
                    <p>We may share your information in the following ways:
                    </p>
                    <p>With third-party vendors: We employ other companies and individuals to perform functions on our behalf. We may disclose your information to third parties for the following purposes, including tracking purposes, to charge your credit card (or process your check or money order, as appropriate), fill your order, improve the functionality of our site, perform statistical and data analyses, deliver your order and deliver promotional emails to you from us, removing repetitive information from customer lists, providing marketing assistance and targeted advertising, and providing customer service. For example, we must release your credit card number to confirm payment; and release your mailing address information to the delivery service to deliver products that you ordered. They have access to personal information needed to perform their functions, but may not use it for other purposes.
                    </p>
                    <p>We share the following categories of information about you for a business purpose: <br />
                    • Identifiers; and <br />
                    • Internet or other electronic network activity information.</p>
                    <p>For legal reasons and to protect DMayor Fitness: We may release account and other personal information when we believe release is necessary to comply with law; enforce or apply our Terms of Use and other agreements; or protect the rights, property, or safety of DMayor Fitness, LLC, our users, or others. This includes exchanging information with other companies and organizations for fraud protection.</p>
                </div>
                <div className="unitPolicy">
                    <h2>VI. Do we use cookies?</h2>
                    <p>We use cookies to enhance your experience on our web site. For example, a cookie enables us to remember the region you visited from. You can set your Internet browser (like Chrome, Firefox, Safari or Internet Explorer) to warn you every time a cookie is sent, or to turn off all cookies. See your browser's Help menu for these instructions. By disabling your cookies you will not have access to some of the features that enhance your user experience on our site.
                    </p>
                </div>
                <div className="unitPolicy">
                    <h2>VII. How do we protect children on our web site?</h2>
                    <p>We are committed to making a safe environment for children on our site. When we collect information for membership inquiry purposes, users are informed they must be at least 18 years of age or have parental consent to provide personally identifying information to us. We encourage parents to monitor children&apos;s Internet use to keep them safe while navigating {process.env.NEXT_PUBLIC_BASE_URL.replace("http://", "")} and all other areas of the Internet.
                    </p>
                </div>
                <div className="unitPolicy">
                    <h2>VIII. Does this Privacy Policy apply to external links found on this Web site?</h2>
                    <p>While this site may contain links to other sites, please note that when you click on one of these links, you are 'clicking' away from {process.env.NEXT_PUBLIC_BASE_URL.replace("http://", "")} to another Web site. We encourage you to read the privacy statements of these linked sites as their privacy policies may differ from ours. We are not responsible for the privacy practices or the content of such Web sites.
                    </p>
                </div>
                <div className="unitPolicy">
                    <h2>IX. How can you contact Crunch?</h2>
                    <p>If you have questions regarding our Privacy Policy, our website, or how we use your data, please click here:
                    </p>
                    <Link className='specBtn borderBtn' href={"/contact"}>Contact DMayor Fitness</Link>
                    <p>Or you may reach out to the front desk DMayor Fitness & Game Hub, 32 Mafemi Crescent Utako, Abuja, Nigeria.</p>
                </div>
            </section>
        </>
    )
}

export default Privacy
