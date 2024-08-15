"use client";

import { Quote } from "@/types/quote";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDownload } from "react-icons/md";
import { IoCopy } from "react-icons/io5";
import html2canvas from "html2canvas";
import { useRef } from "react";

const QuoteCard = ({ quote, author, id, category }: Quote) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(`❝${text}❞`)
      .then(() => {
        toast("Quote copied to clipboard!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  const handleDownload = async () => {
    if (!cardRef.current || !buttonsRef.current) return;

    // Hide the buttons
    buttonsRef.current.style.display = "none";

    try {
      // Capture the screenshot
      const canvas = await html2canvas(cardRef.current);
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");

      const fileName = id
        ? `quote-${id}.png`
        : `quote-${new Date().getTime()}.png`; // Fallback to timestamp if id is undefined

      link.href = dataUrl;
      link.download = fileName;
      link.click();
    } catch (error) {
      console.error("Failed to download the quote image: ", error);
    } finally {
      // Show the buttons again after the screenshot is taken
      buttonsRef.current.style.display = "flex";
    }
  };

  return (
    <div
      ref={cardRef}
      className="mb-4 border border-gray-700 shadow-lg p-6 flex flex-col justify-between bg-gray-900"
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start">
          <span className="text-xs font-medium text-gray-400">{category}</span>
        </div>
        <div className="flex flex-col justify-between h-full">
          <p className="mt-2 text-base font-semibold text-white leading-relaxed">
            ❝{quote}❞
          </p>
          <p className="mt-4 text-sm text-blue-500">{author}</p>
        </div>
      </div>
      <div
        ref={buttonsRef}
        className="flex justify-between items-center border-t border-gray-600 mt-4 pt-4"
      >
        <button
          onClick={handleDownload}
          className="text-gray-400 hover:text-white transition"
        >
          <MdDownload size={22} />
        </button>
        <button
          onClick={() => handleCopy(quote)}
          className="text-gray-400 hover:text-white transition"
        >
          <IoCopy size={22} />
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default QuoteCard;
