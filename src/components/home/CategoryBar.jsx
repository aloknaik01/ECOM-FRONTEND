import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Shirt,
  Smartphone,
  Laptop,
  Home,
  Tv,
  Baby,
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
  { name: 'Beauty', icon: Sparkles, category: 'Beauty' },
  { name: 'Electronics', icon: Laptop, category: 'Electronics' },
  { name: 'Home', icon: Home, category: 'Home' },
  { name: 'Appliances', icon: Tv, category: 'Appliances' },
  { name: 'Toys, Baby', icon: Baby, category: 'Toys' },
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
    <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 transition-colors duration-200 overflow-x-auto no-scrollbar py-2">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 sm:px-6 py-2 gap-4 min-w-max">
        {categories.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              if (item.category === 'featured') {
                navigate('/');
              } else {
                navigate(`/products?category=${encodeURIComponent(item.category)}`);
              }
            }}
            className="flex flex-col items-center gap-1.5 group cursor-pointer transition-all duration-200 min-w-[80px]"
          >
            <div className={`p-2 rounded-xl transition-all duration-200 ${
              item.name === 'For You' 
                ? 'bg-blue-50 dark:bg-blue-900/30' 
                : 'bg-transparent hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}>
              <item.icon className={`w-8 h-8 transition-colors duration-200 ${
                item.name === 'For You'
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400'
              }`} />
            </div>
            <span className={`text-[13px] font-bold tracking-tight transition-colors duration-200 whitespace-nowrap ${
              item.name === 'For You'
                ? 'text-black dark:text-white'
                : 'text-gray-800 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400'
            }`}>
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
