import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Shirt,
  Smartphone,
  Flower2,
  Laptop,
  Home,
  Coffee,
  Gamepad2,
  Apple,
  Car,
  Bike,
  Dumbbell,
  BookOpen,
  Armchair
} from 'lucide-react';

const categories = [
  { name: 'For You', icon: Sparkles, category: 'featured' },
  { name: 'Fashion', icon: Shirt, category: 'Fashion' },
  { name: 'Mobiles', icon: Smartphone, category: 'Mobiles' },
  { name: 'Beauty', icon: Flower2, category: 'Beauty' },
  { name: 'Electronics', icon: Laptop, category: 'Electronics' },
  { name: 'Home', icon: Home, category: 'Home' },
  { name: 'Appliances', icon: Coffee, category: 'Appliances' },
  { name: 'Toys, Baby', icon: Gamepad2, category: 'Toys' },
  { name: 'Food & Health', icon: Apple, category: 'Health' },
  { name: 'Auto Acc', icon: Car, category: 'Automotive' },
  { name: '2 Wheelers', icon: Bike, category: 'Vehicles' },
  { name: 'Sports', icon: Dumbbell, category: 'Sports' },
  { name: 'Books', icon: BookOpen, category: 'Books' },
  { name: 'Furniture', icon: Armchair, category: 'Furniture' },
];

const CategoryBar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800 transition-colors duration-200 overflow-x-auto no-scrollbar py-3">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 sm:px-6 gap-5 min-w-max">
        {categories.map((item, index) => {
          const isFeatured = item.category === 'featured';

          return (
            <button
              key={index}
              onClick={() => navigate(isFeatured ? '/' : `/products?category=${encodeURIComponent(item.category)}`)}
              className="flex flex-col items-center gap-2 group cursor-pointer transition-all min-w-[72px]"
            >
              {/* Icon Container */}
              <div
                className={`w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all duration-300 ease-out group-hover:scale-110 group-active:scale-95 ${isFeatured
                    ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 shadow-sm border border-blue-100 dark:border-blue-900/50'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700/50 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:border-blue-100 dark:group-hover:border-blue-900/50 group-hover:shadow-sm'
                  }`}
              >
                <item.icon strokeWidth={1.5} className="w-[22px] h-[22px]" />
              </div>

              {/* Label */}
              <span
                className={`text-[12px] font-semibold tracking-wide transition-colors duration-200 whitespace-nowrap ${isFeatured
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                  }`}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryBar;
