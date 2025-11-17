import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

import connectToDatabase from "@/lib/mongodb";
import User from "@/model/user";

export async function GET(req: NextRequest) {
    try {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        if (!token?.email) {
            return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
        }

        await connectToDatabase();

        const email = (token.email as string).toLowerCase();
        const user = await User.findOne({ email }).lean();

        if (!user) {
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }

        return NextResponse.json({
            name: user.name,
            email: user.email,
            authProvider: user.authProvider,
            linkedProviders: Array.isArray(user.linkedProviders) ? user.linkedProviders : [],
            hasPassword: typeof user.password === "string" && user.password.trim().length > 0,
            image: user.image ?? null,
        });
    } catch (error) {
        console.error("profile GET error:", error);
        return NextResponse.json({ error: "Server error." }, { status: 500 });
    }
}
