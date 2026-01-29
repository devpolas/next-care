"use client";
import Link from "next/link";
import Logo from "../logo/logo";
import AuthButton from "@/components/authButtons/auth-button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import MobileNav from "./mobileNav";

export default function Navbar() {
  return (
    <div className='flex flex-row justify-between items-center shadow p-2'>
      <div className='flex items-center gap-1'>
        <MobileNav />
        <Logo />
      </div>
      <NavigationMenu className='hidden lg:block'>
        <NavigationMenuList className='flex-wrap'>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href='/'>Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className='bg-transparent hover:cursor-pointer'>
              Services
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='gap-2 grid lg:grid-cols-[.75fr_1fr] md:w-100 lg:w-125'>
                <li className='row-span-3'>
                  <NavigationMenuLink asChild>
                    <Link
                      className='flex flex-col justify-end bg-linear-to-b from-muted/50 to-muted focus:shadow-md p-4 md:p-6 rounded-md outline-hidden w-full h-full no-underline transition-all duration-200 select-none'
                      href='/cares'
                    >
                      <div className='sm:mt-4 mb-2 font-medium text-lg'>
                        All Cares
                      </div>
                      <p className='text-muted-foreground text-sm leading-tight'>
                        Self-care is taking time to look after your physical,
                        mental, and emotional well-being so you can feel
                        healthy, balanced, and able to handle everyday life.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem href='/cares?services=baby-care' title='Baby Cares'>
                  Baby care is the supervision and care of children to support
                  their safety, development, and well-being while parents or
                  guardians are away or working.
                </ListItem>
                <ListItem
                  href='/cares?services=elderly-care'
                  title='Elderly Cares'
                >
                  Elderly Service is the support and assistance given to older
                  adults to help them stay safe, healthy, and comfortable in
                  their daily lives.
                </ListItem>
                <ListItem
                  href='/cares?services=emergency-care'
                  title='Emergency Cares'
                >
                  Sick People Service is the support and assistance given to
                  older adults to help them stay safe, healthy, and comfortable
                  in their daily lives.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href='/contact'>Contact</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href='/about'>About</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href='/career'>Career</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <AuthButton />
    </div>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className='font-medium text-sm leading-none'>{title}</div>
          <p className='text-muted-foreground text-sm line-clamp-2 leading-snug'>
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
