import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarCheck,
  CheckCircle,
  Clock,
  MapPin,
  ArrowRight,
  HeartPulse,
  Droplet,
  User,
  QrCode,
  AlertCircle
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { StatusBadge } from '../components/StatusBadge';
import { RegistrationSlipModal } from '../components/RegistrationSlipModal';
import { RegisterModal } from '../components/RegisterModal';
import { CampCard } from '../components/CampCard';

export const ParticipantDashboard = () => {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [availableCamps, setAvailableCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSlip, setActiveSlip] = useState(null);
  const [selectedCampForReg, setSelectedCampForReg] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  const loadDashboardData = async () => {
    if (!user?.userId) return;
    setLoading(true);
    try {
      const [regs, camps] = await Promise.all([
        api.getRegistrations({ participantId: user.userId }),
        api.getCamps({ status: 'Upcoming' })
      ]);
      setRegistrations(regs);
      setAvailableCamps(camps);
    } catch (err) {
      console.error('Error loading participant dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelRegistration = async (regId) => {
    if (!window.confirm('Are you sure you want to cancel this camp registration?')) return;
    try {
      await api.cancelRegistration(regId);
      loadDashboardData();
    } catch (err) {
      alert(err.message || 'Failed to cancel registration');
    }
  };

  const activeRegistrations = registrations.filter(
    (r) => r.registrationStatus === 'Confirmed' || r.registrationStatus === 'Registered'
  );

  const completedRegistrations = registrations.filter(
    (r) => r.registrationStatus === 'Attended'
  );

  const registeredCampIds = new Set(
    registrations.filter((r) => r.registrationStatus !== 'Cancelled').map((r) => r.campId)
  );

  const recommendedCamps = availableCamps
    .filter((c) => !registeredCampIds.has(c.campId))
    .slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/30 text-teal-200 border border-teal-400/30">
            <HeartPulse className="w-3.5 h-3.5" /> Participant Health Hub
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Hello, {user?.name || 'Participant'}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Welcome to your campus health portal. Track your upcoming medical check-ups, view and print your entry passes, and stay healthy.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/camps"
            className="px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5"
          >
            <span>Browse All Camps</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/profile"
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded-xl border border-white/20 transition-colors"
          >
            Edit Profile
          </Link>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">Active Bookings</span>
            <span className="text-2xl font-extrabold text-slate-800">
              {activeRegistrations.length}
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">Camps Attended</span>
            <span className="text-2xl font-extrabold text-slate-800">
              {completedRegistrations.length}
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <Droplet className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">Blood Group</span>
            <span className="text-2xl font-extrabold text-rose-600">
              {user?.bloodGroup || 'O+'}
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <User className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">Participant ID</span>
            <span className="text-xs font-mono font-bold text-slate-700 truncate block max-w-[140px]">
              {user?.userId || 'USR-001'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: My Active Bookings vs Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: My Active Camp Bookings */}
        <div className="lg:col-span-8 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-teal-600" />
              My Upcoming Camp Registrations
            </h2>
            <Link
              to="/my-registrations"
              className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
            >
              <span>View All ({registrations.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
              <div className="w-8 h-8 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-xs text-slate-500">Loading registrations...</p>
            </div>
          ) : activeRegistrations.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-800">No Active Registrations</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                You have not registered for any upcoming medical camps. Reserve your free slot now to get your digital entry token.
              </p>
              <Link
                to="/camps"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 text-white font-semibold text-xs rounded-xl shadow-sm hover:bg-teal-700 transition-colors"
              >
                Browse Upcoming Camps
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {activeRegistrations.map((reg) => (
                <div
                  key={reg.registrationId}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                        {reg.tokenNumber}
                      </span>
                      <StatusBadge status={reg.registrationStatus} />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base">{reg.campName}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-teal-600" />
                        {reg.campDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        {reg.venue}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => setActiveSlip(reg)}
                      className="flex-1 sm:flex-none px-3.5 py-2 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <QrCode className="w-3.5 h-3.5" /> View Pass
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCancelRegistration(reg.registrationId)}
                      className="px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Col: Recommended Camps & Profile Card */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Profile Summary */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-slate-400">
              Profile Summary
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-lg">
                {user?.name?.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm">{user?.name}</div>
                <div className="text-xs text-slate-500">{user?.email}</div>
                <div className="text-xs text-teal-600 font-semibold">{user?.phone || 'No phone'}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div>
                <span className="text-slate-400 block">Age:</span>
                <span className="font-semibold text-slate-800">{user?.age || '21'} yrs</span>
              </div>
              <div>
                <span className="text-slate-400 block">Gender:</span>
                <span className="font-semibold text-slate-800">{user?.gender || 'Male'}</span>
              </div>
              <div className="col-span-2 mt-1">
                <span className="text-slate-400 block">Emergency Contact:</span>
                <span className="font-semibold text-slate-800 truncate block">
                  {user?.emergencyContact || 'Not added yet'}
                </span>
              </div>
            </div>

            <Link
              to="/profile"
              className="w-full block text-center py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
            >
              Update Health Profile
            </Link>
          </div>

          {/* Recommended Camps */}
          {recommendedCamps.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900">
                Recommended Medical Camps
              </h3>
              <div className="space-y-3">
                {recommendedCamps.map((camp) => (
                  <div
                    key={camp.campId}
                    className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:border-teal-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] uppercase font-bold text-teal-600 tracking-wide">
                        {camp.campType}
                      </span>
                      <h4 className="text-xs font-bold text-slate-800 mt-1 line-clamp-1">
                        {camp.campName}
                      </h4>
                      <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {camp.campDate} • {camp.venue}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedCampForReg(camp)}
                      className="mt-3 w-full py-1.5 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors text-center"
                    >
                      Book Slot
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {activeSlip && (
        <RegistrationSlipModal
          registration={activeSlip}
          onClose={() => setActiveSlip(null)}
        />
      )}

      {selectedCampForReg && (
        <RegisterModal
          camp={selectedCampForReg}
          onClose={() => setSelectedCampForReg(null)}
          onSuccess={() => {
            loadDashboardData();
          }}
        />
      )}
    </div>
  );
};
