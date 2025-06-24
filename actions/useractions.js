import connectDB from "@/db/connectDB";
import Userdata from "@/model/Userdata";
import clientPromise from "@/db/connectproductDB";


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
        return data
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message })
        return { success: false }
    }

}