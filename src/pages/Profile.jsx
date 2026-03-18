import { useState } from 'react';
import { useSelector } from 'react-redux';
import UpdateProfile from '../components/profile/UpdateProfile';
import UpdatePassword from '../components/profile/UpdatePassword';
import { User, Lock } from 'lucide-react';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/slices/authSlice';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('profile');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user) {
    const handleLoginClick = async () => {
      await dispatch(logoutUser());
      navigate('/login');
    };
    
    const handleRegisterClick = async () => {
      await dispatch(logoutUser());
      navigate('/register');
    };

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Authentication Issue
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Your session appears to be invalid or expired. Please log in again to view your profile.
          </p>
          <div className="space-y-4">
            <button onClick={handleLoginClick} className="block w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
              Log In to Your Account
            </button>
            <button onClick={handleRegisterClick} className="block w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
              Create New Account
            </button>
          </div>
        </div>
      </div>
    );
  }

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