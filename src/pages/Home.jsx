import { useSelector } from 'react-redux';

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-xl text-gray-600">
          This is your E-Commerce Dashboard
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-primary-600">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Total Orders
          </h3>
          <p className="text-3xl font-bold text-primary-600">0</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-green-600">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Total Spent
          </h3>
          <p className="text-3xl font-bold text-green-600">$0.00</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-orange-600">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Wishlist Items
          </h3>
          <p className="text-3xl font-bold text-orange-600">0</p>
        </div>
      </div>
    </div>
  );
};

export default Home;