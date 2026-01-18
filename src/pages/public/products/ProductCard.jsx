import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/slices/cartSlice';
import { Card, CardBody, CardFooter } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { Badge } from '../../../components/common/Badge';
import { ShoppingCart, Star } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';
import { getStockStatus } from '../../../utils/helpers';

export const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { id, name, price, images, stock, ratings } = product;
  const stockStatus = getStockStatus(stock);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (stock > 0) {
      dispatch(addToCart(product));
    }
  };

  return (
    <Link to={`/product/${id}`}>
      <Card className="h-full hover:shadow-xl transition-all duration-300 group">
        <div className="aspect-square overflow-hidden">
          <img
            src={images?.[0]?.url || '/placeholder.png'}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        <CardBody className="space-y-3">
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary-500 transition-colors">
            {name}
          </h3>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary-500">
              {formatCurrency(price)}
            </span>
            <Badge variant={stockStatus.variant}>{stockStatus.text}</Badge>
          </div>

          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            <span className="text-sm font-medium">{ratings || 0}</span>
          </div>
        </CardBody>

        <CardFooter>
          <Button
            className="w-full"
            onClick={handleAddToCart}
            disabled={stock <= 0}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};