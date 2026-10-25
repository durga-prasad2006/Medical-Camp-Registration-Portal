import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Stethoscope,
  QrCode,
  AlertCircle,
  FileText,
  Trash2,
  CheckCircle2,
  Search,
  Filter
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { StatusBadge } from '../components/StatusBadge';
import { RegistrationSlipModal } from '../components/RegistrationSlipModal';

export const MyRegistrations = () => {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSlip, setActiveSlip] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadRegistrations();
  }, [user]);

  const loadRegistrations = async () => {
    if (!user?.userId) return;
    setLoading(true);
    try {
      const data = await api.getRegistrations({ participantId: user.userId });
      setRegistrations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (regId) => {
    if (!window.confirm('Are you sure you want to cancel this registration? Your reserved slot will be released.')) {
      return;
    }
    try {
      await api.cancelRegistration(regId);
      loadRegistrations();
    } catch (err) {
      alert(err.message || 'Failed to cancel registration');
    }
  };

  const filteredRegistrations = registrations.filter((reg) => {
    const matchesStatus =
      statusFilter === 'All' || reg.registrationStatus === statusFilter;
    const matchesSearch =
      search === '' ||
      reg.campName.toLowerCase().includes(search.toLowerCase()) ||
      reg.tokenNumber.toLowerCase().includes(search.toLowerCase()) ||
      reg.venue.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
            Registration Management
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            My Medical Camp Registrations
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track your slot confirmations, access entry tokens, view doctor consultation notes, or cancel bookings.
          </p>
        </div>

        <Link
          to="/camps"
          className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors self-start md:self-auto"
        >
          + Register for New Camp
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['All', 'Confirmed', 'Attended', 'Cancelled'].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                statusFilter === status
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search registrations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>
      </div>

      {/* Registrations List */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm font-medium text-slate-500">Loading your registrations...</p>
        </div>
      ) : filteredRegistrations.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-md mx-auto space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
            <FileText className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No Registrations Found</h3>
          <p className="text-xs text-slate-500">
            {statusFilter !== 'All'
              ? `You do not have any registrations with status "${statusFilter}".`
              : "You haven't registered for any medical camps yet. Check the schedule to get your free health screening."}
          </p>
          <Link
            to="/camps"
            className="inline-block px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl shadow transition-colors"
          >
            Explore Available Camps
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRegistrations.map((reg) => (
            <div
              key={reg.registrationId}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex flex-col items-center justify-center font-mono border border-teal-200 shrink-0">
                    <span className="text-[9px] uppercase font-bold text-teal-600">TOKEN</span>
                    <span className="text-sm font-black">{reg.tokenNumber}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{reg.campName}</h3>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">
                      Reg ID: {reg.registrationId} • Booked: {reg.registrationDate}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <StatusBadge status={reg.registrationStatus} />
                  {reg.attendance && (
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      Attendance: {reg.attendance}
                    </span>
                  )}
                </div>
              </div>

              {/* Schedule and venue */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>
                    <strong className="text-slate-700">Date:</strong> {reg.campDate}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                  <span className="truncate">
                    <strong className="text-slate-700">Venue:</strong> {reg.venue}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="truncate">
                    <strong className="text-slate-700">Doctor:</strong> {reg.doctorName}
                  </span>
                </div>
              </div>

              {/* Symptoms / Notes & Doctor Prescription / Vitals if Attended */}
              {reg.medicalNotes && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600">
                  <strong className="text-slate-800">Your Symptoms / Notes:</strong> {reg.medicalNotes}
                </div>
              )}

              {/* If Attended: Doctor Notes & Vitals */}
              {reg.doctorNotes && (
                <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3.5 space-y-2 text-xs">
                  <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Doctor's Consultation & Recommendation Summary
                  </div>
                  <p className="text-emerald-800 leading-relaxed">{reg.doctorNotes}</p>
                  {reg.vitals && (
                    <div className="flex flex-wrap gap-4 pt-1 font-mono text-[11px] text-emerald-900">
                      {reg.vitals.bp && <span>BP: <strong>{reg.vitals.bp}</strong></span>}
                      {reg.vitals.pulse && <span>Pulse: <strong>{reg.vitals.pulse}</strong></span>}
                      {reg.vitals.sugar && <span>Sugar: <strong>{reg.vitals.sugar}</strong></span>}
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-[11px] text-slate-400">
                  Emergency Contact: {reg.emergencyContact || 'None on file'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveSlip(reg)}
                    className="px-4 py-2 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <QrCode className="w-3.5 h-3.5" /> View / Print Entry Pass
                  </button>

                  {reg.registrationStatus !== 'Cancelled' && reg.registrationStatus !== 'Attended' && (
                    <button
                      type="button"
                      onClick={() => handleCancel(reg.registrationId)}
                      className="px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Slip Modal */}
      {activeSlip && (
        <RegistrationSlipModal
          registration={activeSlip}
          onClose={() => setActiveSlip(null)}
        />
      )}
    </div>
  );
};
