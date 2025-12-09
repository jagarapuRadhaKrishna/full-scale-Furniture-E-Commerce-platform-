import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';

interface ProductSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function ProductSearch({
  onSearch,
  placeholder = "Search for furniture by name, model, or category...",
}: ProductSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Debounce the search callback to prevent too many searches while typing
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      onSearch(query);
    }, 300),
    [onSearch]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
    // Cleanup function to cancel debounced calls
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  // Predefined quick filters based on our catalog
  const quickFilters = [
    "Living Room",
    "Bedroom",
    "Dining",
    "Office",
    "Kids",
    "Outdoor"
  ];

  return (
    <div className="w-full space-y-4">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-10 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        {quickFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSearchTerm(filter)}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Model Code Search Hint */}
      <div className="text-xs text-gray-500">
        Tip: You can search by model codes (e.g., DFW-LS-001, DFW-KB-001) for exact matches
      </div>
    </div>
  );
}