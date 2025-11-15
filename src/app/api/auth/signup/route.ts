import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import connectToDatabase from "@/lib/mongodb";
import User from "@/model/user";
import { checkRateLimit, resolveClientIdentifier } from "@/utils/rateLimit";
import { signupSchema } from "@/lib/validation";

export async function POST(request: Request){
    const body = await request.json();

    const validation = signupSchema.safeParse(body);

    if (!validation.success) {
        const message = validation.error.issues[0].message;
        return NextResponse.json({ message }, { status: 400 });
    }

    const { name, email, password } = validation.data;

    const clientIdentifier = resolveClientIdentifier(request.headers, email);
    const rateLimitResult = await checkRateLimit({
        identifier: clientIdentifier,
        limitId: "signup",
    });

    if (!rateLimitResult.success){
        return NextResponse.json(
            { message: "Too many sign-up attempts. Please try again later." },
            { status: 429 }
        );
    }

    try{
        await connectToDatabase();
        const existingUser = await User.findOne({email});

        if (existingUser){
            return NextResponse.json(
                {message: "User already exists"}, 
                {status: 400}
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email: email,
            name: name,
            password: hashedPassword,
            authProvider: "local",
            linkedProviders: ["local"],
        });

        await newUser.save();
        return NextResponse.json(
            {message: "User created"}, 
            {status: 201}
        );

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {message: "Something went wrong"}, 
            {status: 500}
        );
    }
}