export const APP_NAME = 'ShopSphere';

export const ORDER_STATUS = {
  PROCESSING: 'Processing',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
};

export const ORDER_STATUS_COLORS = {
  Processing: 'info',
  Shipped: 'warning',
  Delivered: 'success',
  Cancelled: 'danger',
};

export const PAYMENT_STATUS = {
  PAID: 'Paid',
  PENDING: 'Pending',
  FAILED: 'Failed',
};

export const PRODUCT_CATEGORIES = [
  { value: '', label: 'All Categories' },
  { value: 'Electronics', label: 'Electronics' },
  { value: 'Fashion', label: 'Fashion' },
  { value: 'Home & Kitchen', label: 'Home & Kitchen' },
  { value: 'Books', label: 'Books' },
  { value: 'Sports', label: 'Sports' },
  { value: 'Toys', label: 'Toys' },
  { value: 'Beauty', label: 'Beauty' },
  { value: 'Grocery', label: 'Grocery' },
];

export const AVAILABILITY_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'in-stock', label: 'In Stock' },
  { value: 'limited', label: 'Limited Stock' },
  { value: 'out-of-stock', label: 'Out of Stock' },
];

export const PRICE_RANGES = [
  { value: '', label: 'All Prices' },
  { value: '0-50', label: 'Under $50' },
  { value: '50-100', label: '$50 - $100' },
  { value: '100-200', label: '$100 - $200' },
  { value: '200-500', label: '$200 - $500' },
  { value: '500-1000', label: '$500 - $1000' },
  { value: '1000-', label: 'Above $1000' },
];

export const RATING_OPTIONS = [
  { value: '', label: 'All Ratings' },
  { value: '4', label: '4★ & above' },
  { value: '3', label: '3★ & above' },
  { value: '2', label: '2★ & above' },
  { value: '1', label: '1★ & above' },
];

export const ITEMS_PER_PAGE = 12;

export const USER_ROLES = {
  USER: 'User',
  ADMIN: 'Admin',
};