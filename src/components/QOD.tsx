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
  
  if (isLoading) return <Loader />;
  if (error) return "An error has occurred: " + error.message;
  return (
    <div>
      <p>{data.quote}</p>
    </div>
  );
};

export default QOD;
