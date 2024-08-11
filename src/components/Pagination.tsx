import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(currentPage + 1, totalPages - 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <nav className="flex justify-center my-4">
      <ul className="inline-flex items-center">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-8 w-8 flex items-center justify-center text-white border border-gray-600 bg-transparent hover:bg-gray-700 disabled:bg-gray-800 disabled:cursor-not-allowed rounded-l-md"
          >
            &lt;
          </button>
        </li>
        {getPageNumbers().map((number, index) => (
          <li key={index}>
            {number === "..." ? (
              <span className="h-8 w-8 flex items-center justify-center text-white border border-gray-600 bg-transparent">
                ...
              </span>
            ) : (
              <button
                onClick={() => onPageChange(number as number)}
                className={`h-8 w-8 flex items-center justify-center ${
                  currentPage === number
                    ? "text-white bg-blue-600 border-blue-600"
                    : "text-white border border-gray-600 bg-transparent hover:bg-gray-700"
                }`}
              >
                {number}
              </button>
            )}
          </li>
        ))}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-8 w-8 flex items-center justify-center text-white border border-gray-600 bg-transparent hover:bg-gray-700 disabled:bg-gray-800 disabled:cursor-not-allowed rounded-r-md"
          >
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
