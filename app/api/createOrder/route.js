import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { orderCreator } from "@/actions/useractions";
import { paymentInitialized } from "@/actions/useractions";

export async function POST(req) {
    try {
        const token = await getToken({ req })
        if (!token || !token.email) {
            return NextResponse.json({ success: false, error: "Unauthorized" })
        }
        const body = await req.json()
        const func = await orderCreator(body.orderID, token.email)
        let clientSecret = await paymentInitialized(body.orderID, token.email)
        return NextResponse.json({ success: true, func, secret: clientSecret })

    } catch (error) {
        console.error("API error : ", error.message)
        return NextResponse.json({ success: false, error: "Server error" })
    }
}