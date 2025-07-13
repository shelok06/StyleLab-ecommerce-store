import { NextResponse } from "next/server";
import { authoptions } from "../auth/[...nextauth]/route";
import { getToken } from "next-auth/jwt";
import { saveForm } from "@/actions/useractions";

export async function POST(req) {
    try {
        const token = await getToken({ req })
        if (!token || !token.email) {
            return NextResponse.json({ success: false, error: "Unauthorized" })
        }
        const body = await req.json()
        const func = await saveForm(body.id, body.form)
        return NextResponse.json({func})
    } catch (error) {
        console.error("API error : ", error.message)
        return NextResponse.json({ success: false, error: "Server error" })
    }
}