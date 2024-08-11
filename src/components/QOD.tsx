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

  if (isLoading) return <p className="text-white text-2xl">Loading Quote...</p>;
  if (error)
    return (
      <p className="text-red-500 text-xl">
        An error has occurred: {error.message}
      </p>
    );

  return (
    <header
      className="relative h-screen flex items-center justify-center text-center text-white bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1528744598421-b7d6d9bd0b9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80")',
      }}
    >
      <div className="bg-black bg-opacity-50 p-8 rounded-lg max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">Quote of the Day</h1>
        <p className="text-2xl italic mb-6">&quot;{data.quote}&quot;</p>
        <p className="text-xl font-semibold">- {data.author}</p>
        <p className="text-lg text-gray-400">{data.category}</p>
      </div>
    </header>
  );
};

export default QOD;
