"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useSearchStore from "@/store/searchStore";
import CardContainer from "@/components/CardContainer";
import QuoteCard from "@/components/QuoteCard";
import { Quote } from "@/types/quote";
import Pagination from "@/components/Pagination";
import Loader from "@/components/Loader";
import { useParams } from "next/navigation"; 

const SearchPage = () => {
  const { value } = useSearchStore();
  const { value: searchTerm } = useParams<{ value: string }>(); 

  const [page, setPage] = useState(1);
  const limit = 30;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["search", searchTerm, page],
    queryFn: async () => {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL
        }/quotes/search?q=${encodeURIComponent(
          searchTerm
        )}&page=${page}&limit=${limit}`
      );
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }
      return res.json();
    },
  });

  if (isLoading) return <Loader />;

  if (error)
    return (
      <p className="text-red-500 text-xl text-center mt-8">
        An error has occurred: {error.message}
      </p>
    );

  return (
    <div className="w-[90%] mx-auto pt-12">
      <h2 className="text-2xl font-semibold text-white mb-6">
        Search Results for <span className="text-blue-400">{searchTerm}</span>
      </h2>
      <CardContainer>
        {data?.posts?.map((item: Quote) => (
          <QuoteCard
            key={item.id}
            id={item.id}
            author={item.author}
            quote={item.quote}
            category={item.category}
          />
        ))}
      </CardContainer>
      <Pagination
        currentPage={page}
        totalPages={data.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default SearchPage;
