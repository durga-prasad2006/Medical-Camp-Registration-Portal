import React from 'react';
import { Calendar, Clock, MapPin, UserCheck, Stethoscope, AlertCircle } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

const TYPE_COLORS = {
  'Eye Camp': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'Blood Donation Camp': 'bg-rose-50 text-rose-700 border-rose-200',
  'Dental Camp': 'bg-cyan-50 text-cyan-700 border-cyan-200',
  'General Health': 'bg-teal-50 text-teal-700 border-teal-200',
  'Health Checkup': 'bg-teal-50 text-teal-700 border-teal-200',
  'Cardiology Camp': 'bg-red-50 text-red-700 border-red-200',
  'Health Awareness': 'bg-amber-50 text-amber-700 border-amber-200',
};

export const CampCard = ({ camp, onRegister, onSelectDetails, isRegistered = false }) => {
  const percentFilled = Math.min(
    100,
    Math.round(((camp.registeredCount || 0) / (camp.maximumParticipants || 1)) * 100)
  );

  const isFull = (camp.registeredCount || 0) >= (camp.maximumParticipants || 1);
  const isPast = camp.status === 'Completed' || new Date(camp.campDate) < new Date(new Date().toDateString());

  const badgeClass = TYPE_COLORS[camp.campType] || 'bg-slate-50 text-slate-700 border-slate-200';

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Camp Image / Header banner */}
        <div className="relative h-44 w-full overflow-hidden bg-slate-100">
          <img
            src={camp.image || 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80'}
            alt={camp.campName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border backdrop-blur-md bg-white/90 ${badgeClass}`}>
              {camp.campType}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <StatusBadge status={isPast ? 'Completed' : isFull ? 'Full' : camp.status} />
          </div>
        </div>

        {/* Camp Content */}
        <div className="p-5">
          <h3
            onClick={() => onSelectDetails && onSelectDetails(camp)}
            className="text-lg font-bold text-slate-800 hover:text-teal-600 transition-colors cursor-pointer line-clamp-1 mb-2"
          >
            {camp.campName}
          </h3>

          <p className="text-slate-600 text-xs line-clamp-2 mb-4 leading-relaxed">
            {camp.description}
          </p>

          <div className="space-y-2 text-xs text-slate-600 mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-600 shrink-0" />
              <span className="font-medium text-slate-700">
                {new Date(camp.campDate).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
              <span className="text-slate-400">•</span>
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{camp.startTime || '09:00 AM'} - {camp.endTime || '02:00 PM'}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
              <span className="truncate">{camp.venue}</span>
            </div>

            <div className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="font-medium text-slate-700">{camp.doctorName}</span>
              {camp.doctorSpecialization && (
                <span className="text-slate-400 truncate">({camp.doctorSpecialization})</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer & Capacity Indicator */}
      <div className="p-5 pt-0">
        {/* Capacity Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
            <span>Slot Capacity</span>
            <span>
              <strong className="text-slate-800">{camp.registeredCount || 0}</strong> / {camp.maximumParticipants} filled
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
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

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onSelectDetails && onSelectDetails(camp)}
            className="flex-1 py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Details
          </button>

          {isRegistered ? (
            <button
              type="button"
              disabled
              className="flex-1 py-2 px-3 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-center gap-1 cursor-default"
            >
              <UserCheck className="w-3.5 h-3.5" /> Enrolled
            </button>
          ) : isPast ? (
            <button
              type="button"
              disabled
              className="flex-1 py-2 px-3 text-xs font-semibold text-slate-400 bg-slate-100 rounded-lg cursor-not-allowed"
            >
              Concluded
            </button>
          ) : isFull ? (
            <button
              type="button"
              disabled
              className="flex-1 py-2 px-3 text-xs font-semibold text-rose-600 bg-rose-50 rounded-lg cursor-not-allowed flex items-center justify-center gap-1"
            >
              <AlertCircle className="w-3.5 h-3.5" /> Housefull
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onRegister && onRegister(camp)}
              className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm hover:shadow transition-colors"
            >
              Register Camp
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
