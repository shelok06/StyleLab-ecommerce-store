import { NextResponse } from "next/server";
import { saveCart } from "@/actions/useractions";
import { authoptions } from "../auth/[...nextauth]/route";
import { getToken } from "next-auth/jwt";


export async function POST(req) {
    const token = await getToken({req})
    console.log(token)
    const r = await req.text()
    const res = await JSON.parse(r)
    let response = await saveCart(res, token.email)
    return NextResponse.json({ "success": response })
}