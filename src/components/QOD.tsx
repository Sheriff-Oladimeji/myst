"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";

const QOD = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["qod"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/quotes/qod`, {
        cache: "no-store",
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      }),
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
    <header
      className="relative h-96 md:h-80 flex items-center justify-center text-center text-white bg-cover bg-center m-0"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1611757644023-192a39fc9359?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      }}
    >
      <div className="bg-black bg-opacity-50 p-6 md:p-4  h-full w-full">
        <div className="max-w-xl sm:max-w-2xl flex flex-col justify-center items-center h-full text-center mx-auto">
          <h1 className="text-3xl font-bold mb-3">Quote of the Day</h1>
          <p className="text-xl md:text-lg italic mb-4">
            &quot;{data.quote}&quot;
          </p>
          <p className="text-lg md:text-md font-semibold">- {data.author}</p>
          <p className="text-md md:text-sm text-gray-400">{data.category}</p>
        </div>
      </div>
    </header>
  );
};

export default QOD;
