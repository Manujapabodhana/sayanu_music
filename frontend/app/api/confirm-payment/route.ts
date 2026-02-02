import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { registerForEvent } from '@/lib/api';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-01-27.acacia',
});

export async function POST(req: NextRequest) {
    try {
        const { session_id } = await req.json();

        // Retrieve the session from Stripe
        const session = await stripe.checkout.sessions.retrieve(session_id);

        if (session.payment_status === 'paid') {
            const { eventId, userName, userEmail } = session.metadata!;

            // Save registration to backend
            await registerForEvent({
                eventId: parseInt(eventId),
                userName,
                userEmail,
            });

            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: 'Payment not completed' }, { status: 400 });
        }
    } catch (err: any) {
        console.error('Confirm payment error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}