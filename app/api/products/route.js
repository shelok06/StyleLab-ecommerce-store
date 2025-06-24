import { NextResponse } from "next/server";
import { fetchProducts } from "@/actions/useractions";

export async function GET() {
    const data = await fetchProducts()
    return NextResponse.json({"success": true, "result": data})
}