"use client";

import { motion } from "framer-motion";
import { MessageSquare, Phone, Mail, MapPin } from "lucide-react";
import styles from "./Contact.module.css";
import { useLanguage } from "@/context/LanguageContext";

const InstagramSVG = ({ size = 24, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Contact() {
  const { t } = useLanguage();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Simulate contact form submission
    alert("Message sent successfully!");
    e.target.reset();
  };

  return (
    <section id="contact" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t("sec_contact")}
          </motion.h2>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t("contact_subtitle")}
          </motion.p>
        </div>

        <div className={styles.grid}>
          {/* Info Side */}
          <motion.div 
            className={styles.info}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className={styles.card}>
              <MessageSquare className={`${styles.icon} ${styles.waIcon}`} size={28} />
              <div className={styles.cardContent}>
                <h3>WhatsApp</h3>
                <p>+212 679-409398</p>
                <a href="https://wa.me/212679409398" target="_blank" rel="noopener noreferrer" className={styles.link}>
                  {t("contact_wa")} &rarr;
                </a>
              </div>
            </div>

            <div className={styles.card}>
              <InstagramSVG className={`${styles.icon} ${styles.igIcon}`} size={28} />
              <div className={styles.cardContent}>
                <h3>Instagram</h3>
                <p>@_mohamed_z__</p>
                <a href="https://www.instagram.com/_mohamed_z__" target="_blank" rel="noopener noreferrer" className={styles.link}>
                  {t("contact_ig")} &rarr;
                </a>
              </div>
            </div>

            <div className={styles.card}>
              <Phone className={`${styles.icon} ${styles.phoneIcon}`} size={28} />
              <div className={styles.cardContent}>
                <h3>Phone</h3>
                <p>+212 679-409398</p>
                <span>{t("contact_phone")}</span>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div 
            className={styles.formContainer}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3>{t("contact_form_title")}</h3>
            <form className={styles.form} onSubmit={handleFormSubmit}>
              <div className={styles.inputGroup}>
                <input type="text" placeholder={t("form_name")} required />
              </div>
              <div className={styles.inputGroup}>
                <input type="email" placeholder={t("form_email")} required />
              </div>
              <div className={styles.inputGroup}>
                <input type="tel" placeholder={t("form_phone")} />
              </div>
              <div className={styles.inputGroup}>
                <textarea placeholder={t("form_msg")} rows="5" required></textarea>
              </div>
              <button type="submit" className={styles.submitBtn}>
                {t("form_submit")}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Map Placeholder */}
        <motion.div 
          className={styles.mapContainer}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className={styles.mapCard}>
            <MapPin size={24} className={styles.mapIcon} />
            <div>
              <strong>MOHAMED Z Showroom</strong>
              <p>Settat, Morocco</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
