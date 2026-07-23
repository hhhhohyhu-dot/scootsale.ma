"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductSection.module.css";

export default function ProductSection({ title, subtitle, products, bg = "darkBg", linkUrl = "/products" }) {
  if (!products || products.length === 0) return null;

  return (
    <section className={`${styles.section} ${styles[bg]}`}>
      <div className="container">
        <div className={styles.header}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.titleWrapper}
          >
            {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
            <h2 className={styles.title}>{title}</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link href={linkUrl} className={styles.viewAllBtn}>
              View All <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>

        <div className={styles.grid}>
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
