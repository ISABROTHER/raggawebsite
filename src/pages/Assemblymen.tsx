// src/pages/Assemblymen.tsx
import { useState, useMemo } from 'react';
import { Phone, Search, Crosshair, MapPin, Loader2, Star } from 'lucide-react';
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
      alert("Precision locating is not supported.");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setTimeout(() => {
          setIsLocating(false);
          const matchedZone = "Abura"; // Simulated logic
          setDetectedZone(matchedZone);
          setSearchQuery(matchedZone);
        }, 1500);
      },
      () => {
        setIsLocating(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-2 pb-20"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- TOP ONE PERCENT HEADING (MAINTAINED) --- */}
        <AnimatedSection delay={50}>
          <div className="relative text-center mb-10 py-8 md:py-14 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
              <h2 className="text-[12vw] font-black text-slate-900/5 uppercase tracking-tighter whitespace-nowrap">
                Constituency
              </h2>
            </div>
            
            <div className="relative flex flex-col items-center">
              <h2 className="text-4xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85]">
                ASSEMBLYMEN <br />
                <span className="text-blue-700">IN CAPE COAST NORTH</span>
              </h2>
              <p className="mt-4 text-slate-400 font-bold text-xs md:text-sm uppercase tracking-[0.5em] ml-2">
                Grassroots Leadership • Verified Representatives
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* --- INNOVATIVE SEARCH & LIVE HUB (NICE UI) --- */}
        <AnimatedSection delay={100}>
          <div className="max-w-3xl mx-auto mb-16">
            <div className="flex flex-col md:flex-row items-center gap-3">
              
              {/* Search Field */}
              <div className="relative w-full group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
                <input 
                  type="text"
                  placeholder="Find by town or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-500/5 focus:border-blue-600 transition-all outline-none font-bold text-slate-900 text-lg"
                />
              </div>

              {/* Live Button */}
              <button 
                onClick={handleLiveLocation}
                disabled={isLocating}
                className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all active:scale-95 disabled:opacity-80 whitespace-nowrap shadow-xl"
              >
                {isLocating ? (
                  <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                ) : (
                  <Crosshair className="w-4 h-4" />
                )}
                <span>{isLocating ? "Scanning..." : "Live Location"}</span>
              </button>
            </div>

            {/* Status Metadata */}
            <div className="mt-4 flex flex-wrap justify-center gap-4">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                 {filteredMembers.length} Results Active
               </span>
               <AnimatePresence>
                {detectedZone && (
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-1.5 text-blue-600 text-[10px] font-black uppercase tracking-widest"
                  >
                    <MapPin className="w-3 h-3" />
                    Matched: {detectedZone}
                  </motion.span>
                )}
               </AnimatePresence>
            </div>
          </div>
        </AnimatedSection>
        
        {/* --- ASSEMBLY MEMBERS GRID (REVERTED CLASSIC) --- */}
        <AnimatedSection delay={150}>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredMembers.map((member) => (
              <div
                key={member.zone}
                className={`flex flex-col items-center text-center group bg-white border rounded-xl p-3 transition-all duration-300 ${detectedZone === member.zone ? 'border-blue-500 shadow-xl ring-4 ring-blue-50' : 'border-gray-100 hover:shadow-lg'}`}
              >
                <div className="w-full aspect-[3/4] bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden rounded-lg mb-3 relative">
                  <img 
                    src={member.photoUrl} 
                    alt={member.assemblyman}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent h-1/3"></div>
                  {detectedZone === member.zone && (
                    <div className="absolute top-2 right-2 bg-blue-600 text-white p-1 rounded-md animate-bounce">
                      <MapPin className="w-4 h-4" />
                    </div>
                  )}
                </div>
                
                <div className="w-full">
                  <p className="text-xs font-extrabold tracking-widest text-amber-600 uppercase mb-1">
                    {member.zone}
                  </p>
                  <p className="text-sm sm:text-base font-black text-slate-900 leading-tight uppercase line-clamp-2 mb-1">
                    {member.assemblyman}
                  </p>
                  <p className="text-sm text-slate-800 flex items-center justify-center gap-2 font-bold">
                    <Phone className="w-4 h-4 text-green-600" />
                    <span>{formatPhoneNumber(member.phone)}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}