// src/pages/Assemblymen.tsx
import { useState, useMemo } from 'react';
import { Phone, Search, Crosshair, MapPin, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';
import { LOCATIONS } from '../data/locations';

export function Assemblymen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [detectedZone, setDetectedZone] = useState<string | null>(null);

  const formatPhoneNumber = (phone: string) => {
    return phone.replace('+233 ', '0').replace('+233', '0');
  };

  const filteredMembers = useMemo(() => {
    return LOCATIONS.filter(
      (m) =>
        m.assemblyman.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.zone.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleLiveLocation = () => {
    setIsLocating(true);
    setDetectedZone(null);

    if (!navigator.geolocation) {
      alert("Location services are not supported by your browser.");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setTimeout(() => {
          setIsLocating(false);
          const matchedZone = "Abura"; // Simulated logic for finding closest zone
          setDetectedZone(matchedZone);
          setSearchQuery(matchedZone);
        }, 1200);
      },
      () => {
        setIsLocating(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-4 pb-20 font-sans"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- COMPACT HEADER & CONTROLS --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
              Assemblymen
            </h1>
            <p className="text-[10px] font-bold text-green-700 uppercase tracking-widest">
              Cape Coast North Representatives
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                placeholder="Search name or town..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all"
              />
            </div>

            {/* Live Location */}
            <button 
              onClick={handleLiveLocation}
              disabled={isLocating}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all disabled:opacity-80 shadow-md"
            >
              {isLocating ? <Loader2 className="w-3 h-3 animate-spin text-green-400" /> : <Crosshair className="w-3 h-3" />}
              <span>{isLocating ? "Finding..." : "Live Location"}</span>
            </button>
          </div>
        </div>
        
        {/* --- ASSEMBLY MEMBERS GRID (VISIBLE IMMEDIATELY) --- */}
        <AnimatedSection>
          {filteredMembers.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {filteredMembers.map((member) => (
                <div
                  key={member.zone}
                  className={`flex flex-col items-center text-center group bg-white border rounded-2xl p-3 transition-all duration-300 ${
                    detectedZone === member.zone 
                    ? 'border-green-500 shadow-xl ring-2 ring-green-500/10' 
                    : 'border-slate-100 hover:shadow-lg hover:border-green-200'
                  }`}
                >
                  <div className="w-full aspect-[4/5] bg-slate-100 overflow-hidden rounded-xl mb-3 relative">
                    <img 
                      src={member.photoUrl} 
                      alt={member.assemblyman}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {detectedZone === member.zone && (
                      <div className="absolute top-2 right-2 bg-green-600 text-white p-1.5 rounded-lg shadow-lg animate-bounce">
                        <MapPin className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                  
                  <div className="w-full">
                    <p className="text-[9px] font-black tracking-widest text-green-700 uppercase mb-1 truncate">
                      {member.zone}
                    </p>
                    <p className="text-sm font-black text-slate-900 leading-tight uppercase line-clamp-1 mb-2">
                      {member.assemblyman}
                    </p>
                    <a 
                      href={`tel:${member.phone}`}
                      className="inline-flex items-center justify-center gap-2 w-full py-2 bg-slate-50 rounded-lg text-xs font-bold text-slate-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                      {formatPhoneNumber(member.phone)}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
              <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No members found matching your search</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 text-green-600 font-black text-xs uppercase underline underline-offset-4"
              >
                Clear Search
              </button>
            </div>
          )}
        </AnimatedSection>

      </div>
    </div>
  );
} 