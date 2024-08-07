// pages/api/webhook.js

import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { addDocument } from '@/app/db/firestoreService';
import { sendWelcomeEmail } from '@/utils/email';

/**
 * Handles POST requests to the webhook endpoint.
 * 
 * @param {Request} req - The incoming request object.
 * @returns {Promise<NextResponse>} - The response object.
 */
export async function POST(req) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_KEY;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }


  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, return an error
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: 'Error occurred -- no svix headers' }, { status: 400 });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return NextResponse.json({ error: 'Error occurred during verification' }, { status: 400 });
  }

  // Extract relevant data from the event
  const eventType = evt.type;
  const eventData = evt.data;

  const html_to_mail = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to DMayor Fitness & Game Hub</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@400;700&display=swap');

        body {
            font-family: 'Alegreya Sans', sans-serif;
            background-color: #f8f9fa;
            color: #333;
            margin: 0;
            padding: 0;
            font-size: 17px;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f3f3ef52;
            backdrop-filter: blur(10px);
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .container p{
          font-weight: 400px;
        }

        .header {
            text-align: center;
            padding: 10px 0;
        }

        .header a{
            width: 100%;
            background-color: transparent;
            display: grid;
            place-items: center;
        }

        .header a img{
            width: 320px;
            object-fit: contain;
            object-position: center;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
            color: #F2FEDC;
            color: #1b1800;
        }

        ul{
            display: grid;
            gap: 8px;
        }

        .content {
            padding: 20px 0;
        }

        .content p {
            line-height: 1.6;
        }

        .content p a{
            color: inherit;
        }

        .cta {
            text-align: center;
            margin-top: 20px;
        }

        .cta a {
            display: inline-block;
            padding: 10px 20px;
            background-color: #C0BA82;
            color: #fff;
            font-size: 1.05em;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
        }

        .footer {
            text-align: center;
            padding: 10px 0;
            font-size: 14px;
            color: #666;
        }

        @media screen and (max-width: 450px) {
            body {
                font-size: 13px;
            }
            .footer {
                text-align: center;
                padding: 10px 0;
                font-size: 11px;
                color: #666;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/dmayorLogo.png"><img src="./dmayorLogo.png" alt="Dmayor Fitness Logo"></a>
            <h1>Welcome to DMayor Fitness & Game Hub! 🏋️‍♂️🎮</h1>
        </div>
        <div class="content">
            <p>Dear ${eventData.first_name},</p>
            <p>Welcome to the DMayor Fitness & Game Hub family! We're thrilled to have you join us on this exciting journey toward a healthier, stronger, and more vibrant you.</p>
            <p>At DMayor Fitness & Game Hub, we believe in more than just workouts and routines. We believe in creating a supportive, uplifting community where every member feels like family. Whether you're here to lift weights, join a fitness class, or enjoy our game hub, you're now part of a family that inspires and motivates each other every step of the way.</p>
            <p>To kickstart your fitness journey, we invite you to explore our range of subscription options tailored to fit your goals and lifestyle. By subscribing, you'll gain access to exclusive content, personalized workout plans, and a community of like-minded individuals who are as passionate about fitness as you are.</p>
            <p>Here's a sneak peek of what awaits you:</p>
            <ul>
                <li><strong>Expert-Led Classes:</strong> From yoga to high-intensity interval training, our classes are designed to challenge and inspire.</li>
                <li><strong>State-of-the-Art Equipment:</strong> Our gym is equipped with the latest and greatest to ensure you have everything you need to succeed.</li>
                <li><strong>Community Events:</strong> Join us for special events, challenges, and gatherings that bring our family even closer.</li>
                <li><strong>Game Hub Access:</strong> Take a break and enjoy our game hub, the perfect place to unwind and connect with fellow members.</li>
            </ul>
            <p>We can't wait to see you reach new heights and celebrate your achievements with you. If you have any questions or need assistance, our friendly staff is always <a href="${process.env.NEXT_PUBLIC_BASE_URL}/contact"><strong>here</strong></a> to help.</p>
            <p>Welcome once again, and let's make this journey unforgettable!</p>
        </div>
        <div class="cta">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/membership">Get Started Now</a>
        </div>
        <div class="footer">
            <p> <strong>Warm regards,</strong><br>The DMayor Fitness & Game Hub Team</p>
        </div>
    </div>
</body>
</html>
`

  // Here you can add your logic to save the user data to the database
  // Example: saveUserDataToDatabase(evt.data);
  if (eventType === 'user.created') {
    addDocument('users', eventData);
    console.log("data successfully stored");
    sendWelcomeEmail(
      'quadvox0@gmail.com',
      "We all at DMayor Fitness & Game hub warmly welcome you to our beautiful family",
      "Welcome to DMayor Fitness & Game Hub Family! 🏋️‍♂️🎮",
      html_to_mail
    );
    console.log("email successfully sent");
  }

  return NextResponse.json({}, { status: 200 });
}

/**
 * Handles GET requests to the webhook endpoint.
 * 
 * @param {Request} req - The incoming request object.
 * @returns {Promise<NextResponse>} - The response object.
 */
export async function GET(req) {
  return NextResponse.json({ message: 'Method not allowed - This endpoint {webhooks/clerk} is only for POST requests' }, { status: 405 });
}

// Default export to handle all HTTP methods
// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const response = await POST(req);
//     res.status(response.status).send(response.body);
//   } else {
//     const response = await GET(req);
//     res.status(response.status).send(response.body);
//   }
// }
