"use client";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-hot-toast";
import SigninWithButton from "@/components/buttons/SigninWithButton";
import ImagePicker from "@/components/imagePicker/ImagePicker";
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
import { useRouter } from "next/navigation";
import axios from "axios";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result.split(",")[1]);
      } else {
        reject("Failed to convert file to base64");
      }
    };
    reader.readAsDataURL(file);
  });
}

export default function SignupPage() {
  const router = useRouter();
  type formData = {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    image: File | null;
  };

  const { register, handleSubmit, control, setValue } = useForm<formData>();

  const password = useWatch({
    name: "password",
    control,
  });

  async function handleSignup(formData: formData): Promise<void> {
    console.log("Signup form data:", formData);
    try {
      const base64Image = await fileToBase64(formData.image as File);
      const imageUrl = await axios.post("/api/imgbb", {
        name: formData.name,
        image: base64Image,
      });

      const response = await axios.post("/api/signup", {
        username: formData.name,
        email: formData.email,
        password: formData.password,
        image: imageUrl.data?.url,
      });

      if (response.status === 201) {
        toast.success("signup successfully!");
        router.push("/");
      } else {
        toast.error("signup failed!");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("signup failed!");
      }
    }
  }
  return (
    <form onSubmit={handleSubmit(handleSignup)}>
      <div className='flex items-center p-4'>
        <Card className='w-full max-w-sm'>
          <CardHeader>
            <CardTitle>Create a new account</CardTitle>
            <CardDescription>
              Enter your name, email, password below to signup an account
            </CardDescription>
            <CardAction>
              <Link href={"/login"}>
                <Button
                  variant='link'
                  className='font-semibold text-amber-600 hover:cursor-pointer'
                >
                  Login
                </Button>
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col gap-6'>
              <div className='gap-2 grid'>
                <Label htmlFor='name'>Full Name</Label>
                <Input
                  id='name'
                  type='text'
                  placeholder='Please enter your full name'
                  {...register("name", { required: true })}
                />
              </div>
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
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  type='password'
                  placeholder='Please enter your password'
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
              </div>
              <div className='gap-2 grid'>
                <Label htmlFor='passwordConfirm'>Password Confirm</Label>
                <Input
                  id='passwordConfirm'
                  type='password'
                  placeholder='Please confirm your password'
                  {...register("passwordConfirm", {
                    required: true,
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
              </div>
              <div className='gap-2 grid'>
                <Label>Select an Image</Label>
                <ImagePicker
                  onChange={(
                    fileOrEvent:
                      | File
                      | React.ChangeEvent<HTMLInputElement>
                      | null
                  ) => {
                    let file: File | null = null;

                    if (!fileOrEvent) {
                      file = null;
                    } else if ("target" in fileOrEvent) {
                      // It's a ChangeEvent
                      file = fileOrEvent.target.files?.[0] || null;
                    } else {
                      // It's already a File
                      file = fileOrEvent;
                    }

                    setValue("image", file, { shouldValidate: true });
                  }}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className='flex-col gap-2'>
            <Button type='submit' className='w-full hover:cursor-pointer'>
              Signup
            </Button>
            <SigninWithButton />
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
