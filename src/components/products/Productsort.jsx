import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const ProductSort = ({ sortBy, sortOrder, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { label: 'Newest First', sortBy: 'created_at', sortOrder: 'desc' },
    { label: 'Oldest First', sortBy: 'created_at', sortOrder: 'asc' },
    { label: 'Price: Low to High', sortBy: 'price', sortOrder: 'asc' },
    { label: 'Price: High to Low', sortBy: 'price', sortOrder: 'desc' },
    { label: 'Name: A to Z', sortBy: 'name', sortOrder: 'asc' },
    { label: 'Name: Z to A', sortBy: 'name', sortOrder: 'desc' },
    { label: 'Rating: High to Low', sortBy: 'ratings', sortOrder: 'desc' },
    { label: 'Rating: Low to High', sortBy: 'ratings', sortOrder: 'asc' },
  ];

  const currentOption = sortOptions.find(
    (opt) => opt.sortBy === sortBy && opt.sortOrder === sortOrder
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onSortChange(option.sortBy, option.sortOrder);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        <span>Sort by: {currentOption?.label || 'Newest First'}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 py-2">
          {sortOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(option)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                option.sortBy === sortBy && option.sortOrder === sortOrder
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSort;