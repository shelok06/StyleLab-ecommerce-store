import connectDB from "@/db/connectDB";
import Userdata from "@/model/Userdata";
import clientPromise from "@/db/connectproductDB";
import Order from "@/model/Order";
import Stripe from "stripe";


export async function saveCart(item, email) {
    await connectDB()
    await Userdata.findOneAndUpdate({ email: email }, { cart: item.cart })
    return true
}

export async function fetchProducts() {
    try {
        const client = await clientPromise
        const db = client.db('stylelabAdmin')
        const data = await db.collection("products").find({}).toArray()
        return { success: true, data: data }
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message })
        return { success: false }
    }

}

export async function orderCreator(id, email) {
    await connectDB()
    const db = await Userdata.findOne({ email: email })
    if (db) {
        let cart = db.cart
        let total = 0
        cart.forEach(element => {
            total += element.price
        })

        await Order.create({ "orderID": id, "email": email, "items": db.cart, total: total })

        return ({ cart: cart, total: total })
    }
}

export async function paymentInitialized(id) {
    const stripe = new Stripe(process.env.STRIPE_SECRET)
    await connectDB()
    const db = await Order.findOne({orderID: id})
   if(db){
       const paymentIntent = await stripe.paymentIntents.create({
           amount: db.total * 100,
           currency: 'usd',
           automatic_payment_methods: { enabled: true },
           metadata: {
               orderID: id
           }
       })
       
       console.log(paymentIntent)
    return paymentIntent.client_secret
   }
}
