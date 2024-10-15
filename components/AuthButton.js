"use client"
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useSession,signOut } from "next-auth/react";

export default function AuthButton() {
    const { data: session } = useSession()

    const handleSignOut = async() => {
        console.log('click')
        try {
          await signOut({ callbackUrl: '/' });
    
        } catch (error) {
         console.log('error during signout',error);
        }
      }
    console.log('user is ', session)
    return session ? (
        <div className="flex items-center gap-4 ">
            {session.user?.image &&
                <Image src={session.user.image} height={100} width={100} className="rounded-full h-8 w-8" alt="user-image " />} Hey, {session.user.email}!
            
                <Button type="submit" variant={"outline"} onClick={()=>handleSignOut()} >
                    Sign out
                </Button>
           
        </div>
    ) : (
        <div className="flex gap-2 text-[16px]">
            <Button asChild size="sm" variant={"outline"}>
                <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild size="sm" variant={"default"}>
                <Link href="/login" className="">Sign up</Link>
            </Button>
        </div>
    );
}
