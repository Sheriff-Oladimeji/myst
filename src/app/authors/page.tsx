import Authors from '@/components/Authors';
import React from 'react';


const AuthorsPage = () => {
  return (
    <main className="container mx-auto px-4">
      <section className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">
          Discover All Authors
        </h2>
        <div className="border-b border-gray-700"></div>
      </section>
      <Authors />
    </main>
  );
};

export default AuthorsPage;
