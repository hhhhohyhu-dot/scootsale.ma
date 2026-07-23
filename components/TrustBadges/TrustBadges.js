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
      transition: { 
        staggerChildren: 0.18, // clear step-by-step delay
        delayChildren: 0.15 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 }, // slide in from left (negative x)
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.7, 
        ease: [0.215, 0.61, 0.355, 1] // smooth cinematic deceleration
      } 
    }
  };

  return (
    <section className={styles.trustSection}>
      <div className="container">
        <motion.div 
          className={styles.badgesGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }} // triggers when well inside the screen
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
