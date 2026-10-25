import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, PhoneCall, ShieldCheck, RefreshCw, Mail, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Footer = () => {
  const { resetAllData } = useAuth();

  const handleReset = () => {
    if (window.confirm('Reset all demo data (camps, users, registrations) back to original factory defaults?')) {
      resetAllData();
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                MediCamp<span className="text-teal-400">Portal</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering colleges and healthcare institutions to organize, coordinate, and digitally manage preventive medical camps with ease.
            </p>
            <div className="text-xs text-teal-400/90 font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Campus Healthcare & Medical Camp Portal</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Explore Portal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Home & Overview
                </Link>
              </li>
              <li>
                <Link to="/camps" className="text-slate-400 hover:text-teal-400 transition-colors">
                  All Medical Camps
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Participant Registration
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Staff & Member Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Camp Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Camp Specializations
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• Eye Check-up & Vision Testing</li>
              <li>• Blood Donation Drives (Red Cross)</li>
              <li>• Oral Hygiene & Dental Screening</li>
              <li>• General Health & Vital Screenings</li>
              <li>• Cardiovascular Risk Assessment</li>
              <li>• Nutrition & Anemia Awareness</li>
            </ul>
          </div>

          {/* Campus Helpline & Reset */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Support & Emergency
            </h4>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-rose-400 font-semibold">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Campus Medical Unit: 1800-456-789</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Mail className="w-3.5 h-3.5" />
                <span>healthcamp@campus.edu</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5" />
                <span>Campus Health Center, Wing B</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Medical Camp Registration Portal (MERN Stack Mini Project). All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Designed for Colleges & Universities</p>
        </div>
      </div>
    </footer>
  );
};
