import React, { createContext, useContext, useState, useEffect } from 'react';
import { WebsiteUser } from '../types/user';
import { getCurrentUser, loginWithDiscord, logout as apiLogout } from '../services/api';

interface AuthContextType {
  user: WebsiteUser | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  setUser: (user: WebsiteUser | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<WebsiteUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const user = await getCurrentUser();
      setUser(user);
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'authentification:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login() {
    await loginWithDiscord();
  }

  async function logout() {
    try {
      await apiLogout();

      await new Promise(resolve => setTimeout(resolve, 100));

      setUser(null);
      setLoading(false);

      localStorage.clear();
      sessionStorage.clear();

      window.location.replace('/Aurora-web-app/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      setUser(null);
      localStorage.clear();
      sessionStorage.clear();
      window.location.replace('/Aurora-web-app/');
    }
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    setUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
} 