import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";

export default function SigninWithButton() {
  return (
    <Button variant='outline' className='w-full hover:cursor-pointer'>
      <span className='flex flex-row gap-4'>
        <FcGoogle />
        Login with Google
      </span>
    </Button>
  );
}
