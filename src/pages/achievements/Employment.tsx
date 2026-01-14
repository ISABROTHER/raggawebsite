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
  { year: 2023, title: "ABOBOYA DONATION & CLEAN-UP SUPPORT", info: "Donated an aboboya to the youth wing and supported Abura sanitation.", image: "https://i.imgur.com/saQoFLV.png" },
  // 2022
  { year: 2022, title: "50 SEWING MACHINES DISTRIBUTION", info: "Distributed professional sewing machines to fashion designers and entrepreneurs across the constituency.", image: "https://i.imgur.com/saQoFLV.png" },
  { year: 2022, title: "BIO-DIGESTER & SOAP PRODUCTION TRAINING", info: "Entrepreneurship initiative that trained over 350 constituents in practical, high-demand technical skills.", image: "https://i.imgur.com/saQoFLV.png" },
  { year: 2022, title: "EQUIPMENT FOR HAIRDRESSERS GRADUATION", info: "Donated 16 hairdryers and GHS 1,000 cash at the Abura Chapter Hairdressers graduation ceremony.", image: "https://i.imgur.com/saQoFLV.png" },
  // 2021
  { year: 2021, title: "600+ CONSTITUENTS TRAINED IN VOCATIONAL SKILLS", info: "Training in bio-digesters, soap, body cream, mushroom, and epoxy production.", image: "https://i.imgur.com/saQoFLV.png" },
  { year: 2021, title: "T-SHIRT PRODUCTION ENTREPRENEURSHIP INITIATIVE", info: "Launched local production to promote Cape Coast and create jobs.", image: "https://i.imgur.com/saQoFLV.png" },
  { year: 2021, title: "LOGISTICS FOR SKILLS ACQUISITION PROGRAMME", info: "Donated a motorcycle to the chief trainer to enhance mobile training.", image: "https://i.imgur.com/saQoFLV.png" },
  { year: 2021, title: "SUPPORT FOR TAILORS & DRESSMAKERS ASSOCIATION", info: "Financial support and pledge of 40 sewing machines across 4 zones.", image: "https://i.imgur.com/saQoFLV.png" },
  { year: 2021, title: "CREATIVE ARTS & MUSICIAN SUPPORT", info: "Provided financial backing for local artists and creative entrepreneurs.", image: "https://i.imgur.com/saQoFLV.png" },
  { year: 2021, title: "SPOTLIGHT AWARDS AFRICA RECOGNITION", info: "Honoured as Most Outstanding Politician in Entrepreneurship and Capacity Building.", image: "https://i.imgur.com/saQoFLV.png" }
];

export function Employment() {
  const [activeYear, setActiveYear] = useState<number | 'all'>('all');
  const years = [2025, 2024, 2023, 2022, 2021];

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
          {filteredInitiatives.map((item, index) => (
            <motion.div key={item.title + index} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-md flex flex-col hover:shadow-lg transition-shadow">
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