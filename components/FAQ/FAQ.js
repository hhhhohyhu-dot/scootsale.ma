"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import styles from "./FAQ.module.css";
import { useLanguage } from "@/context/LanguageContext";

export default function FAQ() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    { qKey: "faq1_q", aKey: "faq1_a" },
    { qKey: "faq2_q", aKey: "faq2_a" },
    { qKey: "faq3_q", aKey: "faq3_a" },
    { qKey: "faq4_q", aKey: "faq4_a" },
    { qKey: "faq5_q", aKey: "faq5_a" }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="support" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t("sec_faq")}
          </motion.h2>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t("faq_subtitle")}
          </motion.p>
        </div>

        <div className={styles.accordion}>
          {faqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div 
                key={idx} 
                className={`${styles.item} ${isOpen ? styles.open : ""}`}
              >
                <button 
                  className={styles.questionButton} 
                  onClick={() => toggleFAQ(idx)}
                >
                  <span className={styles.questionText}>{t(faq.qKey)}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={20} className={styles.icon} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className={styles.answerWrapper}
                    >
                      <div className={styles.answerContent}>
                        <p className={styles.answerText}>{t(faq.aKey)}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
