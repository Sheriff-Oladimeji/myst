"use client";
import React, { useState, useEffect } from "react";

type Category = {
  _id: string;
  count: number;
};

const AllCategories = () => {
  const [data, setData] = useState<Category[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://qlip-api.onrender.com/api/v1/quotes/categories"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

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
        An error has occurred: {error.message}
      </p>
    );
  }

  return (
    <div>
      <div className="w-[90%] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:grid-cols-5 ">
        {data?.map((item) => (
          <div
            key={item._id}
            className="text-sm font-medium me-2 px-2.5 text-blue-700"
          >
            <p>
              {item._id}: {item.count}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCategories;
