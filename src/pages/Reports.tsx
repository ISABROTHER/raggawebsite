// src/pages/Reports.tsx
import React, { useState } from 'react';
import { 
  Camera, 
  Filter,
  Maximize2,
  ExternalLink
} from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';

export function Reports() {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Education', 'Health', 'Infrastructure', 'Agriculture'];

  const photos = [
    {
      id: 1,
      title: "Operation 1000 Desks Distribution",
      category: "Education",
      image: "https://i.imgur.com/Ozjnrli.jpeg",
      desc: "Distributing dual desks to basic schools in Cape Coast North."
    },
    {
      id: 2,
      title: "Health Screening Exercise",
      category: "Health",
      image: "https://i.imgur.com/XmWnKbH.jpeg",
      desc: "Free medical outreach and screening for constituents."
    },
    {
      id: 3,
      title: "Road Rehabilitation Project",
      category: "Infrastructure",
      image: "https://i.imgur.com/AZqDymE.jpeg",
      desc: "Ongoing asphaltic overlay on community roads."
    },
    {
      id: 4,
      title: "Nkoko Nkitinkiti Poultry Support",
      category: "Agriculture",
      image: "https://i.imgur.com/TZ4jIJA.jpeg",
      desc: "Supporting local poultry farmers with starter packs."
    },
    {
      id: 5,
      title: "Youth Skills Training Summit",
      category: "Education",
      image: "https://i.imgur.com/saQoFLV.png",
      desc: "Digital skills and entrepreneurship workshop for the youth."
    },
    {
      id: 6,
      title: "St. Mary's School Visit",
      category: "Education",
      image: "https://i.imgur.com/Ozjnrli.jpeg",
      desc: "Donating learning materials to support girl-child education."
    }
  ];

  const filteredPhotos = filter === 'All' 
    ? photos 
    : photos.filter(p => p.category === filter);

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

        {/* --- FILTER BAR --- */}
        <AnimatedSection delay={100}>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            <div className="flex items-center gap-2 mr-4 text-slate-400 font-bold text-xs uppercase tracking-widest">
              <Filter className="w-4 h-4" /> Filter By:
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                  filter === cat 
                    ? 'bg-green-700 text-white shadow-lg shadow-green-200 scale-105' 
                    : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* --- GALLERY GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotos.map((photo, index) => (
            <AnimatedSection key={photo.id} delay={150 + (index * 50)}>
              <div className="group relative bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500">
                {/* Image Container */}
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
                  <div className="absolute top-4 left-4 px-3 py-1 bg-green-700 text-white text-[9px] font-black uppercase rounded-full tracking-widest">
                    {photo.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-2 group-hover:text-green-700 transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    {photo.desc}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* --- EMPTY STATE --- */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-20">
            <Camera className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
              No photos found in this category.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}