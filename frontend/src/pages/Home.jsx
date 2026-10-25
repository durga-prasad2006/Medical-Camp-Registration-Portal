import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Eye,
  Droplet,
  Smile,
  Activity,
  CheckCircle2,
  Stethoscope,
  Sparkles
} from 'lucide-react';
import { api } from '../services/api';
import { CampCard } from '../components/CampCard';
import { RegisterModal } from '../components/RegisterModal';
import { CampDetailsModal } from '../components/CampDetailsModal';
import { useAuth } from '../context/AuthContext';

export const Home = () => {
  const [camps, setCamps] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedCampForReg, setSelectedCampForReg] = useState(null);
  const [selectedCampForDetails, setSelectedCampForDetails] = useState(null);
  const [userRegistrations, setUserRegistrations] = useState([]);
  const { user, role } = useAuth();

  const loadData = async () => {
    try {
      const campsData = await api.getCamps();
      setCamps(campsData);
      const statsData = await api.getStats();
      setStats(statsData);

      if (user?.userId) {
        const regs = await api.getRegistrations({ participantId: user.userId });
        setUserRegistrations(regs);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleRegisterSuccess = () => {
    loadData();
  };

  const upcomingCamps = camps
    .filter((c) => c.status === 'Upcoming')
    .slice(0, 3);

  const registeredCampIds = new Set(
    userRegistrations.filter((r) => r.registrationStatus !== 'Cancelled').map((r) => r.campId)
  );

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        {/* Glow ambient effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>Healthcare & Wellness Initiative</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Digital Campus <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-emerald-400">
                  Medical Camp
                </span>{' '}
                Portal
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Transforming paper-based health camp management. Register online for free eye, dental, blood donation, and health check-ups, track status, and empower doctors with real-time participant records.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/camps"
                  className="px-6 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-teal-500/25 transition-all flex items-center gap-2 group"
                >
                  Explore Upcoming Camps
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                {!user && (
                  <Link
                    to="/register"
                    className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700 transition-colors"
                  >
                    Participant Sign Up
                  </Link>
                )}

                {role === 'admin' && (
                  <Link
                    to="/admin"
                    className="px-6 py-3.5 rounded-xl bg-purple-600/90 hover:bg-purple-600 text-white font-semibold text-sm transition-colors"
                  >
                    Admin Dashboard
                  </Link>
                )}

                {role === 'doctor' && (
                  <Link
                    to="/doctor"
                    className="px-6 py-3.5 rounded-xl bg-cyan-600/90 hover:bg-cyan-600 text-white font-semibold text-sm transition-colors"
                  >
                    Doctor Portal
                  </Link>
                )}
              </div>

              {/* Badges checklist */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" /> 100% Free Campus Check-ups
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" /> Instant Token Pass
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" /> Verified Medical Doctors
                </span>
              </div>
            </div>

            {/* Right Col: Quick Interactive Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-6 shadow-2xl space-y-5 text-left">
                <div className="flex items-center justify-between border-b border-slate-700/70 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">Live Camp Statistics</h4>
                      <p className="text-[11px] text-slate-400">Campus Health & Wellness</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse">
                    Live Portal
                  </span>
                </div>

                {/* Stat numbers */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-900/70 border border-slate-700/60 rounded-xl p-3.5">
                    <span className="text-xs text-slate-400 block mb-1">Total Camps</span>
                    <span className="text-2xl font-extrabold text-teal-300">
                      {stats?.totalCamps || 6}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">Active & Upcoming</span>
                  </div>

                  <div className="bg-slate-900/70 border border-slate-700/60 rounded-xl p-3.5">
                    <span className="text-xs text-slate-400 block mb-1">Participants</span>
                    <span className="text-2xl font-extrabold text-cyan-300">
                      {stats?.totalRegistrations || 420}+
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">Slots Booked</span>
                  </div>

                  <div className="bg-slate-900/70 border border-slate-700/60 rounded-xl p-3.5">
                    <span className="text-xs text-slate-400 block mb-1">Doctors On Duty</span>
                    <span className="text-2xl font-extrabold text-purple-300">
                      {stats?.doctorsCount || 3}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">Specialists</span>
                  </div>

                  <div className="bg-slate-900/70 border border-slate-700/60 rounded-xl p-3.5">
                    <span className="text-xs text-slate-400 block mb-1">Slot Fill Rate</span>
                    <span className="text-2xl font-extrabold text-emerald-300">
                      {stats?.capacityRate || 68}%
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">Overall Capacity</span>
                  </div>
                </div>

                {/* Quick Banner Alert */}
                <div className="bg-teal-900/40 border border-teal-700/50 rounded-xl p-3 flex items-start gap-3 text-xs">
                  <Stethoscope className="w-5 h-5 text-teal-300 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-teal-200">Next Upcoming Camp:</span>
                    <p className="text-slate-300 mt-0.5">
                      Eye Check-up & Cataract Screening on <strong>Oct 5, 2026</strong> at College Auditorium.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CAMP SPECIALIZATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-2">
            Camp Specializations
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Free Healthcare Services Provided On Campus
          </h3>
          <p className="text-sm text-slate-600 mt-2">
            Each camp is staffed by registered medical specialists equipped with diagnostic gear.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <Eye className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-800 text-base mb-1">Eye & Vision Camp</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Refraction tests, computer-vision syndrome screening, cataract diagnosis, and complimentary prescription glasses.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <Droplet className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-800 text-base mb-1">Blood Donation Camp</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Organized in collaboration with Red Cross. Voluntary donation, hemoglobin tests, blood group certificate, and refreshments.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4">
              <Smile className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-800 text-base mb-1">Dental & Oral Care</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Comprehensive dental check-ups, cavity detection, teeth scaling consultation, and oral hygiene education kits.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
              <Activity className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-800 text-base mb-1">General Health & Vitals</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Blood pressure, BMI, blood glucose (sugar), oxygen levels, ECG, and one-on-one lifestyle consultation with physicians.
            </p>
          </div>
        </div>
      </section>

      {/* 3. UPCOMING MEDICAL CAMPS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-1">
              Scheduled Schedules
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Upcoming Medical Camps
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Select an available camp below and reserve your participation slot in seconds.
            </p>
          </div>

          <Link
            to="/camps"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors"
          >
            <span>View All Camps</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingCamps.map((camp) => (
            <CampCard
              key={camp.campId}
              camp={camp}
              isRegistered={registeredCampIds.has(camp.campId)}
              onRegister={(c) => setSelectedCampForReg(c)}
              onSelectDetails={(c) => setSelectedCampForDetails(c)}
            />
          ))}
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-1">
              Simple 4-Step Process
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              How the Registration Portal Works
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Designed for speed and ease so participants avoid long queues and get verified tokens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center relative shadow-sm">
              <div className="w-12 h-12 bg-teal-600 text-white font-extrabold text-lg rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md shadow-teal-500/20">
                1
              </div>
              <h4 className="font-bold text-slate-800 text-base mb-1">Browse & Select Camp</h4>
              <p className="text-xs text-slate-600">
                Explore upcoming medical camps filtered by category, venue, and doctor.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center relative shadow-sm">
              <div className="w-12 h-12 bg-teal-600 text-white font-extrabold text-lg rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md shadow-teal-500/20">
                2
              </div>
              <h4 className="font-bold text-slate-800 text-base mb-1">Book Your Slot</h4>
              <p className="text-xs text-slate-600">
                Fill in basic health notes and emergency contact to secure your appointment.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center relative shadow-sm">
              <div className="w-12 h-12 bg-teal-600 text-white font-extrabold text-lg rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md shadow-teal-500/20">
                3
              </div>
              <h4 className="font-bold text-slate-800 text-base mb-1">Get Digital Pass</h4>
              <p className="text-xs text-slate-600">
                Receive an instant token pass with registration ID to display at the camp venue.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center relative shadow-sm">
              <div className="w-12 h-12 bg-teal-600 text-white font-extrabold text-lg rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md shadow-teal-500/20">
                4
              </div>
              <h4 className="font-bold text-slate-800 text-base mb-1">Free Consultation</h4>
              <p className="text-xs text-slate-600">
                Doctor scans your token, marks attendance, records vitals, and offers guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      {selectedCampForReg && (
        <RegisterModal
          camp={selectedCampForReg}
          onClose={() => setSelectedCampForReg(null)}
          onSuccess={handleRegisterSuccess}
        />
      )}

      {selectedCampForDetails && (
        <CampDetailsModal
          camp={selectedCampForDetails}
          onClose={() => setSelectedCampForDetails(null)}
          onRegister={(camp) => {
            setSelectedCampForDetails(null);
            setSelectedCampForReg(camp);
          }}
          isRegistered={registeredCampIds.has(selectedCampForDetails.campId)}
        />
      )}
    </div>
  );
};
