import { motion } from 'framer-motion';

const initiatives = [
  {
    title: "Operation Light Up",
    info: "Installation of over 2,500 streetlights across the constituency to enhance security and night commerce.",
    image: "https://i.imgur.com/AZqDymE.jpeg"
  },
  {
    title: "Road Maintenance",
    info: "Extensive road grading projects and secured allocation for 10km of asphalted roads in key areas.",
    image: "https://i.imgur.com/AZqDymE.jpeg"
  },
  {
    title: "Community Center",
    info: "Full refurbishment and construction of the Ankaful Community Centre for public gatherings.",
    image: "https://i.imgur.com/AZqDymE.jpeg"
  },
  {
    title: "Rural Power Grid",
    info: "Expansion of electricity infrastructure to underserved rural communities within the constituency.",
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