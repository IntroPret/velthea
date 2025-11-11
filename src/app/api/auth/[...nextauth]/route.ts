import NextAuth from "next-auth";
import User from "@/model/user";
import connectToDatabase from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { ROUTES } from "@/lib/routes";
import Google from "next-auth/providers/google";


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
            async authorize(credentials){
                try {

                    const email = (credentials?.email ?? "").toLowerCase();
                    await connectToDatabase();
                    
                    const user = await User.findOne({email}).lean();
                    
                    if(!user){
                        throw new Error("No account found for this email.");
                    }

                    const hasLocal = 
                        user.authProvider === "local" ||
                        (Array.isArray(user.linkedProviders) && user.linkedProviders.includes("local"));

                    console.log(user);
                    console.log("authProvider:", user.authProvider);
                    console.log("linkedProviders:", user.linkedProviders);
                    console.log("hasLocal:", hasLocal);

                    if (!hasLocal) {
                        console.log("HERE BITCH");
                        throw new Error(`This email is registered via ${user.authProvider}. Use that provider or set a password in your account.`)
                    }

                    const isValidPassword = await bcrypt.compare(
                        credentials?.password ?? "", user.password as string
                    );

                    if(!isValidPassword){
                        throw new Error("Invalid email or password.");
                    }

                    return {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email
                    };
                } catch (error: any) {
                    console.error("Authorize error:", error);
                    throw new Error(error.message || "Authentication failed");
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user, account }){
            await connectToDatabase();

            const email = user.email?.toLowerCase();
            const provider = account?.provider === "credentials" ? "local" : account?.provider ?? "local";

            const providerImage = (user as any)?.image ?? (user as any)?.picture ?? (user as any)?.avatar_url ?? undefined;

            if (account && account.provider !== "credentials") {
                const isVerified = (user as any)?.email_verified ?? (user as any)?.emailVerified;
                if (isVerified === false) return false;
            }

            const existingUser = await User.findOne({ email });

            if(!existingUser){
                await User.create({
                    name: user.name,
                    email,
                    authProvider: provider,
                    linkedProviders: [provider],
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
        async jwt({ token, user }) {
            if (user) {
                token.id = (user as any).id ?? token.sub;
                token.email = user.email ?? token.email;
                token.name = user.name ?? token.name;
                token.picture = (user as any).image ?? token.picture;
            }
            return token;
        },
        async session({ session, token }){
            if(token){
                session.user = {
                    email: token.email as string,
                    name: token.name as string,
                    image: token.picture as string | undefined,
                };
                (session as any).user.id = token.id;
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
