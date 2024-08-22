"use client";
import { FormEvent, useState, ChangeEvent } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";

const showWarning = (message: string) => {
  return toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

const prohibitedWords = [
  "dick",
  "gay",
  "shit",
  "fuck",
  "bitch",
  "asshole",
  "bastard",
  "cunt",
  "slut",
  "faggot",
  "nigger",
  "whore",
  "pussy",
  "cock",
  "damn",
  "crap",
  "douchebag",
  "motherfucker",
  "retard",
  "twat",
  "wanker",
];
type Category = {
  _id: string;
  count: number;
};

const AddQuote = () => {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [quote, setQuote] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [newCategory, setNewCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isPending, error, data } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () =>
      fetch(`${baseUrl}/quotes/categories`).then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      }),
  });

   if (isPending) {
     return <Loader/>;
   }

   if (error) {
     return (
       <p className="text-red-500 text-xl">
         An error has occurred: {(error as Error).message}
       </p>
     );
   }
  const popularCategories = [
    "Inspirational",
    "Motivational",
    "Love",
    "Life",
    "Success",
    "Happiness",
    "Wisdom",
    "Friendship",
  ];

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    if (e.target.value !== "new") {
      setNewCategory("");
    }
  };

  const containsProhibitedWords = (text: string) => {
    const lowerCaseText = text.toLowerCase();
    return prohibitedWords.some((word) => lowerCaseText.includes(word));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const finalCategory = category === "new" ? newCategory : category;
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const data = {
        quote,
        author,
        category: finalCategory,
      };

      const res = await fetch(`${baseUrl}/quotes/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(
          `HTTP error! status: ${res.status}, message: ${errorText}`
        );
      }

      const responseData = await res.json();
      console.log("Response Data:", responseData);

      toast("Quote added successfully", {
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

      setQuote("");
      setAuthor("");
      setCategory("");
      router.push("/");
    } catch (error: any) {
      console.error("Error details:", error);
      alert("An error occurred: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!quote.trim()) {
      showWarning("Quote cannot be empty");
    } else if (containsProhibitedWords(quote)) {
      showWarning("Please remove inappropriate language from the quote");
    } else if (!author.trim()) {
      showWarning("Please add an author");
    } else if (!category) {
      showWarning("Please select a category");
    } else if (category === "new" && !newCategory.trim()) {
      showWarning("Please enter a new category");
    } else {
      onSubmit(e);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white">Add a New Quote</h1>
        <p className="text-sm text-gray-300 mt-2">
          Share your favorite quote with the community.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <div>
          <label
            htmlFor="quote"
            className="block mb-2 text-sm font-bold text-white"
          >
            Quote
          </label>
          <textarea
            name="quote"
            id="quote"
            placeholder="Enter quote"
            rows={3}
            className="block w-full p-3 border border-gray-500 text-base rounded-lg bg-gray-700 placeholder-gray-400 text-white focus:outline-none"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="author"
            className="block mb-2 text-sm font-medium text-white"
          >
            Quote Author
          </label>
          <input
            type="text"
            name="author"
            placeholder="Enter author"
            className="block w-full p-3 border border-gray-500 text-base rounded-lg bg-gray-700 placeholder-gray-400 text-white focus:outline-none"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-white"
          >
            Category
          </label>
          <select
            name="category"
            className="block w-full p-3 border border-gray-500 text-base rounded-lg bg-gray-700 placeholder-gray-400 text-white focus:outline-none"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">Select a category</option>
            {data?.map(({ _id: id, count }) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
            <option value="new">Add new category</option>
          </select>
        </div>
        {category === "new" && (
          <div>
            <label
              htmlFor="newCategory"
              className="block mb-2 text-sm font-medium text-white"
            >
              New Category
            </label>
            <input
              type="text"
              name="newCategory"
              placeholder="Enter new category"
              className="block w-full p-3 border border-gray-500 text-base rounded-lg bg-gray-700 placeholder-gray-400 text-white focus:outline-none"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </div>
        )}
        {isLoading ? (
          <button
            type="button"
            className="bg-indigo-500 font-medium rounded-lg text-sm px-4 py-2.5 text-center flex items-center gap-2 w-full  justify-center "
            disabled
          >
            <div className="border-gray-300 h-6 w-6 animate-spin rounded-full border-4 border-t-blue-600" />
            <p className="text-center"> Processing...</p>
          </button>
        ) : (
          <button
            type="submit"
            className={`text-white focus:outline-none font-medium rounded-lg text-sm px-6 py-2.5 text-center w-full bg-blue-700`}
          >
            Submit
          </button>
        )}
        <ToastContainer />
      </form>
    </div>
  );
};

export default AddQuote;
