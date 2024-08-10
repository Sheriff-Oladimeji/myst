"use client";
import React from "react";
import { Quote } from "@/types/quote";
import QuoteCard from "./QuoteCard";
import Loader from "./Loader";
import { useQuery } from "@tanstack/react-query";

const QOD = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["qod"],
    queryFn: () =>
      fetch(`https://myst-api.onrender.com/api/v1/quotes/qod`, {
        cache: "no-store",
      }).then((res) => res.json()),
  });
  
  if (isLoading) return <p>Loading Quote</p>;
  if (error) return "An error has occurred: " + error.message;
  return (
    <div className="text-center">
      <p>Quote of the day</p>
      <p>{data.quote}</p>
      <p>{data.author}</p>
      <p>{data.category}</p>
    </div>
  );
};

export default QOD;
