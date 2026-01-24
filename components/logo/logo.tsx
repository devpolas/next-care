"use client";
import Image from "next/image";
import logo from "@/assets/next_care.png";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href={"/"}
      className='flex flex-row items-center gap-1 hover:cursor-pointer'
    >
      <Image src={logo} alt='Next Care Logo' width={35} height={35} />
      <h2 className='hidden sm:block font-extrabold text-green-700 text-xl'>
        Next Care
      </h2>
    </Link>
  );
}
