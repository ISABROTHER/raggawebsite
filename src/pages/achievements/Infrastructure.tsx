// src/pages/achievements/Infrastructure.tsx
import { motion } from 'framer-motion';

const initiatives = [
  {
    year: 2025,
    title: "10KM INNER-CITY ROAD CONSTRUCTION",
    info: "Lobbied for asphalt and grading at 4th Ridge, Bessakrom, Kwawprow–Ankaful, Pedu Estate, and Akaikrom.",
    image: "https://i.imgur.com/AZqDymE.jpeg"
  },
  {
    year: 2025,
    title: "STREETLIGHT DISTRIBUTION (350+ UNITS)",
    info: "Donated 150 streetlights to Assembly members and 200 units to various institutions and communities.",
    image: "https://i.imgur.com/AZqDymE.jpeg"
  },
  {
    year: 2025,
    title: "GH₵20,000 FOR AKOTOKYIR COMMUNITY PLAZA",
    info: "Financial contribution toward the construction of a modern community plaza in Akotokyir.",
    image: "https://i.imgur.com/AZqDymE.jpeg"
  },
  {
    year: 2025,
    title: "OBIARA KA HO SOCCER CENTRE CONSTRUCTION",
    info: "Ongoing construction of a dedicated soccer facility at the Pedu community to support youth sports.",
    image: "https://i.imgur.com/AZqDymE.jpeg"
  },
  {
    year: 2025,
    title: "COMMUNITY CENTRE EXPANSION & SUPPORT",
    info: "Donated cement and roofing sheets for expansion in Brabedze, Apewosika, and Koforidua community centres.",
    image: "https://i.imgur.com/AZqDymE.jpeg"
  },
  {
    year: 2025,
    title: "GH₵30,000 FOR CULTURAL FESTIVALS",
    info: "Major support for Oguaa Fetu Afahye, Orange Friday, Kwaprow Afahye, and Abura Afahye celebrations.",
    image: "https://i.imgur.com/AZqDymE.jpeg"
  },
  {
    year: 2024,
    title: "INSTALLATION OF 2,500+ STREETLIGHTS",
    info: "Broad-scale lighting project to enhance security and night commerce across the entire constituency.",
    image: "https://i.imgur.com/AZqDymE.jpeg"
  }
];

export function Infrastructure() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {initiatives.map((item, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-md flex flex-col hover:shadow-lg transition-shadow"
        >
          <div className="relative h-40 overflow-hidden shrink-0">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute top-3 left-3 bg-green-600 text-white text-[10px] font-black px-2 py-1 rounded shadow-lg">
              {item.year}
            </div>
          </div>
          <div className="p-5 flex flex-col flex-1">
            <h3 className="text-sm font-black text-slate-900 mb-3 leading-tight uppercase tracking-tight">
              {item.title}
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed font-medium">
              {item.info}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}