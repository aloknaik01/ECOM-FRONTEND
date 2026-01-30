import CategorySidebar from '../components/home/CategorySidebar';
import HeroSection from '../components/home/HeroSection';
import DealsSection from '../components/home/DealsSection';
import CategorySection from '../components/home/CategorySection';
import RecommendedSection from '../components/home/RecommendedSection';

const Home = () => {
  // Home and outdoor items data
  const homeOutdoorProducts = [
    {
      id: 1,
      name: 'The Product name',
      price: '25',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
    },
    {
      id: 2,
      name: 'The Product name',
      price: '25',
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&h=300&fit=crop',
    },
    {
      id: 3,
      name: 'The Product name',
      price: '25',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    },
    {
      id: 4,
      name: 'The Product name',
      price: '980',
      image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&h=300&fit=crop',
    },
    {
      id: 5,
      name: 'The Product name',
      price: '25',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop',
    },
    {
      id: 6,
      name: 'The Product name',
      price: '25',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop',
    },
    {
      id: 7,
      name: 'The Product name',
      price: '125',
      image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=300&h=300&fit=crop',
    },
    {
      id: 8,
      name: 'The Product name',
      price: '99',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    },
  ];

  // Consumer electronics data
  const electronicsProducts = [
    {
      id: 1,
      name: 'The Product name',
      price: '25',
      image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&h=300&fit=crop',
    },
    {
      id: 2,
      name: 'The Product name',
      price: '25',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    },
    {
      id: 3,
      name: 'The Product name',
      price: '25',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    },
    {
      id: 4,
      name: 'The Product name',
      price: '980',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop',
    },
    {
      id: 5,
      name: 'The Product name',
      price: '25',
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=300&fit=crop',
    },
    {
      id: 6,
      name: 'The Product name',
      price: '25',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop',
    },
    {
      id: 7,
      name: 'The Product name',
      price: '125',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
    },
    {
      id: 8,
      name: 'The Product name',
      price: '99',
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&h=300&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <CategorySidebar />
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-6">
            {/* Hero Section */}
            <HeroSection />

            {/* Deals and Offers */}
            <DealsSection />

            {/* Home and Outdoor Items */}
            <CategorySection
              title="Home and outdoor items"
              description="Explore our collection of home essentials"
              bgColor="bg-amber-50"
              products={homeOutdoorProducts}
              image="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop"
            />

            {/* Consumer Electronics */}
            <CategorySection
              title="Consumer electronics and gadgets"
              description="Latest tech gadgets and electronics"
              bgColor="bg-blue-50"
              products={electronicsProducts}
              image="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop"
            />

            {/* Recommended Items */}
            <RecommendedSection />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;