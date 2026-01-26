import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-01-27.acacia',
});

export async function POST(req: NextRequest) {
    try {
        const { eventId, eventTitle, userName, userEmail, amount } = await req.json();

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `Event Registration: ${eventTitle}`,
                            description: `Registration for ${userName}`,
                        },
                        unit_amount: amount * 100, // Amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${req.headers.get('origin')}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.get('origin')}/events`,
            customer_email: userEmail,
            metadata: {
                eventId: eventId.toString(),
                userName,
                userEmail,
            },
        });

        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
