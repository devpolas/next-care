"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Activity,
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function DropdownUser() {
  const { data } = useSession();
  const logout = async () => {
    await signOut();
  };
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Image
          src={data?.user?.image ?? "/user-avatar.png"}
          alt='profile image'
          width={36}
          height={24}
          className='rounded-full hover:cursor-pointer'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='space-y-1 mt-2 p-2' align='end'>
        <Link href='/profile'>
          <DropdownMenuItem className='hover:cursor-pointer'>
            <UserIcon />
            Profile
          </DropdownMenuItem>
        </Link>
        <Link href='/bookings'>
          <DropdownMenuItem className='hover:cursor-pointer'>
            <Activity />
            Bookings
          </DropdownMenuItem>
        </Link>
        <Link href='/billings'>
          <DropdownMenuItem className='hover:cursor-pointer'>
            <CreditCardIcon />
            My Billings
          </DropdownMenuItem>
        </Link>
        <Link href='/settings'>
          <DropdownMenuItem className='hover:cursor-pointer'>
            <SettingsIcon />
            Settings
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='hover:cursor-pointer'
          variant='destructive'
          onClick={logout}
        >
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
