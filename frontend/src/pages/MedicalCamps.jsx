import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, MapPin, Stethoscope, RefreshCw } from 'lucide-react';
import { api } from '../services/api';
import { CampCard } from '../components/CampCard';
import { RegisterModal } from '../components/RegisterModal';
import { CampDetailsModal } from '../components/CampDetailsModal';
import { useAuth } from '../context/AuthContext';

const CAMP_TYPES = [
  'All',
  'Eye Camp',
  'Blood Donation Camp',
  'Dental Camp',
  'General Health',
  'Health Checkup',
  'Cardiology Camp',
  'Health Awareness'
];

export const MedicalCamps = () => {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [userRegistrations, setUserRegistrations] = useState([]);

  const [selectedCampForReg, setSelectedCampForReg] = useState(null);
  const [selectedCampForDetails, setSelectedCampForDetails] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    loadCamps();
  }, []);

  const loadCamps = async () => {
    setLoading(true);
    try {
      const data = await api.getCamps();
      setCamps(data);

      if (user?.userId) {
        const regs = await api.getRegistrations({ participantId: user.userId });
        setUserRegistrations(regs);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filtered camps logic
  const filteredCamps = camps.filter((camp) => {
    const matchesSearch =
      search === '' ||
      camp.campName.toLowerCase().includes(search.toLowerCase()) ||
      camp.venue.toLowerCase().includes(search.toLowerCase()) ||
      camp.doctorName.toLowerCase().includes(search.toLowerCase()) ||
      camp.campType.toLowerCase().includes(search.toLowerCase());

    const matchesType = selectedType === 'All' || camp.campType === selectedType;
    const matchesStatus = selectedStatus === 'All' || camp.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const registeredCampIds = new Set(
    userRegistrations.filter((r) => r.registrationStatus !== 'Cancelled').map((r) => r.campId)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
            Available Health Drives
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Medical Camps Directory
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse and reserve slots for upcoming specialized medical camps organized across campus.
          </p>
        </div>

        <div className="text-xs text-slate-500 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 self-start md:self-auto font-medium">
          Showing <strong className="text-slate-800">{filteredCamps.length}</strong> of {camps.length} Camps
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search bar */}
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search camp by name, venue, doctor, or keyword..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
            />
          </div>

          {/* Status Filter */}
          <div className="md:col-span-4">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none font-medium text-slate-700"
            >
              <option value="All">All Camp Statuses</option>
              <option value="Upcoming">Upcoming Camps Only</option>
              <option value="Completed">Past / Completed Camps</option>
            </select>
          </div>
        </div>

        {/* Camp Type Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
          <span className="text-xs font-semibold text-slate-400 mr-1 shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {['All', ...Array.from(new Set(camps.map((c) => c.campType).filter(Boolean)))].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                selectedType === type
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Camp Cards Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm font-medium text-slate-500">Loading medical camps...</p>
        </div>
      ) : filteredCamps.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No Medical Camps Found</h3>
          <p className="text-xs text-slate-500">
            No medical camps match your current search filters or category. Try selecting "All" or resetting your query.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setSelectedType('All');
              setSelectedStatus('All');
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-xl transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCamps.map((camp) => (
            <CampCard
              key={camp.campId}
              camp={camp}
              isRegistered={registeredCampIds.has(camp.campId)}
              onRegister={(c) => setSelectedCampForReg(c)}
              onSelectDetails={(c) => setSelectedCampForDetails(c)}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {selectedCampForReg && (
        <RegisterModal
          camp={selectedCampForReg}
          onClose={() => setSelectedCampForReg(null)}
          onSuccess={() => {
            loadCamps();
          }}
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
