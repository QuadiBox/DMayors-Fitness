// pages/api/webhooks/paystack

import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { sendWelcomeEmail } from '@/utils/email';
import crypto from 'crypto';

/**
 * Handles POST requests to the webhook endpoint.
 * 
 * @param {Request} req - The incoming request object.
 * @returns {Promise<NextResponse>} - The response object.
 */
export async function POST(req) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const secret = process.env.PAYSTACK_SECRET_KEY;

  if (!secret) {
    throw new Error('Please add your secret key from Paystack Dashboard to .env or .env.local');
  }

  const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');


  // Validate the Paystack signature
  if (hash !== req.headers['x-paystack-signature']) {
    return NextResponse.json({ error: 'Error occurred -- Invalid signature' }, { status: 400 });
  }

  // The request is verified, handle the event
  const data = req.body;

  const eventType = data.event;
  const eventData = data.data;

  const invoice_created_mail = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upcoming Subscription Renewal</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@400;700&display=swap');

        body {
            font-family: 'Alegreya Sans', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            font-size: 17px;
        }
        .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #2a2924;
            color: #fcfae9;
            padding: 20px;
            text-align: center;
        }
        .header img {
            max-width: 350px;
            min-width: 200px;
            object-fit: contain;
            object-position: center;
        }
        .header h1 {
            margin: 0;
            font-size: 2em;
            font-weight: 400;
            text-align: center;
        }
        .content {
            padding: 20px;
        }
        .content h2 {
            color: #333333;
        }
        .content p {
            color: #555555;
            line-height: 1.6;
            font-weight: 400;
        }
        .content p span, .content p a {
            color: black;
            font-weight: 600;
            text-decoration: none;
        }
        .content .invoice-details {
            background-color: #f9f9f9;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .content .invoice-details h3 {
            margin: 0 0 10px 0;
            color: #C0BA82;
        }
        .content .invoice-details p {
            margin: 5px 0;
            color: #333333;
        }
        .content .follow-us {
            text-align: center;
            margin-top: 20px;
        }
        .content .follow-us .socials {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .content .follow-us a {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            margin: 0 10px;
            border: 1px solid black;
            text-decoration: none;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .footer {
            background-color: #f4f4f4;
            color: #777777;
            padding: 20px;
            text-align: center;
            font-size: 14px;
        }

        @media screen and (max-width: 350px) {
            body {
                font-size: 13px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}"><img src="${process.env.NEXT_PUBLIC_BASE_URL}/dmayorLogo.png" alt="Dmayor Fitness Logo"></a>

            <h1>Upcoming Subscription Renewal</h1>
        </div>
        <div class="content">
            <h2>Hello ${eventData?.customer?.first_name},</h2>
            <p>We hope you're enjoying our services! We wanted to remind you that your subscription is set to renew in 3 days. Below are the details of the upcoming invoice:</p>
            <div class="invoice-details">
                <h3>Invoice Details</h3>
                <p><strong>Invoice Code:</strong> ${eventData?.invoice_code}</p>
                <p><strong>Amount:</strong> &#8358;${eventData?.amount} NGN</p>
                <p><strong>Renewal Period:</strong> ${new Date(eventData?.period_start).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year:  'numeric', hour: 'numeric', minute: 'numeric', hour12: true})} to ${new Date(eventData?.period_end).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year:  'numeric', hour: 'numeric', minute: 'numeric', hour12: true})}</p>
            </div>
            <div class="invoice-details">
                <h3>Card Details</h3>
                <p><strong>Card Type:</strong> ${eventData?.authorization?.card_type }</p>
                <p><strong>Card Number:</strong> **** **** **** ${ eventData?.authorization?.last4 }</p>
                <p><strong>Expiry Date:</strong> ${ eventData?.authorization?.exp_month }/${ eventData?.authorization?.exp_year }</p>
            </div>
            <p>Please ensure that the amount of <span>&#8358;${ eventData.amount / 100 }</span> is available on your card ending in <span>${ eventData?.authorization?.last4 }</span> to avoid any interruption in your subscription. If you have any concerns, feel free to <a href="${process.env.NEXT_PUBLIC_BASE_URL}/contact">reach out to us</a>.</p>
            <div class="follow-us">
                <h3>Follow us on:</h3>
                <div class="socials">
                    <a className="social" href="https://x.com/Dmayorfithub"><svg width="40" height="40" viewBox="0 0 40 40" fill="black" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.5983 18.31L27.8524 10.8999H26.3704L20.9399 17.3339L16.6026 10.8999H11.6L18.1589 20.6293L11.6 28.3999H13.0821L18.8168 21.6053L23.3974 28.3999H28.4L21.5979 18.31H21.5983ZM19.5683 20.715L18.9037 19.7462L13.6161 12.0371H15.8926L20.1597 18.2586L20.8243 19.2274L26.3711 27.3144H24.0946L19.5683 20.7154V20.715Z" fill="inherit"/>
                        </svg>
                    </a> 
                    <a className="social" href="https://www.instagram.com/dmayorfitness?igshid=NzZlODBkYWE4Ng%3D%3D"><svg width="40" height="40" viewBox="0 0 40 40" fill="black" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M20.0416 24.8745C17.3618 24.8745 15.1885 22.6942 15.1885 20.0215C15.1885 17.3488 17.3689 15.1684 20.0416 15.1684C22.7143 15.1684 24.8946 17.3488 24.8946 20.0215C24.8946 22.6942 22.7143 24.8745 20.0416 24.8745ZM20.0416 16.0335C17.8401 16.0335 16.0536 17.82 16.0536 20.0215C16.0536 22.2229 17.8401 24.0094 20.0416 24.0094C22.243 24.0094 24.0295 22.2229 24.0295 20.0215C24.0295 17.82 22.236 16.0335 20.0416 16.0335Z" fill="inherit"/>
                            <path d="M26.2309 14.8937C26.2309 15.5502 25.6988 16.0823 25.0423 16.0823C24.3858 16.0823 23.8537 15.5502 23.8537 14.8937C23.8537 14.2372 24.3858 13.7051 25.0423 13.7051C25.6988 13.7051 26.2309 14.2372 26.2309 14.8937Z" fill="inherit"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M24.4656 29.3332H15.8004C12.966 29.3332 10.666 27.0262 10.666 24.1988V15.8009C10.666 12.9664 12.973 10.6665 15.8004 10.6665H24.4656C27.3 10.6665 29.607 12.9735 29.607 15.8009V24.1988C29.5999 27.0262 27.293 29.3332 24.4656 29.3332ZM15.7934 11.5246C13.4372 11.5246 11.5241 13.4377 11.5241 15.7939V24.1917C11.5241 26.5479 13.4372 28.461 15.7934 28.461H24.4585C26.8147 28.461 28.7278 26.5479 28.7278 24.1917V15.7939C28.7278 13.4377 26.8147 11.5246 24.4585 11.5246H15.7934Z" fill="inherit"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear} DMayor Fitness & Game Hub. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`

  const invoice_failed_mail = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Failed - Subscription Renewal</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@400;700&display=swap');

        body {
            font-family: 'Alegreya Sans', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            font-size: 17px;
        }
        .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #6b2601;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .header img {
            max-width: 350px;
            min-width: 200px;
            object-fit: contain;
            object-position: center;
        }
        .header h1 {
            margin: 0;
            font-size: 2em;
            font-weight: 400;
            text-align: center;
        }
        .content {
            padding: 20px;
        }
        .content h2 {
            color: #333333;
        }
        .content p {
            color: #555555;
            line-height: 1.6;
            font-weight: 400;
        }
        .content p span, .content p a {
            color: black;
            font-weight: 600;
            text-decoration: none;
        }
        .content .invoice-details {
            background-color: #f9f9f9;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .content .invoice-details h3 {
            margin: 0 0 10px 0;
            color: #C0BA82;
        }
        .content .invoice-details p {
            margin: 5px 0;
            color: #333333;
        }
        .content .icon {
            width: 20px;
            height: 20px;
            margin-right: 8px;
            vertical-align: middle;
        }
        .content .follow-us {
            text-align: center;
            margin-top: 20px;
        }
        .content .follow-us .socials {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .content .follow-us a {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            margin: 0 10px;
            border: 1px solid black;
            text-decoration: none;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .footer {
            background-color: #f4f4f4;
            color: #777777;
            padding: 20px;
            text-align: center;
            font-size: 14px;
        }

        @media screen and (max-width: 350px) {
            body {
                font-size: 13px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}"><img src="${process.env.NEXT_PUBLIC_BASE_URL}/dmayorLogo.png" alt="Dmayor Fitness Logo"></a>
            <h1>Payment Failed</h1>
        </div>
        <div class="content">
            <h2>Hello ${eventData?.customer?.first_name},</h2>
            <p>Unfortunately, we were unable to process the payment for your recent subscription renewal. Below are the details of the failed invoice:</p>
            <div class="invoice-details">
                <h3><img class="icon" src="https://cdn-icons-png.flaticon.com/512/2913/2913462.png" alt="Invoice Icon">Invoice Details</h3>
                <p><strong>Invoice Code:</strong> ${eventData?.invoice_code}</p>
                <p><strong>Amount:</strong> &#8358${eventData?.amount} NGN</p>
                <p><strong>Renewal Period:</strong> ${new Date(eventData?.period_start).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year:  'numeric', hour: 'numeric', minute: 'numeric', hour12: true})} to ${new Date(eventData?.period_end).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year:  'numeric', hour: 'numeric', minute: 'numeric', hour12: true})}</p>
            </div>
            <div class="invoice-details">
                <h3><img class="icon" src="https://cdn-icons-png.flaticon.com/512/84/84231.png" alt="Card Icon">Card Details</h3>
                <p><strong>Card Type:</strong> ${eventData?.authorization?.card_type }</p>
                <p><strong>Card Number:</strong> **** **** **** ${ eventData?.authorization?.last4 }</p>
                <p><strong>Expiry Date:</strong> ${ eventData?.authorization?.exp_month }/${ eventData?.authorization?.exp_year }</p>
            </div>
            <p>Please ensure that the amount of <span>&#8358;${ eventData.amount / 100 }</span> is available on your card ending in <span>${ eventData?.authorization?.last4 }</span> to avoid any interruption in your subscription. You can update your payment information by logging into your account. If you have any concerns, feel free to <a href="${process.env.NEXT_PUBLIC_BASE_URL}/contact">reach out to us</a>.</p>
            <div class="follow-us">
                <h3>Follow us on:</h3>
                <div class="socials">
                    <a className="social" href="https://x.com/Dmayorfithub"><svg width="40" height="40" viewBox="0 0 40 40" fill="black" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.5983 18.31L27.8524 10.8999H26.3704L20.9399 17.3339L16.6026 10.8999H11.6L18.1589 20.6293L11.6 28.3999H13.0821L18.8168 21.6053L23.3974 28.3999H28.4L21.5979 18.31H21.5983ZM19.5683 20.715L18.9037 19.7462L13.6161 12.0371H15.8926L20.1597 18.2586L20.8243 19.2274L26.3711 27.3144H24.0946L19.5683 20.7154V20.715Z" fill="inherit"/>
                        </svg>
                    </a> 
                    <a className="social" href="https://www.instagram.com/dmayorfitness?igshid=NzZlODBkYWE4Ng%3D%3D"><svg width="40" height="40" viewBox="0 0 40 40" fill="black" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M20.0416 24.8745C17.3618 24.8745 15.1885 22.6942 15.1885 20.0215C15.1885 17.3488 17.3689 15.1684 20.0416 15.1684C22.7143 15.1684 24.8946 17.3488 24.8946 20.0215C24.8946 22.6942 22.7143 24.8745 20.0416 24.8745ZM20.0416 16.0335C17.8401 16.0335 16.0536 17.82 16.0536 20.0215C16.0536 22.2229 17.8401 24.0094 20.0416 24.0094C22.243 24.0094 24.0295 22.2229 24.0295 20.0215C24.0295 17.82 22.236 16.0335 20.0416 16.0335Z" fill="inherit"/>
                            <path d="M26.2309 14.8937C26.2309 15.5502 25.6988 16.0823 25.0423 16.0823C24.3858 16.0823 23.8537 15.5502 23.8537 14.8937C23.8537 14.2372 24.3858 13.7051 25.0423 13.7051C25.6988 13.7051 26.2309 14.2372 26.2309 14.8937Z" fill="inherit"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M24.4656 29.3332H15.8004C12.966 29.3332 10.666 27.0262 10.666 24.1988V15.8009C10.666 12.9664 12.973 10.6665 15.8004 10.6665H24.4656C27.3 10.6665 29.607 12.9735 29.607 15.8009V24.1988C29.5999 27.0262 27.293 29.3332 24.4656 29.3332ZM15.7934 11.5246C13.4372 11.5246 11.5241 13.4377 11.5241 15.7939V24.1917C11.5241 26.5479 13.4372 28.461 15.7934 28.461H24.4585C26.8147 28.461 28.7278 26.5479 28.7278 24.1917V15.7939C28.7278 13.4377 26.8147 11.5246 24.4585 11.5246H15.7934Z" fill="inherit"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear} DMayor Fitness & Game Hub. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`

  const subscription_create_mail = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to DMayor Fitness & Game Hub!</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@400;700&display=swap');

        body {
            font-family: 'Alegreya Sans', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            font-size: 17px;
        }

        .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #2a2924;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }

        .header img {
            max-width: 350px;
            min-width: 200px;
            object-fit: contain;
            object-position: center;
        }

        .header h1 {
            margin: 0;
            font-size: 2em;
            font-weight: 400;
            text-align: center;
        }

        .content {
            padding: 20px;
        }

        .content h2 {
            color: #333333;
        }

        .content p {
            color: #555555;
            line-height: 1.6;
            font-weight: 400;
        }

        .content p span,
        .content p a {
            color: black;
            font-weight: 600;
            text-decoration: none;
        }

        .content .subscription-details {
            background-color: #f9f9f9;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 20px;
        }

        .content .subscription-details h3 {
            margin: 0 0 10px 0;
            color: #C0BA82;
        }

        .content .subscription-details p {
            margin: 5px 0;
            color: #333333;
        }

        .content .icon {
            width: 24px;
            height: 24px;
            margin-right: 8px;
            vertical-align: middle;
        }

        .content .follow-us {
            text-align: center;
            margin-top: 20px;
        }

        .content .follow-us .socials {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .content .follow-us a {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            margin: 0 10px;
            border: 1px solid black;
            text-decoration: none;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .footer {
            background-color: #f4f4f4;
            color: #777777;
            padding: 20px;
            text-align: center;
            font-size: 14px;
        }

        @media screen and (max-width: 350px) {
            body {
                font-size: 13px;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <a href="https://dmayorsfitness.vercel.app"><img src="${process.env.NEXT_PUBLIC_BASE_URL}/dmayorLogo.png" alt="Dmayor Fitness Logo"></a>
            <h1>Welcome to DMayor Fitness & Game Hub!</h1>
        </div>
        <div class="content">
            <h2>Hello ${eventData?.customer?.first_name} ${eventData?.customer?.last_name},</h2>
            <p>We are thrilled to welcome you to the <strong>DMayor Fitness & Game Hub</strong> family! Your subscription to the <strong>{{ data.plan.name }}</strong> is now <strong>active</strong>. Here are the details of your subscription:</p>
            <div class="subscription-details">
                <h3><img class="icon" src="https://cdn-icons-png.flaticon.com/512/1574/1574434.png">Subscription Details</h3>
                <p><strong>Subscription Code:</strong>${eventData?.subscription_code}</p>
                <p><strong>Plan Name:</strong> ${eventData?.plan?.name}</p>
                <p><strong>Amount:</strong> &#8358;${(eventData?.amount / 100).toLocaleString()} NGN</p>
                <p><strong>Next Payment Date:</strong> ${new Date(eventData?.next_payment_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year:  'numeric', hour: 'numeric', minute: 'numeric', hour12: true})}</p>
                <p><strong>Payment Frequency:</strong> ${eventData?.plan?.interval}</p>
                <p><strong>Status:</strong> ${eventData?.status}</p>
            </div>
            <div class="subscription-details">
                <h3><img class="icon" src="https://cdn-icons-png.flaticon.com/512/84/84231.png" alt="ATM Card Icon">Card Details</h3>
                <p><strong>Card Type:</strong> ${eventData?.authorization?.card_type }</p>
                <p><strong>Card Number:</strong> **** **** **** ${ eventData?.authorization?.last4 }</p>
                <p><strong>Expiry Date:</strong> ${ eventData?.authorization?.exp_month }/${ eventData?.authorization?.exp_year }</p>
                <p><strong>Bank:</strong> ${ eventData?.authorization?.bank ? eventData?.authorization?.last4 : "Undefined" }</p>
            </div>
            <p>We are excited to have you on board, and we look forward to supporting you on your fitness journey. Remember, at DMayor Fitness & Game Hub, we believe in fitness with <span>NO JUDGEMENT</span>. Feel free to <a href="${process.env.NEXT_PUBLIC_BASE_URL}/contact">reach out to us</a> if you have any questions or need assistance with your subscription.</p>
            <div class="follow-us">
                <h3>Follow us on:</h3>
                <div class="socials">
                    <a className="social" href="https://x.com/Dmayorfithub"><svg width="40" height="40" viewBox="0 0 40 40" fill="black" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.5983 18.31L27.8524 10.8999H26.3704L20.9399 17.3339L16.6026 10.8999H11.6L18.1589 20.6293L11.6 28.3999H13.0821L18.8168 21.6053L23.3974 28.3999H28.4L21.5979 18.31H21.5983ZM19.5683 20.715L18.9037 19.7462L13.6161 12.0371H15.8926L20.1597 18.2586L20.8243 19.2274L26.3711 27.3144H24.0946L19.5683 20.7154V20.715Z" fill="inherit"/>
                        </svg>
                    </a>
                    <a className="social" href="https://www.instagram.com/dmayorfitness?igshid=NzZlODBkYWE4Ng%3D%3D"><svg width="40" height="40" viewBox="0 0 40 40" fill="black" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M20.0416 24.8745C17.3618 24.8745 15.1885 22.6942 15.1885 20.0215C15.1885 17.3488 17.3689 15.1684 20.0416 15.1684C22.7143 15.1684 24.8946 17.3488 24.8946 20.0215C24.8946 22.6942 22.7143 24.8745 20.0416 24.8745ZM20.0416 16.0335C17.8401 16.0335 16.0536 17.82 16.0536 20.0215C16.0536 22.2229 17.8401 24.0094 20.0416 24.0094C22.243 24.0094 24.0295 22.2229 24.0295 20.0215C24.0295 17.82 22.236 16.0335 20.0416 16.0335Z" fill="inherit"/>
                            <path d="M26.2309 14.8937C26.2309 15.5502 25.6988 16.0823 25.0423 16.0823C24.3859 16.0823 23.8538 15.5502 23.8538 14.8937C23.8538 14.2372 24.3859 13.7051 25.0423 13.7051C25.6988 13.7051 26.2309 14.2372 26.2309 14.8937Z" fill="inherit"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.9792 9.3639C13.1636 9.3639 11.687 9.92087 10.564 11.0438C9.44107 12.1668 8.88409 13.6434 8.88409 15.4591V24.5836C8.88409 26.3992 9.44107 27.8758 10.564 28.9988C11.687 30.1217 13.1636 30.6787 14.9792 30.6787H25.106V30.6782C25.1075 30.6782 25.1091 30.6783 25.1107 30.6784L25.1105 30.6787C26.9261 30.6787 28.4027 30.1217 29.5257 28.9988C30.6486 27.8758 31.2056 26.3992 31.2056 24.5836V15.4591C31.2056 13.6434 30.6486 12.1668 29.5257 11.0438C28.4027 9.92087 26.9261 9.3639 25.1105 9.3639H25.1107C25.1091 9.36396 25.1075 9.3641 25.106 9.3641V9.3639H14.9792ZM26.1965 10.2289C27.5642 10.2289 28.7692 10.7308 29.7175 11.6791C30.6658 12.6275 31.1677 13.8324 31.1677 15.2001V24.8425C31.1677 26.2102 30.6658 27.4151 29.7175 28.3635C28.7692 29.3118 27.5642 29.8137 26.1965 29.8137H14.9792C13.6115 29.8137 12.4066 29.3118 11.4582 28.3635C10.5099 27.4151 10.0079 26.2102 10.0079 24.8425V15.2001C10.0079 13.8324 10.5099 12.6275 11.4582 11.6791C12.4066 10.7308 13.6115 10.2289 14.9792 10.2289H26.1965Z" fill="inherit"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear} DMayor Fitness & Game Hub. All rights reserved.</p>
            <p>If you have any questions, feel free to contact our support team. <strong>#NOJUDGEMENT</strong></p>
        </div>
    </div>
</body>

</html>
`
  const subscription_non_renew_mail = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Subscription is Set to Not Renew</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@400;700&display=swap');

        body {
            font-family: 'Alegreya Sans', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            font-size: 17px;
        }

        .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #7b6007;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }

        .header img {
            max-width: 350px;
            min-width: 200px;
            object-fit: contain;
            object-position: center;
        }

        .header h1 {
            margin: 0;
            font-size: 2em;
            font-weight: 400;
            text-align: center;
        }

        .content {
            padding: 20px;
        }

        .content h2 {
            color: #333333;
        }

        .content p {
            color: #555555;
            line-height: 1.6;
            font-weight: 400;
        }

        .content p span,
        .content p a {
            color: black;
            font-weight: 600;
            text-decoration: none;
        }

        .content .subscription-details {
            background-color: #f9f9f9;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 20px;
        }

        .content .subscription-details h3 {
            margin: 0 0 10px 0;
            color: #C0BA82;
        }

        .content .subscription-details p {
            margin: 5px 0;
            color: #333333;
        }

        .content .icon {
            width: 24px;
            height: 24px;
            margin-right: 8px;
            vertical-align: middle;
        }

        .content .follow-us {
            text-align: center;
            margin-top: 20px;
        }

        .content .follow-us .socials {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .content .follow-us a {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            margin: 0 10px;
            border: 1px solid black;
            text-decoration: none;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .footer {
            background-color: #f4f4f4;
            color: #777777;
            padding: 20px;
            text-align: center;
            font-size: 14px;
        }

        @media screen and (max-width: 350px) {
            body {
                font-size: 13px;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <a href="https://dmayorsfitness.vercel.app"><img src="${process.env.NEXT_PUBLIC_BASE_URL}/dmayorLogo.png" alt="Dmayor Fitness Logo"></a>
            <title>Your Subscription is Set to Not Renew</title>
        </div>
        <div class="content">
            <h2>Hello ${eventData?.customer?.first_name} ${eventData?.customer?.last_name},</h2>
            <p>We noticed that your subscription to the <strong>${ eventData?.plan.name }</strong> is set to not renew after the currently running one expires. We understand that sometimes things change, but we just want to let you know how much we value having you as part of the <strong>DMayor Fitness & Game Hub</strong> family.</p>
            <div class="subscription-details">
                <h3><img class="icon" src="https://cdn-icons-png.flaticon.com/512/1574/1574434.png">Subscription Details</h3>
                <p><strong>Subscription Code:</strong>${eventData?.subscription_code}</p>
                <p><strong>Plan Name:</strong> ${eventData?.plan?.name}</p>
                <p><strong>Amount:</strong> &#8358;${(eventData?.amount / 100).toLocaleString()} NGN</p>
                <p><strong>Description:</strong> ${eventData?.plan?.description}</p>
                <p><strong>Payment Frequency:</strong> ${eventData?.plan?.interval}</p>
                <p><strong>Status:</strong> ${eventData?.status}</p>
            </div>
            <div class="subscription-details">
                <h3><img class="icon" src="https://cdn-icons-png.flaticon.com/512/84/84231.png" alt="ATM Card Icon">Card Details</h3>
                <p><strong>Card Type:</strong> ${eventData?.authorization?.card_type }</p>
                <p><strong>Card Number:</strong> **** **** **** ${ eventData?.authorization?.last4 }</p>
                <p><strong>Expiry Date:</strong> ${ eventData?.authorization?.exp_month }/${ eventData?.authorization?.exp_year }</p>
                <p><strong>Bank:</strong> ${ eventData?.authorization?.bank ? eventData?.authorization?.last4 : "Undefined" }</p>
            </div>
            <p>We'd hate for you to miss out on all the amazing things we have to offer—whether it's new workout plans, fitness tips, or exclusive member events. There's so much more to come, and we'd love for you to be part of it!</p>
            <p>If you change your mind, you can easily renew your subscription by visiting our website or contacting our support team. We’re here to help and make sure your fitness journey is everything you want it to be.</p>
            <p>Thank you for being a part of our community, ${eventData?.customer?.first_name}. We wish you the very best in all your endeavors, and we hope to see you back soon.</p>
            <div class="follow-us">
                <h3>Follow us on:</h3>
                <div class="socials">
                    <a className="social" href="https://x.com/Dmayorfithub"><svg width="40" height="40" viewBox="0 0 40 40" fill="black" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.5983 18.31L27.8524 10.8999H26.3704L20.9399 17.3339L16.6026 10.8999H11.6L18.1589 20.6293L11.6 28.3999H13.0821L18.8168 21.6053L23.3974 28.3999H28.4L21.5979 18.31H21.5983ZM19.5683 20.715L18.9037 19.7462L13.6161 12.0371H15.8926L20.1597 18.2586L20.8243 19.2274L26.3711 27.3144H24.0946L19.5683 20.7154V20.715Z" fill="inherit"/>
                        </svg>
                    </a>
                    <a className="social" href="https://www.instagram.com/dmayorfitness?igshid=NzZlODBkYWE4Ng%3D%3D"><svg width="40" height="40" viewBox="0 0 40 40" fill="black" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M20.0416 24.8745C17.3618 24.8745 15.1885 22.6942 15.1885 20.0215C15.1885 17.3488 17.3689 15.1684 20.0416 15.1684C22.7143 15.1684 24.8946 17.3488 24.8946 20.0215C24.8946 22.6942 22.7143 24.8745 20.0416 24.8745ZM20.0416 16.0335C17.8401 16.0335 16.0536 17.82 16.0536 20.0215C16.0536 22.2229 17.8401 24.0094 20.0416 24.0094C22.243 24.0094 24.0295 22.2229 24.0295 20.0215C24.0295 17.82 22.236 16.0335 20.0416 16.0335Z" fill="inherit"/>
                            <path d="M26.2309 14.8937C26.2309 15.5502 25.6988 16.0823 25.0423 16.0823C24.3859 16.0823 23.8538 15.5502 23.8538 14.8937C23.8538 14.2372 24.3859 13.7051 25.0423 13.7051C25.6988 13.7051 26.2309 14.2372 26.2309 14.8937Z" fill="inherit"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.9792 9.3639C13.1636 9.3639 11.687 9.92087 10.564 11.0438C9.44107 12.1668 8.88409 13.6434 8.88409 15.4591V24.5836C8.88409 26.3992 9.44107 27.8758 10.564 28.9988C11.687 30.1217 13.1636 30.6787 14.9792 30.6787H25.106V30.6782C25.1075 30.6782 25.1091 30.6783 25.1107 30.6784L25.1105 30.6787C26.9261 30.6787 28.4027 30.1217 29.5257 28.9988C30.6486 27.8758 31.2056 26.3992 31.2056 24.5836V15.4591C31.2056 13.6434 30.6486 12.1668 29.5257 11.0438C28.4027 9.92087 26.9261 9.3639 25.1105 9.3639H25.1107C25.1091 9.36396 25.1075 9.3641 25.106 9.3641V9.3639H14.9792ZM26.1965 10.2289C27.5642 10.2289 28.7692 10.7308 29.7175 11.6791C30.6658 12.6275 31.1677 13.8324 31.1677 15.2001V24.8425C31.1677 26.2102 30.6658 27.4151 29.7175 28.3635C28.7692 29.3118 27.5642 29.8137 26.1965 29.8137H14.9792C13.6115 29.8137 12.4066 29.3118 11.4582 28.3635C10.5099 27.4151 10.0079 26.2102 10.0079 24.8425V15.2001C10.0079 13.8324 10.5099 12.6275 11.4582 11.6791C12.4066 10.7308 13.6115 10.2289 14.9792 10.2289H26.1965Z" fill="inherit"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear} DMayor Fitness & Game Hub. All rights reserved.</p>
            <p>If you have any questions, feel free to contact our support team. <strong>#NOJUDGEMENT</strong></p>
        </div>
    </div>
</body>

</html>
`
  const subscription_disabled_mail = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Subscription Has Been Cancelled</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@400;700&display=swap');

        body {
            font-family: 'Alegreya Sans', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            font-size: 17px;
        }

        .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #6b2601;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }

        .header img {
            max-width: 350px;
            min-width: 200px;
            object-fit: contain;
            object-position: center;
        }

        .header h1 {
            margin: 0;
            font-size: 2em;
            font-weight: 400;
            text-align: center;
        }

        .content {
            padding: 20px;
        }

        .content h2 {
            color: #333333;
        }

        .content p {
            color: #555555;
            line-height: 1.6;
            font-weight: 400;
        }

        .content p span,
        .content p a {
            color: black;
            font-weight: 600;
            text-decoration: none;
        }

        .content .subscription-details {
            background-color: #f9f9f9;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 20px;
        }

        .content .subscription-details h3 {
            margin: 0 0 10px 0;
            color: #C0BA82;
        }

        .content .subscription-details p {
            margin: 5px 0;
            color: #333333;
        }

        .content .icon {
            width: 24px;
            height: 24px;
            margin-right: 8px;
            vertical-align: middle;
        }

        .content .follow-us {
            text-align: center;
            margin-top: 20px;
        }

        .content .follow-us .socials {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .content .follow-us a {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            margin: 0 10px;
            border: 1px solid black;
            text-decoration: none;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .footer {
            background-color: #f4f4f4;
            color: #777777;
            padding: 20px;
            text-align: center;
            font-size: 14px;
        }

        @media screen and (max-width: 350px) {
            body {
                font-size: 13px;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <a href="https://dmayorsfitness.vercel.app"><img src="${process.env.NEXT_PUBLIC_BASE_URL}/dmayorLogo.png" alt="Dmayor Fitness Logo"></a>
            <title>Your Subscription Has Been Cancelled</title>
        </div>
        <div class="content">
            <h2>Hello ${eventData?.customer?.first_name} ${eventData?.customer?.last_name},</h2>
            <p>We are sorry to see you go. Your subscription to the <strong>${ eventData?.plan?.name }</strong> plan has been successfully cancelled as of today, <strong>${ eventData?.created_at }</strong>. We understand that sometimes circumstances change, and we want you to know that the doors to <strong>DMayor Fitness & Game Hub</strong> are always open for you.</p>
            <div class="subscription-details">
                <h3><img class="icon" src="https://cdn-icons-png.flaticon.com/512/1574/1574434.png">Subscription Details</h3>
                <p><strong>Subscription Code:</strong>${eventData?.subscription_code}</p>
                <p><strong>Plan Name:</strong> ${eventData?.plan?.name}</p>
                <p><strong>Amount:</strong> &#8358;${(eventData?.amount / 100).toLocaleString()} NGN</p>
                <p><strong>Next Payment Date:</strong> ${new Date(eventData?.next_payment_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year:  'numeric', hour: 'numeric', minute: 'numeric', hour12: true})}</p>
                <p><strong>Payment Frequency:</strong> ${eventData?.plan?.interval}</p>
                <p><strong>Status:</strong> ${eventData?.status}</p>
            </div>
            <div class="subscription-details">
                <h3><img class="icon" src="https://cdn-icons-png.flaticon.com/512/84/84231.png" alt="ATM Card Icon">Card Details</h3>
                <p><strong>Card Type:</strong> ${eventData?.authorization?.card_type }</p>
                <p><strong>Card Number:</strong> **** **** **** ${ eventData?.authorization?.last4 }</p>
                <p><strong>Expiry Date:</strong> ${ eventData?.authorization?.exp_month }/${ eventData?.authorization?.exp_year }</p>
                <p><strong>Bank:</strong> ${ eventData?.authorization?.bank ? eventData?.authorization?.last4 : "Undefined" }</p>
            </div>
            <p>We hope your time with us was enjoyable and beneficial. Our mission is to support your fitness journey, and we'd love to continue being a part of it whenever you're ready.</p>
            <p>Should you decide to come back, renewing your subscription is simple, and we'd be thrilled to welcome you back. In the meantime, if you have any feedback or questions, don't hesitate to reach out to our support team.</p>
            <p>Thank you for being a part of our community, ${eventData?.customer?.first_name}. We wish you all the best and hope to see you again soon.</p>
            <div class="follow-us">
                <h3>Follow us on:</h3>
                <div class="socials">
                    <a className="social" href="https://x.com/Dmayorfithub"><svg width="40" height="40" viewBox="0 0 40 40" fill="black" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.5983 18.31L27.8524 10.8999H26.3704L20.9399 17.3339L16.6026 10.8999H11.6L18.1589 20.6293L11.6 28.3999H13.0821L18.8168 21.6053L23.3974 28.3999H28.4L21.5979 18.31H21.5983ZM19.5683 20.715L18.9037 19.7462L13.6161 12.0371H15.8926L20.1597 18.2586L20.8243 19.2274L26.3711 27.3144H24.0946L19.5683 20.7154V20.715Z" fill="inherit"/>
                        </svg>
                    </a>
                    <a className="social" href="https://www.instagram.com/dmayorfitness?igshid=NzZlODBkYWE4Ng%3D%3D"><svg width="40" height="40" viewBox="0 0 40 40" fill="black" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M20.0416 24.8745C17.3618 24.8745 15.1885 22.6942 15.1885 20.0215C15.1885 17.3488 17.3689 15.1684 20.0416 15.1684C22.7143 15.1684 24.8946 17.3488 24.8946 20.0215C24.8946 22.6942 22.7143 24.8745 20.0416 24.8745ZM20.0416 16.0335C17.8401 16.0335 16.0536 17.82 16.0536 20.0215C16.0536 22.2229 17.8401 24.0094 20.0416 24.0094C22.243 24.0094 24.0295 22.2229 24.0295 20.0215C24.0295 17.82 22.236 16.0335 20.0416 16.0335Z" fill="inherit"/>
                            <path d="M26.2309 14.8937C26.2309 15.5502 25.6988 16.0823 25.0423 16.0823C24.3859 16.0823 23.8538 15.5502 23.8538 14.8937C23.8538 14.2372 24.3859 13.7051 25.0423 13.7051C25.6988 13.7051 26.2309 14.2372 26.2309 14.8937Z" fill="inherit"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.9792 9.3639C13.1636 9.3639 11.687 9.92087 10.564 11.0438C9.44107 12.1668 8.88409 13.6434 8.88409 15.4591V24.5836C8.88409 26.3992 9.44107 27.8758 10.564 28.9988C11.687 30.1217 13.1636 30.6787 14.9792 30.6787H25.106V30.6782C25.1075 30.6782 25.1091 30.6783 25.1107 30.6784L25.1105 30.6787C26.9261 30.6787 28.4027 30.1217 29.5257 28.9988C30.6486 27.8758 31.2056 26.3992 31.2056 24.5836V15.4591C31.2056 13.6434 30.6486 12.1668 29.5257 11.0438C28.4027 9.92087 26.9261 9.3639 25.1105 9.3639H25.1107C25.1091 9.36396 25.1075 9.3641 25.106 9.3641V9.3639H14.9792ZM26.1965 10.2289C27.5642 10.2289 28.7692 10.7308 29.7175 11.6791C30.6658 12.6275 31.1677 13.8324 31.1677 15.2001V24.8425C31.1677 26.2102 30.6658 27.4151 29.7175 28.3635C28.7692 29.3118 27.5642 29.8137 26.1965 29.8137H14.9792C13.6115 29.8137 12.4066 29.3118 11.4582 28.3635C10.5099 27.4151 10.0079 26.2102 10.0079 24.8425V15.2001C10.0079 13.8324 10.5099 12.6275 11.4582 11.6791C12.4066 10.7308 13.6115 10.2289 14.9792 10.2289H26.1965Z" fill="inherit"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear} DMayor Fitness & Game Hub. All rights reserved.</p>
            <p>If you have any questions, feel free to contact our support team. <strong>#NOJUDGEMENT</strong></p>
        </div>
    </div>
</body>

</html>
`

  let html_to_mail
  let to_mail 
  let mail_text
  let mail_subject

  if (eventType === 'invoice.create') {
    html_to_mail = invoice_created_mail
    to_mail = eventData?.customer?.email
    mail_text = "An invoice for your subcription renewal"
    mail_subject = "A notification for the renewal of your current subscription"
  } else if (eventType === 'invoice.payment_failed') {
    html_to_mail = invoice_failed_mail
    to_mail = eventData?.customer?.email
    mail_text = "An invoice for a failed subcription renewal"
    mail_subject = "A notification for the failure to renew your current subscription plan"
  } else if (eventType === 'subscription.disable') {
    html_to_mail = subscription_disabled_mail
    to_mail = eventData?.customer?.email
    mail_text = "A notification for the cancellation of subcription"
    mail_subject = "A notification for the cancellation of subcription"
  } else if (eventType === 'subscription.create') {
    html_to_mail = subscription_create_mail
    to_mail = eventData?.customer?.email
    mail_text = "You have successfully purchased a subcription package"
    mail_subject = `You have successfully subscribed to the ${eventData?.plan?.name}`
  } else if (eventType === 'subscription.not_renew') {
    html_to_mail = subscription_non_renew_mail
    to_mail = eventData?.customer?.email
    mail_text = "You currently running subcription package has been set to not renew"
    mail_subject = `You have successfully cancelled your ${eventData?.plan?.name}`
  }

    if ( eventType !== "subscription.expiring_cards") {
        try {
          await sendWelcomeEmail(
          `"DMayor Fitness & Game Hub" <${process.env.EMAIL_NAME}>`,
          to_mail,
          mail_text,
          mail_subject,
          html_to_mail
          );
      
        } catch (error) {
            console.error(`Error handling current ${eventType}  event:`, err);
            return NextResponse.json({ error: `Error processing current ${eventType} event` }, { status: 500 });
        } 

    } else {
        const emailAll = eventData?.map(async (elem) => {
            const expiring_cards_mail = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to DMayor Fitness & Game Hub!</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@400;700&display=swap');

        body {
            font-family: 'Alegreya Sans', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            font-size: 17px;
        }

        .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #2a2924;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }

        .header img {
            max-width: 350px;
            min-width: 200px;
            object-fit: contain;
            object-position: center;
        }

        .header h1 {
            margin: 0;
            font-size: 2em;
            font-weight: 400;
            text-align: center;
        }

        .content {
            padding: 20px;
        }

        .content h2 {
            color: #333333;
        }

        .content p {
            color: #555555;
            line-height: 1.6;
            font-weight: 400;
        }

        .content p span,
        .content p a {
            color: black;
            font-weight: 600;
            text-decoration: none;
        }

        .content .subscription-details {
            background-color: #f9f9f9;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 20px;
        }

        .content .subscription-details h3 {
            margin: 0 0 10px 0;
            color: #C0BA82;
        }

        .content .subscription-details p {
            margin: 5px 0;
            color: #333333;
        }

        .content .icon {
            width: 24px;
            height: 24px;
            margin-right: 8px;
            vertical-align: middle;
        }

        .content .follow-us {
            text-align: center;
            margin-top: 20px;
        }

        .content .follow-us .socials {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .content .follow-us a {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            margin: 0 10px;
            border: 1px solid black;
            text-decoration: none;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .footer {
            background-color: #f4f4f4;
            color: #777777;
            padding: 20px;
            text-align: center;
            font-size: 14px;
        }

        @media screen and (max-width: 350px) {
            body {
                font-size: 13px;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <a href="https://dmayorsfitness.vercel.app"><img src="${process.env.NEXT_PUBLIC_BASE_URL}/dmayorLogo.png" alt="Dmayor Fitness Logo"></a>
            <h1>Welcome to DMayor Fitness & Game Hub!</h1>
        </div>
        <div class="content">
            <h2>Hello ${elem?.customer?.first_name} ${elem?.customer?.last_name},</h2>
                <p>We hope you're enjoying your experience with <strong>DMayor Fitness & Game Hub</strong>. This is a
                    friendly reminder that your <strong>${elem?.description}</strong>, used for your
                    <strong>${elem?.subscription?.plan?.name}</strong> subscription, is set to expire on
                    <strong>${elem?.expiry_date}</strong>.</p>
                <p>To ensure uninterrupted access to all the benefits our service offers, please take a moment to update
                    your payment information before your next billing cycle on
                    <strong>${elem?.subscription?.next_payment_date}</strong>.</p>
                <h3>Subscription Details</h3>
                <p><strong>Plan Name:</strong> ${elem?.subscription?.plan?.name}</p>
                <p><strong>Amount:</strong> &#8358;${elem?.subscription?.amount}</p>
                <p><strong>Next Payment Date:</strong> ${elem?.subscription?.next_payment_date}</p>
                <h3>Card Details</h3>
                <p><strong>Card Type:</strong> ${elem?.brand}</p>
                <p><strong>Card Number:</strong> **** **** **** ${elem?.description.split(' ').pop()}</p>
                <p><strong>Expiry Date:</strong> ${elem?.expiry_date}</p>
                <p>Thank you for choosing DMayor Fitness & Game Hub. We look forward to serving you for many more months to come.</p>
            <div class="follow-us">
                <h3>Follow us on:</h3>
                <div class="socials">
                    <a className="social" href="https://x.com/Dmayorfithub"><svg width="40" height="40" viewBox="0 0 40 40" fill="black" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.5983 18.31L27.8524 10.8999H26.3704L20.9399 17.3339L16.6026 10.8999H11.6L18.1589 20.6293L11.6 28.3999H13.0821L18.8168 21.6053L23.3974 28.3999H28.4L21.5979 18.31H21.5983ZM19.5683 20.715L18.9037 19.7462L13.6161 12.0371H15.8926L20.1597 18.2586L20.8243 19.2274L26.3711 27.3144H24.0946L19.5683 20.7154V20.715Z" fill="inherit"/>
                        </svg>
                    </a>
                    <a className="social" href="https://www.instagram.com/dmayorfitness?igshid=NzZlODBkYWE4Ng%3D%3D"><svg width="40" height="40" viewBox="0 0 40 40" fill="black" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M20.0416 24.8745C17.3618 24.8745 15.1885 22.6942 15.1885 20.0215C15.1885 17.3488 17.3689 15.1684 20.0416 15.1684C22.7143 15.1684 24.8946 17.3488 24.8946 20.0215C24.8946 22.6942 22.7143 24.8745 20.0416 24.8745ZM20.0416 16.0335C17.8401 16.0335 16.0536 17.82 16.0536 20.0215C16.0536 22.2229 17.8401 24.0094 20.0416 24.0094C22.243 24.0094 24.0295 22.2229 24.0295 20.0215C24.0295 17.82 22.236 16.0335 20.0416 16.0335Z" fill="inherit"/>
                            <path d="M26.2309 14.8937C26.2309 15.5502 25.6988 16.0823 25.0423 16.0823C24.3859 16.0823 23.8538 15.5502 23.8538 14.8937C23.8538 14.2372 24.3859 13.7051 25.0423 13.7051C25.6988 13.7051 26.2309 14.2372 26.2309 14.8937Z" fill="inherit"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.9792 9.3639C13.1636 9.3639 11.687 9.92087 10.564 11.0438C9.44107 12.1668 8.88409 13.6434 8.88409 15.4591V24.5836C8.88409 26.3992 9.44107 27.8758 10.564 28.9988C11.687 30.1217 13.1636 30.6787 14.9792 30.6787H25.106V30.6782C25.1075 30.6782 25.1091 30.6783 25.1107 30.6784L25.1105 30.6787C26.9261 30.6787 28.4027 30.1217 29.5257 28.9988C30.6486 27.8758 31.2056 26.3992 31.2056 24.5836V15.4591C31.2056 13.6434 30.6486 12.1668 29.5257 11.0438C28.4027 9.92087 26.9261 9.3639 25.1105 9.3639H25.1107C25.1091 9.36396 25.1075 9.3641 25.106 9.3641V9.3639H14.9792ZM26.1965 10.2289C27.5642 10.2289 28.7692 10.7308 29.7175 11.6791C30.6658 12.6275 31.1677 13.8324 31.1677 15.2001V24.8425C31.1677 26.2102 30.6658 27.4151 29.7175 28.3635C28.7692 29.3118 27.5642 29.8137 26.1965 29.8137H14.9792C13.6115 29.8137 12.4066 29.3118 11.4582 28.3635C10.5099 27.4151 10.0079 26.2102 10.0079 24.8425V15.2001C10.0079 13.8324 10.5099 12.6275 11.4582 11.6791C12.4066 10.7308 13.6115 10.2289 14.9792 10.2289H26.1965Z" fill="inherit"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear} DMayor Fitness & Game Hub. All rights reserved.</p>
            <p>If you have any questions, feel free to contact our support team. <strong>#NOJUDGEMENT</strong></p>
        </div>
    </div>
</body>

</html>

`
            return await sendWelcomeEmail(
                `"Dami from DMayor FItness" <${process.env.EMAIL_NAME}>`,
                elem?.customer?.email,
                "Your card is about to expire. Renew now or update your card details",
                "Your card is expiring",
                expiring_cards_mail
            );


        });

        try {
            await Promise.all(emailAll);
        } catch (error) {
            console.error("Error sending emails for expiring cards:", error);
        }
    }

  return NextResponse.json({ message: `Data is available now` }, { status: 200 });
}

/**
 * Handles GET requests to the webhook endpoint.
 * 
 * @param {Request} req - The incoming request object.
 * @returns {Promise<NextResponse>} - The response object.
 */
export async function GET(req) {
  return NextResponse.json({ message: 'Method not allowed - This endpoint {webhooks/paystack} is only for POST requests' }, { status: 405 });
}
