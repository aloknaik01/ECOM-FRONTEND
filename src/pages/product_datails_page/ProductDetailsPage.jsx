import React, { useEffect, useState } from 'react';
import "./ProductDetailsPage.css";
import { useParams } from 'react-router';
import RelatedProducts from '../../components/related_products/RelatedProducts';

const ProductPage = () => {
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('black');
  const [quantity, setQuantity] = useState(1);
  const [productData, setProductData] = useState({});

  let { productId } = useParams();
  console.log(productId)

  useEffect(() => {
    fetchProductData();
    //product details data api calling
    async function fetchProductData() {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const data = await res.json();
        setProductData(data);
      } catch (error) {
        console.log("Some thing went wrong!");
      }
    }
  }, [])

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const colors = [
    { name: 'black', code: '#000000' },
    { name: 'white', code: '#ffffff' },
    { name: 'pink', code: '#ffc1cc' }
  ];

  const productImages = [
    'https://i.imgur.com/eGOUveI.jpeg', // Main product image
    'https://i.imgur.com/eGOUveI.jpeg', // Black variant
    'https://i.imgur.com/eGOUveI.jpeg'  // Pink variant
  ];

  return (
    <div className="product-page">
      <div className="container">
        <div className="product-container">

          {/* Product Images Section */}
          <div className="product-images">
            <div className="main-image">
              <img
                src={productData?.image}
                alt={productData?.title}
                className="main-product-image"
              />
            </div>
            <div className="thumbnail-images">
              {productData?.images?.slice(1).map((image, index) => (
                <div key={index} className="thumbnail">
                  <img
                    src={image}
                    alt={`Product variant ${index + 1}`}
                    className="thumbnail-image"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="product-details">
            <div className="product-header">
              <span className="product-category">{productData?.category}</span>
              <h1 className="product-title">{productData?.title}</h1>
              <div className="product-price">
                <span className="price-current">{productData?.price.toFixed(1)}$ </span>
                <span className="price-original">{productData?.price.toFixed(1) + 20} $</span>
                <span className="price-shipping">+ Free Shipping</span>
              </div>
            </div>

            <div className="product-description">
              <p>
                {productData?.description
                }
              </p>
            </div>

            {/* Color Selection */}
            <div className="product-options">
              <div className="color-selection">
                <label className="option-label">Color:</label>
                <div className="color-options">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      className={`color-option ${selectedColor === color.name ? 'selected' : ''}`}
                      style={{ backgroundColor: color.code }}
                      onClick={() => setSelectedColor(color.name)}
                      aria-label={`Select ${color.name} color`}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="size-selection">
                <label className="option-label">Size:</label>
                <div className="size-options">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="purchase-section">
              <div className="quantity-selector">
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="quantity-display">{quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <button className="add-to-cart-btn">
                Add to cart
              </button>
            </div>

            {/* Product Meta */}
            <div className="product-meta">
              <p><strong>SKU:</strong> N/A</p>
              <p><strong>Category:</strong> {productData?.category}</p>
            </div>

            {/* Expandable Sections */}
            <div className="expandable-sections">
              <details className="expandable-section">
                <summary className="section-header">Description</summary>
                <div className="section-content">
                  <p>{productData?.description}</p>
                </div>
              </details>

              <details className="expandable-section">
                <summary className="section-header">Additional Information</summary>
                <div className="section-content">
                  <p>Care instructions, material details, etc.</p>
                </div>
              </details>

              <details className="expandable-section">
                <summary className="section-header">Reviews (0)</summary>
                <div className="section-content">
                  <p>No reviews yet.</p>
                </div>
              </details>
            </div>
          </div>


        </div>
      </div>

      <RelatedProducts id={productId} />

    </div>
  );
};

export default ProductPage;
