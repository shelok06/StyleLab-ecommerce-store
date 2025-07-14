import { NextResponse } from "next/server";
import { handleMessage } from "@/actions/useractions";

export async function POST(req) {
    const body = await req.json()
    try {
        let func = await handleMessage(body.message)
        if (!func) throw new Error("API error")
        return NextResponse.json({ success: func.success, message: func.message })
    } catch (error) {
        console.error("API error : ", error.message)
        return NextResponse.json({ success: false, error: "Server error" })
    }
}