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
  BarChart3 // Added for clearer tracking icon
} from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';

export function Support() {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Education'];

  // Data for the 200,000 Books Project
  const campaignData = {
    raised: "45,000",
    target: "200,000",
    progress: 22.5,
    donors: "1,102"
  };

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
      title: "200,000 Exercise Books for Students in Cape Coast North",
      category: "Education",
      image: "https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=1200",
      desc: "This project aims to raise 200,000 exercise books for OVER 30,000 students in Cape Coast North to support teaching and learning in our schools and reduce the cost burden on parents.",
      callToAction: "Support this project and help strengthen education in Cape Coast North",
      isFeatured: true
    }
  ];

  const filteredPhotos = photos.filter(photo => {
    const matchesFilter = filter === 'All' || photo.category === filter;
    const matchesSearch = photo.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         photo.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-24 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- 1. HEADING BLOCK --- */}
        <div className="text-center mb-10">
          <AnimatedSection>
            <div className="flex flex-col items-center justify-center group">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-center bg-gradient-to-r from-slate-900 via-green-700 to-slate-900 bg-clip-text text-transparent uppercase">
                SUPPORT RAGGA
              </h1>
              <p className="mt-2 text-sm md:text-xl font-bold text-green-700/80 tracking-[0.2em] uppercase">
                BUILDING WITH YOU OBIARA KA HO
              </p>
              <span className="mt-4 h-1.5 w-16 rounded-full bg-gradient-to-r from-green-500 to-green-600 transition-all group-hover:w-32" />
            </div>
          </AnimatedSection>
        </div>

        {/* --- 2. UNMISSABLE CAMPAIGN DASHBOARD (NEW) --- */}
        <AnimatedSection delay={50}>
          <div className="max-w-3xl mx-auto mb-12 bg-white rounded-[2.5rem] border-2 border-green-100 p-6 md:p-8 shadow-xl shadow-green-100/50">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Stats Block */}
              <div className="flex gap-10">
                <div className="text-center md:text-left">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Books Raised</p>
                  <p className="text-3xl font-black text-green-700 tracking-tighter">{campaignData.raised}</p>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Goal</p>
                  <p className="text-3xl font-black text-slate-900 tracking-tighter">{campaignData.target}</p>
                </div>
              </div>

              {/* Progress Circle & Text */}
              <div className="flex items-center gap-6 bg-slate-50 px-6 py-4 rounded-3xl border border-slate-100">
                <div className="relative w-14 h-14">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-slate-200" strokeWidth="4" />
                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-green-600" strokeWidth="4" strokeDasharray={`${campaignData.progress}, 100`} strokeLinecap="round" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-green-700">{campaignData.progress}%</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-green-700 font-black text-xs uppercase tracking-widest">
                    <TrendingUp className="w-3.5 h-3.5" /> Live Tracking
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-wider">{campaignData.donors} People have supported</p>
                </div>
              </div>
            </div>
            
            {/* Proper Tracking Bar (Unmissable) */}
            <div className="mt-8">
              <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden p-1 shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 via-green-600 to-emerald-500 rounded-full transition-all duration-1000 shadow-sm" 
                  style={{ width: `${campaignData.progress}%` }} 
                />
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* --- 3. INTEGRATED SEARCH & FILTER BAR --- */}
        <AnimatedSection delay={100}>
          <div className="max-w-2xl mx-auto mb-16 relative" ref={dropdownRef}>
            <div className="relative flex items-center bg-white rounded-3xl border border-slate-200 shadow-sm focus-within:shadow-md focus-within:border-green-500 transition-all p-1.5">
              <div className="pl-4 pr-2"><Search className="w-5 h-5 text-slate-400" /></div>
              <input 
                type="text"
                placeholder="Search project..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 py-3 bg-transparent outline-none text-sm font-medium"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="p-1 hover:bg-slate-100 rounded-full transition-colors mr-1">
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              )}
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all ${isDropdownOpen || filter !== 'All' ? 'bg-green-700 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">{filter === 'All' ? 'Filter' : filter}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 overflow-hidden">
                <div className="p-2 border-b border-slate-50 bg-slate-50/50 text-[10px] font-black uppercase tracking-widest text-slate-400 px-4 py-2">Filter Category</div>
                {categories.map((cat) => (
                  <button key={cat} onClick={() => { setFilter(cat); setIsDropdownOpen(false); }} className={`w-full text-left px-5 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors ${filter === cat ? 'text-green-700 bg-green-50' : 'text-slate-500 hover:bg-slate-50 hover:text-green-600'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* --- 4. PROJECT GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {filteredPhotos.map((photo, index) => (
            <AnimatedSection key={photo.id} delay={150 + (index * 50)}>
              <div className="group relative bg-white rounded-[2rem] overflow-hidden border border-green-500 ring-4 ring-green-500/10 shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <img src={photo.image} alt={photo.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  
                  {/* High-Visibility Label Strip */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-slate-100 p-3">
                    <div className="flex justify-between items-center px-1">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-green-600" />
                        <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-900">{campaignData.raised} Books Donated</span>
                      </div>
                      <span className="text-[10px] font-black text-green-700 uppercase tracking-widest bg-green-50 px-2 py-0.5 rounded-md">Goal: {campaignData.target}</span>
                    </div>
                  </div>

                  <div className="absolute top-4 left-4 px-3 py-1 bg-amber-500 text-white text-[9px] font-black uppercase rounded-full tracking-widest">Urgent Support</div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-2 group-hover:text-green-700 transition-colors">{photo.title}</h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed mb-4">{photo.desc}</p>
                  <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-6">{photo.callToAction}</p>
                  <button className="w-full py-3 bg-green-700 hover:bg-green-800 text-white rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                    <Heart className="w-4 h-4" /> kindly support, obiara ka ho
                  </button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* --- 5. EMPTY STATE --- */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 max-w-2xl mx-auto">
            <Camera className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No results found</p>
          </div>
        )}

      </div>
    </div>
  );
}