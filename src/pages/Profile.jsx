import { useState } from 'react';
import { useSelector } from 'react-redux';
import UpdateProfile from '../components/profile/UpdateProfile';
import UpdatePassword from '../components/profile/UpdatePassword';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="border-b">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'profile'
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Profile Information
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'password'
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Change Password
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'profile' ? (
            <UpdateProfile user={user} />
          ) : (
            <UpdatePassword />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;