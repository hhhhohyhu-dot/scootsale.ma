"use client";

import Link from "next/link";
import { MessageSquare, Shield } from "lucide-react";
import styles from "./Footer.module.css";
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

export default function Footer() {
  const { t, locale } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.about}>
          <Link href="/" className={styles.logo}>
            MOHAMED<span className={styles.logoAccent}>Z</span>
          </Link>
          <p className={styles.desc}>
            ⚡ La Référence des Trottinettes Électriques<br />
            💰 Vente • Achat • Dépôt-Vente<br />
            🔎 Nous Trouvons le Modèle Qu'il Vous Faut<br />
            📍 Settat, Morocco
          </p>
        </div>

        <div className={styles.linksGroup}>
          <h3>{t("footer_links_title") || "Quick Links"}</h3>
          <div className={styles.links}>
            <Link href="/products">Scooters</Link>
            <Link href="/compare">Compare</Link>
            <Link href="/#reviews">Reviews</Link>
            <Link href="/#support">Support / FAQ</Link>
          </div>
        </div>

        <div className={styles.socialGroup}>
          <h3>Community</h3>
          <div className={styles.socials}>
            <a href="https://wa.me/212679409398" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <MessageSquare size={20} /> WhatsApp
            </a>
            <a href="https://www.instagram.com/_mohamed_z__" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <InstagramSVG size={20} /> Instagram
            </a>
          </div>
          <div className={styles.warrantyBadge}>
            <Shield size={18} color="var(--color-accent)" />
            <span>1 Year Official Warranty Included</span>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={`container ${styles.bottomContent}`}>
          <p>{t("footer_rights")}</p>
          <div className={styles.paymentBadges}>
            <span>Cash on Delivery (COD)</span>
            <span className={styles.dot}>•</span>
            <span>Bank Transfer</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
