"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, Globe, User, X, Mail, Lock, Eye, EyeOff, LogOut, Package, Phone, CheckCircle, AlertCircle } from "lucide-react";
import styles from "./Navbar.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

// ─── Tiny notification helper ─────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <motion.div
      className={`${styles.toast} ${type === "error" ? styles.toastError : styles.toastSuccess}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
    >
      {type === "error" ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
      <span>{message}</span>
    </motion.div>
  );
}

// ─── Password visibility toggle input ─────────────────────────────────────────
function PasswordInput({ placeholder, value, onChange, id }) {
  const [show, setShow] = useState(false);
  return (
    <div className={styles.inputWrapper}>
      <Lock size={16} className={styles.inputIcon} />
      <input
        id={id}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      <button type="button" className={styles.eyeBtn} onClick={() => setShow(s => !s)} tabIndex={-1}>
        {show ? <EyeOff size={15} /> : <Eye size={15} />}
      </button>
    </div>
  );
}

// ─── Main Navbar ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [modal, setModal] = useState(null); // null | "login" | "register" | "profile"
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");

  const langRef = useRef(null);
  const { cartCount, setIsCartOpen } = useCart();
  const { locale, changeLanguage, t } = useLanguage();
  const { user, login, logout, register, getMyOrders } = useAuth();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close lang dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setIsLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const showToast = (message, type = "success") => setToast({ message, type });

  const closeModal = () => {
    setModal(null);
    setLoginEmail(""); setLoginPassword("");
    setRegName(""); setRegEmail(""); setRegPhone(""); setRegPassword(""); setRegConfirm("");
  };

  // ─── Handle LOGIN ────────────────────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 600)); // simulate network
    const result = login({ email: loginEmail, password: loginPassword });
    setIsLoading(false);
    if (result.success) {
      closeModal();
      showToast(`Welcome back! 👋`, "success");
    } else {
      showToast(result.error, "error");
    }
  };

  // ─── Handle REGISTER ─────────────────────────────────────────────────────────
  const handleRegister = async (e) => {
    e.preventDefault();
    if (regPassword !== regConfirm) {
      showToast("Passwords do not match.", "error");
      return;
    }
    if (regPassword.length < 6) {
      showToast("Password must be at least 6 characters.", "error");
      return;
    }
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 700));
    const result = register({ name: regName, email: regEmail, phone: regPhone, password: regPassword });
    setIsLoading(false);
    if (result.success) {
      closeModal();
      showToast(`Account created successfully! Welcome, ${regName}! 🎉`, "success");
    } else {
      showToast(result.error, "error");
    }
  };

  // ─── Handle LOGOUT ───────────────────────────────────────────────────────────
  const handleLogout = () => {
    logout();
    closeModal();
    showToast("You have been signed out.", "success");
  };

  const myOrders = modal === "profile" ? getMyOrders() : [];

  return (
    <>
      {/* ─── HEADER ─────────────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      >
        <div className={`container ${styles.navContainer}`}>
          <Link href="/" className={styles.logo}>
            MOHAMED<span className={styles.logoAccent}>Z</span>
          </Link>

          <nav className={styles.navLinks}>
            <Link href="/products" className={styles.navLink}>{t("nav_scooters")}</Link>
            <Link href="/compare" className={styles.navLink}>{t("nav_compare")}</Link>
            <Link href="/#reviews" className={styles.navLink}>{t("nav_reviews")}</Link>
            <Link href="/#support" className={styles.navLink}>{t("nav_support")}</Link>
          </nav>

          <div className={styles.navActions}>
            {/* Language Switcher */}
            <div className={styles.langWrapper} ref={langRef}>
              <button className={styles.iconBtn} aria-label="Language" onClick={() => setIsLangOpen(o => !o)}>
                <Globe size={20} />
              </button>
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    className={styles.langDropdown}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  >
                    {[["en", "English", "🇬🇧"], ["fr", "Français", "🇫🇷"], ["ar", "العربية", "🇲🇦"]].map(([code, label, flag]) => (
                      <button
                        key={code}
                        className={locale === code ? styles.activeLang : ""}
                        onClick={() => { changeLanguage(code); setIsLangOpen(false); }}
                      >
                        {flag} {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Account icon — logged in or not */}
            {user ? (
              <button
                className={`${styles.iconBtn} ${styles.avatarBtn}`}
                aria-label="My Account"
                onClick={() => setModal("profile")}
                title={user.name}
              >
                <span className={styles.avatarInitial}>{user.name[0].toUpperCase()}</span>
              </button>
            ) : (
              <button className={styles.iconBtn} aria-label="Sign In" onClick={() => setModal("login")}>
                <User size={20} />
              </button>
            )}

            {/* Cart */}
            <button className={styles.iconBtn} aria-label="Cart" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart size={20} />
              {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
            </button>

            {/* Contact */}
            <Link href="/#contact" className={styles.contactBtn}>{t("nav_contact")}</Link>

            <button className={`${styles.iconBtn} ${styles.mobileMenuBtn}`}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ─── TOAST NOTIFICATION ───────────────────────────────────────── */}
      <AnimatePresence>
        {toast && (
          <Toast key={toast.message} message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
      </AnimatePresence>

      {/* ─── MODALS ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {modal && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={e => e.stopPropagation()}
            >
              <button className={styles.closeModalBtn} onClick={closeModal}><X size={20} /></button>

              {/* ── LOGIN ──────────────────────────────────────────── */}
              {modal === "login" && (
                <>
                  <div className={styles.modalHeader}>
                    <div className={styles.modalIcon}><User size={28} /></div>
                    <h2 className={styles.modalTitle}>{t("login_title")}</h2>
                    <p className={styles.modalDesc}>{t("login_desc")}</p>
                  </div>

                  <form className={styles.modalForm} onSubmit={handleLogin}>
                    <div className={styles.formGroup}>
                      <label htmlFor="login-email">{t("login_email")}</label>
                      <div className={styles.inputWrapper}>
                        <Mail size={16} className={styles.inputIcon} />
                        <input
                          id="login-email"
                          type="email"
                          placeholder="example@email.com"
                          value={loginEmail}
                          onChange={e => setLoginEmail(e.target.value)}
                          required
                          autoComplete="email"
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="login-password">{t("login_password")}</label>
                      <PasswordInput
                        id="login-password"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={e => setLoginPassword(e.target.value)}
                      />
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                      {isLoading ? <span className={styles.spinner}></span> : t("login_btn")}
                    </button>
                  </form>

                  <div className={styles.divider}><span>{t("login_or")}</span></div>
                  <div className={styles.socialLogins}>
                    <button className={styles.socialBtn} onClick={() => { showToast("Google Sign‑In coming soon!", "success"); }}>🌐 Google</button>
                    <button className={styles.socialBtn} onClick={() => { showToast("Apple Sign‑In coming soon!", "success"); }}>🍎 Apple</button>
                  </div>

                  <p className={styles.switchLink}>
                    {t("login_register") || "No account?"}{" "}
                    <button type="button" onClick={() => setModal("register")}>Sign Up</button>
                  </p>
                </>
              )}

              {/* ── REGISTER ───────────────────────────────────────── */}
              {modal === "register" && (
                <>
                  <div className={styles.modalHeader}>
                    <div className={styles.modalIcon}><CheckCircle size={28} /></div>
                    <h2 className={styles.modalTitle}>Create Account</h2>
                    <p className={styles.modalDesc}>Join thousands of premium scooter enthusiasts.</p>
                  </div>

                  <form className={styles.modalForm} onSubmit={handleRegister}>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="reg-name">Full Name</label>
                        <div className={styles.inputWrapper}>
                          <User size={16} className={styles.inputIcon} />
                          <input id="reg-name" type="text" placeholder="Youssef M." value={regName} onChange={e => setRegName(e.target.value)} required />
                        </div>
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="reg-phone">Phone</label>
                        <div className={styles.inputWrapper}>
                          <Phone size={16} className={styles.inputIcon} />
                          <input id="reg-phone" type="tel" placeholder="+212 6XX XXX XXX" value={regPhone} onChange={e => setRegPhone(e.target.value)} />
                        </div>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="reg-email">Email Address</label>
                      <div className={styles.inputWrapper}>
                        <Mail size={16} className={styles.inputIcon} />
                        <input id="reg-email" type="email" placeholder="example@email.com" value={regEmail} onChange={e => setRegEmail(e.target.value)} required autoComplete="email" />
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="reg-pass">Password</label>
                        <PasswordInput id="reg-pass" placeholder="Min. 6 chars" value={regPassword} onChange={e => setRegPassword(e.target.value)} />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="reg-confirm">Confirm</label>
                        <PasswordInput id="reg-confirm" placeholder="Repeat password" value={regConfirm} onChange={e => setRegConfirm(e.target.value)} />
                      </div>
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                      {isLoading ? <span className={styles.spinner}></span> : "Create My Account"}
                    </button>
                  </form>

                  <p className={styles.switchLink}>
                    Already have an account?{" "}
                    <button type="button" onClick={() => setModal("login")}>Sign In</button>
                  </p>
                </>
              )}

              {/* ── PROFILE / MY ACCOUNT ───────────────────────────── */}
              {modal === "profile" && user && (
                <>
                  <div className={styles.profileHeader}>
                    <div className={styles.profileAvatar}>{user.name[0].toUpperCase()}</div>
                    <div className={styles.profileInfo}>
                      <h2 className={styles.profileName}>{user.name}</h2>
                      <p className={styles.profileEmail}>{user.email}</p>
                      {user.phone && <p className={styles.profilePhone}>{user.phone}</p>}
                    </div>
                  </div>

                  <div className={styles.profileSection}>
                    <h3 className={styles.profileSectionTitle}>
                      <Package size={18} /> My Orders
                    </h3>
                    {myOrders.length === 0 ? (
                      <div className={styles.emptyOrders}>
                        <p>No orders yet.</p>
                        <Link href="/products" onClick={closeModal} className={styles.shopNowBtn}>Shop Now →</Link>
                      </div>
                    ) : (
                      <div className={styles.ordersList}>
                        {myOrders.map(order => (
                          <div key={order.id} className={styles.orderCard}>
                            <div className={styles.orderHeader}>
                              <span className={styles.orderDate}>
                                {new Date(order.date).toLocaleDateString("fr-MA", { day: "numeric", month: "short", year: "numeric" })}
                              </span>
                              <span className={styles.orderTotal}>{order.total.toLocaleString()} MAD</span>
                            </div>
                            <div className={styles.orderItems}>
                              {order.items.map((item, i) => (
                                <span key={i} className={styles.orderItem}>
                                  {item.title} ×{item.quantity}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button className={styles.logoutBtn} onClick={handleLogout}>
                    <LogOut size={16} /> Sign Out
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
