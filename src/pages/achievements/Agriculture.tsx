import { motion } from 'framer-motion';

const initiatives = [
  {
    title: "Farmer Logistics",
    info: "Direct distribution of modern farming tools, improved seeds, and fertilizers to local cooperatives.",
    image: "https://i.imgur.com/TZ4jIJA.jpeg"
  },
  {
    title: "Market Connectivity",
    info: "Creating direct supply chains between rural farmers and wholesalers to ensure fair pricing.",
    image: "https://i.imgur.com/TZ4jIJA.jpeg"
  },
  {
    title: "Agribusiness Training",
    info: "Specialized programs focused on mechanization and modern value-addition for youth in farming.",
    image: "https://i.imgur.com/TZ4jIJA.jpeg"
  },
  {
    title: "Resilient Farming",
    info: "Ongoing workshops on climate-resilient farming and soil conservation for local smallholders.",
    image: "https://i.imgur.com/TZ4jIJA.jpeg"
  }
];

export function Agriculture() {
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