// src/pages/Appointments.tsx
import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  User,
  Briefcase,
  FileText,
  CheckCircle,
  ArrowRight,
  Info,
  AlertTriangle,
  CalendarDays
} from 'lucide-react';

// --- TYPES ---
type Tab = 'appointment' | 'application';
type TimeSlot = 'morning' | 'afternoon';

// --- HON. AVAILABILITY SETUP ---
const HON_AVAILABILITY: Record<string, TimeSlot[]> = {
  // Weekday names must match Date.toLocaleDateString('en-US', { weekday: 'long' })
  Monday: ['morning', 'afternoon'],
  Wednesday: ['morning'],
  Friday: ['afternoon'],
};

const TIME_SLOT_LABELS: Record<TimeSlot, string> = {
  morning: 'Morning (9am - 12pm)',
  afternoon: 'Afternoon (1pm - 4pm)',
};

function getWeekdayName(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'long' });
}

function isHonAvailable(dateStr: string, slot: TimeSlot): boolean {
  const weekday = getWeekdayName(dateStr);
  if (!weekday) return false;
  const daySlots = HON_AVAILABILITY[weekday];
  if (!daySlots) return false;
  return daySlots.includes(slot);
}

function findNextAvailableSlot(
  fromDateStr: string,
  preferredSlot: TimeSlot
): { dateStr: string; weekday: string; slot: TimeSlot } | null {
  if (!fromDateStr) return null;
  const start = new Date(fromDateStr + 'T00:00:00');
  const maxDaysAhead = 30;

  for (let i = 0; i <= maxDaysAhead; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const weekday = d.toLocaleDateString('en-US', { weekday: 'long' });
    const daySlots = HON_AVAILABILITY[weekday];

    if (daySlots && daySlots.length > 0) {
      // If preferred slot is available, use it, else fall back to first slot for that day
      const slot = daySlots.includes(preferredSlot)
        ? preferredSlot
        : (daySlots[0] as TimeSlot);

      const dateStr = d.toISOString().slice(0, 10);
      return { dateStr, weekday, slot };
    }
  }
  return null;
}

