"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useSearchStore from "@/store/searchStore";
import CardContainer from "@/components/CardContainer";
import QuoteCard from "@/components/QuoteCard";
import { Quote } from "@/types/quote";
import Pagination from "@/components/Pagination";
import Loader from "@/components/Loader";

const SearchPage = () => {
  const { value } = useSearchStore();
  const [page, setPage] = useState(1);
  const limit = 30;
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const { isLoading, error, data } = useQuery({
    queryKey: ["search", value, page], // Added `value` to the query key to refetch on value change
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/quotes/search?q=${value}&page=${page}&limit=${limit}`
      ).then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      }),
  });

  if (isLoading)
    return (
     <Loader/>
    );
  if (error)
    return (
      <p className="text-red-500 text-xl">
        An error has occurred: {error.message}
      </p>
    );

  return (
    <div>
      <h2 className="text-xl font-bold text-white">
        Search Result for {value}
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
