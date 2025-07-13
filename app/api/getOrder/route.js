import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { fetchOrder } from "@/actions/useractions";

export async function POST(req) {
    try {
        const token = await getToken({ req })
        if (!token || !token.email) {
            return NextResponse.json({ success: false, error: "Unauthorized" })
        }
        const body = await req.json()
        let data = await fetchOrder(body.id)
        return NextResponse.json({ success: data.success, order: data.order })
    } catch (error) {
        console.error("API error : ", error.message)
        return NextResponse.json({ success: false, error: "Server error" })
    }
}