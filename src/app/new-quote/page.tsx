"use client";
import React, { FormEvent, useState } from "react";

const AddQuote = () => {
  const [quote, setQuote] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const data = { quote, author };

      const res = await fetch("https://myst-api.onrender.com/api/v1/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorText = await res.json();
        throw new Error(
          `HTTP error! status: ${res.status}, message: ${errorText}`
        );
      }

      const responseData = await res.json();
      console.log("Response Data:", responseData);
      alert("Request successful");
    } catch (error: any) {
      alert("An error occurred: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 max-w-sm mx-auto">
      <div>
        <label
          htmlFor="quote"
          className="block mb-2 text-sm font-medium text-white"
        >
          Quote
        </label>
        <input
          type="text"
          name="quote"
          placeholder="Enter quote"
          className="block w-full p-6 text-gray-900 border border-gray-300  bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 rounded-xl"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          required
        />
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
          className="block w-full p-3 text-gray-900 border border-gray-300  bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 rounded-xl"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[7px] text-sm px-5 py-2.5 text-center w-max"
      >
        {isLoading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
};

export default AddQuote;
