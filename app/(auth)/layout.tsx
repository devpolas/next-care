import Image from "next/image";
import fullLogo from "@/assets/full_logo.png";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex justify-between items-center p-4 md:p-8'>
      <div className='flex justify-center md:justify-between items-center gap-8 w-full'>
        {/* Logo */}
        <div className='hidden relative md:flex w-64 lg:w-80 h-64 lg:h-80'>
          <Image
            src={fullLogo}
            alt='Next Care Logo'
            fill
            className='object-contain'
            priority
          />
        </div>

        {/* Form */}
        <div className='w-full max-w-sm'>{children}</div>
      </div>
    </div>
  );
}
