"use client";

import { useState } from "react";
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
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Failed to send message.");
      }
    } catch (err) {
      console.error("Form submit error:", err);
      setStatus("error");
      setErrorMsg("An unexpected error occurred. Please try again.");
    }
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
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("form_name")} 
                  required 
                />
              </div>
              <div className={styles.inputGroup}>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("form_email")} 
                  required 
                />
              </div>
              <div className={styles.inputGroup}>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t("form_phone")} 
                />
              </div>
              <div className={styles.inputGroup}>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("form_msg")} 
                  rows="5" 
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className={styles.submitBtn}
                disabled={status === "loading"}
              >
                {status === "loading" ? "..." : t("form_submit")}
              </button>

              {status === "success" && (
                <p style={{ color: "#10b981", marginTop: "12px", fontSize: "0.9rem", fontWeight: "600" }}>
                  ✓ Message sent! We have received your inquiry.
                </p>
              )}
              {status === "error" && (
                <p style={{ color: "#ff4d4f", marginTop: "12px", fontSize: "0.9rem", fontWeight: "600" }}>
                  ✕ {errorMsg}
                </p>
              )}
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
