import { useState } from 'react';
import { motion } from 'framer-motion';
import { Infrastructure } from './achievements/Infrastructure';
import { Education } from './achievements/Education';
import { Health } from './achievements/Health';
import { Employment } from './achievements/Employment';
import { Agriculture } from './achievements/Agriculture';

const categories = [
  { id: 'infrastructure', label: 'Infrastructure', component: Infrastructure },
  { id: 'education', label: 'Education', component: Education },
  { id: 'health', label: 'Health', component: Health },
  { id: 'employment', label: 'Employment', component: Employment },
  { id: 'agriculture', label: 'Agriculture', component: Agriculture },
];

export function Achievements() {
  const [activeCategory, setActiveCategory] = useState('infrastructure');

  const ActiveComponent = categories.find(cat => cat.id === activeCategory)?.component || Infrastructure;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-black text-slate-900 mb-4">
            Verifiable Achievements
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A record of promises kept and real impact delivered to Cape Coast North
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wide transition-all ${
                activeCategory === category.id
                  ? 'bg-slate-900 text-white shadow-lg scale-105'
                  : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-slate-900 hover:text-slate-900'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
        >
          <ActiveComponent />
        </motion.div>
      </div>
    </div>
  );
}
