import { NextResponse } from 'next/server';

export async function GET(req) {
  const url = 'https://api.paystack.co/subscription?perPage=300';
  
  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json'
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
