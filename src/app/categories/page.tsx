import AllCategories from "@/components/AllCategories";
import React from "react";

const Categories = () => {
  return (
    <main>
      <section className="text-center">
        <h2 className="text-xl font-semibold text-white mb-2">
          Discover All Quote Categories
        </h2>
      
        <div className="border-b border-gray-700 mb-8"></div>
      </section>
      <AllCategories />
    </main>
  );
};

export default Categories;
