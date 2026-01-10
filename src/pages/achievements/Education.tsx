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
    <div className="grid grid-cols-1 gap-10">
      {initiatives.map((item, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-lg flex flex-col md:flex-row hover:border-blue-200 transition-colors"
        >
          {/* 1. Picture */}
          <div className="md:w-80 h-64 md:h-auto overflow-hidden shrink-0">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          </div>

          <div className="p-10 flex flex-col justify-center">
            {/* 2. Title */}
            <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight uppercase">
              {item.title}
            </h3>
            
            {/* 3. Information */}
            <p className="text-slate-600 leading-relaxed font-medium text-lg">
              {item.info}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}