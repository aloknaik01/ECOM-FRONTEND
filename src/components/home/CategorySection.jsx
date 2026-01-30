import { ChevronRight } from 'lucide-react';
import ProductCard from '../products/ProductCard';

const CategorySection = ({ title, description, bgColor, products, image }) => {
  return (
    <div className={`${bgColor} rounded-lg shadow-sm overflow-hidden`}>
      <div className="flex">
        {/* Left side - Category Info */}
        <div className="w-1/4 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm mb-4">{description}</p>
          </div>
          <button className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold group">
            Explore all
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          {image && (
            <img
              src={image}
              alt={title}
              className="mt-4 rounded-lg object-cover h-32 w-full"
            />
          )}
        </div>

        {/* Right side - Products Grid */}
        <div className="flex-1 p-6 bg-white rounded-l-lg">
          <div className="grid grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product.id} className="flex flex-col">
                <div className="bg-gray-50 rounded-lg p-4 mb-3 aspect-square flex items-center justify-center overflow-hidden group cursor-pointer">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div>
                  <p className="text-gray-700 text-sm mb-1 line-clamp-2">
                    {product.name}
                  </p>
                  <p className="text-gray-500 text-xs mb-1">From</p>
                  <p className="text-gray-900 font-bold">
                    USD {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;