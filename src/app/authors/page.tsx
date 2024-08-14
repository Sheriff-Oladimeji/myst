import Authors from '@/components/Authors';
import React from 'react';


const AuthorsPage = () => {
  return (
    <main>
      <section className="text-center">
        <h2 className="text-xl font-semibold text-white mb-2">
          Discover All authors
        </h2>

        <div className="border-b border-gray-700 mb-8"></div>
      </section>
      <Authors />
    </main>
  );
};

export default AuthorsPage;
