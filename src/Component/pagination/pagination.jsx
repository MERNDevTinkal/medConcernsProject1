import React from "react";

const Pagination = ({
  selectedLanguage,
  currentPage,
  lastPage,
  setCurrentPage,
}) => {
  if (lastPage <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    if (lastPage <= 7) {
      for (let i = 1; i <= lastPage; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", lastPage);
      } else if (currentPage >= lastPage - 3) {
        pages.push(
          1,
          "...",
          lastPage - 4,
          lastPage - 3,
          lastPage - 2,
          lastPage - 1,
          lastPage
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          lastPage
        );
      }
    }
    return pages;
  };
  const handlePageClick = (page) => {
    if (page === "...") return;
    setCurrentPage(page);
  };
  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center z-10">
      <div className="flex space-x-2 bg-white px-4 py-2 border rounded shadow-md">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 border rounded ${
            currentPage === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          {selectedLanguage === "Spanish" ? "Anterior" : "Prev"}
        </button>

        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(page)}
            className={`px-3 py-1 border rounded ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : page === "..."
                ? "cursor-default text-gray-400 border-none"
                : "bg-white hover:bg-gray-100"
            }`}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, lastPage))}
          disabled={currentPage === lastPage}
          className={`px-3 py-1 border rounded ${
            currentPage === lastPage
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          {selectedLanguage === "Spanish" ? "Próximo" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
