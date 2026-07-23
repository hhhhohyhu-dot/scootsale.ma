"use client";

import { motion } from "framer-motion";
import styles from "./Compare.module.css";
import Link from "next/link";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ComparePage() {
  const { addToCart } = useCart();
  
  // Pick the first 3 premium scooters to compare for now
  const compareProducts = products.slice(0, 3);

  return (
    <main>
      <header className={styles.pageHeader}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.title}
          >
            Compare Models
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={styles.description}
          >
            Find the perfect match for your needs by comparing specifications side by side.
          </motion.p>
        </div>
      </header>

      <section className={styles.content}>
        <div className="container">
          <table className={styles.compareTable}>
            <thead>
              <tr>
                <th className={styles.featureCol}>Features</th>
                {compareProducts.map(p => (
                  <th key={p.id} className={styles.productHeader}>
                    <img src={p.images[0]} alt={p.premiumName} className={styles.productImg} />
                    <div className={styles.productTitle}>{p.model}</div>
                    <div className={styles.productPrice}>{p.price.toLocaleString()} MAD</div>
                    <button 
                      className={styles.addToCartBtn}
                      onClick={() => addToCart({
                        id: p.id,
                        title: p.premiumName,
                        price: p.price,
                        image: p.images[0]
                      })}
                    >
                      Add to Cart
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.featureCol}>Top Speed</td>
                {compareProducts.map(p => <td key={p.id}>{p.specs.maxSpeed}</td>)}
              </tr>
              <tr>
                <td className={styles.featureCol}>Max Range</td>
                {compareProducts.map(p => <td key={p.id}>{p.specs.ridingRange}</td>)}
              </tr>
              <tr>
                <td className={styles.featureCol}>Motor Power</td>
                {compareProducts.map(p => <td key={p.id}>{p.specs.motorPower}</td>)}
              </tr>
              <tr>
                <td className={styles.featureCol}>Battery</td>
                {compareProducts.map(p => <td key={p.id}>{p.specs.batteryVoltage} {p.specs.batteryCapacity}</td>)}
              </tr>
              <tr>
                <td className={styles.featureCol}>Suspension</td>
                {compareProducts.map(p => <td key={p.id}>{p.specs.suspension}</td>)}
              </tr>
              <tr>
                <td className={styles.featureCol}>Weight</td>
                {compareProducts.map(p => <td key={p.id}>{p.specs.scooterWeight}</td>)}
              </tr>
              <tr>
                <td className={styles.featureCol}>Waterproof</td>
                {compareProducts.map(p => <td key={p.id}>{p.specs.waterproofRating}</td>)}
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
