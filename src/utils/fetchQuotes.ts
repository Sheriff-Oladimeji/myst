import { Quote } from "@/types/quote";

export async function fetchQuotes(page: number): Promise<Quote[]> {
  const res = await fetch(
    `https://myst-api.onrender.com/api/v1/quotes?page=${page}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data.map((item: { _id: string; author: string; quote: string }) => ({
    id: item._id,
    author: item.author,
    quote: item.quote,
  }));
}