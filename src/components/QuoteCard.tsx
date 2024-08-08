"use client"
import React, { useState } from "react";
import { Quote } from "@/types/quote";
import { IoMdCopy } from "react-icons/io";

import Image from "next/image";

const QuoteCard = ({ quote, author, id, image }: Quote) => {
  return (
    <div className="max-w-md  border border-gray-600 rounded-xl shadow  p-6 flex flex-col justify-between bg-gray-900">
      <div>{image && <Image src={image} alt="image" />}</div>
      <div className="flex flex-col  justify-between h-full">
          <p className="text-lg font-semibold">❝{quote}❞</p>
        
        <p className="text-sm text-main mt-3">{author}</p>
      </div>
      <div className="flex justify-between items-center border-t border-gray-200 mt-2 pt-2">
        <button
          onClick={() => {
            navigator.clipboard.writeText(`❝${quote}❞`);
          }}
        >
          <IoMdCopy size={20} />
        </button>
      </div>
    </div>
  );
};

export default QuoteCard;
