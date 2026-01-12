// src/pages/achievements/Education.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const initiatives = [
  // 2025
  { year: 2025, title: "GH₵20,000 DONATION TOWARDS THE CASFORD SPORTS COMPLEX", info: "Direct financial support for the construction of the Casford Hall Sports facility.", image: "https://i.imgur.com/Ozjnrli.jpeg" },
  { year: 2025, title: "RENOVATION OF DUAKOR BASIC SCHOOL", info: "Fixed leaking roofs, partitions, broken doors, windows, and full painting.", image: "https://i.imgur.com/Ozjnrli.jpeg" },
  { year: 2025, title: "INFIRMARY SUPPORT FOR OLA TRAINING COLLEGE", info: "Donated 100 bags of cement, sand, and stones for the new infirmary construction.", image: "https://i.imgur.com/Ozjnrli.jpeg" },
  { year: 2025, title: "GH₵50,000 FINANCIAL SUPPORT FOR SCHOOLS", info: "Provided monetary aid to various educational institutions across the constituency.", image: "https://i.imgur.com/Ozjnrli.jpeg" },
  { year: 2025, title: "500 LED BULBS FOR ADISADEL COLLEGE", info: "Addressed chronic lighting issues to improve student safety.", image: "https://i.imgur.com/Ozjnrli.jpeg" },
  { year: 2025, title: "COMPUTERS & RESOURCES FOR 5 SENIOR HIGH SCHOOLS", info: "Donated 5 computers, 1500 LED bulbs, and 1000 mosquito repellents.", image: "https://i.imgur.com/Ozjnrli.jpeg" },
  { year: 2025, title: "180 CHOPBOXES FOR FIRST-YEAR STUDENTS", info: "Welfare support for newly admitted SHS students.", image: "https://i.imgur.com/Ozjnrli.jpeg" },
  { year: 2025, title: "CANTEEN CONSTRUCTION FOR ABAKAM BASIC SCHOOL", info: "Built a dedicated canteen facility for students and the community.", image: "https://i.imgur.com/Ozjnrli.jpeg" },
  { year: 2025, title: "SPORTS KITS FOR ASENADZE YOUTH", info: "Donated jerseys and footballs to the local youth team.", image: "https://i.imgur.com/Ozjnrli.jpeg" },
  { year: 2025, title: "LOGISTICAL SUPPORT FOR TERTIARY PROJECTS", info: "Backed student-led developmental projects in higher institutions.", image: "https://i.imgur.com/Ozjnrli.jpeg" },
  
  // 2024
  { year: 2024, title: "BECE & WASSCE CANDIDATE SUPPORT", info: "Mentorship and material provision for exam preparation.", image: "https://i.imgur.com/Ozjnrli.jpeg" },
  { year: 2024, title: "CLASSROOM INFRASTRUCTURE REHABILITATION", info: "Structural repairs for dilapidated basic school buildings.", image: "https://i.imgur.com/Ozjnrli.jpeg" },
  
  // 2023
  { year: 2023, title: "EDUCATIONAL SUPPORT FOR 100 BECE TO SHS STUDENTS", info: "Beneficiaries received strategic educational materials and enrollment support.", image: "https://i.imgur.com/Ozjnrli.jpeg" },
  { year: 2023, title: "DONATION OF 100 DUAL DESKS TO 10 BASIC SCHOOLS", info: "Addressed furniture deficits in critical basic educational facilities.", image: "https://i.imgur.com/Ozjnrli.jpeg" },
  { year: 2023, title: "SPORTS KITS DONATION TO NYINASI COMMUNITY", info: "Provided a set of jersey and football to encourage community youth sports.", image: "https://i.imgur.com/Ozjnrli.jpeg" },
  { year: 2023, title: "JERSEY & FOOTBALL DONATION FOR UCC STAFF GAMES", info: "Supported staff recreation and health at the University of Cape Coast.", image: "https://i.imgur.com/Ozjnrli.jpeg" },
  { year: 2023, title: "SPORTS SUPPORT FOR AKOTOKYIR YOUTH TEAM", info: "Donated a set of jersey and a football to the community youth football team.", image: "https://i.imgur.com/Ozjnrli.jpeg" },
  { year: 2023, title: "FUNDING FOR REGIONAL RUGBY TEAMS", info: "Financial support for the Central and Western regional rugby teams.", image: "https://i.imgur.com/Ozjnrli.jpeg" },
  { year: 2023, title: "ABURA AHOBAA FESTIVAL FOOTBALL GALA SUPPORT", info: "Donated 2 sets of jerseys, 2 footballs, 3 trophies, and cash prizes.", image: "https://i.imgur.com/Ozjnrli.jpeg" },
  { year: 2023, title: "NKANFOA COMMUNITY TEAM SPORTS GEAR", info: "Supported the local team with quality footballs and jerseys.", image: "https://i.imgur.com/Ozjnrli.jpeg" },
  { year: 2023, title: "FOOTBALL & HOSES DONATION TO ANKAFUL COMMUNITY", info: "Provided essential football gear including hoses and jerseys to the youth.", image: "https://i.imgur.com/Ozjnrli.jpeg" },
  { year: 2023, title: "AFRICAN SOFTBALL CONFEDERATION SUPPORT", info: "Provided logistical and financial backing for the confederation's initiatives.", image: "https://i.imgur.com/Ozjnrli.jpeg" },
  { year: 2023, title: "BRIMSU COMMUNITY SPORTS EQUIPMENT", info: "Donated jerseys, football hoses, and footballs to the community.", image: "https://i.imgur.com/Ozjnrli.jpeg" },
  { year: 2023, title: "ESSUERKYIR COMMUNITY YOUTH SPORTS SUPPORT", info: "Donated full football kits to empower local youth athletes.", image: "https://i.imgur.com/Ozjnrli.jpeg" }
];

export function Education() {
  const [activeYear, setActiveYear] = useState<number | 'all'>('all');
  const years = [2025, 2024, 2023];

  const filteredInitiatives = activeYear === 'all' 
    ? initiatives 
    : initiatives.filter(i => i.year === activeYear);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2 pb-4 border-b border-slate-200">
        <button onClick={() => setActiveYear('all')} className={`px-6 py-2 rounded-full text-xs font-black uppercase transition-all ${activeYear === 'all' ? 'bg-green-600 text-white' : 'bg-white text-slate-500'}`}>All Years</button>
        {years.map(y => (
          <button key={y} onClick={() => setActiveYear(y)} className={`px-6 py-2 rounded-full text-xs font-black uppercase transition-all ${activeYear === y ? 'bg-green-600 text-white' : 'bg-white text-slate-500'}`}>{y}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredInitiatives.map((item) => (
            <motion.div key={item.title} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-md flex flex-col hover:shadow-lg transition-shadow">
              <div className="relative h-40 overflow-hidden shrink-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-green-600 text-white text-[10px] font-black px-2 py-1 rounded shadow-lg">{item.year}</div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-sm font-black text-slate-900 mb-3 leading-tight uppercase">{item.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed font-medium">{item.info}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}