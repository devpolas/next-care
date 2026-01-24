"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import Image from "next/image";

type ImagePickerProps = React.InputHTMLAttributes<HTMLInputElement> & {
  onChange?: (file: File | null) => void;
};

export default function ImagePicker({ onChange, ...props }: ImagePickerProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;

    if (selectedImage) URL.revokeObjectURL(selectedImage);

    setSelectedImage(file ? URL.createObjectURL(file) : null);

    onChange?.(file); // now TypeScript knows file is File | null
  }

  return (
    <div className='flex flex-col gap-2'>
      <Input
        onChange={handleChange}
        type='file'
        accept='image/png, image/jpeg, image/jpg'
        {...props}
      />
      {selectedImage && (
        <div className='relative rounded-md w-32 h-32 overflow-hidden'>
          <Image
            src={selectedImage!}
            alt='Profile Image'
            fill
            className='object-cover'
            unoptimized
          />
        </div>
      )}
    </div>
  );
}
