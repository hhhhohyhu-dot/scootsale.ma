"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import styles from "./Reviews.module.css";
import { useLanguage } from "@/context/LanguageContext";

export default function Reviews() {
  const { t } = useLanguage();

  const reviewsList = [
    {
      name: "Youssef M.",
      city: "Casablanca",
      text: "Une trottinette exceptionnelle ! Le moteur est vraiment puissant, les suspensions absorbent bien les chocs et l'autonomie est conforme à ce qui est annoncé.",
      rating: 5,
      avatar: "Y"
    },
    {
      name: "Sara B.",
      city: "Rabat",
      text: "Excellent rapport qualité-prix. La trottinette est robuste et stable même à haute vitesse. Livraison en 24h sur Rabat, service au top!",
      rating: 5,
      avatar: "S"
    },
    {
      name: "Amine T.",
      city: "Marrakech",
      text: "J'ai commandé la Tank Double Motor et franchement je suis bluffé. La vitesse est dingue et les freins hydrauliques sont très rassurants. Merci _mohamed_z__!",
      rating: 5,
      avatar: "A"
    }
  ];

  return (
    <section id="reviews" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t("sec_reviews")}
          </motion.h2>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t("reviews_subtitle")}
          </motion.p>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.ratingBig}>
            <span className={styles.ratingNumber}>4.9</span>
            <span className={styles.ratingStar}>★</span>
          </div>
          <div className={styles.ratingBars}>
            <div className={styles.barRow}><span>5★</span><div className={styles.bar}><div className={styles.fill} style={{ width: "88%" }}></div></div><span>88%</span></div>
            <div className={styles.barRow}><span>4★</span><div class={styles.bar}><div className={styles.fill} style={{ width: "9%" }}></div></div><span>9%</span></div>
            <div className={styles.barRow}><span>3★</span><div class={styles.bar}><div className={styles.fill} style={{ width: "2%" }}></div></div><span>2%</span></div>
            <div className={styles.barRow}><span>2★</span><div class={styles.bar}><div className={styles.fill} style={{ width: "1%" }}></div></div><span>1%</span></div>
            <div className={styles.barRow}><span>1★</span><div class={styles.bar}><div className={styles.fill} style={{ width: "0%" }}></div></div><span>0%</span></div>
          </div>
        </div>

        <div className={styles.grid}>
          {reviewsList.map((review, idx) => (
            <motion.div 
              key={idx} 
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className={styles.stars}>
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#e2f954" color="#e2f954" />
                ))}
              </div>
              <p className={styles.text}>"{review.text}"</p>
              <div className={styles.customer}>
                <div className={styles.avatar}>{review.avatar}</div>
                <div>
                  <h4 className={styles.name}>{review.name}</h4>
                  <span className={styles.city}>{review.city}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
