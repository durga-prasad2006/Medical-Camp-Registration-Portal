import React from 'react';
import { X, Printer, HeartPulse, CheckCircle2, MapPin, Calendar, Clock, Stethoscope, QrCode } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

export const RegistrationSlipModal = ({ registration, onClose }) => {
  if (!registration) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200 print:max-w-full print:shadow-none print:border-none print:m-0">
        {/* Header - Screen only */}
        <div className="bg-slate-900 px-6 py-3.5 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-teal-400" />
            <span className="font-semibold text-sm">Medical Camp Entry Pass</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Pass Body */}
        <div className="p-6 bg-white relative">
          {/* Watermark/Top styling */}
          <div className="border-2 border-dashed border-teal-500 rounded-2xl p-5 bg-gradient-to-b from-teal-50/30 to-white relative overflow-hidden">
            {/* Top Pass Header */}
            <div className="flex justify-between items-start border-b border-slate-200 pb-4 mb-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded">
                  Official Camp Registration Pass
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1.5 leading-snug">
                  {registration.campName}
                </h3>
                <div className="text-xs text-slate-500 font-mono mt-0.5">
                  Reg ID: <strong>{registration.registrationId}</strong>
                </div>
              </div>

              {/* Token Number Pill */}
              <div className="text-center bg-teal-600 text-white rounded-xl px-3.5 py-2 shadow-sm shrink-0">
                <span className="text-[10px] block uppercase font-medium tracking-wide opacity-80">TOKEN NO</span>
                <span className="text-lg font-extrabold tracking-wider font-mono">
                  {registration.tokenNumber || 'TKN-001'}
                </span>
              </div>
            </div>

            {/* Camp Schedule & Venue */}
            <div className="grid grid-cols-2 gap-3 text-xs text-slate-700 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Date & Time</span>
                <div className="font-semibold flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-teal-600" />
                  {registration.campDate}
                </div>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Assigned Doctor</span>
                <div className="font-semibold flex items-center gap-1 mt-0.5 truncate">
                  <Stethoscope className="w-3.5 h-3.5 text-blue-600" />
                  {registration.doctorName}
                </div>
              </div>

              <div className="col-span-2">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Camp Venue</span>
                <div className="font-medium flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>{registration.venue}</span>
                </div>
              </div>
            </div>

            {/* Participant Details */}
            <div className="border-t border-slate-200 pt-3 mb-4">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Participant Information
              </h4>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Full Name:</span>
                  <span className="font-semibold text-slate-800">{registration.participantName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Blood Group:</span>
                  <span className="font-bold text-rose-600">{registration.participantBloodGroup || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Phone Number:</span>
                  <span className="font-medium text-slate-700">{registration.participantPhone || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Emergency Contact:</span>
                  <span className="font-medium text-slate-700 truncate block">{registration.emergencyContact || 'N/A'}</span>
                </div>
              </div>

              {registration.medicalNotes && (
                <div className="mt-2.5 bg-yellow-50/80 border border-yellow-200/60 rounded-lg p-2 text-[11px] text-amber-900">
                  <span className="font-bold">Medical Notes / Concerns: </span>
                  {registration.medicalNotes}
                </div>
              )}
            </div>

            {/* Verification Footer with Simulated QR Code */}
            <div className="border-t border-dashed border-slate-200 pt-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-white border border-slate-300 rounded-lg flex items-center justify-center p-1 shadow-inner">
                  {/* QR Icon simulation */}
                  <QrCode className="w-11 h-11 text-slate-800" />
                </div>
                <div className="text-[10px] text-slate-500">
                  <p className="font-semibold text-slate-700">Scan at Entry Desk</p>
                  <p>Booked: {registration.registrationDate}</p>
                  <p className="mt-0.5 text-teal-600 font-medium">Valid for one-time admission</p>
                </div>
              </div>

              <div className="text-right">
                <StatusBadge status={registration.registrationStatus} />
                <div className="text-[10px] text-slate-400 mt-1 font-mono">
                  Att: {registration.attendance || 'Pending'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions - Hidden when printing */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-between print:hidden">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-5 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-xl flex items-center gap-2 shadow-sm transition-colors"
          >
            <Printer className="w-4 h-4" /> Print / Save Pass (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};
