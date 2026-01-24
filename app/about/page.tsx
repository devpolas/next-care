"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, HeartHandshake, Users, Clock } from "lucide-react";

export default function AboutPage() {
  return (
    <section className='space-y-20 mx-auto px-6 py-16 max-w-7xl'>
      <div className='space-y-6 text-center'>
        <h1 className='font-bold text-4xl md:text-5xl'>
          About <span className='text-primary'>Next Care</span>
        </h1>
        <p className='mx-auto max-w-3xl text-muted-foreground text-lg'>
          Care.xyz is a trusted caregiving platform designed to provide reliable
          baby care, elderly care, and emergency home services — making care
          accessible, safe, and stress-free for every family.
        </p>
      </div>

      <div className='gap-8 grid md:grid-cols-2'>
        <Card>
          <CardContent className='space-y-4 p-8'>
            <h2 className='font-semibold text-2xl'>Our Mission</h2>
            <p className='text-muted-foreground'>
              To simplify caregiving by connecting families with verified,
              trained, and compassionate caregivers — ensuring safety, dignity,
              and peace of mind.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='space-y-4 p-8'>
            <h2 className='font-semibold text-2xl'>Our Vision</h2>
            <p className='text-muted-foreground'>
              To become the most trusted digital caregiving platform, empowering
              families to access quality care anytime, anywhere.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className='space-y-10'>
        <h2 className='font-bold text-3xl text-center'>Why Choose Care.xyz?</h2>

        <div className='gap-6 grid sm:grid-cols-2 lg:grid-cols-4'>
          <FeatureCard
            icon={<ShieldCheck className='w-8 h-8 text-primary' />}
            title='Trusted Caregivers'
            description='All caregivers are verified, trained, and background-checked.'
          />
          <FeatureCard
            icon={<HeartHandshake className='w-8 h-8 text-primary' />}
            title='Compassion-Driven'
            description='Care built on empathy, respect, and human connection.'
          />
          <FeatureCard
            icon={<Clock className='w-8 h-8 text-primary' />}
            title='Flexible Booking'
            description='Hourly, daily, or long-term services tailored to your needs.'
          />
          <FeatureCard
            icon={<Users className='w-8 h-8 text-primary' />}
            title='For Every Family'
            description='Baby care, elderly care, and emergency services in one place.'
          />
        </div>
      </div>

      <div className='space-y-4 mx-auto max-w-3xl text-center'>
        <h2 className='font-semibold text-2xl'>Care You Can Trust</h2>
        <p className='text-muted-foreground'>
          Whether you need a babysitter, elderly assistance, or urgent home
          care, Care.xyz ensures professional support at every step — because
          your loved ones deserve the best care.
        </p>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className='hover:shadow-md transition'>
      <CardContent className='space-y-4 p-6 text-center'>
        <div className='flex justify-center'>{icon}</div>
        <h3 className='font-semibold text-lg'>{title}</h3>
        <p className='text-muted-foreground text-sm'>{description}</p>
      </CardContent>
    </Card>
  );
}
