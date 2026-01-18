import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { User, ShoppingBag, Settings, Lock } from 'lucide-react';
import { formatDate } from '../../../utils/formatters';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const quickLinks = [
    {
      title: 'My Orders',
      description: 'View and track your orders',
      icon: ShoppingBag,
      link: '/orders',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Profile Settings',
      description: 'Update your profile information',
      icon: User,
      link: '/profile',
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Change Password',
      description: 'Update your password',
      icon: Lock,
      link: '/profile/change-password',
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Welcome Card */}
      <Card className="mb-8">
        <CardBody>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-primary-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Welcome back, {user?.name}!</h2>
              <p className="text-gray-600">
                Member since {formatDate(user?.created_at, 'MMMM yyyy')}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickLinks.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link key={index} to={item.link}>
              <Card className="h-full hover:shadow-xl transition-shadow cursor-pointer">
                <CardBody>
                  <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardBody>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Account Info */}
      <Card className="mt-8">
        <CardHeader>
          <h3 className="text-xl font-bold">Account Information</h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-600">Name</label>
              <p className="font-semibold">{user?.name}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <p className="font-semibold">{user?.email}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Role</label>
              <p className="font-semibold">{user?.role}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Account Created</label>
              <p className="font-semibold">{formatDate(user?.created_at)}</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Dashboard;