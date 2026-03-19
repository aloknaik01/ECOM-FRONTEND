import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../products/ProductCard';

const CategorySection = ({ title, description, bgColor, products, image }) => {
  return (
    <div className={`${bgColor} rounded-lg shadow-sm overflow-hidden`}>
      <div className="flex flex-col lg:flex-row">
        {/* Left side - Category Info */}
        <div className="w-full lg:w-1/4 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{description}</p>
          </div>
          <button className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 font-semibold group w-max">
            Explore all
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          {image && (
            <img
              src={image}
              alt={title}
              className="mt-4 rounded-lg object-cover h-32 lg:h-40 w-full"
            />
          )}
        </div>

        {/* Right side - Products Grid */}
        <div className="flex-1 p-4 lg:p-6 bg-white dark:bg-gray-800 lg:rounded-l-lg lg:rounded-tr-none rounded-b-lg lg:rounded-b-none">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="flex flex-col">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-3 aspect-square flex items-center justify-center overflow-hidden group cursor-pointer">
                  <img
                    src={product.image || product.images?.[0]?.url || '/placeholder.png'}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div>
                  <p className="text-gray-700 dark:text-gray-200 text-sm mb-1 line-clamp-2 title-font group-hover:text-primary-600 dark:group-hover:text-primary-400">
                    {product.name}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">From</p>
                  <p className="text-gray-900 dark:text-white font-bold">
                    ${Number(product.price).toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;