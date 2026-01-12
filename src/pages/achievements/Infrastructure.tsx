// src/pages/achievements/Infrastructure.tsx
import { motion } from 'framer-motion';

const initiatives = [
  {
    title: "10km Inner-City Roads",
    info: "Lobbied for construction of 10km of roads at 4th Ridge, Bessakrom, Kwawprow–Ankaful, Pedu Estate, and Akaikrom.",
    image: "https://i.imgur.com/AZqDymE.jpeg"
  },
  {
    title: "Community Lighting Projects",
    info: "Donated 150 streetlights to Assembly members and distributed an additional 200 streetlights to various institutions.",
    image: "https://i.imgur.com/AZqDymE.jpeg"
  },
  {
    title: "Community Centre Support",
    info: "Donated 30 bags of cement for Koforidua community centre and materials for the Brabedze community centre expansion.",
    image: "https://i.imgur.com/AZqDymE.jpeg"
  },
  {
    title: "Akotokyir Community Plaza",
    info: "Presented GH₵20,000 to support the construction of the Akotokyir Community Plaza.",
    image: "https://i.imgur.com/AZqDymE.jpeg"
  },
  {
    title: "Obiara Ka Ho Soccer Centre",
    info: "Ongoing construction of the 'Obiara ka ho' soccer centre at Pedu community to enhance local sports.",
    image: "https://i.imgur.com/AZqDymE.jpeg"
  },
  {
    title: "Cultural Heritage Support",
    info: "GH₵30,000 support for Oguaa Fetu Afahye, Orange Friday, Kwaprow Afahye, and Abura Afahye celebrations.",
    image: "https://i.imgur.com/AZqDymE.jpeg"
  },
  {
    title: "Apewosika Community Materials",
    info: "Donated 100 bags of cement, stones, and sand to support local construction projects in Apewosika.",
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