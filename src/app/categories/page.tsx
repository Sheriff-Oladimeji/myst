import AllCategories from "@/components/AllCategories";
import React from "react";
const Categories = () => {
  return (
    <main className="container mx-auto px-4">
      <section className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">
          Discover All Quote Categories
        </h2>
        <div className="border-b border-gray-700"></div>
      </section>
      <AllCategories />
    </main>
  );
};

export default Categories;
