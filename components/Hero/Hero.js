"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, MessageCircle } from "lucide-react";
import styles from "./Hero.module.css";
import Link from "next/link";

import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className={styles.hero}>
      {/* Strict enforcement: ONLY ELECTRIC SCOOTERS allowed. Using INMOTION RS exact model local image. */}
      <img 
        src="/images/products/inmotion_rs.png" 
        alt="Premium Electric Scooter Performance" 
        className={styles.videoBg} 
      />
      <div className={styles.overlay}></div>
      
      <div className={`container`}>
        <motion.div 
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className={styles.title} variants={itemVariants}>
            {t("hero_title")}
          </motion.h1>
          
          <motion.p className={styles.description} variants={itemVariants}>
            {t("hero_desc")}
          </motion.p>
          
          <motion.div className={styles.actions} variants={itemVariants}>
            <Link href="#products" className={styles.primaryBtn}>
              {t("hero_shop")} <ArrowRight size={20} />
            </Link>
            <a href="https://wa.me/212679409398" target="_blank" rel="noopener noreferrer" className={styles.secondaryBtn}>
              <MessageCircle size={20} style={{ marginRight: '8px' }} /> {t("hero_whatsapp")}
            </a>
          </motion.div>

          <motion.div className={styles.stats} variants={itemVariants}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>10<span>k+</span></div>
              <div className={styles.statLabel}>{t("stat_clients") || "Customers"}</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>15<span>k+</span></div>
              <div className={styles.statLabel}>{t("stat_sold") || "Scooters Sold"}</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>5<span>+</span></div>
              <div className={styles.statLabel}>Morocco 🇲🇦</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
