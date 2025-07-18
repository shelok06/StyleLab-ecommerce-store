import { NextResponse } from "next/server";
import { saveCart } from "@/actions/useractions";
import { authoptions } from "../auth/[...nextauth]/route";
import { getToken } from "next-auth/jwt";


export async function POST(req) {
    try {
        const token = await getToken({ req })
        if (!token || !token.email) {
            return NextResponse.json({ success: false, error: "Unauthorized" })
        }
        const body = await req.json()
        let response = await saveCart(body, token.email)
        return NextResponse.json({ success: response })
    } catch (error) {
        console.error("API error : ", error.message)
        return NextResponse.json({ success: false, error: "Server error" })
    }
}