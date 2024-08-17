"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useSearchStore from "@/store/searchStore";
import CardContainer from "@/components/CardContainer";
import QuoteCard from "@/components/QuoteCard";
import { Quote } from "@/types/quote";
const SearchPage = () => {
const {value, setValue} = useSearchStore()
  const { isLoading, error, data } = useQuery({
   queryKey: ["search"],
   queryFn: () =>
     fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/quotes/search?q=${value}`).then(
       (res) => {
         if (!res.ok) {
           throw new Error("Network response was not ok");
         }
         return res.json();
       }
     ),
 });

 if (isLoading)
   return (
     <p className="text-white text-sm flex items-center justify-center text-center">
       Loading results
     </p>
   );
 if (error)
   return (
     <p className="text-red-500 text-xl">
       An error has occurred: {error.message}
     </p>
   );
  return (
      <div>
          <h2 className="text-xl font-bold text-white">Search Result for {value}</h2>
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
    </div>
  );
}

export default SearchPage;