"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function MobileNav() {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon-lg' className='lg:hidden'>
          <Menu />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='start' className='space-y-2 mt-2 max-w-xs'>
        <DropdownMenuItem asChild>
          <Link className='font-bold text-2xl' href='/'>
            Home
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Services</DropdownMenuSubTrigger>

          <DropdownMenuSubContent className='space-y-2 ml-2 p-2'>
            <DropdownMenuItem asChild>
              <Link href='/cares'>All Cares</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href='/cares?services=baby-care'>Baby Cares</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href='/cares?services=old-care'>Elderly Cares</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href='/cares?services=emergency-care'>Emergency Cares</Link>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuItem asChild>
          <Link href='/contact'>Contact</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href='/about'>About</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href='/career'>Career</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
