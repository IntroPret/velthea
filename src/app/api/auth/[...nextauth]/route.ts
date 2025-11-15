import NextAuth from "next-auth";
import type { Account, DefaultSession, RequestInternal, User as NextAuthUser } from "next-auth";
import type { AdapterUser } from "next-auth/adapters";
import type { JWT } from "next-auth/jwt";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { Types } from "mongoose";
import { OAuth2Client } from "google-auth-library";

import connectToDatabase from "@/lib/mongodb";
import User from "@/model/user";
import type { IUser } from "@/model/user";
import { ROUTES } from "@/lib/routes";
import { checkRateLimit, resolveClientIdentifier } from "@/utils/rateLimit";

type LeanUser = {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password?: string;
    authProvider: IUser["authProvider"];
    linkedProviders?: IUser["linkedProviders"];
};

type ProviderUser = (AdapterUser | NextAuthUser) & {
    id?: string | null;
    image?: string | null;
    picture?: string | null;
    avatar_url?: string | null;
    email_verified?: boolean | null;
    emailVerified?: boolean | null;
};

const REQUIRED_ENV_VARS = ["NEXTAUTH_SECRET", "GOOGLE_CLIENT_ID", "GOOGLE_SECRET"] as const;

for (const key of REQUIRED_ENV_VARS) {
    if (typeof process.env[key] !== "string" || process.env[key]?.trim().length === 0) {
        throw new Error(`Missing environment variable: ${key}`);
    }
}

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const handler = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [

        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string, 
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials, req?: Pick<RequestInternal, "body" | "query" | "headers" | "method">){
                try {
                    const emailInput = credentials?.email;
                    const passwordInput = credentials?.password;

                    if (!emailInput || !passwordInput) {
                        throw new Error("Email and password are required.");
                    }

                    const email = emailInput.toLowerCase().trim();
                    if (!email) {
                        throw new Error("Email and password are required.");
                    }

                    const clientIdentifier = resolveClientIdentifier(req?.headers ?? null, email);
                    const rateLimitResult = await checkRateLimit({
                        identifier: clientIdentifier,
                        limitId: "credentials"
                    });

                    if (!rateLimitResult.success) {
                        throw new Error("Too many login attempts. Please try again later.");
                    }

                    await connectToDatabase();
                    
                    const user = await User.findOne({email}).lean<LeanUser>();
                    
                    if(!user){
                        throw new Error("No account found for this email.");
                    }

                    const hasLocal = 
                        user.authProvider === "local" ||
                        (Array.isArray(user.linkedProviders) && user.linkedProviders.includes("local"));

                    if (!hasLocal) {
                        throw new Error(`This email is registered via ${user.authProvider}. Use that provider or set a password in your account.`)
                    }

                    if (typeof user.password !== "string" || !user.password) {
                        throw new Error("Password not set. Use your linked provider or reset your password.");
                    }

                    const isValidPassword = await bcrypt.compare(
                        passwordInput, user.password as string
                    );

                    if(!isValidPassword){
                        throw new Error("Invalid email or password.");
                    }

                    return {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email
                    };
                } catch (error) {
                    console.error("Authorize error:", error);
                    if (error instanceof Error) {
                        throw new Error(error.message || "Authentication failed");
                    }
                    throw new Error("Authentication failed");
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user, account }: { user: AdapterUser | NextAuthUser; account: Account | null }){
            await connectToDatabase();

            const email = user.email?.toLowerCase().trim();
            const provider = account?.provider === "credentials" ? "local" : account?.provider ?? "local";

            const providerUser = user as ProviderUser;
            const providerImage = providerUser.image ?? providerUser.picture ?? providerUser.avatar_url ?? undefined;

            if (account && account.provider !== "credentials") {
                let isVerified = providerUser.email_verified ??
                    providerUser.emailVerified ??
                    null;

                if (isVerified == null && account.id_token){
                    try {
                        const ticket = await googleClient.verifyIdToken({
                            idToken: account.id_token,
                            audience: process.env.GOOGLE_CLIENT_ID,
                        });
                        const payload = ticket.getPayload();
                        if (payload?.email_verified === true) {
                            isVerified = true;
                        } else if (payload?.email_verified === false) {
                            isVerified = false;
                        }
                    } catch (verifyError) {
                        console.error("Failed to verify Google ID token:", verifyError);
                        return `${ROUTES.LOGIN}?error=GoogleVerificationFailed`;
                    }
                }

                 if (isVerified !== true) {
                    console.warn("Blocked unverified Google account");
                    return false;
                }
            }

            if (!email) {
                return false;
            }

            const existingUser = await User.findOne({ email });

            if(!existingUser){
                await User.create({
                    name: user.name,
                    email,
                    authProvider: provider,
                    linkedProviders: [provider],
                    image: providerImage,
                });
                return true;
            }

            if(existingUser?.authProvider !== provider){
                if(!Array.isArray(existingUser.linkedProviders)){
                    existingUser.linkedProviders = [];
                }

                if (!existingUser.linkedProviders.includes(provider)) {
                    existingUser.linkedProviders.push(provider);
                    await existingUser.save();
                }

                if (providerImage && !existingUser.image) {
                    existingUser.image = providerImage;
                    await existingUser.save();
                }

                return true;
            }

            if(providerImage && !existingUser.image) {
                existingUser.image = providerImage;
                await existingUser.save();
            }

            return true;
        },
        async jwt({ token, user }: { token: JWT; user?: AdapterUser | NextAuthUser | null }) {
            if (user) {
                const providerUser = user as ProviderUser;
                token.id = providerUser.id ?? token.sub;
                token.email = user.email ?? token.email;
                token.name = user.name ?? token.name;
                token.picture = providerUser.image ?? providerUser.picture ?? providerUser.avatar_url ?? token.picture;
            }
            return token;
        },
        async session({ session, token }: { session: DefaultSession; token: JWT & { id?: string | null } }){
            if(token){
                if (session.user) {
                    session.user.email = typeof token.email === "string" ? token.email : session.user.email ?? null;
                    session.user.name = typeof token.name === "string" ? token.name : session.user.name ?? null;
                    session.user.image = typeof token.picture === "string" ? token.picture : session.user.image ?? null;
                } else {
                    session.user = {
                        email: typeof token.email === "string" ? token.email : null,
                        name: typeof token.name === "string" ? token.name : null,
                        image: typeof token.picture === "string" ? token.picture : null,
                    };
                }

                const sessionUserWithId = session.user as (DefaultSession["user"] & { id?: string | null });
                sessionUserWithId.id = typeof token.id === "string" ? token.id : sessionUserWithId.id ?? null;
            };
            return session;
        }
    },

    pages: {
        signIn: ROUTES.LOGIN,
    },
    secret: process.env.NEXTAUTH_SECRET

});

export {handler as GET, handler as POST}
