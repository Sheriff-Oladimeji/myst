import { Quote } from "@/types/quote";
import React from "react";

const QuoteCard = ({ quote, author }: Quote) => {
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <p>{quote}</p>
      <p>{author}</p>
    </div>
  );
};

export default QuoteCard;
