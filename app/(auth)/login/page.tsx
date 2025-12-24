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
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className='flex justify-center items-center p-4 min-h-screen'>
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
          <form>
            <div className='flex flex-col gap-6'>
              <div className='gap-2 grid'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='m@example.com'
                  required
                />
              </div>
              <div className='gap-2 grid'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                  <a
                    href='#'
                    className='inline-block ml-auto text-sm hover:underline underline-offset-4'
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id='password'
                  type='password'
                  placeholder='Please enter your password'
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex-col gap-2'>
          <Button type='submit' className='w-full hover:cursor-pointer'>
            Login
          </Button>
          <SigninWithButton />
        </CardFooter>
      </Card>
    </div>
  );
}
