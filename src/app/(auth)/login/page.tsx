'use client'
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import Image from "next/image";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TriangleAlert } from "lucide-react";

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPending(true);

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (res?.ok) {
                toast.success("Login Successful");
                router.push(ROUTES.HOME);
                return;
            }

            setError(res?.error ?? "Invalid credentials");
        } catch (error) {
            console.error("Login error:", error);
            setError("Something went wrong");
        } finally {
            setPending(false);
        }
    }

    const handleProvider = (
        event: React.MouseEvent<HTMLButtonElement>,
        value: "google"
    ) => {
        event.preventDefault();
        signIn(value, { callbackUrl: ROUTES.HOME })
    }

    return(
        <main className="min-h-screen flex items-center justify-center px-6 py-10">
            <div className="card p-6 w-full max-w-md">
                <div className="text-center mb-6">
                    <Link href={ROUTES.HOME} className="font-semibold tracking-tight heading-section text-2xl text-[var(--color-text)">
                        Velthéa
                    </Link>
                    <h1 className="heading-section text-[color:var(--color-muted)] text-md mt-2">
                        Sign in to Your Account
                    </h1>
                </div>
                
                {!!error && (
                    <div className="bg-destructive/15 p-3 rounded-md flex 
                    items-center gap-x-2 text-sm text-destructive mb-6">
                        <TriangleAlert />
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label 
                            className="block text-md text-[color:var(--color-muted)] mb-1"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            disabled={pending}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full py-1 px-2 border border-[color:var(--color-border)] bg-white rounded-[16px]"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label 
                            className="block text-md text-[color:var(--color-muted)] mb-1"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            id="passsword"
                            type="password"
                            disabled={pending}
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            className="w-full py-1 px-2 border border-[color:var(--color-border)] bg-white rounded-[16px]"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="btn btn-primary w-full my-2 py-2"
                    >
                        Sign In
                    </button>

                    <div className="flex items-center gap-3 my-3">
                        <hr className="flex-1 border-[color:var(--color-border)]"/>
                        <span className="text-md text-[color:var(--color-muted)]">or</span>
                        <hr className="flex-1 border-[color:var(--color-border)]"/>
                    </div>

                    <div className="flex gap-3 my-3">
                        <button
                            className="flex-1 btn py-2 !rounded-xl bg-white border-1 border-[color:var(--color-border)] hover:opacity-60"
                            onClick={(e) => handleProvider(e, "google")}
                        >
                            <Image src="/icons/google.png" alt="Google" width={18} height={18}/>
                        </button>
                    </div>
                    
                    <div className="text-center mt-6">
                        <p className="text-sm text-[color:var(--color-muted)]">
                            {"Don't have an account? "}
                            <Link href={ROUTES.SIGNUP} className="underline font-medium hover:opacity-80">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                    
                </form>
            </div>
        </main>


    );
}