"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <section className='space-y-20 mx-auto px-6 py-16 max-w-7xl'>
      <div className='space-y-4 text-center'>
        <h1 className='font-bold text-4xl md:text-5xl'>
          Contact <span className='text-primary'>Us</span>
        </h1>
        <p className='mx-auto max-w-2xl text-muted-foreground text-lg'>
          We are here to help! Reach out for any questions, feedback, or
          inquiries about our caregiving services.
        </p>
      </div>

      <div className='gap-6 grid sm:grid-cols-1 md:grid-cols-3'>
        <InfoCard
          icon={<Mail className='w-6 h-6 text-primary' />}
          title='Email'
          details='support@care.xyz'
        />
        <InfoCard
          icon={<Phone className='w-6 h-6 text-primary' />}
          title='Phone'
          details='+880 123 456 789'
        />
        <InfoCard
          icon={<MapPin className='w-6 h-6 text-primary' />}
          title='Address'
          details='123 Care Street, Dhaka, Bangladesh'
        />
      </div>

      <div className='mx-auto max-w-7xl'>
        <Card>
          <CardContent className='space-y-6 p-8'>
            <h2 className='font-semibold text-2xl text-center'>
              Send Us a Message
            </h2>
            <form className='space-y-4' onSubmit={(e) => e.preventDefault()}>
              <div className='gap-4 grid sm:grid-cols-1 md:grid-cols-2'>
                <Input type='text' placeholder='Your Name' required />
                <Input type='email' placeholder='Your Email' required />
              </div>
              <Input type='text' placeholder='Subject' required />
              <Textarea placeholder='Your Message' rows={6} required />
              <Button type='submit' className='w-full hover:cursor-pointer'>
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  title,
  details,
}: {
  icon: React.ReactNode;
  title: string;
  details: string;
}) {
  return (
    <Card className='hover:shadow-md transition'>
      <CardContent className='flex flex-col items-center space-y-2 p-6 text-center'>
        {icon}
        <h3 className='font-semibold text-lg'>{title}</h3>
        <p className='text-muted-foreground text-sm'>{details}</p>
      </CardContent>
    </Card>
  );
}
