import { Link, useParams } from 'react-router-dom';
import { Button } from '../../../components/common/Button';
import { Card, CardBody } from '../../../components/common/Card';
import { CheckCircle, Package, Home } from 'lucide-react';

const OrderSuccess = () => {
  const { orderId } = useParams();

  return (
    <div className="container-custom py-16">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardBody className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>

            <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
            <p className="text-gray-600 mb-2">Thank you for your purchase</p>
            <p className="text-lg font-semibold text-primary-500 mb-8">
              Order ID: {orderId}
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <p className="text-gray-700 mb-4">
                We've sent a confirmation email with your order details.
              </p>
              <p className="text-gray-700">
                You can track your order status from your dashboard.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/orders">
                <Button size="lg">
                  <Package className="w-5 h-5 mr-2" />
                  View My Orders
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" size="lg">
                  <Home className="w-5 h-5 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default OrderSuccess;