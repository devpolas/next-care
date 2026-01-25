"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CareerPage() {
  return (
    <section className='space-y-12 mx-auto px-6 py-16 w-full'>
      <div className='space-y-4 text-center'>
        <h1 className='font-bold text-4xl md:text-5xl'>
          Join <span className='text-primary'>Next Care Team</span>
        </h1>
        <p className='mx-auto max-w-2xl text-muted-foreground text-lg'>
          We are always looking for compassionate and skilled professionals. If
          you are a Doctor, Nurse, or Caregiver, submit your application here.
        </p>
      </div>
      <div className='mx-auto max-w-3xl'>
        <Card>
          <CardContent className='space-y-6 p-8'>
            <h2 className='font-semibold text-2xl text-center'>
              Apply for a Position
            </h2>
            <form className='space-y-4' onSubmit={(e) => e.preventDefault()}>
              <div className='gap-4 grid sm:grid-cols-1 md:grid-cols-2'>
                <Input type='text' placeholder='Full Name' required />
                <Input type='email' placeholder='Email' required />
              </div>

              <div className='gap-4 grid sm:grid-cols-1 md:grid-cols-2'>
                <Input type='tel' placeholder='Phone Number' required />
                <Select>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select Role' />
                  </SelectTrigger>
                  <SelectContent position='popper' className='z-50 w-full'>
                    <SelectItem value='Doctor'>Doctor</SelectItem>
                    <SelectItem value='Nurse'>Nurse</SelectItem>
                    <SelectItem value='Care Staff'>Care Staff</SelectItem>
                    <SelectItem value='Other'>Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Input type='text' placeholder='Years of Experience' required />
              <Textarea
                placeholder='Cover Letter / Message'
                rows={6}
                required
              />

              <Button type='submit' className='w-full'>
                Submit Application
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className='space-y-2 text-center'>
        <p className='text-muted-foreground'>
          Questions? Reach us at{" "}
          <span className='font-semibold text-primary'>
            careers@nextcare.com
          </span>
        </p>
      </div>
    </section>
  );
}
