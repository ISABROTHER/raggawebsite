// src/pages/achievements/Employment.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const initiatives = [
  { year: 2025, title: "PUBLIC SECTOR JOB RECRUITMENTS", info: "Secured slots for GES, EPA, NADMO, and Ghana Armed Forces.", image: "https://i.imgur.com/saQoFLV.png" },
  { year: 2025, title: "YEA COMMUNITY SLOTS SECURED", info: "Secured 40+ positions in Prisons, Fire, and Ambulance services.", image: "https://i.imgur.com/saQoFLV.png" },
  { year: 2025, title: "PROFESSIONAL COORDINATOR APPOINTMENTS", info: "Secured roles for Health, Education, and DRIP coordinators.", image: "https://i.imgur.com/saQoFLV.png" },
  { year: 2025, title: "TRANSPORT SECTOR CASH & FUEL SUPPORT", info: "Provided coupons and cash to Abura Taxi drivers.", image: "https://i.imgur.com/saQoFLV.png" },
  { year: 2025, title: "MARKET WOMEN BUSINESS CAPITAL", info: "Direct cash donations to empower women in Abura Market.", image: "https://i.imgur.com/saQoFLV.png" },
  { year: 2025, title: "NATIONAL APPRENTICESHIP ENROLLMENT", info: "Secured 25 slots for the apprenticeship program.", image: "https://i.imgur.com/saQoFLV.png" },
  { year: 2025, title: "GH₵10,000 CAMERA FOR K2PHILMS", info: "Empowered local creatives with high-end video equipment.", image: "https://i.imgur.com/saQoFLV.png" },
  { year: 2025, title: "NDC SERIAL CALLER SUPPORT", info: "Logistical support for community communicators.", image: "https://i.imgur.com/saQoFLV.png" },
  { year: 2024, title: "TECHNICAL SKILLS WORKSHOPS", info: "Modern vocational training for constituency youth.", image: "https://i.imgur.com/saQoFLV.png" },
  // 2023
  { year: 2023, title: "ABOBOYA DONATION & CLEAN-UP SUPPORT", info: "Donated an aboboya to the youth wing and supported Abura sanitation.", image: "https://i.imgur.com/saQoFLV.png" }
];

export function Employment() {
  const [activeYear, setActiveYear] = useState<number | 'all'>('all');
  const years = [2025, 2024, 2023];

  const filteredInitiatives = activeYear === 'all' ? initiatives : initiatives.filter(i => i.year === activeYear);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2 pb-4 border-b border-slate-200">
        <button onClick={() => setActiveYear('all')} className={`px-6 py-2 rounded-full text-xs font-black uppercase transition-all ${activeYear === 'all' ? 'bg-green-600 text-white' : 'bg-white text-slate-500'}`}>All Years</button>
        {years.map(y => (
          <button key={y} onClick={() => setActiveYear(y)} className={`px-6 py-2 rounded-full text-xs font-black uppercase transition-all ${activeYear === y ? 'bg-green-600 text-white' : 'bg-white text-slate-500'}`}>{y}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredInitiatives.map((item) => (
            <motion.div key={item.title} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-md flex flex-col hover:shadow-lg transition-shadow">
              <div className="relative h-40 overflow-hidden shrink-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-green-600 text-white text-[10px] font-black px-2 py-1 rounded shadow-lg">{item.year}</div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-sm font-black text-slate-900 mb-3 leading-tight uppercase">{item.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed font-medium">{item.info}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}