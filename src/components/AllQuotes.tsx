"use client";
import { Quote } from "@/types/quote";
import QuoteCard from "./QuoteCard";
import Loader from "./Loader";
import { useQuery } from "@tanstack/react-query";

const AllQuotes = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["quotes"],
    queryFn: () =>
      fetch(`https://myst-api.onrender.com/api/v1/quotes`, {
        cache: "no-store",
      }).then((res) => res.json()),
  });
  if (isLoading) return <Loader />;
  if (error) return "An error has occurred: " + error.message;
  return (
    <div>
      <p>All Quotes {data.length}</p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((item: Quote) => (
          <QuoteCard
            key={item.id}
            id={item.id}
            author={item.author}
            quote={item.quote}
          />
        ))}
      </div>
    </div>
  );
};

export default AllQuotes;
