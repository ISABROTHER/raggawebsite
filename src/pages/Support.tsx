// src/pages/Support.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Camera, Search, ChevronDown, X, Heart, SlidersHorizontal, BarChart3 } from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';
import { DonationModal } from '../components/DonationModal';

export function Support() {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-16 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <AnimatedSection>
            <div className="flex flex-col items-center justify-center group">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-center bg-gradient-to-r from-slate-900 via-green-700 to-slate-900 bg-clip-text text-transparent uppercase text-slate-900">
                THE RAGGA FOUNDATION
              </h1>
              <p className="mt-1 text-xs md:text-xl font-bold text-green-700/80 tracking-[0.2em] uppercase">
                BUILDING WITH YOU OBIARA KA HO
              </p>
              <span className="mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 transition-all group-hover:w-24" />
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={100}>
          <div className="max-w-2xl mx-auto mb-8 md:mb-16 relative" ref={dropdownRef}>
            <div className="relative flex items-center bg-white rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm focus-within:shadow-md transition-all p-1 md:p-1.5">
              <div className="pl-3 pr-1 md:pl-4 md:pr-2"><Search className="w-4 h-4 md:w-5 md:h-5 text-slate-400" /></div>
              <input type="text" placeholder="Search project..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-1 py-2 md:py-3 bg-transparent outline-none text-xs md:text-sm font-medium" />
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={`flex items-center gap-1.5 px-3 py-2 md:px-4 md:py-2.5 rounded-xl md:rounded-2xl transition-all ${isDropdownOpen || filter !== 'All' ? 'bg-green-700 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider hidden sm:inline">{filter === 'All' ? 'Filter' : filter}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-center">
          {filteredPhotos.map((photo, index) => (
            <AnimatedSection key={photo.id} delay={150 + (index * 50)}>
              <div className="group relative bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-green-500 ring-2 md:ring-4 ring-green-500/10 shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="relative h-48 md:h-64 overflow-hidden">
                  <img src={photo.image} alt={photo.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-3 left-3 md:top-4 md:left-4 px-2 py-0.5 md:px-3 md:py-1 bg-amber-500 text-white text-[8px] md:text-[9px] font-black uppercase rounded-full tracking-widest shadow-sm">Urgent Support</div>
                </div>

                <div className="bg-red-800 p-3 md:p-5 text-white shadow-inner">
                  <div className="flex justify-between items-end mb-2 md:mb-3">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5 mb-0.5 text-white/80">
                        <BarChart3 className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.1em]">Books Donated</span>
                      </div>
                      <span className="text-lg md:text-2xl font-black tracking-tighter text-white drop-shadow-md">{RAISED}</span>
                    </div>
                    <div className="flex flex-col items-end text-white"><span className="text-base md:text-xl font-black drop-shadow-md">{PERCENT}%</span></div>
                  </div>
                  <div className="h-2 md:h-3 w-full bg-black/20 rounded-full overflow-hidden p-0.5 shadow-inner">
                    <div className="h-full bg-gradient-to-r from-white via-white to-green-300 rounded-full transition-all duration-1000" style={{ width: `${PERCENT}%` }} />
                  </div>
                </div>

                <div className="p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-black text-slate-900 uppercase tracking-tight mb-1 md:mb-2 group-hover:text-green-700 transition-colors">{photo.title}</h3>
                  <p className="text-[11px] md:text-sm text-slate-600 font-medium leading-relaxed mb-4">{photo.desc}</p>
                  <button onClick={() => setShowModal(true)} className="w-full py-2.5 md:py-3 bg-green-700 hover:bg-green-800 text-white rounded-lg md:rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md active:scale-95">
                    <Heart className="w-3.5 h-3.5 md:w-4 md:h-4" /> kindly support, obiara ka ho
                  </button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <DonationModal isOpen={showModal} onClose={() => setShowModal(false)} />
      </div>
    </div>
  );
}