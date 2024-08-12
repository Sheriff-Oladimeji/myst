import AllCategories from "@/components/AllCategories";
import React from "react";

const Categories = () => {
  return (
    <main >
      <section className="text-center">
        <h2 className="text-xl font-semibold text-white">
          Discover All Quote Categories
        </h2>
        <p className="text-base text-gray-400 mb-2">
          Dive into a curated selection of quotes that uplift, inspire, and
          empower.
        </p>
        <div className="border-b border-gray-700 mb-8"></div>
      </section>
      <AllCategories />
    </main>
  );
};

export default Categories;
