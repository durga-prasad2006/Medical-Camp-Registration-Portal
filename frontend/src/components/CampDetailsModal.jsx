import React from 'react';
import { X, Calendar, Clock, MapPin, Stethoscope, Users, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

export const CampDetailsModal = ({ camp, onClose, onRegister, isRegistered }) => {
  if (!camp) return null;

  const percentFilled = Math.min(
    100,
    Math.round(((camp.registeredCount || 0) / (camp.maximumParticipants || 1)) * 100)
  );
  const isFull = (camp.registeredCount || 0) >= (camp.maximumParticipants || 1);
  const isPast = camp.status === 'Completed' || new Date(camp.campDate) < new Date(new Date().toDateString());

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        {/* Banner with Image */}
        <div className="relative h-56 w-full bg-slate-100">
          <img
            src={camp.image || 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80'}
            alt={camp.campName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div>
          
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500 text-white">
                {camp.campType}
              </span>
              <StatusBadge status={isPast ? 'Completed' : isFull ? 'Full' : camp.status} />
            </div>
            <h2 className="text-xl md:text-2xl font-bold leading-tight drop-shadow-sm">
              {camp.campName}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-6 text-slate-700">
          {/* Key Metrics Quick Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs">
            <div>
              <span className="text-slate-400 block mb-0.5">Date</span>
              <div className="font-semibold text-slate-800 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-teal-600" />
                {camp.campDate}
              </div>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Timing</span>
              <div className="font-semibold text-slate-800 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                {camp.startTime || '9:00 AM'} - {camp.endTime || '2:00 PM'}
              </div>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Assigned Doctor</span>
              <div className="font-semibold text-slate-800 flex items-center gap-1">
                <Stethoscope className="w-3.5 h-3.5 text-blue-600" />
                <span className="truncate">{camp.doctorName}</span>
              </div>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Registered / Slots</span>
              <div className="font-semibold text-slate-800 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-purple-600" />
                <span>{camp.registeredCount || 0} / {camp.maximumParticipants}</span>
              </div>
            </div>
          </div>

          {/* Location / Venue */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Camp Location & Venue</h4>
            <div className="flex items-center gap-2 text-sm text-slate-800 font-medium">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{camp.venue}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Camp Overview</h4>
            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
              {camp.description}
            </p>
          </div>

          {/* Instructions & Guidelines */}
          {camp.instructions && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-teal-600" /> Participant Guidelines & Preparation
              </h4>
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5 text-xs text-amber-900 leading-relaxed">
                {camp.instructions}
              </div>
            </div>
          )}

          {/* Doctor Information Card */}
          <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-3.5 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-base shrink-0">
              Dr
            </div>
            <div>
              <div className="text-sm font-bold text-slate-800">{camp.doctorName}</div>
              <div className="text-xs text-blue-700 font-medium">{camp.doctorSpecialization || 'Lead Medical Officer'}</div>
              <div className="text-[11px] text-slate-500">Conducting general diagnosis, vitals check, and consultations.</div>
            </div>
          </div>

          {/* Slot Progress Bar */}
          <div>
            <div className="flex justify-between text-xs font-medium text-slate-600 mb-1.5">
              <span>Slot Availability</span>
              <span>
                <strong>{camp.maximumParticipants - (camp.registeredCount || 0)}</strong> slots remaining ({percentFilled}% reserved)
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-2.5 rounded-full transition-all ${
                  percentFilled >= 90
                    ? 'bg-rose-500'
                    : percentFilled >= 65
                    ? 'bg-amber-500'
                    : 'bg-teal-500'
                }`}
                style={{ width: `${percentFilled}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Close
          </button>

          {isRegistered ? (
            <div className="flex items-center gap-1.5 text-sm font-semibold text-emerald-700 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" /> You are already registered
            </div>
          ) : isPast ? (
            <div className="text-sm font-semibold text-slate-400 bg-slate-200 px-4 py-2 rounded-xl">
              Camp Has Concluded
            </div>
          ) : isFull ? (
            <div className="flex items-center gap-1.5 text-sm font-semibold text-rose-600 bg-rose-50 px-4 py-2 rounded-xl border border-rose-200">
              <AlertCircle className="w-4 h-4" /> Camp Capacity Full
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onRegister) onRegister(camp);
              }}
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow transition-all"
            >
              Register for this Camp
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
