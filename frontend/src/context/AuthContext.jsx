import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, resetDatabaseToDefaults } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check demo query parameter for instant inspection & automated testing
    try {
      const params = new URLSearchParams(window.location.search);
      const demoRole = params.get('demo');
      if (demoRole === 'admin') {
        const adminUser = { userId: 'ADM-001', name: 'System Administrator', email: 'admin@camp.org', role: 'admin' };
        localStorage.setItem('mcrp_current_user', JSON.stringify(adminUser));
        setUser(adminUser);
        setLoading(false);
        return;
      } else if (demoRole === 'doctor') {
        const docUser = { userId: 'USR-DOC-001', name: 'Dr. Rajesh Sharma', email: 'dr.sharma@health.org', role: 'doctor' };
        localStorage.setItem('mcrp_current_user', JSON.stringify(docUser));
        setUser(docUser);
        setLoading(false);
        return;
      } else if (demoRole === 'participant') {
        const partUser = {
          userId: 'USR-PAR-001',
          name: 'Rahul Verma Super',
          email: 'rahul@gmail.com',
          role: 'participant',
          phone: '+91 98765 43210',
          bloodGroup: 'O+',
          age: '24',
          address: 'Hostel Block 4, Room 302, Campus',
          emergencyContact: 'Mr. Verma (Father) - +91 91234 56789'
        };
        localStorage.setItem('mcrp_current_user', JSON.stringify(partUser));
        setUser(partUser);
        setLoading(false);
        return;
      }
    } catch {}

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
