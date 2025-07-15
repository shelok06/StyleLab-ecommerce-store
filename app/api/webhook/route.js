import { NextResponse } from "next/server";
import Stripe from "stripe";
import connectDB from "@/db/connectDB";
import Order from "@/model/Order";
import Userdata from "@/model/Userdata";

export async function POST(req) {
    const sig = await req.headers.get('stripe-signature')
    const textBody = await req.text()
    const body = JSON.parse(textBody)
    const id = body.data.object.metadata.orderID
    const email = body.data.object.metadata.email

    let deliveryDate = () => {
        const date = new Date()
        let newDate = date.setDate(date.getDate() + 7)
        return (new Date(newDate).toDateString())
    }


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
            console.log(deliveryDate())
            let db = await Order.findOneAndUpdate({ orderID: id }, { payment: true, orderFinalization: true, updatedAt: new Date().toLocaleString(), deliveryDate: deliveryDate() }, { new: true })
            await Userdata.findOneAndUpdate({email: email}, {cart: []}, { new: true })
            if (!db) throw new Error("Order not found")
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
            break;
    }

    return NextResponse.json({ success: true })
}