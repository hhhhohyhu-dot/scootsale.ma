"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import styles from "./FeaturedProducts.module.css";
import ProductCard from "../ProductCard/ProductCard";

import { products as allProducts } from "@/data/products";

export default function FeaturedProducts() {
  // Use the first 4 products for featured section
  const featuredProducts = allProducts.slice(0, 4);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="products" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Featured Scooters</h2>
            <p className={styles.subtitle}>Discover our hand-picked selection of the most powerful and reliable electric scooters.</p>
          </div>
          <Link href="/products" className={styles.viewAllBtn}>
            View All Models <ArrowRight size={20} />
          </Link>
        </div>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {featuredProducts.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
