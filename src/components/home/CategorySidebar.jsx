import { useState } from 'react';
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
} from 'lucide-react';

const CategorySidebar = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const categories = [
    { id: 1, name: 'Electronics', icon: Laptop, subCount: 156 },
    { id: 2, name: 'Clothes and wear', icon: Shirt, subCount: 243 },
    { id: 3, name: 'Home interiors', icon: Home, subCount: 98 },
    { id: 4, name: 'Books & magazines', icon: Book, subCount: 312 },
    { id: 5, name: 'Tools, equipments', icon: Wrench, subCount: 87 },
    { id: 6, name: 'Sports and outdoor', icon: Bike, subCount: 134 },
    { id: 7, name: 'Animal and pets', icon: Dog, subCount: 67 },
    { id: 8, name: 'Toys for Kids', icon: Baby, subCount: 189 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 h-fit sticky top-4">
      <div className="space-y-1">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary-50 transition-colors group"
            >
              <Icon className="w-5 h-5 text-gray-600 group-hover:text-primary-600 transition-colors" />
              <span className="flex-1 text-left text-gray-700 group-hover:text-primary-600 transition-colors font-medium">
                {category.name}
              </span>
              <span className="text-xs text-gray-400">{category.subCount}</span>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600 transition-colors" />
            </button>
          );
        })}

        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary-50 transition-colors group mt-2 border-t pt-4">
          <MoreHorizontal className="w-5 h-5 text-gray-600 group-hover:text-primary-600 transition-colors" />
          <span className="flex-1 text-left text-gray-700 group-hover:text-primary-600 transition-colors font-medium">
            More category
          </span>
        </button>
      </div>
    </div>
  );
};

export default CategorySidebar;