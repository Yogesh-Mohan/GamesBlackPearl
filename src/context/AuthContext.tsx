"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface CustomUser {
  email: string;
  displayName: string;
  role: string;
}

interface AuthContextType {
  user: CustomUser | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => ({ success: false }),
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for existing session
    const storedUser = localStorage.getItem('bp_admin_session');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('bp_admin_session');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    if (email === 'gamesblackpearl07@gmail.com' && pass === 'blackpearl07') {
      const adminUser = {
        email,
        displayName: 'BP Admin',
        role: 'Super Admin'
      };
      setUser(adminUser);
      localStorage.setItem('bp_admin_session', JSON.stringify(adminUser));
      return { success: true };
    }
    return { success: false, error: "Invalid email or password" };
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('bp_admin_session');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
