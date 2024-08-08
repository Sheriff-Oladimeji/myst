import React, { Suspense } from 'react'
import { Quote } from '@/types/quote'
import QuoteCard from './QuoteCard'
import Loader from './Loader';

async function getData(): Promise<Quote[]> {
  "use server";
  const res = await fetch("https://myst-api.onrender.com/api/v1/quotes", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data.map((item: { _id: string; author: string; quote: string ,}) => ({
    id: item._id,
    author: item.author,
    quote: item.quote,
  
   
  }));
}

const AllQuotes = async () => {
  const quotes = await getData()
  quotes.reverse()
  return (
    <Suspense fallback={<Loader/>}>
      <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {quotes.map((item: Quote) => (
          <QuoteCard
            key={item.id}
            id={item.id}
            author={item.author}
            quote={item.quote}
            upVote={item.upVote}
            image={item?.image}
          />
        ))}
      </section>
    </Suspense>
  );
}

export default AllQuotes