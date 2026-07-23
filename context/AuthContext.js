"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// Simple hash function for demo purposes (NOT for production)
function hashPassword(password) {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(16);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("auth_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error("Error restoring auth session", e);
    }
    setIsLoading(false);
  }, []);

  /**
   * Register a new user.
   * Returns { success, error }
   */
  const register = ({ name, email, phone, password }) => {
    try {
      const existing = getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        return { success: false, error: "An account with this email already exists." };
      }

      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        phone: phone || "",
        passwordHash: hashPassword(password),
        createdAt: new Date().toISOString(),
        orders: []
      };

      const users = getUsers();
      users.push(newUser);
      localStorage.setItem("auth_users", JSON.stringify(users));

      // Log in immediately after registration
      const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email, phone: newUser.phone };
      setUser(sessionUser);
      localStorage.setItem("auth_user", JSON.stringify(sessionUser));

      return { success: true };
    } catch (e) {
      return { success: false, error: "Registration failed. Please try again." };
    }
  };

  /**
   * Sign in an existing user.
   * Returns { success, error }
   */
  const login = ({ email, password }) => {
    try {
      const users = getUsers();
      const found = users.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.passwordHash === hashPassword(password)
      );

      if (!found) {
        return { success: false, error: "Invalid email or password." };
      }

      const sessionUser = { id: found.id, name: found.name, email: found.email, phone: found.phone };
      setUser(sessionUser);
      localStorage.setItem("auth_user", JSON.stringify(sessionUser));

      return { success: true };
    } catch (e) {
      return { success: false, error: "Login failed. Please try again." };
    }
  };

  /**
   * Sign out current user.
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  /**
   * Get all registered users from localStorage.
   */
  const getUsers = () => {
    try {
      const data = localStorage.getItem("auth_users");
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  };

  /**
   * Save an order for the current user.
   */
  const saveOrder = (orderItems, total) => {
    if (!user) return;
    try {
      const users = getUsers();
      const idx = users.findIndex(u => u.id === user.id);
      if (idx === -1) return;

      const order = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        items: orderItems,
        total
      };

      users[idx].orders = users[idx].orders || [];
      users[idx].orders.unshift(order);
      localStorage.setItem("auth_users", JSON.stringify(users));
    } catch (e) {
      console.error("Error saving order", e);
    }
  };

  /**
   * Get orders for the current user.
   */
  const getMyOrders = () => {
    if (!user) return [];
    try {
      const users = getUsers();
      const found = users.find(u => u.id === user.id);
      return found?.orders || [];
    } catch {
      return [];
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register, saveOrder, getMyOrders }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
