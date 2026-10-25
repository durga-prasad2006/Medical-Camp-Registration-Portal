import React, { useState } from 'react';
import { X, Calendar, MapPin, User, HeartPulse, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Link } from 'react-router-dom';

export const RegisterModal = ({ camp, onClose, onSuccess }) => {
  const { user, isAuthenticated } = useAuth();
  const [emergencyContact, setEmergencyContact] = useState(user?.emergencyContact || user?.phone || '');
  const [medicalNotes, setMedicalNotes] = useState('');
  const [confirmedInfo, setConfirmedInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successData, setSuccessData] = useState(null);

  if (!camp) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return;
    if (!confirmedInfo) {
      setError('Please acknowledge the health consultation disclaimer.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const reg = await api.registerCamp({
        participant: user,
        campId: camp.campId,
        emergencyContact,
        medicalNotes
      });
      setSuccessData(reg);
      if (onSuccess) {
        onSuccess(reg);
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-700 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-teal-200" />
            <h3 className="font-bold text-lg">Medical Camp Registration</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-teal-100 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {successData ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-1">Registration Successful!</h4>
              <p className="text-slate-600 text-sm mb-4">
                You have been registered for <strong>{camp.campName}</strong>.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left mb-6 max-w-sm mx-auto text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Registration ID:</span>
                  <span className="font-mono font-bold text-teal-700">{successData.registrationId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Token Number:</span>
                  <span className="font-bold text-slate-800 bg-teal-100 text-teal-800 px-2 py-0.5 rounded">
                    {successData.tokenNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date & Venue:</span>
                  <span className="text-slate-700 text-right">{camp.campDate} • {camp.venue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span className="font-semibold text-emerald-600">{successData.registrationStatus}</span>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <Link
                  to="/my-registrations"
                  onClick={onClose}
                  className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-xl shadow transition-colors"
                >
                  View My Registrations Pass
                </Link>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-xl transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : !isAuthenticated ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-2">Login Required to Register</h4>
              <p className="text-slate-600 text-sm mb-6 max-w-md mx-auto">
                Please log in as a participant or create an account to book your free slot for this medical camp.
              </p>
              <div className="flex justify-center gap-3">
                <Link
                  to="/login"
                  onClick={onClose}
                  className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-xl shadow transition-colors"
                >
                  Log In Now
                </Link>
                <Link
                  to="/register"
                  onClick={onClose}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold rounded-xl transition-colors"
                >
                  Create Account
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Camp Summary Banner */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5">
                <div className="font-semibold text-slate-800 text-sm">{camp.campName}</div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-teal-600" />
                    {camp.campDate} ({camp.startTime || '09:00 AM'} - {camp.endTime || '02:00 PM'})
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    {camp.venue}
                  </span>
                </div>
              </div>

              {/* Participant Details Summary */}
              <div className="grid grid-cols-2 gap-3 bg-teal-50/50 border border-teal-100 rounded-xl p-3.5 text-xs text-slate-700">
                <div>
                  <span className="text-slate-400 block">Participant:</span>
                  <span className="font-semibold text-slate-800">{user.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Email:</span>
                  <span className="font-medium truncate block">{user.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Blood Group:</span>
                  <span className="font-semibold text-rose-600">{user.bloodGroup || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Age & Gender:</span>
                  <span>{user.age ? `${user.age} yrs` : 'N/A'}, {user.gender || 'N/A'}</span>
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Emergency Contact Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. +91 98765 43210 (Father/Guardian)"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                />
              </div>

              {/* Medical Symptoms / Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Specific Health Concerns, Symptoms or Allergies (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Frequent headaches, taking blood pressure medication, penicillin allergy..."
                  value={medicalNotes}
                  onChange={(e) => setMedicalNotes(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none resize-none"
                ></textarea>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  This helps the attending doctor ({camp.doctorName}) prepare for your consultation.
                </p>
              </div>

              {/* Disclaimer */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="confirmHealth"
                  checked={confirmedInfo}
                  onChange={(e) => setConfirmedInfo(e.target.checked)}
                  className="mt-1 rounded text-teal-600 focus:ring-teal-500"
                />
                <label htmlFor="confirmHealth" className="text-xs text-slate-600 leading-snug cursor-pointer">
                  I confirm that the details provided are accurate. I understand this is a free preventive medical screening camp organized on campus.
                </label>
              </div>

              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm hover:shadow transition-colors disabled:opacity-50"
                >
                  {loading ? 'Confirming Registration...' : 'Confirm Registration'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
