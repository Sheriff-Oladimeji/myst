"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";

type Author = {
  _id: string;
  count: number;
};

const  Authors = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const { isLoading, error, data } = useQuery<Author[]>({
    queryKey: ["authors"],
    queryFn: () =>
      fetch(`${baseUrl}/quotes/authors`).then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      }),
  });

  if (isLoading) {
    return (
     <Loader/>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 text-xl">
        An error has occurred: {(error as Error).message}
      </p>
    );
  }

  return (
    <div className="w-[90%] mx-auto ">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:grid-cols-5 ">
        {data?.map(({ _id: id, count }) => (
          <Link
            key={id}
            href={`/authors/${id}`}
            className="text-sm font-medium me-2 px-2.5 text-blue-700"
          >
            <p>
              {id}: {count}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Authors;
