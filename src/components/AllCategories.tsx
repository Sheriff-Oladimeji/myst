"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";

type Category = {
  _id: string;
  count: number;
};

const AllCategories = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [searchTerm, setSearchTerm] = useState("");

  const { isLoading, error, data } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () =>
      fetch(`${baseUrl}/quotes/categories`).then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      }),
  });

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <p className="text-red-500 text-xl">
        An error has occurred: {(error as Error).message}
      </p>
    );
  }

  const filteredCategories = data?.filter((category) =>
    category._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full mx-auto">
      <input
        type="text"
        placeholder="Search categories..."
        className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredCategories?.map(({ _id: id, count }) => (
          <Link
            key={id}
            href={`/categories/${id}`}
            className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            <p className="text-lg font-medium text-blue-400">{id}</p>
            <p className="text-sm text-gray-400">{count} quotes</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllCategories;
