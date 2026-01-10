import { motion } from 'framer-motion';

const initiatives = [
  {
    title: "Factory Revival",
    info: "Strategic roadmap development and advocacy for reviving dormant factories to create sustainable local jobs.",
    image: "https://i.imgur.com/saQoFLV.png"
  },
  {
    title: "Skills Training",
    info: "Implementation of technical workshops to equip youth with modern skills for the current job market.",
    image: "https://i.imgur.com/saQoFLV.png"
  },
  {
    title: "Startup Support",
    info: "Providing financial mentorship and resources for local small business owners and young entrepreneurs.",
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