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
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="quote"
        placeholder="Enter quote"
        value={quote}
        onChange={(e) => setQuote(e.target.value)}
        required
      />
      <input
        type="text"
        name="author"
        placeholder="Enter author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
};

export default AddQuote;
