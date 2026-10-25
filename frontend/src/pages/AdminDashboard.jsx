import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Calendar,
  Users,
  CheckCircle,
  PlusCircle,
  FileSpreadsheet,
  TrendingUp,
  Stethoscope,
  Clock,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { api } from '../services/api';
import { StatusBadge } from '../components/StatusBadge';

export const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [camps, setCamps] = useState([]);
  const [recentRegistrations, setRecentRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [statsData, campsData, regsData] = await Promise.all([
        api.getStats(),
        api.getCamps(),
        api.getRegistrations()
      ]);
      setStats(statsData);
      setCamps(campsData);
      setRecentRegistrations(regsData.slice(0, 5));
    } catch (err) {
      console.error('Error loading admin stats:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 mb-1.5">
            <Shield className="w-3.5 h-3.5" /> Administrator Operations Center
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Admin Management Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time analytics, camp schedule management, participant registrations, and attendance reporting.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/camps"
            className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" /> Manage Camps
          </Link>
          <Link
            to="/admin/registrations"
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-4 h-4" /> All Registrations & Reports
          </Link>
        </div>
      </div>

      {/* Primary KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">Total Medical Camps</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900">
                {stats?.totalCamps || 0}
              </span>
              <span className="text-xs font-semibold text-teal-600">
                ({stats?.upcomingCamps || 0} upcoming)
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">Total Registrations</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900">
                {stats?.totalRegistrations || 0}
              </span>
              <span className="text-xs font-semibold text-blue-600">
                ({stats?.confirmedRegistrations || 0} active)
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">Participants Attended</span>
            <span className="text-2xl font-extrabold text-slate-900">
              {stats?.attendedCount || 0}
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">Camp Capacity Fill</span>
            <span className="text-2xl font-extrabold text-slate-900">
              {stats?.capacityRate || 0}%
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Camp Status & Capacity Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Camp Schedule & Capacity Overview */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-600" />
              Active Medical Camps Status & Capacity
            </h3>
            <Link
              to="/admin/camps"
              className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
            >
              <span>Manage ({camps.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            {camps.slice(0, 4).map((camp) => {
              const percent = Math.min(
                100,
                Math.round(((camp.registeredCount || 0) / (camp.maximumParticipants || 1)) * 100)
              );

              return (
                <div
                  key={camp.campId}
                  className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-teal-600">
                        {camp.campType}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                        {camp.campName}
                      </h4>
                    </div>
                    <StatusBadge status={camp.status} />
                  </div>

                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {camp.campDate} • {camp.venue}
                    </span>
                    <span className="font-semibold text-slate-700">
                      {camp.registeredCount} / {camp.maximumParticipants} slots
                    </span>
                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full ${
                        percent >= 90 ? 'bg-rose-500' : percent >= 60 ? 'bg-amber-500' : 'bg-teal-500'
                      }`}
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Recent Registrations Stream */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              Recent Participant Registrations
            </h3>
            <Link
              to="/admin/registrations"
              className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm divide-y divide-slate-100">
            {recentRegistrations.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No registrations logged yet.</p>
            ) : (
              recentRegistrations.map((reg) => (
                <div key={reg.registrationId} className="py-3 first:pt-0 last:pb-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-xs text-slate-800 flex items-center gap-2">
                      <span className="font-mono text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                        {reg.tokenNumber}
                      </span>
                      {reg.participantName}
                    </div>
                    <StatusBadge status={reg.registrationStatus} />
                  </div>
                  <div className="text-[11px] text-slate-500 line-clamp-1">{reg.campName}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{reg.registrationDate}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