export function Appointments() {
  const [activeTab, setActiveTab] = useState<Tab>('appointment');
  const [submitted, setSubmitted] = useState(false);

  // Availability State
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTimeSlot, setAppointmentTimeSlot] = useState<TimeSlot>('morning');
  const [availabilityMessage, setAvailabilityMessage] = useState<string | null>(null);
  const [availabilityStatus, setAvailabilityStatus] = useState<'idle' | 'available' | 'unavailable'>('idle');

  const todayISO = new Date().toISOString().slice(0, 10);

  const updateAvailability = (dateStr: string, slot: TimeSlot) => {
    if (!dateStr) {
      setAvailabilityStatus('idle');
      setAvailabilityMessage(null);
      return;
    }

    if (isHonAvailable(dateStr, slot)) {
      const weekday = getWeekdayName(dateStr);
      setAvailabilityStatus('available');
      setAvailabilityMessage(
        `Hon. is available on ${weekday}, ${dateStr} during ${TIME_SLOT_LABELS[slot]}.`
      );
    } else {
      const weekday = getWeekdayName(dateStr);
      const next = findNextAvailableSlot(dateStr, slot);
      setAvailabilityStatus('unavailable');

      if (next) {
        setAvailabilityMessage(
          `Hon. is not available on ${weekday || 'this day'}. Next available slot is ` +
            `${next.weekday}, ${next.dateStr} – ${TIME_SLOT_LABELS[next.slot]}.`
        );
      } else {
        setAvailabilityMessage(
          `Hon. is not available on this day. No available slots found in the next 30 days.`
        );
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === 'appointment') {
      if (!appointmentDate) {
        setAvailabilityStatus('unavailable');
        setAvailabilityMessage('Please select a date for your appointment.');
        return;
      }

      if (!isHonAvailable(appointmentDate, appointmentTimeSlot)) {
        const weekday = getWeekdayName(appointmentDate);
        const next = findNextAvailableSlot(appointmentDate, appointmentTimeSlot);
        setAvailabilityStatus('unavailable');

        if (next) {
          setAvailabilityMessage(
            `Hon. is not available on ${weekday || 'this day'} for the selected period. ` +
              `Next available slot is ${next.weekday}, ${next.dateStr} – ${TIME_SLOT_LABELS[next.slot]}. ` +
              `Please adjust your date and time.`
          );
        } else {
          setAvailabilityMessage(
            `Hon. is not available on this day. Please pick another date.`
          );
        }
        return;
      }
    }

    setSubmitted(true);
    setAvailabilityStatus('idle');
    setAvailabilityMessage(null);

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-12">
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* PREMIUM HEADER BLOCK */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 border border-blue-100 mb-4">
              <CalendarDays className="w-3.5 h-3.5 text-blue-700" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-blue-700">
                Official Requests
              </span>
            </div>

            <div className="flex flex-col items-center justify-center group">
              <h1 className="
                text-3xl sm:text-4xl md:text-5xl 
                font-extrabold leading-tight tracking-tight mb-2
                text-slate-900
              ">
                Appointments & Applications
              </h1>
              <span className="
                mt-4 h-[3px] w-20 rounded-full
                bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-700
                motion-safe:transition-all motion-safe:duration-500
                group-hover:w-32
              " />
            </div>
            
            <p className="mt-6 text-slate-600 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
              Schedule a meeting with the MP's office or submit applications for grants, jobs, and support programs.
            </p>
          </div>

          {/* TAB TOGGLE */}
          <div className="flex justify-center mb-10">
            <div className="bg-white p-1.5 rounded-full border border-slate-200 shadow-sm inline-flex">
              <button
                onClick={() => { setActiveTab('appointment'); setSubmitted(false); }}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeTab === 'appointment' 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Book Appointment
              </button>
              <button
                onClick={() => { setActiveTab('application'); setSubmitted(false); }}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeTab === 'application' 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Applications
              </button>
            </div>
          </div>

          {/* FORM CARD */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-6 md:p-12">
            {submitted ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-3">Submission Received</h3>
                <p className="text-slate-500 text-lg">
                  We have received your request and will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* APPOINTMENT TAB */}
                {activeTab === 'appointment' && (
                  <>
                    {/* INFO BANNER */}
                    <div className="rounded-2xl border border-blue-100 bg-blue-50/60 px-5 py-4 flex gap-4 items-start">
                      <div className="p-2 bg-blue-100 rounded-full text-blue-700 mt-0.5">
                        <Info className="w-5 h-5" />
                      </div>
                      <div className="text-sm text-blue-900/90 leading-relaxed">
                        <p className="font-bold mb-1 text-blue-900">Hon. Appointment Availability</p>
                        <ul className="space-y-1 list-disc list-inside opacity-90 mb-2">
                          <li>Mondays – Morning & Afternoon</li>
                          <li>Wednesdays – Morning only</li>
                          <li>Fridays – Afternoon only</li>
                        </ul>
                        <p className="text-xs opacity-75">
                          If you select a time outside these slots, we'll suggest the next available time.
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-bold text-slate-800">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input 
                            type="text" 
                            required 
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" 
                            placeholder="Enter your full name" 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-bold text-slate-800">Contact Number</label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-black tracking-wide">GH</div>
                          <input 
                            type="tel" 
                            required 
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" 
                            placeholder="024 XXX XXXX" 
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-bold text-slate-800">Preferred Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input 
                            type="date" 
                            required 
                            min={todayISO}
                            value={appointmentDate}
                            onChange={(e) => {
                              setAppointmentDate(e.target.value);
                              updateAvailability(e.target.value, appointmentTimeSlot);
                            }}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all cursor-pointer" 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-bold text-slate-800">Preferred Time</label>
                        <div className="relative">
                          <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <select 
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none transition-all cursor-pointer"
                            value={appointmentTimeSlot}
                            onChange={(e) => {
                              const slot = e.target.value as TimeSlot;
                              setAppointmentTimeSlot(slot);
                              if (appointmentDate) updateAvailability(appointmentDate, slot);
                            }}
                          >
                            <option value="morning">{TIME_SLOT_LABELS.morning}</option>
                            <option value="afternoon">{TIME_SLOT_LABELS.afternoon}</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* AVAILABILITY ALERT */}
                    {availabilityMessage && (
                      <div className={`rounded-2xl p-4 flex gap-3 items-start ${
                        availabilityStatus === 'available' 
                          ? 'bg-green-50 border border-green-100 text-green-800' 
                          : 'bg-amber-50 border border-amber-100 text-amber-900'
                      }`}>
                        {availabilityStatus === 'available' 
                          ? <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                          : <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        }
                        <p className="text-sm font-medium leading-relaxed">{availabilityMessage}</p>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-slate-800">Purpose of Visit</label>
                      <textarea 
                        required 
                        rows={4} 
                        className="w-full p-5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none" 
                        placeholder="Please briefly explain the reason for the appointment..." 
                      />
                    </div>
                  </>
                )}

                {/* APPLICATION TAB */}
                {activeTab === 'application' && (
                  <>
                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-slate-800">Application Type</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {['Job Opportunity', 'Educational Grant', 'Business Support', 'Health Support', 'Other'].map((type) => (
                          <label key={type} className="relative flex items-center gap-3 p-4 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all has-[:checked]:bg-blue-50 has-[:checked]:border-blue-200 has-[:checked]:shadow-sm">
                            <input type="radio" name="appType" className="peer h-4 w-4 text-blue-600 focus:ring-blue-500" />
                            <span className="text-sm font-semibold text-slate-700 peer-checked:text-blue-900">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-bold text-slate-800">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input required className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Applicant name" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-bold text-slate-800">Email Address</label>
                        <div className="relative">
                          <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input type="email" required className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="email@example.com" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-slate-800">Cover Letter / Details</label>
                      <textarea required rows={5} className="w-full p-5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none" placeholder="Tell us about your application..." />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-slate-800">Upload Documents (CV/Proposal)</label>
                      <div className="border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-2xl p-10 text-center hover:bg-white hover:border-blue-300 transition-all cursor-pointer group">
                        <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                           <FileText className="w-6 h-6 text-blue-500" />
                        </div>
                        <p className="text-sm text-slate-600 font-medium">Click to upload or drag and drop</p>
                        <p className="text-xs text-slate-400 mt-1">PDF, DOCX up to 10MB</p>
                      </div>
                    </div>
                  </>
                )}

                <div className="pt-6 border-t border-slate-100">
                  <button 
                    type="submit" 
                    className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3"
                  >
                    {activeTab === 'appointment' ? 'Confirm Appointment' : 'Submit Application'}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
} 