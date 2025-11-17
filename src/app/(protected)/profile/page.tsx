'use client';

import { useCallback, useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { toast } from "sonner";

import { changePasswordSchema, setPasswordSchema } from "@/lib/validation";

type ProfileData = {
    name: string;
    email: string;
    authProvider: "local" | "google";
    linkedProviders: string[];
    hasPassword: boolean;
    image: string | null;
};

const normalizeProviders = (providers: string[]) => Array.from(new Set(providers));
const formatProvider = (provider: string) =>
    provider.charAt(0).toUpperCase() + provider.slice(1).toLowerCase();

export default function ProfilePage() {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [setPasswordForm, setSetPasswordForm] = useState({
        newPassword: "",
        confirmPassword: "",
    });
    const [changePasswordForm, setChangePasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [setPending, setSetPending] = useState(false);
    const [changePending, setChangePending] = useState(false);

    const fetchProfile = useCallback(async () => {
        setError(null);
        setLoading(true);
        try {
            const response = await fetch("/api/user/profile");
            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                const message = typeof data?.error === "string" ? data.error : "Failed to load profile.";
                throw new Error(message);
            }

            setProfile({
                name: data.name,
                email: data.email,
                authProvider: data.authProvider,
                linkedProviders: normalizeProviders(Array.isArray(data.linkedProviders) ? data.linkedProviders : []),
                hasPassword: Boolean(data.hasPassword),
                image: data.image ?? null,
            });
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to load profile.";
            setError(message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    const handleSetPasswordSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (setPasswordForm.newPassword !== setPasswordForm.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        const validation = setPasswordSchema.safeParse({ password: setPasswordForm.newPassword });
        if (!validation.success) {
            const message = validation.error.issues[0]?.message ?? "Invalid password.";
            toast.error(message);
            return;
        }

        setSetPending(true);
        try {
            const response = await fetch("/api/auth/setPassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: validation.data.password }),
            });
            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                const message = typeof data?.error === "string" ? data.error : "Unable to set password.";
                throw new Error(message);
            }

            toast.success(typeof data?.message === "string" ? data.message : "Password set successfully.");
            setSetPasswordForm({ newPassword: "", confirmPassword: "" });
            setProfile((prev) => {
                if (!prev) return prev;
                const linked = normalizeProviders([...prev.linkedProviders, "local"]);
                return {
                    ...prev,
                    hasPassword: true,
                    authProvider: "local",
                    linkedProviders: linked,
                };
            });
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unable to set password.";
            toast.error(message);
        } finally {
            setSetPending(false);
        }
    };

    const handleChangePasswordSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (changePasswordForm.newPassword !== changePasswordForm.confirmPassword) {
            toast.error("New passwords do not match.");
            return;
        }

        const validation = changePasswordSchema.safeParse({
            currentPassword: changePasswordForm.currentPassword,
            newPassword: changePasswordForm.newPassword,
        });
        if (!validation.success) {
            const message = validation.error.issues[0]?.message ?? "Invalid input.";
            toast.error(message);
            return;
        }

        setChangePending(true);
        try {
            const response = await fetch("/api/auth/changePassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(validation.data),
            });
            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                const message = typeof data?.error === "string" ? data.error : "Unable to update password.";
                throw new Error(message);
            }

            toast.success(typeof data?.message === "string" ? data.message : "Password updated successfully.");
            setChangePasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
            setProfile((prev) => {
                if (!prev) return prev;
                const linked = normalizeProviders([...prev.linkedProviders, "local"]);
                return {
                    ...prev,
                    authProvider: "local",
                    linkedProviders: linked,
                };
            });
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unable to update password.";
            toast.error(message);
        } finally {
            setChangePending(false);
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center px-6 py-10">
                <Loader className="size-8 animate-spin text-[color:var(--color-text)]" />
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen flex items-center justify-center px-6 py-10">
                <div className="card p-6 w-full max-w-md text-center space-y-4">
                    <p className="text-md text-[color:var(--color-muted)]">{error}</p>
                    <button
                        type="button"
                        onClick={fetchProfile}
                        className="btn btn-primary w-full"
                    >
                        Try again
                    </button>
                </div>
            </main>
        );
    }

    if (!profile) {
        return null;
    }

    return (
        <main className="min-h-screen px-6 py-10">
            <div className="mx-auto flex max-w-3xl flex-col gap-8">
                <section className="card p-6">
                    <h1 className="text-2xl font-semibold text-[color:var(--color-text)]">Profile overview</h1>
                    <p className="mt-2 text-sm text-[color:var(--color-muted)]">
                        Manage your account details and password settings.
                    </p>

                    <div className="mt-6 space-y-4">
                        <div className="flex items-center justify-between border-b border-[color:var(--color-border)]/60 pb-3">
                            <span className="text-sm text-[color:var(--color-muted)]">Name</span>
                            <span className="font-medium text-[color:var(--color-text)]">{profile.name}</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-[color:var(--color-border)]/60 pb-3">
                            <span className="text-sm text-[color:var(--color-muted)]">Email</span>
                            <span className="font-medium text-[color:var(--color-text)]">{profile.email}</span>
                        </div>
                    </div>
                </section>

                {!profile.hasPassword ? (
                    <section className="card p-6">
                        <h2 className="text-xl font-semibold text-[color:var(--color-text)]">Set a password</h2>
                        <p className="mt-2 text-sm text-[color:var(--color-muted)]">
                            Create a password so you can sign in using email and password, in addition to any linked login methods.
                        </p>
                        <form onSubmit={handleSetPasswordSubmit} className="mt-6 space-y-5">
                            <div>
                                <label className="mb-1 block text-sm text-[color:var(--color-muted)]" htmlFor="set-new-password">
                                    New password
                                </label>
                                <input
                                    id="set-new-password"
                                    type="password"
                                    required
                                    value={setPasswordForm.newPassword}
                                    onChange={(event) =>
                                        setSetPasswordForm((prev) => ({ ...prev, newPassword: event.target.value }))
                                    }
                                    disabled={setPending}
                                    className="w-full rounded-[16px] border border-[color:var(--color-border)] bg-white px-3 py-2"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm text-[color:var(--color-muted)]" htmlFor="set-confirm-password">
                                    Confirm password
                                </label>
                                <input
                                    id="set-confirm-password"
                                    type="password"
                                    required
                                    value={setPasswordForm.confirmPassword}
                                    onChange={(event) =>
                                        setSetPasswordForm((prev) => ({ ...prev, confirmPassword: event.target.value }))
                                    }
                                    disabled={setPending}
                                    className="w-full rounded-[16px] border border-[color:var(--color-border)] bg-white px-3 py-2"
                                    placeholder="••••••••"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={setPending}
                                className="btn btn-primary w-full py-2 disabled:opacity-60"
                            >
                                {setPending ? "Saving..." : "Set password"}
                            </button>
                        </form>
                    </section>
                ) : (
                    <section className="card p-6">
                        <h2 className="text-xl font-semibold text-[color:var(--color-text)]">Change password</h2>
                        <p className="mt-2 text-sm text-[color:var(--color-muted)]">
                            Update your password to keep your account secure.
                        </p>
                        <form onSubmit={handleChangePasswordSubmit} className="mt-6 space-y-5">
                            <div>
                                <label className="mb-1 block text-sm text-[color:var(--color-muted)]" htmlFor="current-password">
                                    Current password
                                </label>
                                <input
                                    id="current-password"
                                    type="password"
                                    required
                                    value={changePasswordForm.currentPassword}
                                    onChange={(event) =>
                                        setChangePasswordForm((prev) => ({ ...prev, currentPassword: event.target.value }))
                                    }
                                    disabled={changePending}
                                    className="w-full rounded-[16px] border border-[color:var(--color-border)] bg-white px-3 py-2"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm text-[color:var(--color-muted)]" htmlFor="change-new-password">
                                    New password
                                </label>
                                <input
                                    id="change-new-password"
                                    type="password"
                                    required
                                    value={changePasswordForm.newPassword}
                                    onChange={(event) =>
                                        setChangePasswordForm((prev) => ({ ...prev, newPassword: event.target.value }))
                                    }
                                    disabled={changePending}
                                    className="w-full rounded-[16px] border border-[color:var(--color-border)] bg-white px-3 py-2"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm text-[color:var(--color-muted)]" htmlFor="change-confirm-password">
                                    Confirm new password
                                </label>
                                <input
                                    id="change-confirm-password"
                                    type="password"
                                    required
                                    value={changePasswordForm.confirmPassword}
                                    onChange={(event) =>
                                        setChangePasswordForm((prev) => ({ ...prev, confirmPassword: event.target.value }))
                                    }
                                    disabled={changePending}
                                    className="w-full rounded-[16px] border border-[color:var(--color-border)] bg-white px-3 py-2"
                                    placeholder="••••••••"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={changePending}
                                className="btn btn-primary w-full py-2 disabled:opacity-60"
                            >
                                {changePending ? "Updating..." : "Change password"}
                            </button>
                        </form>
                    </section>
                )}
            </div>
        </main>
    );
}
