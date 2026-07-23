"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, LogOut } from "lucide-react";
import styles from "./Admin.module.css";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          ADMIN<span>Z</span>
        </div>
        <nav className={styles.nav}>
          <Link href="/admin" className={`${styles.navItem} ${pathname === "/admin" ? styles.active : ""}`}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link href="/admin/products" className={`${styles.navItem} ${pathname === "/admin/products" ? styles.active : ""}`}>
            <Package size={20} /> Products
          </Link>
          <Link href="/admin/orders" className={`${styles.navItem} ${pathname === "/admin/orders" ? styles.active : ""}`}>
            <ShoppingBag size={20} /> Orders
          </Link>
          <Link href="/admin/customers" className={`${styles.navItem} ${pathname === "/admin/customers" ? styles.active : ""}`}>
            <Users size={20} /> Customers
          </Link>
          <div style={{ flex: 1 }}></div>
          <Link href="/admin/settings" className={styles.navItem}>
            <Settings size={20} /> Settings
          </Link>
          <Link href="/" className={styles.navItem}>
            <LogOut size={20} /> Exit Admin
          </Link>
        </nav>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.userProfile}>
            <div className={styles.avatar}>MZ</div>
            <span>Admin User</span>
          </div>
        </header>
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
}
