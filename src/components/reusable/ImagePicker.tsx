"use client";
import { useRef, useState, ChangeEvent } from "react";
import Image from "next/image";

interface ImagePickerProps {
  label: string;
  name: string;
}

export default function ImagePicker({ label, name }: ImagePickerProps) {
  const [pickedImage, setPickedImage] = useState<string | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result as string);
    };

    fileReader.readAsDataURL(file);
  }

  function handlePickClick() {
    inputRef.current?.click();
  }

  return (
    <div className="space-y-4">
      <label htmlFor={name} className="block text-gray-600 ml-2">
        {label}
      </label>

      <div className="flex flex-col items-center gap-4">
        <div
          onClick={handlePickClick}
          className="relative w-30 h-30 mb-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl overflow-hidden shadow-sm"
        >
          {!pickedImage ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-sm text-gray-500 font-medium">
              No Image Picked
              <p className="mt-2 text-purple-800 font-bold border-1 p-1 rounded-sm bg-purple-200">
                Click here
              </p>
            </div>
          ) : (
            <Image
              src={pickedImage}
              alt="image selected by the user"
              fill
              className="object-cover"
            />
          )}
        </div>

        <input
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          className="hidden"
          onChange={handleImageChange}
          ref={inputRef}
        />
      </div>
    </div>
  );
}
