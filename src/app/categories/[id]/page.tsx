"use client";
import QuoteCard from "@/components/QuoteCard";
import { useQuery } from "@tanstack/react-query";
import { Quote } from "@/types/quote";
import Loader from "@/components/Loader";
import { useState } from "react";
import Pagination from "@/components/Pagination";
const Category = ({ params }: { params: { id: string } }) => {
  const [page, setPage] = useState(1);
  const limit = 30;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const { isLoading, error, data } = useQuery({
    queryKey: ["category", params.id],
    queryFn: async () => {
      const response = await fetch(
        `${baseUrl}/quotes/categories/${params.id}?page=${page}&limit=${limit}`,
        { cache: "reload" }
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

  
  console.log("Received data:", data);
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  return (
    <main className="w-[90%] mx-auto">
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
    </main>
  );
};

export default Category;
