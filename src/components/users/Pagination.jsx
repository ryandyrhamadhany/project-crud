import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const Pagination = ({ currentPage, totalPages, handlePageChange }) => (
  <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
    <div className="text-sm text-gray-700">
      Showing <span className="font-medium">{currentPage * 8 - 7}</span> to{" "}
      <span className="font-medium">{Math.min(currentPage * 8, totalPages)}</span> of{" "}
      <span className="font-medium">{totalPages}</span> results
    </div>
    <div className="flex items-center space-x-2">
      <button
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`p-2 rounded-md border ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-50"
        }`}
      >
        <FaChevronLeft size={14} />
      </button>
      <div className="flex space-x-1">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }
          return (
            <button
              key={i}
              onClick={() => handlePageChange(pageNum)}
              className={`w-8 h-8 flex items-center justify-center rounded-md ${
                currentPage === pageNum
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 border"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-md border ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-50"
        }`}
      >
        <FaChevronRight size={14} />
      </button>
    </div>
  </div>
);