import connectDB from "@/db/connectDB";
import Userdata from "@/model/Userdata";
import clientPromise from "@/db/connectproductDB";
import Order from "@/model/Order";
import Stripe from "stripe";
import nodemailer from "nodemailer"


export async function saveCart(item, email) {
    await connectDB()
    try {
        let db = await Userdata.findOneAndUpdate({ email: email }, { cart: item.cart })
        if (!db) throw new Error("User not found")
        return true
    } catch (error) {
        return { success: false, message: error }
    }
}

export async function fetchProducts() {
    try {
        const client = await clientPromise
        const db = client.db('stylelabAdmin')
        const data = await db.collection("products").find({}).toArray()
        return { success: true, data: data }
    }
    catch (error) {
        return { success: false, message: error }
    }

}

export async function orderCreator(id, email) {
    await connectDB()
    try {
        const db = await Userdata.findOne({ email: email })
        if (!db) throw new Error("User not found")

        let cart = db.cart
        let total = 0
        cart.forEach(element => {
            total += element.price
        })

        await Order.create({ "orderID": id, "email": email, "items": db.cart, total: total })

        return ({ cart: cart, total: total })

    } catch (error) {
        return { success: false, message: error }
    }
}

export async function paymentInitialized(id) {
    const stripe = new Stripe(process.env.STRIPE_SECRET)
    await connectDB()
    const db = await Order.findOne({ orderID: id })
    try {
        if (!db || !stripe) throw new Error("Payment Error")
        const paymentIntent = await stripe.paymentIntents.create({
            amount: db.total * 100,
            currency: 'usd',
            automatic_payment_methods: { enabled: true },
            metadata: {
                orderID: id
            }
        })
        return paymentIntent.client_secret

    } catch (error) {
        return { success: false, message: error }
    }
}

export async function saveForm(orderId, form) {
    if (form.name.match(/[0-9\*\+\-\/\?\%\$\@\!\^]/g) || form.phone.match(/[A-Z\*\/\?\%\$\@\!\^\&]/gi) || form.city.match(/[0-9\*\+\-\/\?\%\$\@\!\^]/g)) {
        return { success: false, message: "Invalid Input" }
    }

    try {
        await connectDB()
        const db = await Order.findOneAndUpdate({ "orderID": orderId }, { $set: { "name": form.name, "address": form.address, "phone": form.phone, "city": form.city } })
        if (!db) throw new Error("Order not found")
        return { success: true }
    } catch (error) {
        return { success: false, message: "Order failed, try again later" }
    }
}

export async function fetchOrder(orderID) {
    try {
        await connectDB()
        const db = await Order.findOne({ "orderID": orderID })
        if (!db) throw new Error("Order not found")
        return { success: true, order: db }
    } catch (error) {
        return { success: false, message: "Order not found" }
    }
}

export async function handleMessage(message) {
    const client = await clientPromise
    const db = await client.db('stylelab')
    const data = await db.collection("Messages").insertOne({ message: message})
    

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.GOOGLE_APP_PASSWORD,
        },
    })

    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: `${message.subject}:`,
            text: `From: ${message.name}\nEmail: ${message.email}\nMessage: ${message.message}`,
        })

        if (info.rejected.length < 1) {
            return { success: true, message: 'Message sent!' }
        } else {
            return { success: false, message: 'Message not sent!' }
        }
    } catch (error) {
        return { success: false, message: "Message not sent" }
    }
}