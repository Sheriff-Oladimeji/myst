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
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <p className="text-red-500 text-xl font-semibold mb-4">
          Oops! Something went wrong.
        </p>
        <p className="text-white text-lg">
          An error occurred: {error.message}
        </p>
      </div>
    );

  return (
    <div className="w-[90%] mx-auto pt-6">
      <h2 className="text-3xl font-semibold text-white mb-8 text-center">
        {data?.totalPosts > 0 ? (
          <>
            Showing results for <span className="text-blue-400">{searchTerm}</span>
          </>
        ) : (
          <>
            No results found for <span className="text-red-400">{searchTerm}</span>
          </>
        )}
      </h2>
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-gray-400 bg-gray-800 px-4 py-2 rounded-md shadow-md">
          <span className="text-blue-400 font-semibold">
            {data?.totalPosts}
          </span>{" "}
          result{data?.totalPosts !== 1 && "s"} found
        </p>
        <p className="text-sm text-gray-400 bg-gray-800 px-4 py-2 rounded-md shadow-md">
          Page{" "}
          <span className="text-blue-400 font-semibold">
            {page}
          </span>{" "}
          of{" "}
          <span className="text-blue-400 font-semibold">
            {data?.totalPages}
          </span>
        </p>
      </div>
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
        totalPages={data?.totalPages}
        onPageChange={handlePageChange}
      />
      <div className="mt-10 flex justify-center">
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-400 transition duration-300"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Back to Top
        </button>
      </div>
    </div>
  );
};

export default SearchPage;
