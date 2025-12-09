import React from 'react';

interface CategoryNavProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryNav({
  selectedCategory,
  onCategoryChange,
}: CategoryNavProps) {
  const categories = [
    { id: 'all', name: 'All Categories', icon: '🏠' },
    { id: 'Living Room', name: 'Living Room', icon: '🛋️' },
    { id: 'Bedroom', name: 'Bedroom', icon: '🛏️' },
    { id: 'Dining', name: 'Dining', icon: '🍽️' },
    { id: 'Office', name: 'Office', icon: '💼' },
    { id: 'Kids', name: 'Kids', icon: '🧸' },
    { id: 'Outdoor', name: 'Outdoor', icon: '🌳' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === category.id
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span className="text-lg">{category.icon}</span>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
}