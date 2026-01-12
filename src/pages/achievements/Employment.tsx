// src/pages/achievements/Employment.tsx
import { motion } from 'framer-motion';

const initiatives = [
  {
    title: "Transport Sector Support",
    info: "Donated GH₵5,000 in fuel coupons and GH₵2,000 cash to taxi drivers at Abura Taxi Station.",
    image: "https://i.imgur.com/saQoFLV.png"
  },
  {
    title: "Market Women Empowerment",
    info: "Provided GH₵2,000 cash support to market women at Abura Market to boost their small businesses.",
    image: "https://i.imgur.com/saQoFLV.png"
  },
  {
    title: "Public Service Recruitment",
    info: "Secured job placements for constituents: GES (15), EPA (23), Signal Bureau (1), NADMO (6), NHIA (1), and Ghana Armed Forces (20).",
    image: "https://i.imgur.com/saQoFLV.png"
  },
  {
    title: "YEA Community Slots",
    info: "Secured over 40 slots for Community Protection, Prisons, Ambulance, and Fire Assistants under the Youth Employment Agency.",
    image: "https://i.imgur.com/saQoFLV.png"
  },
  {
    title: "Professional Appointments",
    info: "Secured appointments for Health/Education Coordinators, Forestry Commission roles, and a DRIP Coordinator.",
    image: "https://i.imgur.com/saQoFLV.png"
  },
  {
    title: "Youth Skills & Apprenticeship",
    info: "Secured 25 slots for the National Apprenticeship Programme and 10 slots for the NYA Adwumawura programme.",
    image: "https://i.imgur.com/saQoFLV.png"
  },
  {
    title: "Creative Arts & Advocacy",
    info: "Donated a video camera worth GH₵10,000 to K2Philms and provided support to serial callers.",
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
          transition={{ delay: idx * 0.05 }}
          className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-md flex flex-col hover:shadow-lg transition-shadow"
        >
          <div className="h-40 overflow-hidden shrink-0">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-5 flex flex-col flex-1">
            <h3 className="text-lg font-black text-slate-900 mb-2 leading-tight uppercase tracking-tight">
              {item.title}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              {item.info}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}