'use client'
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { FaFacebookF } from 'react-icons/fa';
import Image from "next/image";
import {useState} from "react";

export default function Signup(){   
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword:"",
    })

    const [pending, setPending] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault;
        setPending(true);

        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(form),
        });
    }

    return(
        <main className="min-h-screen flex items-center justify-center px-6 py-10">
            <div className="card p-6 w-full max-w-md">
                <div className="text-center mb-6">
                    <Link href={ROUTES.HOME} className="font-semibold tracking-tight heading-section text-2xl text-[var(--color-text)">
                        Velthéa
                    </Link>
                    <h1 className="heading-section text-[color:var(--color-muted)] text-md mt-2">
                        Create Your Account
                    </h1>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label 
                            className="block text-md text-[color:var(--color-muted)] mb-1"
                            htmlFor="name"
                        >
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            disabled={pending}
                            autoComplete="name"
                            value={form.name}
                            className="w-full py-1 px-2 border border-[color:var(--color-border)] bg-white rounded-[16px]"
                            placeholder="Your Name"
                            onChange={(e) => setForm({...form, name:e.target.value})}
                            required
                        />
                    </div>

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
                            value={form.email}
                            onChange={(e) => setForm({...form, email:e.target.value})}
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
                            value={form.password}
                            onChange={(e) => setForm({...form, password:e.target.value})}
                            className="w-full py-1 px-2 border border-[color:var(--color-border)] bg-white rounded-[16px]"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div>
                        <label 
                            className="block text-md text-[color:var(--color-muted)] mb-1"
                            htmlFor="Confirm"
                        >
                            Confirm Password
                        </label>
                        <input
                            id="confirm"
                            type="password"
                            disabled={pending}
                            value={form.confirmPassword}
                            onChange={(e) => setForm({...form, confirmPassword:e.target.value})}
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
                        >
                            <Image src="/icons/google.png" alt="Google" width={18} height={18}/>
                        </button>

                        <button
                            className="flex-1 btn py-2 !rounded-xl bg-[#1877F2] border-1 border-[color:var(--color-border)] hover:opacity-70"
                        >
                            <FaFacebookF className="text-white"/>
                        </button>
                    </div>
                    
                    <div className="text-center mt-6">
                        <p className="text-sm text-[color:var(--color-muted)]">
                            Already have an Account? {" "}
                            <Link href={ROUTES.LOGIN} className="underline font-medium hover:opacity-80">
                                Login
                            </Link>
                        </p>
                    </div>
                    
                </form>
            </div>
        </main>


    );
}