import React, { useState, useEffect, useCallback } from 'react';
import {
  Stethoscope,
  Users,
  CheckCircle,
  Clock,
  Search,
  X,
  Save
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const DoctorDashboard = () => {
  const { user } = useAuth();
  const [camps, setCamps] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [selectedCampId, setSelectedCampId] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal for consultation notes & vitals
  const [consultModalReg, setConsultModalReg] = useState(null);
  const [consultNotes, setConsultNotes] = useState('');
  const [vitals, setVitals] = useState({ bp: '', pulse: '', sugar: '' });
  const [submittingConsult, setSubmittingConsult] = useState(false);

  const loadDoctorData = async () => {
    setLoading(true);
    try {
      const [allCamps, allRegs] = await Promise.all([
        api.getCamps(),
        api.getRegistrations()
      ]);

      // Filter camps assigned to this doctor (or all if admin testing as doctor)
      const doctorName = user?.name || 'Dr. Rajesh Sharma';
      const myCamps = allCamps.filter((c) =>
        c.doctorName.toLowerCase().includes(doctorName.toLowerCase())
      );

      setCamps(myCamps.length > 0 ? myCamps : allCamps);
      setRegistrations(allRegs);
    } catch (err) {
      console.error('Error loading doctor data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctorData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleMarkAttendance = async (reg, newAttendance) => {
    try {
      await api.updateAttendanceAndNotes(reg.registrationId, {
        attendance: newAttendance,
        doctorNotes: reg.doctorNotes,
        vitals: reg.vitals
      });
      loadDoctorData();
    } catch (err) {
      alert(err.message || 'Failed to update attendance');
    }
  };

  const handleOpenConsultModal = (reg) => {
    setConsultModalReg(reg);
    setConsultNotes(reg.doctorNotes || '');
    setVitals(reg.vitals || { bp: '', pulse: '', sugar: '' });
  };

  const handleSaveConsult = async (e) => {
    e.preventDefault();
    if (!consultModalReg) return;
    setSubmittingConsult(true);

    try {
      await api.updateAttendanceAndNotes(consultModalReg.registrationId, {
        attendance: 'Present',
        doctorNotes: consultNotes,
        vitals
      });
      setConsultModalReg(null);
      loadDoctorData();
    } catch (err) {
      alert(err.message || 'Failed to save consultation');
    } finally {
      setSubmittingConsult(false);
    }
  };

  // Filter registrations for doctor
  const filteredRegistrations = registrations.filter((reg) => {
    const matchesCamp = selectedCampId === 'All' || reg.campId === selectedCampId;
    const matchesSearch =
      search === '' ||
      reg.participantName.toLowerCase().includes(search.toLowerCase()) ||
      reg.tokenNumber.toLowerCase().includes(search.toLowerCase()) ||
      reg.campName.toLowerCase().includes(search.toLowerCase());

    return matchesCamp && matchesSearch && reg.registrationStatus !== 'Cancelled';
  });

  const totalAssignedParticipants = filteredRegistrations.length;
  const attendedCount = filteredRegistrations.filter((r) => r.attendance === 'Present').length;
  const pendingCount = totalAssignedParticipants - attendedCount;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200 mb-1.5">
            <Stethoscope className="w-3.5 h-3.5" /> Medical Officer & Clinical Roster
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Doctor Clinical Portal
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review participant queue, update camp attendance, record clinical vitals, and issue consultation notes.
          </p>
        </div>

        <div className="bg-white p-3 rounded-2xl border border-slate-200 text-xs text-slate-700 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            Dr
          </div>
          <div>
            <div className="font-bold text-slate-900">{user?.name || 'Dr. Rajesh Sharma'}</div>
            <div className="text-[11px] text-slate-500">{user?.specialization || 'Cardiology & General Medicine'}</div>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">Total Roster Queue</span>
            <span className="text-2xl font-extrabold text-slate-900">{totalAssignedParticipants}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">Checked / Attended</span>
            <span className="text-2xl font-extrabold text-emerald-600">{attendedCount}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">Pending Consultation</span>
            <span className="text-2xl font-extrabold text-amber-600">{pendingCount}</span>
          </div>
        </div>
      </div>

      {/* Filter and Camp Selection */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by participant name, token, or symptoms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>

        {/* Camp Filter */}
        <div className="w-full sm:w-80">
          <select
            value={selectedCampId}
            onChange={(e) => setSelectedCampId(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none text-slate-700 font-medium"
          >
            <option value="All">All Assigned Medical Camps</option>
            {camps.map((c) => (
              <option key={c.campId} value={c.campId}>
                {c.campName} ({c.campDate})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Participant Roster Table */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-xs text-slate-500">Loading roster...</p>
        </div>
      ) : filteredRegistrations.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 space-y-2">
          <Users className="w-10 h-10 text-slate-400 mx-auto" />
          <h4 className="text-sm font-bold text-slate-800">No Participants in Roster</h4>
          <p className="text-xs text-slate-500">
            No registered participants found for this medical camp.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Token & Participant</th>
                  <th className="py-3.5 px-4">Age / Gender / Blood</th>
                  <th className="py-3.5 px-4">Camp Details</th>
                  <th className="py-3.5 px-4">Symptoms / Medical Notes</th>
                  <th className="py-3.5 px-4">Attendance</th>
                  <th className="py-3.5 px-4 text-right">Clinical Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredRegistrations.map((reg) => (
                  <tr key={reg.registrationId} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                          {reg.tokenNumber}
                        </span>
                        <div>
                          <div className="font-bold text-slate-900">{reg.participantName}</div>
                          <div className="text-[10px] text-slate-400">{reg.participantPhone}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div>
                        {reg.participantAge ? `${reg.participantAge} yrs` : 'N/A'}, {reg.participantGender || 'N/A'}
                      </div>
                      {reg.participantBloodGroup && (
                        <span className="font-bold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded text-[11px] inline-block mt-0.5">
                          {reg.participantBloodGroup}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 max-w-[180px]">
                      <div className="font-semibold text-slate-800 truncate">{reg.campName}</div>
                      <div className="text-[11px] text-slate-400">{reg.campDate}</div>
                    </td>

                    <td className="py-3.5 px-4 max-w-[220px]">
                      {reg.medicalNotes ? (
                        <div className="text-[11px] text-slate-700 bg-slate-50 p-1.5 rounded border border-slate-100 line-clamp-2" title={reg.medicalNotes}>
                          {reg.medicalNotes}
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">None noted</span>
                      )}

                      {reg.doctorNotes && (
                        <div className="mt-1 text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded truncate" title={reg.doctorNotes}>
                          Dr: {reg.doctorNotes}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                          reg.attendance === 'Present'
                            ? 'bg-emerald-100 text-emerald-800'
                            : reg.attendance === 'Absent'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {reg.attendance || 'Pending'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-1.5">
                      <button
                        type="button"
                        onClick={() => handleMarkAttendance(reg, reg.attendance === 'Present' ? 'Absent' : 'Present')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                          reg.attendance === 'Present'
                            ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                            : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        }`}
                      >
                        {reg.attendance === 'Present' ? 'Mark Absent' : 'Mark Present'}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenConsultModal(reg)}
                        className="px-2.5 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold transition-colors"
                      >
                        Record Vitals & Notes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal for Recording Vitals and Doctor Notes */}
      {consultModalReg && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">Doctor Consultation & Vitals Record</h3>
                <p className="text-xs text-slate-400">
                  {consultModalReg.participantName} ({consultModalReg.tokenNumber})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setConsultModalReg(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveConsult} className="p-6 space-y-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="font-bold text-slate-800 text-xs mb-1">
                  Participant's Reported Symptoms / History:
                </div>
                <p className="text-slate-600">
                  {consultModalReg.medicalNotes || 'No specific symptoms reported during registration.'}
                </p>
              </div>

              {/* Vitals Recording */}
              <div className="space-y-2">
                <label className="block font-bold text-slate-700">
                  Clinical Vital Signs (Optional)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5">Blood Pressure</label>
                    <input
                      type="text"
                      placeholder="120/80 mmHg"
                      value={vitals.bp}
                      onChange={(e) => setVitals({ ...vitals, bp: e.target.value })}
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5">Pulse Rate</label>
                    <input
                      type="text"
                      placeholder="72 bpm"
                      value={vitals.pulse}
                      onChange={(e) => setVitals({ ...vitals, pulse: e.target.value })}
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5">Blood Sugar</label>
                    <input
                      type="text"
                      placeholder="95 mg/dL"
                      value={vitals.sugar}
                      onChange={(e) => setVitals({ ...vitals, sugar: e.target.value })}
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>

              {/* Consultation Notes */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Doctor's Diagnosis, Advice & Prescriptions <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={consultNotes}
                  onChange={(e) => setConsultNotes(e.target.value)}
                  placeholder="e.g. Normal eye pressure observed. Prescribed lubricating eye drops twice daily. Recommended refraction re-check after 6 months."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setConsultModalReg(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingConsult}
                  className="px-5 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {submittingConsult ? 'Saving...' : 'Save & Mark Attended'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
