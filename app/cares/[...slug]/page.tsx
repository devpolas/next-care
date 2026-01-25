import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Calendar, CheckCircle } from "lucide-react";
import { CareInterface } from "@/types/services.type";

async function fetchCare(id: string): Promise<CareInterface | null> {
  const res = await fetch(`http://localhost:3000/api/services?id=${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data?.cares[0] ?? null;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  const careId = slug?.[0];

  if (!careId) notFound();

  const care = await fetchCare(careId);

  if (!care) notFound();

  return (
    <section className='mx-auto px-4 py-12 max-w-6xl'>
      <div className='gap-8 grid lg:grid-cols-2'>
        <div className='relative rounded-xl h-96 overflow-hidden'>
          <Image
            src={care.image}
            alt={care.name}
            fill
            className='object-cover'
            priority
          />
        </div>

        <div className='space-y-6'>
          <Badge>{care.category}</Badge>
          <h1 className='font-bold text-4xl'>{care.name}</h1>
          <p className='text-muted-foreground'>{care.description}</p>

          <div className='flex gap-6'>
            <div className='flex items-center gap-2'>
              <Clock className='w-5 h-5 text-primary' />
              <span>${care.pricePerHour}/hour</span>
            </div>

            {care.pricePerDay && (
              <div className='flex items-center gap-2'>
                <Calendar className='w-5 h-5 text-primary' />
                <span>${care.pricePerDay}/day</span>
              </div>
            )}
          </div>

          <Button size='lg' className='hover:cursor-pointer'>
            Book This Care
          </Button>
        </div>
      </div>

      <div className='gap-8 grid lg:grid-cols-3 mt-16'>
        <div className='lg:col-span-2'>
          <h2 className='mb-6 font-semibold text-2xl'>What’s Included</h2>
          <ul className='gap-4 grid sm:grid-cols-2'>
            {care.features.map((feature, i) => (
              <li key={i} className='flex gap-3'>
                <CheckCircle className='w-5 h-5 text-primary' />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <Card className='lg:top-24 lg:sticky h-fit'>
          <CardContent className='space-y-6 p-6'>
            <h3 className='font-semibold text-xl'>Quick Booking</h3>
            <p>✔ Available 24/7</p>
            <p>✔ Trusted professionals</p>
            <p>✔ Emergency support</p>
            <Button className='w-full hover:cursor-pointer'>
              Proceed to Booking
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
