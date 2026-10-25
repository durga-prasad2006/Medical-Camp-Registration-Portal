import React, { useState, useEffect, useCallback } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  X,
  AlertCircle,
  Eye
} from 'lucide-react';
import { api } from '../services/api';
import { StatusBadge } from '../components/StatusBadge';
import { Link } from 'react-router-dom';

const DEFAULT_CAMP_FORM = {
  campName: '',
  campType: 'General Health',
  campDate: '',
  startTime: '09:00 AM',
  endTime: '02:00 PM',
  venue: '',
  doctorName: '',
  doctorSpecialization: '',
  maximumParticipants: 100,
  status: 'Upcoming',
  description: '',
  instructions: '',
  image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80'
};

export const ManageCamps = () => {
  const [camps, setCamps] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCamp, setEditingCamp] = useState(null);
  const [formData, setFormData] = useState(DEFAULT_CAMP_FORM);
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadCamps = async () => {
    setLoading(true);
    try {
      const data = await api.getCamps();
      setCamps(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadDoctors = async () => {
    setLoadingDoctors(true);
    try {
      const data = await api.getDoctors();
      setDoctors(data || []);
      return data || [];
    } catch (err) {
      console.error('Failed to load registered doctors:', err);
      return [];
    } finally {
      setLoadingDoctors(false);
    }
  };

  useEffect(() => {
    loadCamps();
    loadDoctors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenAddModal = async () => {
    setEditingCamp(null);
    const docs = doctors.length > 0 ? doctors : await loadDoctors();
    const defaultDoctorName = docs.length > 0 ? docs[0].name : '';
    setFormData({
      ...DEFAULT_CAMP_FORM,
      doctorName: defaultDoctorName
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (camp) => {
    setEditingCamp(camp);
    setFormData({
      campName: camp.campName,
      campType: camp.campType,
      campDate: camp.campDate,
      startTime: camp.startTime || '09:00 AM',
      endTime: camp.endTime || '02:00 PM',
      venue: camp.venue,
      doctorName: camp.doctorName,
      doctorSpecialization: camp.doctorSpecialization || '',
      maximumParticipants: camp.maximumParticipants,
      status: camp.status || 'Upcoming',
      description: camp.description || '',
      instructions: camp.instructions || '',
      image: camp.image || DEFAULT_CAMP_FORM.image
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleDeleteCamp = async (campId) => {
    if (!window.confirm(`Are you sure you want to delete camp ${campId}? Associated registrations will be marked as cancelled.`)) {
      return;
    }
    try {
      await api.deleteCamp(campId);
      loadCamps();
    } catch (err) {
      alert(err.message || 'Failed to delete camp');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.doctorName) {
      setFormError('Please select a registered doctor from the database.');
      return;
    }

    setSubmitting(true);

    try {
      if (editingCamp) {
        await api.updateCamp(editingCamp.campId, formData);
      } else {
        await api.createCamp(formData);
      }
      setIsModalOpen(false);
      loadCamps();
    } catch (err) {
      setFormError(err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredCamps = camps.filter((c) =>
    c.campName.toLowerCase().includes(search.toLowerCase()) ||
    c.venue.toLowerCase().includes(search.toLowerCase()) ||
    c.doctorName.toLowerCase().includes(search.toLowerCase()) ||
    c.campType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
            Camp Management (CRUD)
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Manage Medical Camps
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Create, modify, update schedules, assign doctors, and set participant capacity limits.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" /> Add New Medical Camp
        </button>
      </div>

      {/* Filter / Search bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by camp title, venue, doctor, or type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>

        <span className="text-xs font-semibold text-slate-500">
          Total: {camps.length} Camps
        </span>
      </div>

      {/* Camps Table */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-xs text-slate-500">Loading camps...</p>
        </div>
      ) : filteredCamps.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 space-y-3">
          <p className="text-sm font-bold text-slate-700">No medical camps found.</p>
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="px-4 py-2 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-xl"
          >
            Create Your First Camp
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Camp Details</th>
                  <th className="py-3.5 px-4">Date & Time</th>
                  <th className="py-3.5 px-4">Venue</th>
                  <th className="py-3.5 px-4">Doctor Assigned</th>
                  <th className="py-3.5 px-4">Enrolled / Cap</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredCamps.map((camp) => {
                  const percent = Math.min(
                    100,
                    Math.round(((camp.registeredCount || 0) / (camp.maximumParticipants || 1)) * 100)
                  );

                  return (
                    <tr key={camp.campId} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 text-sm">{camp.campName}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] font-mono text-slate-400 font-semibold">
                            {camp.campId}
                          </span>
                          <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-1.5 py-0.2 rounded border border-teal-100">
                            {camp.campType}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-semibold text-slate-800">{camp.campDate}</div>
                        <div className="text-[11px] text-slate-400">
                          {camp.startTime} - {camp.endTime}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 max-w-[180px] truncate" title={camp.venue}>
                        {camp.venue}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-semibold text-slate-800">{camp.doctorName}</div>
                        {camp.doctorSpecialization && (
                          <div className="text-[10px] text-slate-400 truncate max-w-[140px]">
                            {camp.doctorSpecialization}
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-bold text-slate-800">
                          {camp.registeredCount || 0} / {camp.maximumParticipants}
                        </div>
                        <div className="w-20 bg-slate-200 rounded-full h-1.5 mt-1 overflow-hidden">
                          <div
                            className={`h-1.5 rounded-full ${
                              percent >= 90 ? 'bg-rose-500' : 'bg-teal-500'
                            }`}
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <StatusBadge status={camp.status} />
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            to={`/admin/registrations?campId=${camp.campId}`}
                            title="View registered participants"
                            className="p-1.5 text-slate-600 hover:text-teal-600 hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>

                          <button
                            type="button"
                            title="Edit camp details"
                            onClick={() => handleOpenEditModal(camp)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            title="Delete camp"
                            onClick={() => handleDeleteCamp(camp.campId)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">
                {editingCamp ? 'Edit Medical Camp Details' : 'Schedule New Medical Camp'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4 text-xs">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Camp Title */}
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Medical Camp Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Free Eye Check-up & Cataract Screening Camp"
                    value={formData.campName}
                    onChange={(e) => setFormData({ ...formData, campName: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                {/* Camp Type */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Camp Type <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.campType}
                    onChange={(e) => setFormData({ ...formData, campType: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                  >
                    <option value="General Health">General Health</option>
                    <option value="Eye Camp">Eye Camp</option>
                    <option value="Blood Donation Camp">Blood Donation Camp</option>
                    <option value="Dental Camp">Dental Camp</option>
                    <option value="Cardiology Camp">Cardiology Camp</option>
                    <option value="Health Awareness">Health Awareness</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Camp Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                  >
                    <option value="Upcoming">Upcoming</option>
                    <option value="Active">Active / Ongoing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Camp Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.campDate}
                    onChange={(e) => setFormData({ ...formData, campDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                {/* Max Slots */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Maximum Capacity (Slots) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="1000"
                    required
                    value={formData.maximumParticipants}
                    onChange={(e) => setFormData({ ...formData, maximumParticipants: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                {/* Timing */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Start Time</label>
                  <input
                    type="text"
                    placeholder="09:00 AM"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">End Time</label>
                  <input
                    type="text"
                    placeholder="02:00 PM"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                {/* Venue */}
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Venue / Campus Location <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. College Auditorium, Block A"
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                {/* Doctor Name & Specialization */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Assigned Doctor Name <span className="text-rose-500">*</span>
                  </label>
                  {doctors.length > 0 ? (
                    <select
                      required
                      value={formData.doctorName}
                      onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                    >
                      <option value="" disabled>-- Select Registered Doctor --</option>
                      {doctors.map((doc) => (
                        <option key={doc.userId || doc._id || doc.name} value={doc.name}>
                          {doc.name} {doc.email ? `(${doc.email})` : ''}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
                      {loadingDoctors ? 'Loading doctors from database...' : 'No registered doctors found. Please register a doctor first.'}
                    </div>
                  )}
                  <p className="text-[11px] text-slate-500 mt-1">
                    Only registered doctors present in the database can be assigned to camps.
                  </p>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Doctor Specialization
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ophthalmology / General Medicine"
                    value={formData.doctorSpecialization}
                    onChange={(e) => setFormData({ ...formData, doctorSpecialization: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Camp Description & Services Provided
                  </label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Explain clinical check-ups, tests offered, and services..."
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none resize-none"
                  ></textarea>
                </div>

                {/* Instructions */}
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Participant Guidelines / Instructions
                  </label>
                  <textarea
                    rows={2}
                    value={formData.instructions}
                    onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                    placeholder="e.g. Bring previous glasses prescription, fasting guidelines..."
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Saving Camp...' : editingCamp ? 'Update Camp' : 'Create Camp'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
