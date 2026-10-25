import { INITIAL_USERS, INITIAL_CAMPS, INITIAL_REGISTRATIONS } from './mockData';

const STORAGE_KEYS = {
  USERS: 'mcrp_users',
  CAMPS: 'mcrp_camps',
  REGISTRATIONS: 'mcrp_registrations',
  CURRENT_USER: 'mcrp_current_user',
};

// Configuration: Always use Express Backend connected to MongoDB Atlas!
export const USE_BACKEND = true;
export const API_BASE_URL = '/api';

export const safeFormatDate = (dateVal) => {
  if (!dateVal) return '';
  try {
    const d = new Date(dateVal);
    if (!isNaN(d.getTime())) {
      return d.toISOString().split('T')[0];
    }
  } catch {}
  return String(dateVal).split('T')[0];
};

// Initialize LocalStorage with seed data if not present
const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CAMPS)) {
    localStorage.setItem(STORAGE_KEYS.CAMPS, JSON.stringify(INITIAL_CAMPS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.REGISTRATIONS)) {
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(INITIAL_REGISTRATIONS));
  }
};

initializeStorage();

export const resetDatabaseToDefaults = () => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
  localStorage.setItem(STORAGE_KEYS.CAMPS, JSON.stringify(INITIAL_CAMPS));
  localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(INITIAL_REGISTRATIONS));
};

const getStoredData = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
    return [];
  }
};

