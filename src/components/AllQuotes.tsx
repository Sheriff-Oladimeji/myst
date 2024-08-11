"use client";
import { useState } from "react";
import { Quote } from "@/types/quote";
import QuoteCard from "./QuoteCard";
import Loader from "./Loader";
import Pagination from "./Pagination";
import { useQuery } from "@tanstack/react-query";

const AllQuotes = () => {
  const [page, setPage] = useState(1);
  const limit = 25;

  const { isLoading, error, data } = useQuery({
    queryKey: ["quotes", page],
    queryFn: () =>
      fetch(
        `https://myst-api.onrender.com/api/v1/quotes?page=${page}&limit=${limit}`,
        {
          cache: "no-store",
        }
      ).then((res) => res.json()),
  });

  if (isLoading) return <Loader />;
  if (error) return "An error has occurred: " + (error as Error).message;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="container mx-auto px-4">
    
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.posts.map((item: Quote) => (
          <QuoteCard
            key={item.id}
            id={item.id}
            author={item.author}
            quote={item.quote}
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
