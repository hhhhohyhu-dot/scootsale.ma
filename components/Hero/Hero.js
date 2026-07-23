"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import styles from "./Hero.module.css";
import Link from "next/link";

import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  
  // Parallax state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Stats count-up state
  const [clientsCount, setClientsCount] = useState(0);
  const [soldCount, setSoldCount] = useState(0);
  const [citiesCount, setCitiesCount] = useState(0);

  // Ref to detect when stats section is visible
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-50px" });

  useEffect(() => {
    // Parallax mouse event handler
    const handleMouseMove = (e) => {
      const { clientWidth, clientHeight } = document.documentElement;
      const x = (e.clientX / clientWidth) - 0.5;
      const y = (e.clientY / clientHeight) - 0.5;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Trigger count-up only when stats section is in view
  useEffect(() => {
    if (!isStatsInView) return;

    const clientsEnd = 10;
    const soldEnd = 15;
    const citiesEnd = 5;
    const duration = 2000; // 2 seconds
    
    const startTime = performance.now();
    let frameId;
    
    const updateCount = (timestamp) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutExpo curve (starts very fast, slows down smoothly at the end)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setClientsCount(Math.floor(easeProgress * clientsEnd));
      setSoldCount(Math.floor(easeProgress * soldEnd));
      setCitiesCount(Math.floor(easeProgress * citiesEnd));
      
      if (progress < 1) {
        frameId = requestAnimationFrame(updateCount);
      }
    };
    
    frameId = requestAnimationFrame(updateCount);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isStatsInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 1, 
        ease: [0.215, 0.61, 0.355, 1] 
      } 
    }
  };

  // Staggered variants for individual stat cards
  const statsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const statItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.215, 0.61, 0.355, 1]
      } 
    }
  };

  return (
    <section className={styles.hero}>
      {/* Cinematic Reveal + Mouse Parallax of the premium electric scooter */}
      <motion.img 
        src="/images/products/inmotion_rs.png" 
        alt="Premium Electric Scooter Performance" 
        className={styles.videoBg} 
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ 
          scale: 1.08, 
          opacity: 1,
          x: mousePosition.x * -15,
          y: mousePosition.y * -15
        }}
        transition={{ 
          scale: { duration: 1.8, ease: "easeOut" },
          opacity: { duration: 1.2, ease: "easeOut" },
          x: { type: "tween", ease: "easeOut", duration: 0.5 },
          y: { type: "tween", ease: "easeOut", duration: 0.5 }
        }}
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

          {/* Staggered entrance for statistics + scroll triggering */}
          <motion.div 
            className={styles.stats} 
            variants={statsContainerVariants}
            ref={statsRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div className={styles.statItem} variants={statItemVariants}>
              <div className={styles.statNumber}>{clientsCount}<span>k+</span></div>
              <div className={styles.statLabel}>{t("stat_clients") || "Customers"}</div>
            </motion.div>
            <motion.div className={styles.statItem} variants={statItemVariants}>
              <div className={styles.statNumber}>{soldCount}<span>k+</span></div>
              <div className={styles.statLabel}>{t("stat_sold") || "Scooters Sold"}</div>
            </motion.div>
            <motion.div className={styles.statItem} variants={statItemVariants}>
              <div className={styles.statNumber}>{citiesCount}<span>+</span></div>
              <div className={styles.statLabel}>Morocco 🇲🇦</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
