import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { fetchOrdersList } from "@/actions/useractions";

export async function POST(req) {
    try {
        const token = await getToken({ req })
        if (!token || !token.email) {
            return NextResponse.json({ success: false, error: "Unauthorized" })
        }
        let list = await fetchOrdersList(token.email)
        return NextResponse.json({success: list.success, orders: list.message})
    } catch (error) {
        console.error("API error : ", error.message)
        return NextResponse.json({ success: false, error: "Server error" })
    }
}