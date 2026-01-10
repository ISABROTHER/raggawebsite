import { useState } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';

// Import the sub-components from the achievements folder
import { Education } from './achievements/Education';
import { Health } from './achievements/Health';
import { Employment } from './achievements/Employment';
import { Infrastructure } from './achievements/Infrastructure';
import { Agriculture } from './achievements/Agriculture';

type PolicyKey = 'education' | 'health' | 'employment' | 'infrastructure' | 'agriculture';

const categories = [
  { id: 'education' as PolicyKey, title: 'Educational Support', count: 4, desc: 'Quality education, school resources, and youth training.', image: 'https://i.imgur.com/Ozjnrli.jpeg', component: <Education /> },
  { id: 'health' as PolicyKey, title: 'Health & Sanitation', count: 3, desc: 'Health facilities and public hygiene projects.', image: 'https://i.imgur.com/XmWnKbH.jpeg', component: <Health /> },
  { id: 'employment' as PolicyKey, title: 'Job Creation', count: 3, desc: 'Reviving local industry and supporting small businesses.', image: 'https://i.imgur.com/saQoFLV.png', component: <Employment /> },
  { id: 'infrastructure' as PolicyKey, title: 'Infrastructure', count: 4, desc: 'Improving roads, lighting, and community connectivity.', image: 'https://i.imgur.com/AZqDymE.jpeg', component: <Infrastructure /> },
  { id: 'agriculture' as PolicyKey, title: 'Agri-Development', count: 4, desc: 'Supporting farmers with tools, training, and market access.', image: 'https://i.imgur.com/TZ4jIJA.jpeg', component: <Agriculture /> }
];

export function Achievements() {
  const [selectedId, setSelectedId] = useState<PolicyKey | null>(null);
  const selectedPolicy = categories.find(c => c.id === selectedId);

  return (
    <div className="min-h-screen bg-slate-50 pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {!selectedPolicy ? (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">
                  Our <span className="text-blue-700">Achievements</span>
                </h1>
                <p className="max-w-2xl mx-auto text-slate-600 text-lg font-medium leading-relaxed mt-6">
                  A comprehensive record of verifiable progress made across Cape Coast North Constituency.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((policy, idx) => (
                  <AnimatedSection key={policy.id} delay={idx * 100}>
                    <button
                      onClick={() => setSelectedId(policy.id)}
                      className="w-full bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl h-full flex flex-col text-left group hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img src={policy.image} alt={policy.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-black text-slate-900 leading-tight mb-2">{policy.title}</h3>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">{policy.desc}</p>
                        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between gap-4">
                          <div className="bg-blue-50 text-blue-700 text-[10px] font-black px-2 py-1 rounded-lg border border-blue-100 uppercase tracking-widest">
                            {policy.count} Key Projects
                          </div>
                          <div className="flex items-center gap-1 text-blue-600 font-black text-xs uppercase group-hover:gap-2 transition-all">
                            <span>Details</span>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </button>
                  </AnimatedSection>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <button 
                onClick={() => setSelectedId(null)} 
                className="flex items-center gap-2 text-slate-600 hover:text-blue-700 mb-8 font-black transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 
                <span className="font-black">Back to Overview</span>
              </button>

              <div className="relative h-48 md:h-64 rounded-[2rem] overflow-hidden mb-12 shadow-xl">
                <img src={selectedPolicy.image} alt={selectedPolicy.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-8 md:p-10">
                  <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight uppercase">{selectedPolicy.title}</h1>
                </div>
              </div>

              <div className="mt-8">
                {selectedPolicy.component}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}