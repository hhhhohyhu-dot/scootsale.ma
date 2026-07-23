"use client";

import { motion } from "framer-motion";
import { ShieldCheck, CreditCard, Truck, BadgeCheck, Headset, RefreshCcw } from "lucide-react";
import styles from "./TrustBadges.module.css";

const badges = [
  { icon: ShieldCheck, title: "Official Warranty" },
  { icon: CreditCard, title: "Secure Payment" },
  { icon: Truck, title: "Fast Delivery" },
  { icon: BadgeCheck, title: "Genuine Products" },
  { icon: Headset, title: "Customer Support" },
  { icon: RefreshCcw, title: "Easy Returns" },
];

export default function TrustBadges() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section className={styles.trustSection}>
      <div className="container">
        <motion.div 
          className={styles.badgesGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div key={index} className={styles.badgeItem} variants={itemVariants}>
                <div className={styles.iconWrapper}>
                  <Icon size={28} />
                </div>
                <span className={styles.badgeTitle}>{badge.title}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
