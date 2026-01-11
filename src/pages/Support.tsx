// src/pages/Support.tsx
import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Maximize2, 
  ExternalLink, 
  Search, 
  ChevronDown, 
  X, 
  Heart,
  SlidersHorizontal,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';

export function Support() {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [donationStep, setDonationStep] = useState(1); // 1: Amount, 2: Info, 3: Success
  const [selectedAmount, setSelectedAmount] = useState<number | string>(50);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Education'];

  // Tracking Data constants - RESET TO ZERO
  const RAISED = "0";
  const TARGET = "200,000";
  const PERCENT = 0;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const photos = [
    {
      id: 1,
      title: "obiara ka ho 200,000 book project",
      category: "Education",
      image: "https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=1200",
      desc: "This project aims to raise 200,000 exercise books for OVER 30,000 students in Cape Coast North to support teaching and learning in our schools and reduce the cost burden on parents.",
      isFeatured: true
    }
  ];

  const filteredPhotos = photos.filter(photo => {
    const matchesFilter = filter === 'All' || photo.category === filter;
    const matchesSearch = photo.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         photo.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const resetDonation = () => {
    setShowDonationModal(false);
    setTimeout(() => setDonationStep(1), 300);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-16 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- 1. HEADING BLOCK --- */}
        <div className="text-center mb-8 md:mb-12">
          <AnimatedSection>
            <div className="flex flex-col items-center justify-center group">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-center bg-gradient-to-r from-slate-900 via-green-700 to-slate-900 bg-clip-text text-transparent uppercase">
                THE RAGGA FOUNDATION
              </h1>
              <p className="mt-1 text-xs md:text-xl font-bold text-green-700/80 tracking-[0.2em] uppercase">
                BUILDING WITH YOU OBIARA KA HO
              </p>
              <span className="mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 transition-all group-hover:w-24" />
            </div>
          </AnimatedSection>
        </div>

        {/* --- 2. INTEGRATED SEARCH & FILTER BAR --- */}
        <AnimatedSection delay={100}>
          <div className="max-w-2xl mx-auto mb-8 md:mb-16 relative" ref={dropdownRef}>
            <div className="relative flex items-center bg-white rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm focus-within:shadow-md transition-all p-1 md:p-1.5">
              <div className="pl-3 pr-1 md:pl-4 md:pr-2"><Search className="w-4 h-4 md:w-5 md:h-5 text-slate-400" /></div>
              <input 
                type="text"
                placeholder="Search project..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 py-2 md:py-3 bg-transparent outline-none text-xs md:text-sm font-medium"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="p-1 hover:bg-slate-100 rounded-full transition-colors mr-1">
                  <X className="w-3 h-3 md:w-4 md:h-4 text-slate-400" />
                </button>
              )}
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 md:px-4 md:py-2.5 rounded-xl md:rounded-2xl transition-all ${isDropdownOpen || filter !== 'All' ? 'bg-green-700 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider hidden sm:inline">{filter === 'All' ? 'Filter' : filter}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* --- 3. PROJECT GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-center">
          {filteredPhotos.map((photo, index) => (
            <AnimatedSection key={photo.id} delay={150 + (index * 50)}>
              <div className="group relative bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-green-500 ring-2 md:ring-4 ring-green-500/10 shadow-sm hover:shadow-xl transition-all duration-500">
                
                {/* Image Area */}
                <div className="relative h-48 md:h-64 overflow-hidden">
                  <img src={photo.image} alt={photo.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-3 left-3 md:top-4 md:left-4 px-2 py-0.5 md:px-3 md:py-1 bg-amber-500 text-white text-[8px] md:text-[9px] font-black uppercase rounded-full tracking-widest shadow-sm">Urgent Support</div>
                </div>

                {/* Tracking Section (Red Bar) */}
                <div className="bg-red-800 p-3 md:p-5 text-white shadow-inner">
                  <div className="flex justify-between items-end mb-2 md:mb-3">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <BarChart3 className="w-3 h-3 md:w-4 md:h-4 text-white/90" />
                        <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.1em] text-white/80">Books Donated</span>
                      </div>
                      <span className="text-lg md:text-2xl font-black tracking-tighter drop-shadow-md">{RAISED}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-base md:text-xl font-black text-white drop-shadow-md">{PERCENT}%</span>
                    </div>
                  </div>
                  <div className="h-2 md:h-3 w-full bg-black/20 rounded-full overflow-hidden p-0.5 shadow-inner">
                    <div className="h-full bg-gradient-to-r from-white via-white to-green-300 rounded-full transition-all duration-1000" style={{ width: `${PERCENT}%` }} />
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-black text-slate-900 uppercase tracking-tight mb-1 md:mb-2 group-hover:text-green-700 transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-[11px] md:text-sm text-slate-600 font-medium leading-relaxed mb-4">
                    {photo.desc}
                  </p>
                  
                  <button 
                    onClick={() => setShowDonationModal(true)}
                    className="w-full py-2.5 md:py-3 bg-green-700 hover:bg-green-800 text-white rounded-lg md:rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                  >
                    <Heart className="w-3.5 h-3.5 md:w-4 md:h-4" /> kindly support, obiara ka ho
                  </button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* --- 4. DONATION PROCESS MODAL (NEW) --- */}
        {showDonationModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">
              
              {/* Modal Header */}
              <div className="bg-red-800 p-6 text-white flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tight">Support The Project</h2>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">Building with you • Obiara Ka Ho</p>
                </div>
                <button 
                  onClick={resetDonation}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-8">
                
                {/* Step 1: Select Amount */}
                {donationStep === 1 && (
                  <div className="space-y-6">
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider text-center mb-4 italic">How many books would you like to sponsor?</p>
                    <div className="grid grid-cols-2 gap-4">
                      {[10, 50, 100, 200].map((num) => (
                        <button
                          key={num}
                          onClick={() => setSelectedAmount(num)}
                          className={`py-6 rounded-3xl border-2 transition-all flex flex-col items-center justify-center group ${
                            selectedAmount === num 
                            ? 'border-green-600 bg-green-50' 
                            : 'border-slate-100 bg-slate-50 hover:border-green-300'
                          }`}
                        >
                          <span className={`text-2xl font-black ${selectedAmount === num ? 'text-green-700' : 'text-slate-900'}`}>{num}</span>
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Books</span>
                        </button>
                      ))}
                    </div>
                    <button 
                      onClick={() => setDonationStep(2)}
                      className="w-full py-5 bg-green-700 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-green-200 hover:bg-green-800 transition-all flex items-center justify-center gap-2 mt-4"
                    >
                      Proceed to Information <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Step 2: User Information */}
                {donationStep === 2 && (
                  <div className="space-y-5">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between mb-2">
                      <span className="text-xs font-black uppercase text-slate-400 tracking-widest">Sponsoring</span>
                      <span className="text-lg font-black text-green-700 uppercase tracking-tight">{selectedAmount} Books</span>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1">Your Full Name</label>
                      <input 
                        type="text" 
                        placeholder="Enter your name"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 font-bold text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1">Phone / Email</label>
                      <input 
                        type="text" 
                        placeholder="Mobile Money number or Email"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 font-bold text-sm"
                      />
                    </div>
                    <div className="pt-4 flex gap-3">
                      <button 
                        onClick={() => setDonationStep(1)}
                        className="w-1/3 py-5 border-2 border-slate-100 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50"
                      >
                        Back
                      </button>
                      <button 
                        onClick={() => setDonationStep(3)}
                        className="w-2/3 py-5 bg-red-800 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-red-200 hover:bg-red-900 transition-all"
                      >
                        Donate Now
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Success Confirmation */}
                {donationStep === 3 && (
                  <div className="text-center py-6 animate-in zoom-in-50 duration-500">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">THANK YOU!</h3>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed max-w-xs mx-auto mb-8">
                      Your commitment to provide <span className="font-black text-green-700">{selectedAmount} books</span> will make a massive impact in Cape Coast North.
                    </p>
                    <button 
                      onClick={resetDonation}
                      className="w-full py-4 border-2 border-slate-100 text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-50"
                    >
                      Close Window
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}