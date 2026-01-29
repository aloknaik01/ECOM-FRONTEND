import { useState } from 'react';
import { useSelector } from 'react-redux';
import UpdateProfile from '../components/profile/UpdateProfile';
import UpdatePassword from '../components/profile/UpdatePassword';
import { User, Lock } from 'lucide-react';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          My Profile
        </h1>

        {/* Tabs Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg transition-colors duration-200">
          {/* Tab Headers */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 px-6 py-4 font-medium text-sm flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'profile'
                    ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                <User className="w-4 h-4" />
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`flex-1 px-6 py-4 font-medium text-sm flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'password'
                    ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                <Lock className="w-4 h-4" />
                Change Password
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'profile' ? (
              <UpdateProfile user={user} />
            ) : (
              <UpdatePassword />
            )}
          </div>
        </div>

        {/* Account Info Card */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors duration-200">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Account Information
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-400">Account Status</span>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">Active</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-400">Account Type</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{user?.role}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Member Since</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {new Date(user?.created_at).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;