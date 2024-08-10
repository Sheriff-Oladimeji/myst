"use client";
import { Quote } from "@/types/quote";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useScroll } from "framer-motion";
import { MdDownload } from "react-icons/md";
import { IoCopy } from "react-icons/io5";
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
        <p className="text-sm text-blue-600 mt-3">{author}</p>
      </div>
      <div className="flex justify-between items-center border-t border-gray-200 mt-2 pt-2">
        <button>
          <MdDownload size={22} />
        </button>
        <button onClick={() => handleCopy(quote)}>
          <IoCopy  size={22} />
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default QuoteCard;
