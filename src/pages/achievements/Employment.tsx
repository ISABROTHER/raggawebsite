// src/pages/achievements/Employment.tsx
import { motion } from 'framer-motion';

const initiatives = [
  {
    year: 2025,
    title: "YEA RECRUITMENT DRIVE (40+ SLOTS)",
    info: "Secured slots for Community Protection, Prisons, Ambulance, and Fire Assistants under the Youth Employment Agency.",
    image: "https://i.imgur.com/saQoFLV.png"
  },
  {
    year: 2025,
    title: "PUBLIC SECTOR JOB PLACEMENTS",
    info: "Successfully secured recruitment slots for GES (15), EPA (23), Signal Bureau (1), NADMO (6), NHIA (1), and Armed Forces (20).",
    image: "https://i.imgur.com/saQoFLV.png"
  },
  {
    year: 2025,
    title: "PROFESSIONAL APPOINTMENTS & COORD. ROLES",
    info: "Secured appointments for Health/Education Coordinators, Forestry Commission roles, and DRIP Coordinator positions.",
    image: "https://i.imgur.com/saQoFLV.png"
  },
  {
    year: 2025,
    title: "SUPPORT FOR ABURA TRANSPORT OPERATORS",
    info: "Donated GH₵5,000 in fuel coupons and GH₵2,000 cash to taxi drivers at Abura Taxi Station.",
    image: "https://i.imgur.com/saQoFLV.png"
  },
  {
    year: 2025,
    title: "FINANCIAL BOOST FOR ABURA MARKET WOMEN",
    info: "Provided GH₵2,000 cash support to market women to enhance their trading capital and livelihoods.",
    image: "https://i.imgur.com/saQoFLV.png"
  },
  {
    year: 2025,
    title: "NATIONAL APPRENTICESHIP & ADWUMAWURA",
    info: "Secured 25 slots for the National Apprenticeship Programme and 10 slots for the NYA Adwumawura programme.",
    image: "https://i.imgur.com/saQoFLV.png"
  },
  {
    year: 2025,
    title: "GH₵10,000 VIDEO EQUIPMENT FOR K2PHILMS",
    info: "Donated a professional video camera to support local creative arts and multimedia production.",
    image: "https://i.imgur.com/saQoFLV.png"
  },
  {
    year: 2025,
    title: "SUPPORT FOR NDC SERIAL CALLERS",
    info: "Direct support provided to community advocates and communicators within the constituency.",
    image: "https://i.imgur.com/saQoFLV.png"
  },
  {
    year: 2024,
    title: "VOCATIONAL SKILLS TRAINING WORKSHOPS",
    info: "Implementation of technical workshops to equip youth with modern vocational skills.",
    image: "https://i.imgur.com/saQoFLV.png"
  }
];

export function Employment() {
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