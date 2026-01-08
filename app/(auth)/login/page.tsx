"use client";
import SigninWithButton from "@/components/buttons/SigninWithButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type loginData = {
  email: string;
  password: string;
};
export default function LoginPage() {
  const { register, handleSubmit } = useForm<loginData>();
  const router = useRouter();

  async function handleLogin(formData: loginData): Promise<void> {
    const response = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });
    if (!response?.ok) {
      console.log("login failed");
    }
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <div className='flex items-center p-4'>
        <Card className='w-full max-w-sm'>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Link href={"/signup"}>
                <Button
                  variant='link'
                  className='font-semibold text-amber-500 hover:cursor-pointer'
                >
                  Signup
                </Button>
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col gap-6'>
              <div className='gap-2 grid'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='m@example.com'
                  {...register("email", { required: true })}
                />
              </div>
              <div className='gap-2 grid'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                  <a
                    href='#'
                    className='inline-block ml-auto text-xs sm:text-sm hover:underline underline-offset-4'
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id='password'
                  type='password'
                  placeholder='Please enter your password'
                  {...register("password", { required: true })}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className='flex-col gap-2'>
            <Button type='submit' className='w-full hover:cursor-pointer'>
              Login
            </Button>
            <SigninWithButton />
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
