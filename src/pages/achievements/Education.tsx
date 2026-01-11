// src/pages/achievements/Education.tsx
import { motion } from 'framer-motion';

const initiatives = [
  {
    title: "High School Support Program",
    info: "Strategic assistance providing materials, mentorship, and exam preparation for students across the constituency.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  },
  {
    title: "Adisadel College Lighting",
    info: "Donation of 500 LED bulbs to secure a safe and effective night-time learning environment for students.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  },
  {
    title: "Basic School Furniture",
    info: "Delivery of 100 high-quality dual desks to ten basic schools with critical furniture deficits.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  },
  {
    title: "Classroom Infrastructure",
    info: "Comprehensive structural renovations for dilapidated school buildings to restore student safety and pride.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  }
];

export function Education() {
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