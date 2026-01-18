import { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Loader } from '../../components/common/Loader';
import { Search, User as UserIcon } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // TODO: Replace with actual API call
    // const fetchUsers = async () => {
    //   try {
    //     const response = await adminService.getAllUsers();
    //     setUsers(response.users);
    //   } catch (error) {
    //     console.error(error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchUsers();

    // Mock data
    setTimeout(() => {
      setUsers([
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'User',
          created_at: '2024-01-10T08:30:00Z',
          orders_count: 5,
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'User',
          created_at: '2024-01-12T10:15:00Z',
          orders_count: 3,
        },
        {
          id: '3',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'Admin',
          created_at: '2024-01-01T00:00:00Z',
          orders_count: 0,
        },
        {
          id: '4',
          name: 'Bob Johnson',
          email: 'bob@example.com',
          role: 'User',
          created_at: '2024-01-15T14:20:00Z',
          orders_count: 8,
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <Loader fullScreen />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Users Management</h1>

      <Card>
        <CardHeader>
          <div className="relative">
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-96 px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </CardHeader>

        <CardBody>
          {filteredUsers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">User</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Role</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Joined Date
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Total Orders
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <UserIcon className="w-5 h-5 text-primary-500" />
                          </div>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{user.email}</td>
                      <td className="px-4 py-3">
                        <Badge variant={user.role === 'Admin' ? 'info' : 'default'}>
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {formatDate(user.created_at)}
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-semibold">{user.orders_count}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No users found</p>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card>
          <CardBody>
            <div className="text-center">
              <p className="text-gray-600 mb-1">Total Users</p>
              <p className="text-3xl font-bold text-primary-500">{users.length}</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="text-center">
              <p className="text-gray-600 mb-1">Admin Users</p>
              <p className="text-3xl font-bold text-primary-500">
                {users.filter(u => u.role === 'Admin').length}
              </p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="text-center">
              <p className="text-gray-600 mb-1">Regular Users</p>
              <p className="text-3xl font-bold text-primary-500">
                {users.filter(u => u.role === 'User').length}
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AdminUsers;