import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FileSpreadsheet,
  Printer,
  Search,
  Filter,
  Users,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Shield,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { api } from '../services/api';
import { StatusBadge } from '../components/StatusBadge';

export const AdminRegistrations = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const campIdFromQuery = searchParams.get('campId') || 'All';

  const [registrations, setRegistrations] = useState([]);
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCampId, setSelectedCampId] = useState(campIdFromQuery);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (campIdFromQuery) {
      setSelectedCampId(campIdFromQuery);
    }
  }, [campIdFromQuery]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [campsData, regsData] = await Promise.all([
        api.getCamps(),
        api.getRegistrations()
      ]);
      setCamps(campsData);
      setRegistrations(regsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (registrationId, newStatus) => {
    try {
      await api.updateRegistrationStatus(registrationId, {
        registrationStatus: newStatus,
        attendance: newStatus === 'Attended' ? 'Present' : 'Pending'
      });
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to update status');
    }
  };

  const handleExportCSV = () => {
    if (filteredRegistrations.length === 0) {
      alert('No records available to export.');
      return;
    }

    const headers = [
      'Registration ID',
      'Token Number',
      'Participant Name',
      'Email',
      'Phone',
      'Age',
      'Gender',
      'Blood Group',
      'Camp Name',
      'Camp Date',
      'Venue',
      'Doctor Name',
      'Status',
      'Attendance',
      'Booking Timestamp',
      'Emergency Contact',
      'Medical Notes'
    ];

    const rows = filteredRegistrations.map((r) => [
      r.registrationId,
      r.tokenNumber,
      `"${r.participantName}"`,
      r.participantEmail,
      `"${r.participantPhone}"`,
      r.participantAge || '',
      r.participantGender || '',
      r.participantBloodGroup || '',
      `"${r.campName}"`,
      r.campDate,
      `"${r.venue}"`,
      `"${r.doctorName}"`,
      r.registrationStatus,
      r.attendance || 'Pending',
      r.registrationDate,
      `"${r.emergencyContact || ''}"`,
      `"${(r.medicalNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Medical_Camp_Registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredRegistrations = registrations.filter((reg) => {
    const matchesCamp = selectedCampId === 'All' || reg.campId === selectedCampId;
    const matchesStatus = selectedStatus === 'All' || reg.registrationStatus === selectedStatus;
    const matchesSearch =
      search === '' ||
      reg.participantName.toLowerCase().includes(search.toLowerCase()) ||
      reg.tokenNumber.toLowerCase().includes(search.toLowerCase()) ||
      reg.participantEmail.toLowerCase().includes(search.toLowerCase()) ||
      reg.campName.toLowerCase().includes(search.toLowerCase());

    return matchesCamp && matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header - Hidden during print */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6 print:hidden">
        <div>
          <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
            Reports & Rosters
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Participant Registrations & Reports
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Audit participant enrollments, update registration statuses, and export accreditation reports.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleExportCSV}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" /> Export to CSV
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" /> Print / Save PDF
          </button>
        </div>
      </div>

      {/* Print-Only Header */}
      <div className="hidden print:block mb-6 border-b border-slate-400 pb-4">
        <h2 className="text-2xl font-bold text-slate-900">
          Campus Medical Camp Participant Master Report
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          Generated on: {new Date().toLocaleString()} | Camp Filter: {selectedCampId} | Status: {selectedStatus}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3 print:hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search participant, token, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          {/* Camp Selector */}
          <div className="md:col-span-5">
            <select
              value={selectedCampId}
              onChange={(e) => {
                setSelectedCampId(e.target.value);
                setSearchParams(e.target.value === 'All' ? {} : { campId: e.target.value });
              }}
              className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none text-slate-700 font-medium"
            >
              <option value="All">All Medical Camps ({camps.length})</option>
              {camps.map((c) => (
                <option key={c.campId} value={c.campId}>
                  {c.campName} ({c.campDate})
                </option>
              ))}
            </select>
          </div>

          {/* Status Selector */}
          <div className="md:col-span-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none text-slate-700 font-medium"
            >
              <option value="All">All Statuses</option>
              <option value="Confirmed">Confirmed Only</option>
              <option value="Attended">Attended Only</option>
              <option value="Cancelled">Cancelled Only</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs text-slate-500 pt-1 border-t border-slate-100">
          <span>
            Showing <strong className="text-slate-800">{filteredRegistrations.length}</strong> matching registrations
          </span>
          {(selectedCampId !== 'All' || selectedStatus !== 'All' || search) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCampId('All');
                setSelectedStatus('All');
                setSearch('');
                setSearchParams({});
              }}
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Registrations Data Table */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-xs text-slate-500">Loading registrations...</p>
        </div>
      ) : filteredRegistrations.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 space-y-2 shadow-sm">
          <Users className="w-10 h-10 text-slate-400 mx-auto" />
          <h4 className="text-sm font-bold text-slate-800">No Registrations Found</h4>
          <p className="text-xs text-slate-500">
            No participant records matched your filter criteria.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Token & ID</th>
                  <th className="py-3.5 px-4">Participant Details</th>
                  <th className="py-3.5 px-4">Camp & Venue</th>
                  <th className="py-3.5 px-4">Doctor & Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Attendance</th>
                  <th className="py-3.5 px-4 text-right print:hidden">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredRegistrations.map((reg) => (
                  <tr key={reg.registrationId} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 block w-max">
                        {reg.tokenNumber}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 mt-0.5 block">
                        {reg.registrationId}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{reg.participantName}</div>
                      <div className="text-[11px] text-slate-500">{reg.participantEmail}</div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span>{reg.participantPhone}</span>
                        {reg.participantBloodGroup && (
                          <span className="font-bold text-rose-600 bg-rose-50 px-1 rounded">
                            {reg.participantBloodGroup}
                          </span>
                        )}
                        {reg.participantAge && (
                          <span>{reg.participantAge} yrs</span>
                        )}
                      </div>
                      {reg.medicalNotes && (
                        <div className="text-[10px] text-amber-800 bg-amber-50/80 px-1.5 py-0.5 rounded mt-1 max-w-xs truncate" title={reg.medicalNotes}>
                          Note: {reg.medicalNotes}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 max-w-[200px]">
                      <div className="font-semibold text-slate-800 line-clamp-1">{reg.campName}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">{reg.venue}</div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-semibold text-slate-800">{reg.doctorName}</div>
                      <div className="text-[11px] text-slate-400">{reg.campDate}</div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <StatusBadge status={reg.registrationStatus} />
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                          reg.attendance === 'Present'
                            ? 'bg-emerald-100 text-emerald-800'
                            : reg.attendance === 'Absent'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {reg.attendance || 'Pending'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap print:hidden">
                      <select
                        value={reg.registrationStatus}
                        onChange={(e) => handleStatusChange(reg.registrationId, e.target.value)}
                        className="px-2 py-1 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                      >
                        <option value="Confirmed">Set Confirmed</option>
                        <option value="Attended">Set Attended</option>
                        <option value="Cancelled">Set Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
