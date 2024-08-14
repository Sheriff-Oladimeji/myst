"use client";
import React from "react";
import QuoteCard from "@/components/QuoteCard";
import { useQuery } from "@tanstack/react-query";
import { Quote } from "@/types/quote";
import Loader from "@/components/Loader";
import { useState } from "react";
import Pagination from "@/components/Pagination";

const AuthorQuotes = ({ params }: { params: { id: string } }) => {
  const [page, setPage] = useState(1);
  const limit = 30;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const { isLoading, error, data } = useQuery({
    queryKey: ["author", params.id, page],
    queryFn: async () => {
      const response = await fetch(
        `${baseUrl}/quotes/authors/${params.id}?page=${page}&limit=${limit}`
       
      );
      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", errorText);
        throw new Error(
          `Network response was not ok: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p className="text-red-500 text-xl">
        An error has occurred: {(error as Error).message}
      </p>
    );
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <main className="w-[90%] mx-auto py-8 text-white">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold capitalize">
          {params.id} Quotes
        </h1>
        <p className="mt-4 text-lg text-gray-400">
          Dive into a curated collection of  quotes by {params.id}
         
        </p>
        <div className="border-b border-gray-700 mt-6 mb-8"></div>
      </header>

    
      <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data?.posts?.map((item: Quote) => (
          <QuoteCard
            key={item.id}
            id={item.id}
            author={item.author}
            quote={item.quote}
            category={item.category}
          />
        ))}
      </section>

      <Pagination
        currentPage={page}
        totalPages={data.totalPages}
        onPageChange={handlePageChange}
      />

    
    </main>
  );
};

export default AuthorQuotes;
