import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  initializeCart
} from '../store/cartSlice';
import './CartDrawer.css';

const CartDrawer = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalPrice, message } = useSelector(state => state.cart);

  // Initialize cart on mount
  useEffect(() => {
    dispatch(initializeCart());
  }, [dispatch]);

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart({
      id: item.id,
      selectedSize: item.selectedSize,
      selectedColor: item.selectedColor
    }));
  };

  const handleIncrement = (item) => {
    dispatch(incrementQuantity({
      id: item.id,
      selectedSize: item.selectedSize,
      selectedColor: item.selectedColor
    }));
  };

  const handleDecrement = (item) => {
    dispatch(decrementQuantity({
      id: item.id,
      selectedSize: item.selectedSize,
      selectedColor: item.selectedColor
    }));
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout...');
    // Add your checkout logic here
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="cart-overlay" onClick={onClose}></div>}

      {/* Cart Drawer */}
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="cart-header">
          <div className="cart-header-content">
            <ShoppingBag size={24} />
            <h2>Shopping Cart ({totalQuantity})</h2>
          </div>
          <button className="cart-close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Message */}
        {message && (
          <div className="cart-message">
            {message}
          </div>
        )}

        {/* Cart Items */}
        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag size={64} />
              <p>Your cart is empty</p>
              <button className="continue-shopping-btn" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="cart-item">
                  {/* Item Image */}
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.title} />
                  </div>

                  {/* Item Details */}
                  <div className="cart-item-details">
                    <h3 className="cart-item-title">{item.title}</h3>
                    <div className="cart-item-meta">
                      <span>Size: {item.selectedSize}</span>
                      <span>Color: {item.selectedColor}</span>
                    </div>
                    <div className="cart-item-price">${item.price.toFixed(2)}</div>

                    {/* Quantity Controls */}
                    <div className="cart-item-quantity">
                      <button
                        className="quantity-btn"
                        onClick={() => handleDecrement(item)}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => handleIncrement(item)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    className="cart-item-remove"
                    onClick={() => handleRemoveItem(item)}
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal">
              <span>Subtotal:</span>
              <span className="cart-total-price">${totalPrice.toFixed(2)}</span>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
            <button className="clear-cart-btn" onClick={handleClearCart}>
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;