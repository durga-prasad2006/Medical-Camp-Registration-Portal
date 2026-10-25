import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  HeartPulse,
  Menu,
  X,
  User,
  LogOut,
  Shield,
  Stethoscope,
  ChevronDown,
  CalendarCheck,
  PlusCircle,
  LayoutDashboard,
  Users,
  Sparkles,
  Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AdminAccessModal } from './AdminAccessModal';

export const Navbar = () => {
  const { user, role, isAuthenticated, logout, demoLogin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setUserDropdownOpen(false);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <span className="font-bold text-lg text-slate-900 tracking-tight block leading-tight">
                MediCamp<span className="text-teal-600">Portal</span>
              </span>
              <span className="text-[10px] font-medium text-slate-500 tracking-wider uppercase block">
                Healthcare Portal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/') ? 'text-teal-600 bg-teal-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            <Link
              to="/camps"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/camps') ? 'text-teal-600 bg-teal-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Medical Camps
            </Link>

            {/* Participant Links */}
            {role === 'participant' && (
              <>
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    isActive('/dashboard') ? 'text-teal-600 bg-teal-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/my-registrations"
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    isActive('/my-registrations') ? 'text-teal-600 bg-teal-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  My Registrations
                </Link>
              </>
            )}

            {/* Admin Links */}
            {role === 'admin' && (
              <>
                <Link
                  to="/admin"
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    isActive('/admin') ? 'text-teal-600 bg-teal-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Admin Dashboard
                </Link>
                <Link
                  to="/admin/camps"
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    isActive('/admin/camps') ? 'text-teal-600 bg-teal-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Manage Camps
                </Link>
                <Link
                  to="/admin/registrations"
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    isActive('/admin/registrations') ? 'text-teal-600 bg-teal-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Registrations & Reports
                </Link>
              </>
            )}

            {/* Doctor Links */}
            {role === 'doctor' && (
              <Link
                to="/doctor"
                className={`px-3 py-2 rounded-lg transition-colors ${
                  isActive('/doctor') ? 'text-teal-600 bg-teal-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Doctor Portal
              </Link>
            )}
          </nav>

          {/* Right Header: Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {/* Dedicated Top Admin Button */}
            {role === 'admin' ? (
              <Link
                to="/admin"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-300 transition-all shadow-xs"
              >
                <Shield className="w-3.5 h-3.5 text-amber-600" />
                <span>Admin Dashboard</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setAdminModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-all shadow-xs cursor-pointer group"
                title="Restricted Administrator Access"
              >
                <Lock className="w-3.5 h-3.5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Admin</span>
              </button>
            )}

            {/* Auth Buttons or User Profile Dropdown */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-xs border border-teal-200">
                    {user.name.charAt(0)}
                  </div>
                  <div className="text-left hidden lg:block">
                    <span className="text-xs font-bold text-slate-800 block truncate max-w-[120px]">
                      {user.name}
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-teal-600 tracking-wider block">
                      {role}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div
                    onMouseLeave={() => setUserDropdownOpen(false)}
                    className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                  >
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-800 truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-teal-50 text-teal-700 border border-teal-200">
                        {role?.toUpperCase()}
                      </span>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50"
                    >
                      <User className="w-4 h-4 text-slate-400" /> My Profile
                    </Link>

                    {role === 'participant' && (
                      <Link
                        to="/my-registrations"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50"
                      >
                        <CalendarCheck className="w-4 h-4 text-slate-400" /> My Registrations
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 border-t border-slate-100 mt-1"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-teal-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm hover:shadow transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button & Admin Button */}
          <div className="flex items-center md:hidden gap-2">
            {role !== 'admin' && (
              <button
                type="button"
                onClick={() => setAdminModalOpen(true)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors"
                title="Admin Security Access"
              >
                <Lock className="w-3 h-3 text-amber-600" />
                <span>Admin</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1 text-sm font-medium">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
            >
              Home
            </Link>
            <Link
              to="/camps"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
            >
              Medical Camps
            </Link>

            {role === 'participant' && (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
                >
                  Participant Dashboard
                </Link>
                <Link
                  to="/my-registrations"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
                >
                  My Registrations
                </Link>
              </>
            )}

            {role === 'admin' && (
              <>
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
                >
                  Admin Dashboard
                </Link>
                <Link
                  to="/admin/camps"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
                >
                  Manage Camps
                </Link>
                <Link
                  to="/admin/registrations"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
                >
                  All Registrations & Reports
                </Link>
              </>
            )}

            {role === 'doctor' && (
              <Link
                to="/doctor"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
              >
                Doctor Portal & Attendance
              </Link>
            )}

            {isAuthenticated && (
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
              >
                My Profile
              </Link>
            )}
          </nav>

          {/* Auth Actions in Mobile */}
          <div className="pt-2 border-t border-slate-100">
            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full py-2 text-xs font-semibold text-rose-600 bg-rose-50 rounded-xl text-center flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Sign Out ({user.name})
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-center text-xs font-semibold text-slate-700 bg-slate-100 rounded-xl"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-center text-xs font-semibold text-white bg-teal-600 rounded-xl"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Admin Security Access Modal */}
      <AdminAccessModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />
    </header>
  );
};
