import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItems, selectCartTotal, clearCart } from '../../../redux/slices/cartSlice';
import { useForm } from '../../../hooks/useForm';
import { validateCheckoutForm } from '../../../utils/validators';
import { Input } from '../../../components/common/Input';
import { Button } from '../../../components/common/Button';
import { Card, CardHeader, CardBody } from '../../../components/common/Card';
import { formatCurrency } from '../../../utils/formatters';
import toast from 'react-hot-toast';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const [isProcessing, setIsProcessing] = useState(false);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useForm(
    {
      fullName: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      country: '',
      pincode: '',
    },
    validateCheckoutForm
  );

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const shippingPrice = 10; // Fixed shipping
  const taxPrice = cartTotal * 0.1; // 10% tax
  const totalPrice = cartTotal + shippingPrice + taxPrice;

  const onSubmit = async (formValues) => {
    setIsProcessing(true);

    try {
      // Simulate order creation
      // Replace this with actual API call: await orderService.createOrder(orderData)
      
      const orderData = {
        shippingInfo: formValues,
        orderItems: cartItems.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
          image: item.images?.[0]?.url || '',
          title: item.name,
        })),
        total_price: totalPrice,
        tax_price: taxPrice,
        shipping_price: shippingPrice,
      };

      console.log('Order Data:', orderData);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Clear cart
      dispatch(clearCart());

      // Navigate to success page
      toast.success('Order placed successfully!');
      navigate('/order/success/ORDER-123'); // Replace with actual order ID from API

    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Shipping Information</h2>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  label="Full Name"
                  name="fullName"
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.fullName && errors.fullName}
                  placeholder="Enter your full name"
                />

                <Input
                  label="Phone Number"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phone && errors.phone}
                  placeholder="10-digit phone number"
                />

                <Input
                  label="Address"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.address && errors.address}
                  placeholder="Street address"
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="City"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.city && errors.city}
                    placeholder="City"
                  />

                  <Input
                    label="State"
                    name="state"
                    value={values.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.state && errors.state}
                    placeholder="State"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Country"
                    name="country"
                    value={values.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.country && errors.country}
                    placeholder="Country"
                  />

                  <Input
                    label="Pincode"
                    name="pincode"
                    value={values.pincode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.pincode && errors.pincode}
                    placeholder="6-digit pincode"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  isLoading={isProcessing}
                >
                  Place Order
                </Button>
              </form>
            </CardBody>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-bold">Order Summary</h3>
            </CardHeader>
            <CardBody>
              {/* Order Items */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.images?.[0]?.url || '/placeholder.png'}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{formatCurrency(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">{formatCurrency(shippingPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span className="font-semibold">{formatCurrency(taxPrice)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-primary-500">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;