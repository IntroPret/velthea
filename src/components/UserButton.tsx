"use client";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { Loader } from "lucide-react";
import Link from "next/link";

const UserButton = () => {
    const router = useRouter();
    const {data: session, status} = useSession();

    if (status === "loading"){
        return (
            <Loader className="size-6 mr-4 mt-4 float-right animate-spin" />
        )
    }

    const avatarFallback = session?.user?.name?.charAt(0).toUpperCase();
    const handleSignOut = async () => {
        await signOut({
            redirect: false,
        });
        router.push(ROUTES.HOME)
    }

    return (
        <nav>
            {
                session ? (
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger className="outline-none relative float-right">
                            <div className="flex gap-3 items-center">
                                <span>{session?.user?.name}</span>
                                <Avatar className="size-8 border-[2px] border-[color:var(--color-muted)] hover:opacity-75 transititon">
                                    <AvatarImage 
                                        className="size-8 transititon"
                                        src={session?.user?.image || undefined}
                                    />
                                    <AvatarFallback className="bg-[color:var(--color-text)] text-white">
                                        {avatarFallback}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center" side="bottom" className="w-50 bg-[color:var(--color-border)] shadow:10 border-0">
                            <DropdownMenuItem asChild className="h-10 text-[color:var(--color-text)]">
                                <Link href={ROUTES.PROFILE}>
                                    Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-[color:var(--color-text)]/20" />
                            <DropdownMenuItem className="h-10 text-[color:var(--color-text)]" onClick={()=>handleSignOut()}>
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Link href={ROUTES.LOGIN} className="hover:opacity-80 text-md">Sign In</Link>
                )
            } 
        </nav>
    );
}

export default UserButton;