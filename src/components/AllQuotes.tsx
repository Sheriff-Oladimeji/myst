import React from 'react'
import { Quote } from '@/types/quote'
import QuoteCard from './QuoteCard'


async function getData() {
  const res = await fetch('https://myst-api.onrender.com/api/v1/quotes')
  if (!res.ok) {
   
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
const AllQuotes = async () => {
     const quotes = await  getData()
  return (
    <section className='grid sm:grid-cols-2 md:grid-cols-3 gap-4 w-full'>
      {quotes.map((item: Quote)  => (
        <QuoteCard key={item._id} author={item.author} quote={item.quote} />
      ))}
   </section>
  )
}

export default AllQuotes