import connectDB from "@/db/connectDB";
import Userdata from "@/model/Userdata";
import clientPromise from "@/db/connectproductDB";
import Order from "@/model/Order";


export async function saveCart(item, email) {
    await connectDB()
    const db = await Userdata.findOne({ email: email })
    if (db) {
        await Userdata.updateOne({ cart: item.cart })
    }
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

        const order = await Order.create({ "orderID": id, "email": email, "items": db.cart, total: total })
        return ({ cart: cart, total: total })
    }
}