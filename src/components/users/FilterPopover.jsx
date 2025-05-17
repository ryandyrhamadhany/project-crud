import React from "react";
import { FaTimes } from "react-icons/fa";

export const FilterPopover = ({ 
  isOpen, 
  onClose, 
  filters, 
  activeFilters, 
  setActiveFilters,
  resetFilters 
}) => {
  if (!isOpen) return null;

  const handleFilterChange = (category, value) => {
    setActiveFilters(prev => {
      // If the value is already selected, remove it
      if (prev[category]?.includes(value)) {
        return {
          ...prev,
          [category]: prev[category].filter(item => item !== value)
        };
      } 
      // Otherwise add it
      return {
        ...prev,
        [category]: [...(prev[category] || []), value]
      };
    });
  };

  return (
    <div className="absolute right-0 top-12 z-10 bg-white rounded-lg shadow-lg border border-gray-200 w-72 p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-gray-800">Filters</h3>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={16} />
        </button>
      </div>
      
      {filters.map((filter) => (
        <div key={filter.name} className="mb-4">
          <h4 className="font-medium text-gray-700 mb-2">{filter.name}</h4>
          <div className="flex flex-wrap gap-2">
            {filter.options.map((option) => (
              <button
                key={option}
                onClick={() => handleFilterChange(filter.name.toLowerCase(), option)}
                className={`px-3 py-1 rounded-full text-sm ${
                  activeFilters[filter.name.toLowerCase()]?.includes(option)
                    ? 'bg-blue-100 text-blue-800 border border-blue-300'
                    : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
      
      {Object.values(activeFilters).some(arr => arr.length > 0) && (
        <button
          onClick={resetFilters}
          className="w-full py-2 mt-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm"
        >
          Reset All Filters
        </button>
      )}
    </div>
  );
};