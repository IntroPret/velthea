import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import bcrypt from "bcryptjs";

import connectToDatabase from "@/lib/mongodb";
import User from "@/model/user";
import { changePasswordSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const validation = changePasswordSchema.safeParse(body);

        if (!validation.success) {
            const message = validation.error.issues[0]?.message ?? "Invalid input.";
            return NextResponse.json({ error: message }, { status: 400 });
        }

        const { currentPassword, newPassword } = validation.data;

        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        if (!token?.email) {
            return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
        }

        await connectToDatabase();

        const email = (token.email as string).toLowerCase();
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }

        if (!user.password) {
            return NextResponse.json({ error: "Password not set. Use the set password option first." }, { status: 400 });
        }

        const isCurrentValid = await bcrypt.compare(currentPassword, user.password);
        if (!isCurrentValid) {
            return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
        }

        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if (isSamePassword) {
            return NextResponse.json({ error: "New password must be different from the current password." }, { status: 400 });
        }

        user.password = await bcrypt.hash(newPassword, 10);

        if (!Array.isArray(user.linkedProviders)) user.linkedProviders = [];
        if (!user.linkedProviders.includes("local")) user.linkedProviders.push("local");
        user.authProvider = "local";

        await user.save();

        return NextResponse.json({ ok: true, message: "Password updated successfully." }, { status: 200 });
    } catch (error) {
        console.error("changePassword error:", error);
        return NextResponse.json({ error: "Server error." }, { status: 500 });
    }
}
