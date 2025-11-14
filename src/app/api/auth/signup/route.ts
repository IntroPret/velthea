import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import connectToDatabase from "@/lib/mongodb";
import User from "@/model/user";
import { checkRateLimit, resolveClientIdentifier } from "@/utils/rateLimit";

export async function POST(request: Request){
    const {name, email, password, confirmPassword} = await request.json();

    const isValidEmail = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    }

    const isStrongPassword = (value: string, emailValue: string) => {
        if (value.length < 12) return false;
        if (value.toLowerCase().includes(emailValue)) return false;
        const complexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).+$/;
        return complexityRegex.test(value);
    };

    const trimmedName = typeof name === "string" ? name.trim() : "";
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    const passwordValue = typeof password === "string" ? password : "";
    const confirmPasswordValue = typeof confirmPassword === "string" ? confirmPassword : "";

    const clientIdentifier = resolveClientIdentifier(request.headers, normalizedEmail);
    const rateLimitResult = checkRateLimit({
        identifier: clientIdentifier,
        limitId: "signup",
        max: 5,
        windowMs: 60_000,
    });

    if (!rateLimitResult.success) {
        return NextResponse.json({message: "Too many sign-up attempts. Please try again later."}, {status: 429});
    }

    if (!trimmedName || !normalizedEmail || !passwordValue || !confirmPasswordValue){
        return NextResponse.json({message: "All fields are required"}, {status: 400});
    }

    if (!isValidEmail(normalizedEmail)){
        return NextResponse.json({message: "Invalid email format"}, {status: 400});
    }

    if (passwordValue !== confirmPasswordValue){
        return NextResponse.json({message: "Passwords do not match"}, {status: 400});
    }

    if (!isStrongPassword(passwordValue, normalizedEmail)){
        return NextResponse.json({
            message: "Password must be at least 12 characters and include upper, lower, number, and symbol.",
        }, {status: 400});
    }

    try{
        await connectToDatabase();
        const existingUser = await User.findOne({email: normalizedEmail});

        if (existingUser){
            return NextResponse.json({message: "User already exists"}, {status: 400});
        }

        const hashedPassword = await bcrypt.hash(passwordValue, 10);

        const newUser = new User({
            email: normalizedEmail,
            name: trimmedName,
            password: hashedPassword,
            authProvider: "local",
            linkedProviders: ["local"],
        });

        await newUser.save();
        return NextResponse.json({message: "User created"}, {status: 201});

    } catch (error) {
        console.error(error);
        return NextResponse.json({message: "Something went wrong"}, {status: 500});
    }
}