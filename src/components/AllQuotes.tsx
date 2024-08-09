"use client"; 
import React, { Suspense, useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Quote } from "@/types/quote";
import QuoteCard from "./QuoteCard";
import Loader from "./Loader";
import { fetchQuotes } from "@/utils/fetchQuotes";

const AllQuotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadInitialQuotes = async () => {
      const initialQuotes = await fetchQuotes(1);
      setQuotes(initialQuotes);
    };
    loadInitialQuotes();
  }, []);

  const fetchMoreQuotes = async () => {
    const newQuotes = await fetchQuotes(page + 1);
    setQuotes((prevQuotes) => [...prevQuotes, ...newQuotes]);
    setPage(page + 1);
    if (newQuotes.length === 0) {
      setHasMore(false);
    }
  };

  return (
    <InfiniteScroll
      dataLength={quotes.length}
      next={fetchMoreQuotes}
      hasMore={hasMore}
      loader={<Loader />}
      endMessage={<p>No more quotes</p>}
      style={{ overflow: "visible" }}
    >
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {quotes.map((item: Quote) => (
          <QuoteCard
            key={item.id}
            id={item.id}
            author={item.author}
            quote={item.quote}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default AllQuotes;
