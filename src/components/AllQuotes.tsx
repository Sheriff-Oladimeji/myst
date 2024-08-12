"use client";
import { useState } from "react";
import { Quote } from "@/types/quote";
import QuoteCard from "./QuoteCard";
import Loader from "./Loader";
import Pagination from "./Pagination";
import { useQuery } from "@tanstack/react-query";

const AllQuotes = () => {
  const [page, setPage] = useState(1);
  const limit = 30;

  const fetchQuotes = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      throw new Error("API base URL is not defined");
    }
    const response = await fetch(
      `${baseUrl}/quotes?page=${page}&limit=${limit}`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["quotes", page],
    queryFn: fetchQuotes,
  });

  if (isLoading) return <Loader />;
  if (error) return "An error has occurred: " + (error as Error).message;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="container mx-auto px-4">
      <section className="text-center my-8">
        <h2 className="text-3xl font-semibold text-white">Dive into Wisdom</h2>
        <p className="text-lg text-gray-400 mt-2">
          Explore a collection of quotes that inspire, motivate, and enlighten.
        </p>
        <div className="border-b border-gray-700 mt-4 mb-8"></div>
      </section>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data?.posts?.map((item: Quote) => (
          <QuoteCard
            key={item.id}
            id={item.id}
            author={item.author}
            quote={item.quote}
            category={item.category} 
          />
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={data.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AllQuotes;
