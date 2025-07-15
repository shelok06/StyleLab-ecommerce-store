import { NextResponse } from "next/server";
import { findProduct } from "@/actions/useractions";

export async function GET(req) {

    try {
        const url = await req.url
        let query = new URLSearchParams(url.split('?')[1])
        let item = query.get('item')
        if (!item) throw new Error("API Error")
        let func = await findProduct(item)
        return NextResponse.json({ success: func.success, list: func.message })
    } catch (error) {
        console.error("API error : ", error.message)
        return NextResponse.json({ success: false, error: "Server error" })
    }
}