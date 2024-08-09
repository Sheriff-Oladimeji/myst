"use client";
import React, { FormEvent, useState, ChangeEvent } from "react";
  import { ToastContainer, toast } from "react-toastify";

  import "react-toastify/dist/ReactToastify.css";
const AddQuote = () => {
  const [quote, setQuote] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  
  const [category, setCategory] = useState<string>("");
  const [newCategory, setNewCategory] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const finalCategory = category === "new" ? newCategory : category;

      const data = {
        quote,
        author,
        category: finalCategory,
      };
      const res = await fetch("https://myst-api.onrender.com/api/v1/quotes", {
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
      toast("Quote added successfully")
    } catch (error: any) {
      console.error("Error details:", error);
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
          className="block w-full p-6 text-gray-900 border border-gray-300 bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 rounded-xl"
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
          className="block w-full p-3 text-gray-900 border border-gray-300 bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 rounded-xl"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
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
          className="block w-full p-3 text-gray-900 border border-gray-300 bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 rounded-xl"
          value={category}
          onChange={handleCategoryChange}
          required
        >
          <option value="">Select a category</option>
          {popularCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
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
            className="block w-full p-3 text-gray-900 border border-gray-300 bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 rounded-xl"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            required
          />
        </div>
      )}

    
      <button
        type="submit"
        disabled={isLoading}
        className={`text-white ${isLoading? "bg-blue-300":"bg-blue-700"} hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-[7px] text-sm px-6 py-2.5 text-center w-max `}
      >
        {isLoading ? "Loading..." : "Submit"}
      </button>
      <ToastContainer/>
    </form>
  );
};

export default AddQuote;
