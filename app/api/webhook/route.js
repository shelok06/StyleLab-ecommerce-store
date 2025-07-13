import { NextResponse } from "next/server";
import Stripe from "stripe";
import connectDB from "@/db/connectDB";
import Order from "@/model/Order";

export async function POST(req) {
    const sig = await req.headers.get('stripe-signature')
    const textBody = await req.text()
    const body = JSON.parse(textBody)
    const id = body.data.object.metadata.orderID

    const stripe = new Stripe(process.env.STRIPE_SECRET)

    let event;

    try {
        event = stripe.webhooks.constructEvent(textBody, sig, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (error) {
        return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 });
    }

    switch (event.type) {
        case 'payment_intent.succeeded':
            await connectDB()
            let db = await Order.findOneAndUpdate({ orderID: id }, { payment: true, orderFinalization: true }, { new: true })
            if (!db) throw new Error("Order not found")
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
            break;
    }

    return NextResponse.json({ success: true })
}