// src/pages/achievements/Infrastructure.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const initiatives = [
  { year: 2025, title: "10KM INNER-CITY ROAD LOBBYING", info: "Lobbied for asphalt roads in 4th Ridge, Pedu, and Ankaful.", image: "https://i.imgur.com/AZqDymE.jpeg" },
  { year: 2025, title: "350+ STREETLIGHT DISTRIBUTION", info: "Units distributed to Assembly members and institutions.", image: "https://i.imgur.com/AZqDymE.jpeg" },
  { year: 2025, title: "GH₵20,000 FOR AKOTOKYIR PLAZA", info: "Direct funding for community plaza construction.", image: "https://i.imgur.com/AZqDymE.jpeg" },
  { year: 2025, title: "OBIARA KA HO SOCCER CENTRE", info: "Ongoing construction of a sports facility at Pedu.", image: "https://i.imgur.com/AZqDymE.jpeg" },
  { year: 2025, title: "COMMUNITY CENTRE MATERIALS DONATION", info: "Cement and roofing for Brabedze and Apewosika centres.", image: "https://i.imgur.com/AZqDymE.jpeg" },
  { year: 2025, title: "GH₵30,000 FOR CULTURAL FESTIVALS", info: "Support for Oguaa Fetu Afahye and other celebrations.", image: "https://i.imgur.com/AZqDymE.jpeg" },
  { year: 2024, title: "2,500+ STREETLIGHT INSTALLATIONS", info: "Constituency-wide lighting for safety and commerce.", image: "https://i.imgur.com/AZqDymE.jpeg" },
  // 2023
  { year: 2023, title: "RENOVATION OF AMAMOMA COMMUNITY CENTRE", info: "Full renovation of the central gathering hub for Amamoma.", image: "https://i.imgur.com/AZqDymE.jpeg" },
  { year: 2023, title: "CONSTRUCTION SUPPORT FOR ANKAFUL COMMUNITY CENTRE", info: "Donated 200 bags of cement, stones, and sand for construction.", image: "https://i.imgur.com/AZqDymE.jpeg" },
  { year: 2023, title: "SUPPORT FOR EFUTU COMMUNITY CENTRE CONSTRUCTION", info: "Donated 100 bags of cement and construction stones.", image: "https://i.imgur.com/AZqDymE.jpeg" },
  { year: 2023, title: "AKOTOKYIR COMMUNITY PLAZA MATERIALS", info: "Donated 50 bags of cement and sand for the plaza expansion.", image: "https://i.imgur.com/AZqDymE.jpeg" },
  { year: 2023, title: "EKOO COMMUNITY PALACE CONSTRUCTION", info: "Donated 100 bags of cement to support the palace building.", image: "https://i.imgur.com/AZqDymE.jpeg" },
  { year: 2023, title: "CONSTRUCTION OF DUAKOR COMMUNITY FOOTBRIDGE", info: "Built a footbridge to enhance connectivity and safety in Duakor.", image: "https://i.imgur.com/AZqDymE.jpeg" },
  // 2022
  { year: 2022, title: "400+ STREETLIGHTS CONSTITUENCY-WIDE", info: "Extensive provision of streetlights to enhance security and nightlife in all communities.", image: "https://i.imgur.com/AZqDymE.jpeg" },
  { year: 2022, title: "ABURA AHOBAA FESTIVAL SUPPORT", info: "Donated 20 streetlights and 50 Wellington boots to support the community's major festival.", image: "https://i.imgur.com/AZqDymE.jpeg" },
  { year: 2022, title: "TILES FOR SENANAWIN MOSQUE", info: "Donated 70 boxes of tiles to support the mosque's development project.", image: "https://i.imgur.com/AZqDymE.jpeg" },
  { year: 2022, title: "ROOFING FOR TRUCK DRIVERS' STATION", info: "Donated high-quality roofing sheets to provide shelter and improve station facilities.", image: "https://i.imgur.com/AZqDymE.jpeg" },
  { year: 2022, title: "SUPPORT FOR NKANFOA AFAHYE", info: "Donated 10 streetlights and 32 Wellington boots to facilitate the community festival.", image: "https://i.imgur.com/AZqDymE.jpeg" },
  { year: 2022, title: "OGUAA FETU AFAHYE FESTIVAL SUPPORT", info: "Strategic logistical and financial backing for Cape Coast's premier traditional festival.", image: "https://i.imgur.com/AZqDymE.jpeg" },
  // 2021
  { year: 2021, title: "280+ STREETLIGHTS DISTRIBUTION", info: "Distributed to Assemblymen, schools, hospitals, and communities.", image: "https://i.imgur.com/AZqDymE.jpeg" },
  { year: 2021, title: "BEACH CLEAN-UP & CONSERVATION SUPPORT", info: "Donated Wellington boots and funds to Care for Nature for serene beaches.", image: "https://i.imgur.com/AZqDymE.jpeg" },
  { year: 2021, title: "ABURA COMMUNITY DUMPSITE & CLEAN-UP", info: "Supported construction of dumpsite and coordinated community cleaning.", image: "https://i.imgur.com/AZqDymE.jpeg" },
  { year: 2021, title: "CEMENT DONATION TO REGIONAL FIRE SERVICE", info: "Donated 20 bags of cement for station maintenance and infrastructure.", image: "https://i.imgur.com/AZqDymE.jpeg" },
  { year: 2021, title: "ABURA PALACE CONSTRUCTION SUPPORT", info: "Donated 22 bags of cement towards the palace building project.", image: "https://i.imgur.com/AZqDymE.jpeg" },
  { year: 2021, title: "REPAIR OF 6 BOREHOLES IN 4 COMMUNITIES", info: "Restored water access in Akaikrom, Mempeasem, Efutu Kokwado, and Ansepatu.", image: "https://i.imgur.com/AZqDymE.jpeg" },
  { year: 2021, title: "BESSAKROM FOOTBRIDGE CONSTRUCTION", info: "Donated 15 bags of cement and iron rods for community connectivity.", image: "https://i.imgur.com/AZqDymE.jpeg" },
  { year: 2021, title: "ROUND PALACE BRIDGE & ROAD IMPROVEMENTS", info: "Ongoing construction work to improve mobility and infrastructure.", image: "https://i.imgur.com/AZqDymE.jpeg" },
  { year: 2021, title: "PPEs & LOGISTICS FOR FIRE STATIONS", info: "Supported Pedu, UCC, and Elmina stations with equipment and funds.", image: "https://i.imgur.com/AZqDymE.jpeg" },
  { year: 2021, title: "COMMISSIONING OF ABURA POLICE STATION", info: "Operationalized the station to enhance security in the Abura enclave.", image: "https://i.imgur.com/AZqDymE.jpeg" },
  { year: 2021, title: "ABURA MARKET SHED CONSTRUCTION", info: "Built a new shed facility for traders and shoppers at Abura Market.", image: "https://i.imgur.com/AZqDymE.jpeg" }
];

export function Infrastructure() {
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
            <motion.div key={item.title + index} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-md flex flex-col hover:shadow-lg transitio n-shadow">
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