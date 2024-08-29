"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const QOD = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["qod"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/quotes/qod`).then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      }),
    staleTime: 1000 * 60 * 60 * 24, 
  });

  if (isLoading)
    return (
      <p className="text-white text-sm flex items-center justify-center text-center">
        Loading Quote of the day...
      </p>
    );
  if (error)
    return (
      <p className="text-red-500 text-xl">
        An error has occurred: {error.message}
      </p>
    );

  return (
    <header className="relative h-96 md:h-80 flex items-center justify-center text-center text-white m-0">
      <Image
        src="https://images.unsplash.com/photo-1611757644023-192a39fc9359?q=80&w=1200&auto=format&fit=crop"
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={75}
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 p-6 md:p-4">
        <div className="max-w-xl sm:max-w-2xl flex flex-col justify-center items-center h-full text-center mx-auto">
          <h1 className="text-3xl font-bold mb-3">Quote of the Day</h1>
          <p className="text-xl md:text-lg italic mb-4">
            &quot;{data?.quote}&quot;
          </p>
          <p className="text-lg md:text-md font-semibold">- {data?.author}</p>
          <p className="text-md md:text-sm text-gray-400">{data?.category}</p>
        </div>
      </div>
    </header>
  );
};

export default QOD;
