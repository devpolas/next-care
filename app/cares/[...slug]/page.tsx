// "use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Calendar, CheckCircle } from "lucide-react";

export default async function pag({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = {
    category: "Elderly Care",
    name: "24/7 Home Nursing Care",
    description:
      "Our 24/7 Home Nursing Care service provides professional, compassionate nursing support for elderly patients in the comfort of their homes. We ensure continuous monitoring, medication management, mobility assistance, and emergency response when needed.",
    pricePerHour: 15,
    pricePerDay: 100,
    image: "https://i.ibb.co.com/S4ydj3MT/Elderly-Home-Care.webp",
    features: [
      "Certified and trained nurses",
      "Medication & vital monitoring",
      "Emergency response support",
      "Personal hygiene assistance",
      "Daily health reporting",
    ],
  };

  return (
    <section className='mx-auto px-4 py-12 max-w-6xl'>
      <div className='gap-8 grid lg:grid-cols-2'>
        <div className='relative rounded-xl w-full h-90 overflow-hidden'>
          <Image
            src={service.image}
            alt={service.name}
            fill
            className='object-cover'
            priority
          />
        </div>

        <div className='space-y-6'>
          <Badge className='w-fit'>{service.category}</Badge>

          <h1 className='font-bold text-3xl lg:text-4xl'>{service.name}</h1>

          <p className='text-muted-foreground leading-relaxed'>
            {service.description}
          </p>

          <div className='flex flex-wrap gap-6 pt-2'>
            <div className='flex items-center gap-2'>
              <Clock className='w-5 h-5 text-primary' />
              <span className='font-medium text-lg'>
                ${service.pricePerHour}/hour
              </span>
            </div>

            {service.pricePerDay && (
              <div className='flex items-center gap-2'>
                <Calendar className='w-5 h-5 text-primary' />
                <span className='font-medium text-lg'>
                  ${service.pricePerDay}/day
                </span>
              </div>
            )}
          </div>

          <Button size='lg' className='mt-4'>
            Book This Service
          </Button>
        </div>
      </div>

      {/* Features + Booking */}
      <div className='gap-8 grid lg:grid-cols-3 mt-16'>
        {/* Features */}
        <div className='lg:col-span-2'>
          <h2 className='mb-6 font-semibold text-2xl'>What’s Included</h2>

          <ul className='gap-4 grid sm:grid-cols-2'>
            {service.features.map((feature, i) => (
              <li key={i} className='flex items-start gap-3'>
                <CheckCircle className='mt-1 w-5 h-5 text-primary' />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Booking Card */}
        <Card className='lg:top-24 lg:sticky h-fit'>
          <CardContent className='space-y-6 p-6'>
            <h3 className='font-semibold text-xl'>Quick Booking</h3>

            <div className='space-y-3 text-sm'>
              <p>✔ Available 24/7</p>
              <p>✔ Trusted professionals</p>
              <p>✔ Emergency support</p>
            </div>

            <Button className='w-full'>Proceed to Booking</Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
