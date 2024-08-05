"use client"
import { Quote } from "@/types/quote";
import React from "react";
import { IoMdCopy } from "react-icons/io";
import { PiHeartThin } from "react-icons/pi";

const QuoteCard = ({ quote, author, _id }: Quote) => {
  return (
    <div className="max-w-md p-6 bg-white border border-gray-200 rounded-md shadow  ">
      <div className="flex flex-col gap-3">
        <p>{quote}</p>
        <p className="text-sm text-blue-700">{author}</p>
      </div>
      <div className="flex justify-between items-center border-t border-gray-200  mt-2 pt-2">
        <div>
          <PiHeartThin size={20} />
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(quote);
          }}
        >
          <IoMdCopy size={20} />
        </button>
      </div>
    </div>
  );
};

export default QuoteCard;
