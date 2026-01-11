import { 
  Calendar, FileText, Clock, MapPin, 
  CheckCircle2, ArrowRight, UserCheck, HelpCircle 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';

export function Appointments() {
  const requirements = [
    "Valid Ghana Card",
    "Clear explanation of your issue or request",
    "Relevant documents (where applicable)",
    "Active contact details"
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-12 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- STANDARD HEADING BLOCK --- */}
        <div className="relative mb-20">
          <AnimatedSection>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 border-b border-slate-200 pb-16">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 text-[11px] font-black uppercase tracking-widest mb-8 border border-green-100 shadow-sm">
                  <UserCheck className="w-3 h-3" />
                  Direct Access to Leadership
                </div>
                <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-none uppercase tracking-tighter mb-6">
                  Appointments <br />
                  <span className="text-green-700">& Applications.</span>
                </h1>
                <p className="text-slate-500 text-lg md:text-xl font-medium max-w-xl leading-relaxed">
                  This office exists to listen and to act. Whether you are requesting a meeting or submitting an application, your concern matters and will be addressed.
                </p>
              </div>
              
              {/* Quick Status Info */}
              <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl lg:w-80 relative overflow-hidden group">
                <Clock className="absolute -right-4 -top-4 w-24 h-24 text-white/5 group-hover:rotate-12 transition-transform duration-700" />
                <p className="text-green-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Office Hours</p>
                <div className="space-y-2">
                  <p className="text-white font-bold">Mon — Fri</p>
                  <p className="text-slate-400 text-sm">9:00 AM — 5:00 PM</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* --- MAIN ACTION CARDS --- */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          
          {/* Appointment Card */}
          <AnimatedSection delay={100}>
            <div className="group bg-white p-10 rounded-[3rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(22,163,74,0.1)] transition-all duration-500 h-full flex flex-col">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-green-200">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-4">
                Book an Appointment
              </h2>
              <p className="text-slate-500 font-medium leading-relaxed mb-10">
                Request a direct meeting with me or the constituency team to discuss community matters, urgent concerns, or practical development proposals.
              </p>
              <div className="mt-auto">
                <button className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-green-700 transition-all group/btn">
                  Start Booking
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </AnimatedSection>

          {/* Application Card */}
          <AnimatedSection delay={200}>
            <div className="group bg-white p-10 rounded-[3rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(22,163,74,0.1)] transition-all duration-500 h-full flex flex-col">
              <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-slate-200">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-4">
                Submit Application
              </h2>
              <p className="text-slate-500 font-medium leading-relaxed mb-10">
                Submit applications for educational support, employment recommendations, or community projects. Each submission is reviewed and followed up accordingly.
              </p>
              <div className="mt-auto">
                <button className="w-full py-5 border-2 border-slate-900 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-slate-900 hover:text-white transition-all group/btn">
                  Open Portal
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* --- REQUIREMENTS & LOCATIONS GRID --- */}
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          
          {/* Requirements List */}
          <AnimatedSection delay={300} className="lg:col-span-2">
            <div className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100">
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-8">
                What You Need Before Applying
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {requirements.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
                    <span className="text-sm font-bold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Location Info */}
          <AnimatedSection delay={400}>
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <MapPin className="w-5 h-5 text-green-700" />
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                  Main Office
                </h3>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Address
                  </p>
                  <p className="text-sm font-bold text-slate-700 leading-relaxed">
                    Constituency Secretariat, <br />
                    Opposite UCC West Gate, <br />
                    Cape Coast.
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Contact
                  </p>
                  <p className="text-sm font-bold text-slate-700">024 XXX XXXX</p>
                  <p className="text-sm font-bold text-slate-700">info@ccnorth.com</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* --- FAQ SECTION --- */}
        <AnimatedSection delay={500}>
          <div className="mt-24 text-center">
            <div className="inline-flex items-center gap-2 mb-6">
              <HelpCircle className="w-5 h-5 text-green-600" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                Need Assistance?
              </span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-8">
              Common Questions
            </h2>
            <div className="max-w-2xl mx-auto space-y-4">
              <button className="w-full p-6 bg-white border border-slate-100 rounded-2xl text-left flex items-center justify-between hover:border-green-200 transition-all group">
                <span className="font-bold text-slate-700">
                  How long will it take to receive feedback on my application?
                </span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-green-600 transition-colors" />
              </button>
              <button className="w-full p-6 bg-white border border-slate-100 rounded-2xl text-left flex items-center justify-between hover:border-green-200 transition-all group">
                <span className="font-bold text-slate-700">
                  What should I do if my issue is urgent?
                </span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-green-600 transition-colors" />
              </button>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}
