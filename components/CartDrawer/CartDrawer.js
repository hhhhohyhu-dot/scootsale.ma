"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import styles from "./CartDrawer.module.css";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { t } = useLanguage();
  const { saveOrder } = useAuth();

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    // Save order to user account history
    saveOrder(cartItems, cartTotal);
    
    let message = "Hello! I would like to order the following items:%0A%0A";
    cartItems.forEach(item => {
      message += `- ${item.title} (x${item.quantity}) = ${(item.price * item.quantity).toLocaleString()} MAD%0A`;
    });
    message += `%0ATotal: ${cartTotal.toLocaleString()} MAD%0A%0APlease let me know the next steps.`;
    
    window.open(`https://wa.me/212679409398?text=${message}`, '_blank');
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className={styles.overlay} onClick={() => setIsCartOpen(false)}>
          <motion.div 
            className={styles.drawer}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.header}>
              <h2 className={styles.title}>{t("cart_title")}</h2>
              <button className={styles.closeBtn} onClick={() => setIsCartOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className={styles.items}>
              {cartItems.length === 0 ? (
                <div className={styles.emptyState}>{t("cart_empty")}</div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <img src={item.image} alt={item.title} className={styles.itemImage} />
                    <div className={styles.itemDetails}>
                      <div className={styles.itemTitle}>{item.title}</div>
                      <div className={styles.itemPrice}>{item.price.toLocaleString()} MAD</div>
                      <div className={styles.itemControls}>
                        <div className={styles.qtyControl}>
                          <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                          <span>{item.quantity}</span>
                          <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>
                        <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className={styles.footer}>
                <div className={styles.totalRow}>
                  <span className={styles.totalLabel}>{t("cart_total")}</span>
                  <span className={styles.totalAmount}>{cartTotal.toLocaleString()} MAD</span>
                </div>
                <button className={styles.checkoutBtn} onClick={handleCheckout}>
                  <MessageCircle size={20} /> {t("cart_checkout")}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
