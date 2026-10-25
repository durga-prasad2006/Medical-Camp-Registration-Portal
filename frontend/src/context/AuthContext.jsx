import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, resetDatabaseToDefaults } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial user from localStorage
    const current = api.getCurrentUser();
    if (current) {
      setUser(current);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const loggedUser = await api.login(email, password);
    setUser(loggedUser);
    return loggedUser;
  };

  const register = async (userData) => {
    const newUser = await api.register(userData);
    setUser(newUser);
    return newUser;
  };

  const adminLogin = async (password) => {
    const adminUser = await api.adminLogin(password);
    setUser(adminUser);
    return adminUser;
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
  };

  const updateProfile = async (updateData) => {
    if (!user) return;
    const updated = await api.updateProfile(user.userId, updateData);
    setUser(updated);
    return updated;
  };

  // Quick switch demo account for testing & presentations
  const demoLogin = async (role) => {
    let email = 'admin@camp.org';
    let password = 'admin';
    if (role === 'doctor') {
      email = 'dr.sharma@health.org';
      password = 'doctor';
    } else if (role === 'participant') {
      email = 'rahul@gmail.com';
      password = 'user';
    }
    return await login(email, password);
  };

  const resetAllData = () => {
    resetDatabaseToDefaults();
    logout();
    window.location.href = '/';
  };

  const value = {
    user,
    role: user?.role || null,
    isAuthenticated: !!user,
    loading,
    login,
    adminLogin,
    register,
    logout,
    updateProfile,
    demoLogin,
    resetAllData
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
