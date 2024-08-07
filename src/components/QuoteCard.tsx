"use client"
import React, { useState } from "react";
import { Quote } from "@/types/quote";
import { IoMdCopy } from "react-icons/io";
import { PiHeartThin } from "react-icons/pi";

const QuoteCard = ({ quote, author, id, upVote }: Quote) => {
  return (
    <div className="max-w-md  border border-gray-600 rounded-xl shadow  p-6 flex flex-col justify-between bg-gray-900">
      <div className="flex flex-col  justify-between h-full">
        <p>{quote}</p>
        <p className="text-sm text-main mt-3">{author}</p>
      </div>
      <div className="flex justify-between items-center border-t border-gray-200 mt-2 pt-2">
        <div className="flex gap-2 items-center rounded-xl bg-gray-700 px-2">
          <PiHeartThin size={20} />
          <p>{upVote}</p>
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
