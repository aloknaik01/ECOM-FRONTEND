import { useState, useEffect } from 'react';
import {
  Laptop,
  Shirt,
  Home,
  Book,
  Wrench,
  Bike,
  Dog,
  Baby,
  MoreHorizontal,
  ChevronRight,
  Package
} from 'lucide-react';
import { productAPI } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const CategorySidebar = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await productAPI.getCategories();
        setCategories(data.categories || []);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const getIcon = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('elect')) return Laptop;
    if (lowerName.includes('cloth') || lowerName.includes('wear') || lowerName.includes('fashion')) return Shirt;
    if (lowerName.includes('home') || lowerName.includes('garden')) return Home;
    if (lowerName.includes('book')) return Book;
    if (lowerName.includes('tool')) return Wrench;
    if (lowerName.includes('sport') || lowerName.includes('bike')) return Bike;
    if (lowerName.includes('pet') || lowerName.includes('animal')) return Dog;
    if (lowerName.includes('kid') || lowerName.includes('toy')) return Baby;
    return Package;
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 h-fit sticky top-4 animate-pulse">
        <div className="space-y-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-100 dark:bg-gray-700 rounded-lg w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 h-fit sticky top-4 transition-colors duration-200">
      <div className="space-y-1">
        {categories.length > 0 ? (
          categories.map((cat, index) => {
            const Icon = getIcon(cat.category);
            return (
              <button
                key={index}
                onClick={() => navigate(`/products?category=${encodeURIComponent(cat.category)}`)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors group"
              >
                <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                <span className="flex-1 text-left text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors font-medium text-sm">
                  {cat.category}
                </span>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-900 px-1.5 py-0.5 rounded-full">
                  {cat.product_count}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600 transition-colors" />
              </button>
            );
          })
        ) : (
          <p className="text-gray-500 text-sm text-center py-4">No categories found</p>
        )}

        <button 
          onClick={() => navigate('/products')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors group mt-2 border-t dark:border-gray-700 pt-4"
        >
          <MoreHorizontal className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
          <span className="flex-1 text-left text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors font-medium">
            Explore All
          </span>
        </button>
      </div>
    </div>
  );
};

export default CategorySidebar;