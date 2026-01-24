"use client";
import { useSession, signOut } from "next-auth/react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DropdownUser from "../dropdown-user/dropdown-user";
export default function AuthButton() {
  const { status } = useSession();
  const isPending = status === "loading";
  const isAuthenticated = status === "authenticated";
  const router = useRouter();

  async function handleSignout(): Promise<void> {
    await signOut();
    router.push("/login");
  }

  return (
    <div>
      {isPending ? (
        <Spinner className='size-6 text-blue-500' />
      ) : (
        <div>
          {isAuthenticated ? (
            <div className='flex flex-row gap-4'>
              <DropdownUser />
              <Button
                size='sm'
                className='bg-red-400 hover:bg-red-500 hover:underline hover:cursor-pointer'
                onClick={handleSignout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className='flex flex-row gap-2'>
              <Link href='/login'>
                <Button
                  size='sm'
                  className='bg-green-600 hover:bg-blue-600 hover:underline hover:cursor-pointer'
                  variant='default'
                >
                  Login
                </Button>
              </Link>

              <Link href='/signup'>
                <Button
                  size='sm'
                  variant='default'
                  className='hidden sm:block bg-blue-600 hover:bg-green-600 hover:underline hover:cursor-pointer'
                >
                  Signup
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
