// src/pages/achievements/Education.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const initiatives = [
  // 2025 Achievements
  {
    year: 2025,
    title: "GH₵20,000 DONATION TOWARDS THE CASFORD SPORTS COMPLEX",
    info: "Significant financial contribution toward the construction and development of the Casford Hall Sports complex.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  },
  {
    year: 2025,
    title: "RENOVATION OF DUAKOR BASIC SCHOOL",
    info: "Comprehensive structural work including fixing leaking roofs, partitions, broken doors, windows, and full painting.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  },
  {
    year: 2025,
    title: "INFIRMARY SUPPORT FOR OLA TRAINING COLLEGE",
    info: "Donated 100 bags of cement, two truckloads of sand, and stones for the construction of a new campus infirmary.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  },
  {
    year: 2025,
    title: "GH₵50,000 DIRECT SUPPORT FOR EDUCATIONAL INSTITUTIONS",
    info: "Provided substantial financial assistance to various schools and educational bodies across the constituency.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  },
  {
    year: 2025,
    title: "500 LED BULBS FOR ADISADEL COLLEGE",
    info: "Donated high-efficiency lighting to address chronic lighting issues and improve nighttime safety and learning.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  },
  {
    year: 2025,
    title: "CAMPUS UPGRADE FOR FIVE SENIOR HIGH SCHOOLS",
    info: "Distributed 1500 LED bulbs, 5 computers, 20 streetlights, and 1000 mosquito repellents to enhance student welfare.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  },
  {
    year: 2025,
    title: "180 CHOPBOXES FOR FIRST-YEAR SHS STUDENTS",
    info: "Support for newly admitted SHS students to alleviate the financial burden on their families.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  },
  {
    year: 2025,
    title: "CANTEEN CONSTRUCTION FOR ABAKAM BASIC SCHOOL",
    info: "Built a modern canteen facility to serve the nutritional needs of students and the local community.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  },
  {
    year: 2025,
    title: "SPORTS EQUIPMENT FOR ASENADZE YOUTH",
    info: "Donated jerseys and footballs to promote physical activity and youth engagement in Asenadze.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  },
  {
    year: 2025,
    title: "SUPPORT FOR TERTIARY INSTITUTION PROJECTS",
    info: "Direct backing for various development initiatives led by tertiary students and institutional bodies.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  },
  // 2024 Achievements (Examples for Sorting)
  {
    year: 2024,
    title: "STRATEGIC HIGH SCHOOL SUPPORT PROGRAM",
    info: "Provided learning materials and mentorship for students preparing for final examinations.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  },
  {
    year: 2024,
    title: "100 DUAL DESKS FOR BASIC SCHOOLS",
    info: "Critical furniture delivery to ten schools identified with significant seating deficits.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  }
];

export function Education() {
  const [activeYear, setActiveYear] = useState<number | 'all'>('all');
  const years = [2025, 2024]; // Add 2023, 2022, 2021 as you provide them

  const filteredInitiatives = activeYear === 'all' 
    ? initiatives 
    : initiatives.filter(i => i.year === activeYear);

  return (
    <div className="space-y-8">
      {/* Year Filter */}
      <div className="flex flex-wrap gap-2 pb-4 border-b border-slate-200">
        <button
          onClick={() => setActiveYear('all')}
          className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
            activeYear === 'all' ? 'bg-green-600 text-white shadow-lg' : 'bg-white text-slate-500 hover:bg-slate-100'
          }`}
        >
          All Years
        </button>
        {years.map(year => (
          <button
            key={year}
            onClick={() => setActiveYear(year)}
            className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
              activeYear === year ? 'bg-green-600 text-white shadow-lg' : 'bg-white text-slate-500 hover:bg-slate-100'
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredInitiatives.map((item, idx) => (
            <motion.div 
              key={item.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
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
        </AnimatePresence>
      </div>
    </div>
  );
}