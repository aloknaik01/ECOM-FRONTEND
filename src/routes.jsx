import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './components/features/auth/ProtectedRoute';

// Layouts
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/layout/AdminLayout';

// Public Pages
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import ForgotPassword from './pages/public/ForgotPassword';
import ResetPassword from './pages/public/ResetPassword';

// User Pages
import Dashboard from './pages/public/user/Dashboard';
import Profile from './pages/public/user/Profile';
import ChangePassword from './pages/public/user/ChangePassword';
import Orders from './pages/public/user/Orders';
import OrderDetails from './pages/public/user/OrderDetails';

// Product Pages
import ProductList from './pages/public/products/ProductList';
import ProductDetail from './pages/public/products/ProductDetail';

// Cart Pages
import Cart from './pages/public/cart/Cart';
import Checkout from './pages/public/cart/Checkout';
import OrderSuccess from './pages/public/cart/OrderSuccess';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';
import AdminOrders from './pages/admin/Orders';
import AdminOrderDetails from './pages/admin/OrderDetails';
import AdminUsers from './pages/admin/Users';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      // Public routes
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'password/reset/:token', element: <ResetPassword /> },

      // Product routes
      { path: 'products', element: <ProductList /> },
      { path: 'product/:id', element: <ProductDetail /> },

      // Cart routes
      { path: 'cart', element: <Cart /> },
      {
        path: 'checkout',
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: 'order/success/:orderId',
        element: (
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        ),
      },

      // User routes
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile/change-password',
        element: (
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        ),
      },
      {
        path: 'orders',
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: 'order/:id',
        element: (
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // Admin routes
  {
    path: '/admin',
    element: (
      <ProtectedRoute adminOnly>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'products', element: <AdminProducts /> },
      { path: 'product/add', element: <AddProduct /> },
      { path: 'product/edit/:id', element: <EditProduct /> },
      { path: 'orders', element: <AdminOrders /> },
      { path: 'order/:id', element: <AdminOrderDetails /> },
      { path: 'users', element: <AdminUsers /> },
    ],
  },
]);