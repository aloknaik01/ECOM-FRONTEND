import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CategorySidebar from '../components/home/CategorySidebar';
import HeroSection from '../components/home/HeroSection';
import CategorySection from '../components/home/CategorySection';
import FlashSales from '../components/home/FlashSales';
import RecommendedSection from '../components/home/RecommendedSection';
import RecentlyViewedSection from '../components/home/RecentlyViewedSection';
import { productAPI } from '../utils/api';

const Home = () => {
  const [homeGardenProducts, setHomeGardenProducts] = useState([]);
  const [electronicsProducts, setElectronicsProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      try {
        const [homeGardenRes, electronicsRes, recommendedRes] = await Promise.all([
          productAPI.getByCategory('Home & Garden', 1),
          productAPI.getByCategory('Electronics', 1),
          productAPI.getFeatured()
        ]);

        setHomeGardenProducts(homeGardenRes.products?.slice(0, 8) || []);
        setElectronicsProducts(electronicsRes.products?.slice(0, 8) || []);
        setRecommendedProducts(recommendedRes.featuredProducts?.slice(0, 10) || []);
      } catch (error) {
        console.error('Failed to load home products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <CategorySidebar />
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-6">
            {/* Hero Section */}
            <HeroSection />

            {/* Flash Deals Section */}
            {!loading && <FlashSales />}

            {/* Home and Outdoor Items */}
            {!loading && homeGardenProducts.length > 0 && (
              <CategorySection
                title="Home & Garden"
                description="Explore our collection of home essentials"
                bgColor="bg-amber-50 dark:bg-amber-900/20"
                products={homeGardenProducts}
                image="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop"
              />
            )}

            {/* Consumer Electronics */}
            {!loading && electronicsProducts.length > 0 && (
              <CategorySection
                title="Consumer electronics and gadgets"
                description="Latest tech gadgets and electronics"
                bgColor="bg-blue-50 dark:bg-blue-900/20"
                products={electronicsProducts}
                image="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop"
              />
            )}

            {/* Recommended Items */}
            {!loading && recommendedProducts.length > 0 && (
              <RecommendedSection products={recommendedProducts} />
            )}

            {loading && (
              <div className="flex items-center justify-center p-12">
                <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {/* Recently Viewed Items */}
            {!loading && <RecentlyViewedSection />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;