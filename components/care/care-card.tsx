"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Calendar } from "lucide-react";

type ServiceCardProps = {
  service: {
    category: "Baby Care" | "Elderly Care" | "Emergency Care";
    name: string;
    shortDescription: string;
    pricePerHour: number;
    pricePerDay?: number | null;
    image: string;
    features: string[];
  };
};

export default function CareCard({ service }: ServiceCardProps) {
  return (
    <Card className='hover:shadow-lg overflow-hidden transition-shadow'>
      {/* Image */}
      <div className='relative w-full h-48'>
        <Image
          src={service.image}
          alt={service.name}
          fill
          className='object-cover'
        />
      </div>

      <CardContent className='space-y-4 p-5'>
        {/* Category */}
        <Badge variant='secondary' className='w-fit'>
          {service.category}
        </Badge>

        {/* Title */}
        <h3 className='font-semibold text-xl'>{service.name}</h3>

        {/* Description */}
        <p className='text-muted-foreground text-sm line-clamp-2'>
          {service.shortDescription}
        </p>

        {/* Features */}
        <ul className='space-y-1 text-sm'>
          {service.features.slice(0, 3).map((feature, i) => (
            <li key={i} className='flex items-center gap-2'>
              <span className='bg-primary rounded-full w-1.5 h-1.5' />
              {feature}
            </li>
          ))}
        </ul>

        {/* Pricing */}
        <div className='flex flex-col gap-2 pt-2 text-sm'>
          <div className='flex items-center gap-2'>
            <Clock className='w-4 h-4 text-primary' />
            <span>${service.pricePerHour}/hour</span>
          </div>

          {service.pricePerDay && (
            <div className='flex items-center gap-2'>
              <Calendar className='w-4 h-4 text-primary' />
              <span>${service.pricePerDay}/day</span>
            </div>
          )}
        </div>
      </CardContent>

      {/* CTA */}
      <CardFooter className='p-5 pt-0'>
        <Button className='w-full'>Book Service</Button>
      </CardFooter>
    </Card>
  );
}
