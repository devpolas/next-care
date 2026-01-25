"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Calendar } from "lucide-react";
import { CareInterface } from "@/types/services.type";
import Link from "next/link";

export default function CareCard({ care }: { care: CareInterface }) {
  return (
    <Card className='flex flex-col justify-around hover:shadow-lg overflow-hidden transition-shadow'>
      <div className='relative w-full h-48'>
        <Image src={care.image} alt={care.name} fill className='object-cover' />
      </div>

      <CardContent className='space-y-4 p-5'>
        <Badge variant='secondary' className='w-fit'>
          {care.category}
        </Badge>

        <h3 className='font-semibold text-xl'>{care.name}</h3>

        <p className='text-muted-foreground text-sm line-clamp-2'>
          {care.shortDescription}
        </p>

        <ul className='space-y-1 text-sm'>
          {care.features.slice(0, 3).map((feature, i) => (
            <li key={i} className='flex items-center gap-2'>
              <span className='bg-primary rounded-full w-1.5 h-1.5' />
              {feature}
            </li>
          ))}
        </ul>

        <div className='flex flex-col gap-2 pt-2 text-sm'>
          <div className='flex items-center gap-2'>
            <Clock className='w-4 h-4 text-primary' />
            <span>${care.pricePerHour}/hour</span>
          </div>

          {care.pricePerDay && (
            <div className='flex items-center gap-2'>
              <Calendar className='w-4 h-4 text-primary' />
              <span>${care.pricePerDay}/day</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className='p-5 pt-0'>
        <Link className='w-full' href={`/cares/${care._id}`}>
          <Button className='w-full hover:cursor-pointer'>Book Service</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
