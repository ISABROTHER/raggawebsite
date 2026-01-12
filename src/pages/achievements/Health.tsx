// src/pages/achievements/Health.tsx
import { motion } from 'framer-motion';

const initiatives = [
  {
    year: 2025,
    title: "1,500L OIL & 1,500 BAGS RICE DISTRIBUTION",
    info: "Major relief exercise supporting the aged, persons with disabilities, and the less privileged across the constituency.",
    image: "https://i.imgur.com/XmWnKbH.jpeg"
  },
  {
    year: 2024,
    title: "MEDICAL SUPPLIES FOR KWAPROW & DANKWAKROM",
    info: "Provision of critical medical supplies and infrastructure upgrades to local health centers.",
    image: "https://i.imgur.com/XmWnKbH.jpeg"
  },
  {
    year: 2024,
    title: "MODERN PUBLIC SANITATION FACILITIES",
    info: "Construction of modern hygiene facilities in high-density areas to improve community public health.",
    image: "https://i.imgur.com/XmWnKbH.jpeg"
  }
];

export function Health() {
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