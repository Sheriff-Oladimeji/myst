import Image from "next/image";

interface Quote {
  _id: string;
  quote: string;
  author: string;
}

async function getData() {
  const res = await fetch('https://myst-api.onrender.com/api/v1/quotes')
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default  async function Home() {
    const quotes = await  getData()

  return (
    <main className="w-[90%] mx-auto pt-24 grid md:grid-cols-3 gap-4">
     {quotes.map((data: Quote) => (
       <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" key={data._id}> 
       <p>{data.quote}</p>   
       <p>{data.author}</p>
      </div>
     ))}
    </main>
  );
}