const setStoredData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error writing ${key} to storage:`, e);
  }
};

// Helper delay to simulate real network request
const delay = (ms = 250) => new Promise(resolve => setTimeout(resolve, ms));

const getAuthHeaders = () => {
  const token = localStorage.getItem('mcrp_token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

/* =========================================================================
   REST API SERVICE LAYER
   ========================================================================= */
export const api = {
  // -----------------------------------------------------------------------
  // AUTHENTICATION APIs (POST /login, POST /register)
  // -----------------------------------------------------------------------
  login: async (email, password) => {
    await delay();
    if (USE_BACKEND) {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      
      // Store token and extract user details
      if (data.token) {
        localStorage.setItem('mcrp_token', data.token);
      }
      
      const safeUser = data.user || {
        email,
        name: data.name || email.split('@')[0],
        role: data.role || (email.includes('admin') ? 'admin' : email.includes('doctor') ? 'doctor' : 'participant'),
        userId: data.userId || `USR-${Date.now().toString().slice(-6)}`
      };
      
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(safeUser));
      return safeUser;
    }

    const users = getStoredData(STORAGE_KEYS.USERS);
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      throw new Error('Invalid email or password. Please check your credentials.');
    }

    const { password: _, ...safeUser } = user;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(safeUser));
    return safeUser;
  },

  adminLogin: async (password) => {
    await delay();
    if (USE_BACKEND) {
      const res = await fetch(`${API_BASE_URL}/admin-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Admin authentication failed');
      if (data.token) {
        localStorage.setItem('mcrp_token', data.token);
      }
      const safeUser = data.user;
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(safeUser));
      return safeUser;
    }

    const users = getStoredData(STORAGE_KEYS.USERS);
    const adminUser = users.find((u) => u.role === 'admin' && u.password === password);
    if (!adminUser) throw new Error('Invalid Admin Password. Access Denied.');
    const { password: _, ...safeUser } = adminUser;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(safeUser));
    return safeUser;
  },

  register: async (userData) => {
    await delay();
    const payload = {
      userId: userData.userId || `USR-${Date.now().toString().slice(-6)}`,
      role: userData.role || 'participant',
      name: userData.name,
      email: userData.email,
      password: userData.password
    };

    if (USE_BACKEND) {
      const res = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || data.error || 'Registration failed.');
      }

      if (data.token) {
        localStorage.setItem('mcrp_token', data.token);
      }

      const safeUser = data.user || { ...payload };
      delete safeUser.password;
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(safeUser));
      return safeUser;
    }

    const users = getStoredData(STORAGE_KEYS.USERS);
    const exists = users.some((u) => u.email.toLowerCase() === userData.email.toLowerCase());

    if (exists) {
      throw new Error('An account with this email address already exists.');
    }

    const newUser = {
      userId: `USR-${Date.now().toString().slice(-6)}`,
      role: userData.role || 'participant',
      name: userData.name,
      email: userData.email,
      password: userData.password,
      phone: userData.phone || '',
      age: userData.age ? Number(userData.age) : '',
      gender: userData.gender || 'Prefer not to say',
      bloodGroup: userData.bloodGroup || 'Not sure',
      address: userData.address || '',
      emergencyContact: userData.emergencyContact || '',
      department: userData.department || '',
      specialization: userData.specialization || '',
      hospital: userData.hospital || '',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    setStoredData(STORAGE_KEYS.USERS, users);

    const { password: _, ...safeUser } = newUser;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(safeUser));
    return safeUser;
  },

  getCurrentUser: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  logout: async () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem('mcrp_token');
    return true;
  },

  updateProfile: async (userId, updateData) => {
    await delay();
    if (USE_BACKEND) {
      try {
        const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(updateData),
        });
        const data = await res.json();
        if (res.ok && data.user) {
          const current = api.getCurrentUser() || {};
          const merged = { ...current, ...updateData, ...data.user };
          localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(merged));
          return merged;
        } else if (!res.ok) {
          console.warn('Backend update failed:', data.message);
        }
      } catch (err) {
        console.warn('Backend updateProfile failed, falling back to storage:', err);
      }
    }

    const current = api.getCurrentUser() || {};
    const merged = { ...current, ...updateData };
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(merged));

    const users = getStoredData(STORAGE_KEYS.USERS);
    const index = users.findIndex((u) => u.userId === userId);
    if (index !== -1) {
      const updated = { ...users[index], ...updateData };
      users[index] = updated;
      setStoredData(STORAGE_KEYS.USERS, users);
    }

    return merged;
  },

  // -----------------------------------------------------------------------
  // MEDICAL CAMPS APIs (GET, POST, PUT, DELETE /medicalCamps)
  // -----------------------------------------------------------------------
  getCamps: async (filters = {}) => {
    await delay();
    if (USE_BACKEND) {
      try {
        const res = await fetch(`${API_BASE_URL}/medicalCamps`, {
          headers: getAuthHeaders(),
        });
        if (res.ok) {
          const rawCamps = await res.json();
          let camps = rawCamps.map((c) => ({
            ...c,
            campId: c.campId || c._id,
            campName: c.campName,
            campType: c.campType || 'General Health',
            campDate: safeFormatDate(c.campDate),
            venue: c.venue || '',
            doctorName: c.doctorName || 'Dr. On Duty',
            maximumParticipants: Number(c.maximumParticipants || 50),
            registeredCount: c.registeredCount || 0,
            status: c.status || 'Upcoming',
            image: c.image || 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80'
          }));

          if (filters.search) {
            const q = filters.search.toLowerCase();
            camps = camps.filter(
              (c) =>
                c.campName?.toLowerCase().includes(q) ||
                c.venue?.toLowerCase().includes(q) ||
                c.campType?.toLowerCase().includes(q) ||
                c.doctorName?.toLowerCase().includes(q)
            );
          }

          if (filters.type && filters.type !== 'All') {
            camps = camps.filter((c) => c.campType === filters.type);
          }

          if (filters.status && filters.status !== 'All') {
            camps = camps.filter((c) => c.status === filters.status);
          }

          return camps;
        }
      } catch (err) {
        console.warn('Backend camps fetch failed, falling back to local storage:', err);
      }
    }

    let camps = getStoredData(STORAGE_KEYS.CAMPS);

    if (filters.search) {
      const q = filters.search.toLowerCase();
      camps = camps.filter(
        (c) =>
          c.campName.toLowerCase().includes(q) ||
          c.venue.toLowerCase().includes(q) ||
          c.campType.toLowerCase().includes(q) ||
          c.doctorName.toLowerCase().includes(q)
      );
    }

    if (filters.type && filters.type !== 'All') {
      camps = camps.filter((c) => c.campType === filters.type);
    }

    if (filters.status && filters.status !== 'All') {
      camps = camps.filter((c) => c.status === filters.status);
    }

    return camps;
  },

  getCampById: async (campId) => {
    await delay();
    if (USE_BACKEND) {
      try {
        const camps = await api.getCamps();
        const camp = camps.find((c) => c.campId === campId || c._id === campId);
        if (camp) return camp;
      } catch (e) {
        console.error(e);
      }
    }
    const camps = getStoredData(STORAGE_KEYS.CAMPS);
    const camp = camps.find((c) => c.campId === campId);
    if (!camp) throw new Error('Medical camp not found');
    return camp;
  },

  getDoctors: async () => {
    await delay();
    if (USE_BACKEND) {
      try {
        const res = await fetch(`${API_BASE_URL}/doctors`, {
          headers: getAuthHeaders(),
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (err) {
        console.warn('Backend doctors fetch failed, falling back to local storage:', err);
      }
    }

    const users = getStoredData(STORAGE_KEYS.USERS);
    return users
      .filter((u) => u.role === 'doctor')
      .map((u) => ({
        userId: u.userId,
        name: u.name,
        email: u.email
      }));
  },

  createCamp: async (campData) => {
    await delay();
    const payload = {
      campId: campData.campId || `CMP-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`,
      campName: campData.campName,
      campType: campData.campType || 'General Health',
      campDate: campData.campDate || new Date().toISOString().split('T')[0],
      startTime: campData.startTime || '09:00 AM',
      endTime: campData.endTime || '02:00 PM',
      venue: campData.venue,
      doctorName: campData.doctorName || 'Dr. On Duty',
      doctorSpecialization: campData.doctorSpecialization || '',
      maximumParticipants: Number(campData.maximumParticipants || 50),
      status: campData.status || 'Upcoming',
      description: campData.description || '',
      instructions: campData.instructions || '',
      targetAudience: campData.targetAudience || '',
      image: campData.image || 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80'
    };

    if (USE_BACKEND) {
      const res = await fetch(`${API_BASE_URL}/medicalCamps`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create medical camp in database');
      return data.camp || data;
    }

    const camps = getStoredData(STORAGE_KEYS.CAMPS);
    const newCamp = {
      ...payload,
      registeredCount: 0
    };

    camps.unshift(newCamp);
    setStoredData(STORAGE_KEYS.CAMPS, camps);
    return newCamp;
  },

  updateCamp: async (campId, campData) => {
    await delay();
    if (USE_BACKEND) {
      const res = await fetch(`${API_BASE_URL}/medicalCamps/${campId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(campData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update medical camp');
      return data.camp || data;
    }

    const camps = getStoredData(STORAGE_KEYS.CAMPS);
    const index = camps.findIndex((c) => c.campId === campId);
    if (index === -1) throw new Error('Camp not found');

    const updated = {
      ...camps[index],
      ...campData,
      maximumParticipants: Number(campData.maximumParticipants || camps[index].maximumParticipants)
    };
    camps[index] = updated;
    setStoredData(STORAGE_KEYS.CAMPS, camps);
    return updated;
  },

  deleteCamp: async (campId) => {
    await delay();
    if (USE_BACKEND) {
      const res = await fetch(`${API_BASE_URL}/medicalCamps/${campId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete medical camp');
      return data;
    }

    let camps = getStoredData(STORAGE_KEYS.CAMPS);
    camps = camps.filter((c) => c.campId !== campId);
    setStoredData(STORAGE_KEYS.CAMPS, camps);

    let regs = getStoredData(STORAGE_KEYS.REGISTRATIONS);
    regs = regs.map((r) =>
      r.campId === campId ? { ...r, registrationStatus: 'Cancelled', cancellationReason: 'Camp cancelled by administrator' } : r
    );
    setStoredData(STORAGE_KEYS.REGISTRATIONS, regs);

    return { success: true, message: 'Camp removed successfully' };
  },

  // -----------------------------------------------------------------------
  // REGISTRATION APIs (POST /registerCamp, GET /registrations, PUT /registrations/:id, DELETE /cancelRegistration/:id)
  // -----------------------------------------------------------------------
  registerCamp: async ({ participant, campId, emergencyContact, medicalNotes }) => {
    await delay();
    let targetCamp = null;
    try {
      targetCamp = await api.getCampById(campId);
    } catch {
      // Fallback lookup
    }

    const payload = {
      registrationId: `REG-${Date.now().toString().slice(-6)}`,
      participantId: participant.userId || participant._id || `USR-${Date.now().toString().slice(-6)}`,
      participantName: participant.name || '',
      participantEmail: participant.email || '',
      participantPhone: participant.phone || '',
      participantAge: participant.age ? Number(participant.age) : null,
      participantGender: participant.gender || '',
      participantBloodGroup: participant.bloodGroup || '',
      campId: campId,
      campName: targetCamp?.campName || '',
      campDate: targetCamp?.campDate || '',
      venue: targetCamp?.venue || '',
      doctorName: targetCamp?.doctorName || '',
      registrationDate: new Date().toISOString(),
      registrationStatus: 'Confirmed',
      attendance: 'Pending',
      emergencyContact: emergencyContact || participant.emergencyContact || '',
      medicalNotes: medicalNotes || ''
    };

    if (USE_BACKEND) {
      const res = await fetch(`${API_BASE_URL}/registerCamp`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Camp registration failed');
      return data.registration || data;
    }

    const camps = getStoredData(STORAGE_KEYS.CAMPS);
    const campIndex = camps.findIndex((c) => c.campId === campId);
    if (campIndex === -1) throw new Error('Camp not found');

    targetCamp = camps[campIndex];
    if (targetCamp.registeredCount >= targetCamp.maximumParticipants) {
      throw new Error('This medical camp is already at maximum capacity.');
    }

    const registrations = getStoredData(STORAGE_KEYS.REGISTRATIONS);
    const alreadyRegistered = registrations.some(
      (r) => r.participantId === participant.userId && r.campId === campId && r.registrationStatus !== 'Cancelled'
    );

    if (alreadyRegistered) {
      throw new Error('You have already registered for this medical camp.');
    }

    const now = new Date();
    const tokenNumber = `TKN-${String(registrations.length + 1).padStart(3, '0')}`;
    const newReg = {
      ...payload,
      tokenNumber,
      participantName: participant.name,
      participantEmail: participant.email,
      participantPhone: participant.phone || '',
      participantAge: participant.age || '',
      participantGender: participant.gender || '',
      participantBloodGroup: participant.bloodGroup || '',
      campName: targetCamp.campName,
      campDate: targetCamp.campDate,
      venue: targetCamp.venue,
      doctorName: targetCamp.doctorName,
      attendance: 'Pending',
      emergencyContact: emergencyContact || participant.emergencyContact || '',
      medicalNotes: medicalNotes || '',
      doctorNotes: '',
      vitals: { bp: '', pulse: '', sugar: '' }
    };

    registrations.push(newReg);
    setStoredData(STORAGE_KEYS.REGISTRATIONS, registrations);

    targetCamp.registeredCount = (targetCamp.registeredCount || 0) + 1;
    camps[campIndex] = targetCamp;
    setStoredData(STORAGE_KEYS.CAMPS, camps);

    return newReg;
  },

  getRegistrations: async (filters = {}) => {
    await delay();
    if (USE_BACKEND) {
      try {
        const res = await fetch(`${API_BASE_URL}/registrations`, {
          headers: getAuthHeaders(),
        });
        if (res.ok) {
          const rawRegs = await res.json();
          let regs = rawRegs.map((r) => ({
            ...r,
            registrationId: r.registrationId || r._id,
            tokenNumber: r.tokenNumber || `TKN-${(r.registrationId || '').slice(-3) || '001'}`,
            registrationStatus: r.registrationStatus || 'Confirmed',
            attendance: r.attendance || 'Pending',
            campName: r.campName || 'Medical Camp',
            venue: r.venue || 'Campus Venue',
            doctorName: r.doctorName || 'Attending Doctor',
            participantName: r.participantName || 'Registered Participant'
          }));

          if (filters.participantId) {
            regs = regs.filter((r) => r.participantId === filters.participantId);
          }
          if (filters.campId && filters.campId !== 'All') {
            regs = regs.filter((r) => r.campId === filters.campId);
          }
          if (filters.doctorName) {
            regs = regs.filter((r) => r.doctorName === filters.doctorName);
          }
          if (filters.status && filters.status !== 'All') {
            regs = regs.filter((r) => r.registrationStatus === filters.status);
          }

          return regs;
        }
      } catch (err) {
        console.warn('Backend registrations fetch failed:', err);
      }
    }

    let regs = getStoredData(STORAGE_KEYS.REGISTRATIONS);

    if (filters.participantId) {
      regs = regs.filter((r) => r.participantId === filters.participantId);
    }

    if (filters.campId && filters.campId !== 'All') {
      regs = regs.filter((r) => r.campId === filters.campId);
    }

    if (filters.doctorName) {
      regs = regs.filter((r) => r.doctorName === filters.doctorName);
    }

    if (filters.status && filters.status !== 'All') {
      regs = regs.filter((r) => r.registrationStatus === filters.status);
    }

    return regs;
  },

  updateRegistrationStatus: async (registrationId, updatePayload) => {
    await delay();
    if (USE_BACKEND) {
      const res = await fetch(`${API_BASE_URL}/registrations/${registrationId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updatePayload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update registration');
      return data.registration || data;
    }

    const regs = getStoredData(STORAGE_KEYS.REGISTRATIONS);
    const index = regs.findIndex((r) => r.registrationId === registrationId);
    if (index === -1) throw new Error('Registration not found');

    const updated = { ...regs[index], ...updatePayload };
    regs[index] = updated;
    setStoredData(STORAGE_KEYS.REGISTRATIONS, regs);
    return updated;
  },

  cancelRegistration: async (registrationId) => {
    await delay();
    if (USE_BACKEND) {
      const res = await fetch(`${API_BASE_URL}/cancelRegistration/${registrationId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to cancel registration');
      return data;
    }

    const regs = getStoredData(STORAGE_KEYS.REGISTRATIONS);
    const index = regs.findIndex((r) => r.registrationId === registrationId);
    if (index === -1) throw new Error('Registration not found');

    const reg = regs[index];
    if (reg.registrationStatus === 'Cancelled') {
      throw new Error('Registration is already cancelled');
    }

    reg.registrationStatus = 'Cancelled';
    reg.cancelledAt = new Date().toISOString();
    regs[index] = reg;
    setStoredData(STORAGE_KEYS.REGISTRATIONS, regs);

    // Decrement camp registered count
    const camps = getStoredData(STORAGE_KEYS.CAMPS);
    const campIndex = camps.findIndex((c) => c.campId === reg.campId);
    if (campIndex !== -1 && camps[campIndex].registeredCount > 0) {
      camps[campIndex].registeredCount -= 1;
      setStoredData(STORAGE_KEYS.CAMPS, camps);
    }

    return { success: true, message: 'Registration cancelled successfully' };
  },

  // -----------------------------------------------------------------------
  // DOCTOR ATTENDANCE & CONSULTATION APIs
  // -----------------------------------------------------------------------
  updateAttendanceAndNotes: async (registrationId, { attendance, doctorNotes, vitals }) => {
    await delay();
    if (USE_BACKEND) {
      try {
        const res = await fetch(`${API_BASE_URL}/registrations/${registrationId}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify({
            attendance,
            registrationStatus: attendance === 'Present' ? 'Attended' : undefined,
            doctorNotes,
            vitals
          }),
        });
        const data = await res.json();
        if (res.ok) {
          return data.registration || data;
        }
      } catch (err) {
        console.warn('Backend updateAttendance failed, falling back to local storage:', err);
      }
    }

    const regs = getStoredData(STORAGE_KEYS.REGISTRATIONS);
    const index = regs.findIndex((r) => r.registrationId === registrationId);
    if (index === -1) throw new Error('Registration record not found');

    const updated = {
      ...regs[index],
      attendance,
      registrationStatus: attendance === 'Present' ? 'Attended' : regs[index].registrationStatus,
      doctorNotes: doctorNotes || regs[index].doctorNotes,
      vitals: vitals || regs[index].vitals,
      attendedAt: attendance === 'Present' ? new Date().toISOString() : null
    };

    regs[index] = updated;
    setStoredData(STORAGE_KEYS.REGISTRATIONS, regs);
    return updated;
  },

  // -----------------------------------------------------------------------
  // SUMMARY STATS APIs
  // -----------------------------------------------------------------------
  getStats: async () => {
    await delay();
    if (USE_BACKEND) {
      try {
        const res = await fetch(`${API_BASE_URL}/stats`);
        if (res.ok) {
          return await res.json();
        }
      } catch (err) {
        console.warn('Backend getStats fetch failed, falling back to local storage:', err);
      }
    }

    const camps = getStoredData(STORAGE_KEYS.CAMPS);
    const registrations = getStoredData(STORAGE_KEYS.REGISTRATIONS);
    const users = getStoredData(STORAGE_KEYS.USERS);

    const totalCamps = camps.length;
    const upcomingCamps = camps.filter((c) => c.status === 'Upcoming').length;
    const completedCamps = camps.filter((c) => c.status === 'Completed').length;
    const totalRegistrations = registrations.length;
    const confirmedRegistrations = registrations.filter((r) => r.registrationStatus === 'Confirmed').length;
    const attendedCount = registrations.filter((r) => r.registrationStatus === 'Attended' || r.attendance === 'Present').length;
    const participantsCount = users.filter((u) => u.role === 'participant').length;
    const doctorsCount = users.filter((u) => u.role === 'doctor').length;

    const totalCapacity = camps.reduce((acc, c) => acc + (c.maximumParticipants || 0), 0);
    const totalFilled = camps.reduce((acc, c) => acc + (c.registeredCount || 0), 0);
    const capacityRate = totalCapacity > 0 ? Math.round((totalFilled / totalCapacity) * 100) : 0;

    return {
      totalCamps,
      upcomingCamps,
      completedCamps,
      totalRegistrations,
      confirmedRegistrations,
      attendedCount,
      participantsCount,
      doctorsCount,
      totalCapacity,
      totalFilled,
      capacityRate
    };
  }
};
