"use client";

import Link from "next/link";
import { Star, Heart, ArrowRightLeft, Eye, ShoppingCart, Zap, Gauge } from "lucide-react";
import styles from "./ProductCard.module.css";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  // Handle potential nested or differently named fields from the new data structure
  const displayImage = product.images?.[0] || product.image || "https://www.voromotors.com/cdn/shop/files/DSC06157_9cf3fa9c-a264-49fb-ad1e-6334bd3a239c.jpg";
  const displayTitle = product.premiumName || product.title;
  const displaySpeed = product.specs?.maxSpeed || product.speed;
  const displayRange = product.specs?.ridingRange || product.range;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: displayTitle,
      price: product.price,
      image: displayImage
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img 
          src={displayImage} 
          alt={displayTitle} 
          className={styles.productImage} 
        />
        
        <div className={styles.badges}>
          {product.discount > 0 && (
            <span className={`${styles.badge} ${styles.discountBadge}`}>
              -{product.discount}%
            </span>
          )}
          {product.inStock && (
            <span className={`${styles.badge} ${styles.stockBadge}`}>
              In Stock
            </span>
          )}
        </div>

        <div className={styles.actions}>
          <button className={styles.actionBtn} title="Quick View">
            <Eye size={18} />
          </button>
          <button className={styles.actionBtn} title="Add to Wishlist">
            <Heart size={18} />
          </button>
          <Link href="/compare" className={styles.actionBtn} title="Compare">
            <ArrowRightLeft size={18} />
          </Link>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.rating}>
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              className={styles.star} 
              fill={i < Math.floor(product.rating) ? "#ffb400" : "transparent"} 
              stroke={i < Math.floor(product.rating) ? "#ffb400" : "#555"}
            />
          ))}
          <span className={styles.ratingCount}>({product.reviews})</span>
        </div>

        <div className={styles.brand}>{product.brand}</div>
        <Link href={`/products/${product.id}`} className={styles.title}>
          {displayTitle}
        </Link>

        <div className={styles.features}>
          <div className={styles.feature}>
            <Gauge size={14} /> {displaySpeed}
          </div>
          <div className={styles.feature}>
            <Zap size={14} /> {displayRange}
          </div>
        </div>

        <div className={styles.priceContainer}>
          <div className={styles.priceWrapper}>
            {product.discount > 0 && (
              <span className={styles.oldPrice}>{(product.price / (1 - product.discount / 100)).toFixed(0)} MAD</span>
            )}
            <span className={styles.price}>{product.price.toLocaleString()} MAD</span>
          </div>
          <div className={styles.monthly}>
            from <span>{(product.price / 12).toFixed(0)} MAD</span>/mo
          </div>
        </div>

        <button className={styles.addToCartBtn} onClick={handleAddToCart}>
          <ShoppingCart size={18} /> Add to Cart
        </button>
      </div>
    </div>
  );
}
