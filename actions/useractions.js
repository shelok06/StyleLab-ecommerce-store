import connectDB from "@/db/connectDB";
import Userdata from "@/model/Userdata";


export async function saveCart(item, email) {
    await connectDB()
    const db = await Userdata.findOne({email: email})
    if(db){
        await Userdata.updateOne({cart: item.cart})
    }
    return true
} 