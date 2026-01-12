// src/pages/achievements/Education.tsx
import { motion } from 'framer-motion';

const initiatives = [
  {
    title: "Duakor Basic School Renovation",
    info: "Renovated the school building, fixed leaking roofs, repaired partitions, installed new doors and windows, and completed full painting.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  },
  {
    title: "OLA Training College Support",
    info: "Donated 100 bags of cement, two truckloads of sand, and stones to support the construction of a new infirmary.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  },
  {
    title: "Tertiary Projects Funding",
    info: "Provided financial and logistical support toward various projects in tertiary institutions across the constituency.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  },
  {
    title: "Adisadel College Lighting",
    info: "Donation of 500 LED bulbs to address chronic lighting issues and improve the nighttime learning environment.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  },
  {
    title: "Senior High School Resources",
    info: "Distributed 1500 LED bulbs, 5 computers, 20 streetlights, and 1000 mosquito repellents to five senior high schools.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  },
  {
    title: "SHS Student Essentials",
    info: "Donated 180 chopboxes to first-year SHS students to assist with their transition to boarding school.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  },
  {
    title: "Casford Hall Sports Complex",
    info: "Donated GH₵20,000 toward the construction of the Casford Hall Sports Complex.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  },
  {
    title: "Abakam Basic School Canteen",
    info: "Facilitated the construction of a new canteen for Abakam Basic School and the surrounding community.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  },
  {
    title: "Institutional Financial Aid",
    info: "Provided GH₵50,000 in direct support for various educational institutions in the area.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  },
  {
    title: "Asenadze Youth Sports",
    info: "Donated football jerseys and equipment to the youth of Asenadze to promote healthy recreation.",
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