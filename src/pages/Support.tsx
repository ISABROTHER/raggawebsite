// src/pages/Support.tsx
import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Filter, 
  Maximize2, 
  ExternalLink, 
  Search, 
  ChevronDown, 
  X, 
  Heart 
} from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';

export function Support() {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Education'];

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
    <div className="min-h-screen bg-slate-50 pt-24 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADING BLOCK --- */}
        <div className="text-center mb-12">
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

        {/* --- SEARCH & FILTER BAR --- */}
        <AnimatedSection delay={100}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
            
            <div className="relative w-full md:max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-green-600 transition-colors" />
              <input 
                type="text"
                placeholder="Search project..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-sm font-medium"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 rounded-full transition-colors">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              )}
            </div>

            <div className="relative w-full md:w-64" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between px-6 py-3 bg-white border border-slate-200 rounded-2xl hover:border-green-500 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Filter className="w-4 h-4 text-slate-400 group-hover:text-green-600" />
                  <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">{filter}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 overflow-hidden">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setFilter(cat);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-6 py-4 text-xs font-black uppercase tracking-widest transition-colors ${
                        filter === cat ? 'bg-green-50 text-green-700' : 'text-slate-500 hover:bg-slate-50 hover:text-green-600'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </AnimatedSection>

        {/* --- PROJECT CARD --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotos.map((photo, index) => (
            <AnimatedSection key={photo.id} delay={150 + (index * 50)}>
              <div className="group relative bg-white rounded-[2rem] overflow-hidden border border-green-500 ring-4 ring-green-500/10 shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={photo.image} 
                    alt={photo.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                    <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors">
                      <Maximize2 className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1 bg-amber-500 text-white text-[9px] font-black uppercase rounded-full tracking-widest">
                    Urgent Support
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-2 group-hover:text-green-700 transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed mb-4">
                    {photo.desc}
                  </p>
                  <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-6">
                    {photo.callToAction}
                  </p>
                  
                  {/* Updated Button Text Below */}
                  <button className="w-full py-3 bg-green-700 hover:bg-green-800 text-white rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                    <Heart className="w-4 h-4" />
                    kindly support, obiara ka ho
                  </button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* --- EMPTY STATE --- */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
            <Camera className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
              No results found
            </p>
          </div>
        )}

      </div>
    </div>
  );
}