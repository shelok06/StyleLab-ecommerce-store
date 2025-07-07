import { NextResponse } from "next/server";
import { fetchProducts } from "@/actions/useractions";

export async function GET() {
    try {
        const data = await fetchProducts()
        if (data.success === false) {
            return NextResponse.json({ success: false })
        }
        return NextResponse.json({ "success": true, "result": data.data })
    } catch (error) {
        console.error("API error : ", error.message)
        return NextResponse.json({ success: false, error: "Server error" })
    }
}