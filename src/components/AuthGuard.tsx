"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const authEnabled = process.env.NEXT_PUBLIC_ENABLE_AUTH === "true";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!authEnabled) return;
        if (status === "unauthenticated") router.push("/login");
    }, [status, router]);

    if (!authEnabled) return <>{children}</>;
    if (status === "loading" || status === "unauthenticated") return null;
    return <>{children}</>;
}
