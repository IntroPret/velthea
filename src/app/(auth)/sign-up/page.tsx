'use client'
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner"; 
import { useRouter } from "next/navigation";
import { Loader, TriangleAlert } from "lucide-react";
import { signIn } from "next-auth/react";

export default function Signup(){   
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword:"",
    })

    const [pending, setPending] = useState(false);
    const [providerPending, setProviderPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleProvider = (
        event: React.MouseEvent<HTMLButtonElement>,
        value: "google"
    ) => {
        event.preventDefault();
        if (providerPending) return;
        setProviderPending(true);
        signIn(value, { callbackUrl: ROUTES.HOME }).catch((err) => {
            console.error("Provider sign-up error:", err);
            toast.error("Unable to continue with provider. Try again.");
            setProviderPending(false);
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (pending) return;
        setPending(true);
        setError(null);

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(form),
            });

            const data = await res.json().catch(() => ({}));

            if(res.ok){
                toast.success(typeof data?.message === "string" ? data.message : "Account created");
                router.push(ROUTES.LOGIN);
                return;
            }

            const message = typeof data?.message === "string" ? data.message : "Unable to sign up.";
            setError(message);
            toast.error(message);
        } catch (fetchError) {
            console.error("Signup error:", fetchError);
            const fallback = "Something went wrong. Try again.";
            setError(fallback);
            toast.error(fallback);
        } finally {
            setPending(false);
        }
    }

    return(
        <main className="min-h-screen flex items-center justify-center px-6 py-10">
            <div className="card p-6 w-full max-w-md">
                <div className="text-center mb-6">
                    <Link href={ROUTES.HOME} className="font-semibold tracking-tight heading-section text-2xl text-[var(--color-text)]">
                        Velthéa
                    </Link>
                    <h1 className="heading-section text-[color:var(--color-muted)] text-md mt-2">
                        Create Your Account
                    </h1>
                </div>

                {!!error && (
                    <div className="bg-destructive/15 p-3 rounded-md flex 
                    items-center gap-x-2 text-sm text-destructive mb-6">
                        <TriangleAlert />
                        <p>{error}</p>
                    </div>
                )}

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
                            disabled={pending || providerPending}
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
                            disabled={pending || providerPending}
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
                            id="password"
                            type="password"
                            disabled={pending || providerPending}
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
                            htmlFor="confirm"
                        >
                            Confirm Password
                        </label>
                        <input
                            id="confirm"
                            type="password"
                            disabled={pending || providerPending}
                            value={form.confirmPassword}
                            onChange={(e) => setForm({...form, confirmPassword:e.target.value})}
                            className="w-full py-1 px-2 border border-[color:var(--color-border)] bg-white rounded-[16px]"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={pending || providerPending}
                        className="btn btn-primary w-full my-2 py-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        aria-busy={pending}
                    >
                        {pending && <Loader className="size-4 animate-spin" />}
                        <span>{pending ? "Creating account..." : "Sign Up"}</span>
                    </button>

                    <div className="flex items-center gap-3 my-3">
                        <hr className="flex-1 border-[color:var(--color-border)]"/>
                        <span className="text-md text-[color:var(--color-muted)]">or</span>
                        <hr className="flex-1 border-[color:var(--color-border)]"/>
                    </div>

                    <div className="flex gap-3 my-3">
                        <button
                            className="flex-1 btn py-2 !rounded-xl bg-white border-1 border-[color:var(--color-border)] hover:opacity-60 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
                            onClick={(e) => handleProvider(e, "google")}
                            disabled={pending || providerPending}
                            aria-busy={providerPending}
                        >
                            {providerPending ? (
                                <Loader className="size-4 animate-spin" />
                            ) : (
                                <Image src="/icons/google.png" alt="Google" width={18} height={18}/>
                            )}
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