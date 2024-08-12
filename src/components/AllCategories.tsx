"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

type Category = {
  _id: string; 
  count: number;
};

const AllCategories = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const { isLoading, error, data } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () =>
      fetch(`${baseUrl}/quotes/categories`, { cache: "reload" }).then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      }),
  });

  if (isLoading) {
    return (
      <p className="text-white text-lg flex items-center justify-center text-center">
        Loading categories...
      </p>
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
    <div>
      <div className="w-[90%] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:grid-cols-5 ">
        {data?.map(({ _id: id, count }) => (
          <Link
            key={id}
            href={`/categories/${id}`}
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

export default AllCategories;
