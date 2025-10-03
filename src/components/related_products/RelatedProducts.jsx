import React from "react";
import ProductCard from "../product_card/ProductCard.jsx";
import "./RelatedProducts.css";

const RelatedProducts = ({ products, onAddToCart, onQuickView }) => (
    <section className="related-products-section">
        <div className="container">
            <h2 className="related-products-title">Related products</h2>
            <div className="related-products-grid">
                {products.map(product => (
                    <>
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            image={product.images?.[0] || product.image}
                            title={product.title}
                            price={product.price}
                            badge={product.category.name}
                            onAddToCart={onAddToCart}
                            onQuickView={onQuickView}
                        />
                    </>
                ))}
            </div>
        </div>
    </section>
);

export default RelatedProducts;
