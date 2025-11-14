import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import bcrypt from "bcryptjs";

import connectToDatabase from "@/lib/mongodb";
import User from "@/model/user";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const password = body?.password;

        if (!password || typeof password !== "string" || password.length < 8) {
            return new Response(JSON.stringify({ error: "Password must be at least 8 characters." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        if (!token?.email) {
            return new Response(JSON.stringify({ error: "Unauthorized." }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }

        await connectToDatabase();

        const email = (token.email as string).toLowerCase();
        const user = await User.findOne({ email });
        if (!user) {
            return new Response(JSON.stringify({ error: "User not found." }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        user.password = await bcrypt.hash(password, 10);

        if (!Array.isArray(user.linkedProviders)) user.linkedProviders = [];
        if (!user.linkedProviders.includes("local")) user.linkedProviders.push("local");

        // make credentials available for login: set primary provider to local
        user.authProvider = "local";

        await user.save();

        return new Response(JSON.stringify({ ok: true, message: "Password set successfully." }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("setPassword error:", error);
        return new Response(JSON.stringify({ error: "Server error." }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}