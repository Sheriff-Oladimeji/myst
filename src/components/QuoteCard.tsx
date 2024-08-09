"use client";
import { Quote } from "@/types/quote";
import { IoMdCopy } from "react-icons/io";
import { toast, ToastContainer , Bounce} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiDownload } from "react-icons/hi";
import { motion, useScroll } from "framer-motion";

const QuoteCard = ({ quote, author, id }: Quote) => {
   const { scrollYProgress } = useScroll();
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

  return (
   
      <div className="max-w-md border border-gray-600 rounded-xl shadow p-6 flex flex-col justify-between bg-gray-900">
        <div className="flex flex-col justify-between h-full">
          <p className="text-lg font-semibold">❝{quote}❞</p>
          <p className="text-sm text-blue-700 mt-3">{author}</p>
        </div>
        <div className="flex justify-between items-center border-t border-gray-200 mt-2 pt-2">
          <button>
            <HiDownload size={22} />
          </button>
          <button onClick={() => handleCopy(quote)}>
            <IoMdCopy size={22} />
          </button>
        </div>
        <ToastContainer />
      </div>
  );
};

export default QuoteCard;
