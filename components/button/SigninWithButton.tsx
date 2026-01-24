import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

export default function SigninWithButton() {
  const handleGoogleLogin = async () => {
    try {
      const res = await signIn("google");

      if (res?.error) {
        console.error("Google login failed");
      }

      if (res?.ok) {
        console.log("Login success");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };
  return (
    <Button
      type='button'
      variant='outline'
      className='w-full hover:cursor-pointer'
      onClick={handleGoogleLogin}
    >
      <span className='flex flex-row gap-4'>
        <FcGoogle />
        Continue with Google
      </span>
    </Button>
  );
}
