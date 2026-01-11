// src/pages/OngoingProjects.tsx
import { HardHat, MapPin, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';

const projects = [
  {
    id: 1,
    title: "Pedu Park Astro-Turf",
    category: "Sports & Youth",
    progress: 45,
    location: "Pedu",
    timeline: "March 2026",
    image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=2029&auto=format&fit=crop",
    description: "Transformation of the community park into a world-class sporting facility with floodlights and spectator stands."
  },
  {
    id: 2,
    title: "Abura Health Center Wing",
    category: "Healthcare",
    progress: 85,
    location: "Abura",
    timeline: "Dec 2025",
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=2072&auto=format&fit=crop",
    description: "Expansion of the existing health facility to include a dedicated maternal ward and emergency unit."
  },
  {
    id: 3,
    title: "Cape Coast North ICT Hub",
    category: "Education/Tech",
    progress: 30,
    location: "UCC Area",
    timeline: "July 2026",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
    description: "A state-of-the-art digital learning center equipped with high-speed internet for youth skill development."
  }
];

export function OngoingProjects() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-12 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- MODERN HERO SECTION --- */}
        <div className="relative mb-20">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-200 pb-12">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Live Development Tracker
                </div>
                <h1 className="text-4xl md:text-7xl font-black text-slate-900 leading-[0.9] uppercase tracking-tighter">
                  On-Going <br />
                  <span className="text-green-700">Impact.</span>
                </h1>
              </div>
              
              <div className="flex gap-10">
                <div className="text-center">
                  <p className="text-4xl font-black text-slate-900">12</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Sites</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-black text-green-700">85%</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avg. Progress</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* --- PROJECT GRID --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <AnimatedSection key={project.id} delay={index * 100}>
              <div className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100">
                
                {/* Image Wrap */}
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                  
                  {/* Category Float */}
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-widest rounded-xl">
                      {project.category}
                    </span>
                  </div>

                  {/* Location Float */}
                  <div className="absolute bottom-6 left-6 flex items-center gap-2 text-white/90">
                    <MapPin className="w-4 h-4 text-green-400" />
                    <span className="text-xs font-bold uppercase tracking-wider">{project.location}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight uppercase group-hover:text-green-700 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                    {project.description}
                  </p>

                  {/* Modern Progress Dashboard */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Est. {project.timeline}</span>
                      </div>
                      <span className="text-lg font-black text-slate-900">{project.progress}%</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[10px] font-black text-green-700 uppercase">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      On Schedule
                    </span>
                    <button className="p-2 bg-slate-900 text-white rounded-full hover:bg-green-700 transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* --- CALL TO ACTION --- */}
        <AnimatedSection delay={400}>
          <div className="mt-24 rounded-[3rem] bg-slate-900 p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-green-600/20 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6">
                Community Focused <br />Development
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto mb-10 font-medium">
                These projects represent our commitment to building a better Cape Coast North. Have feedback or suggestions for your area?
              </p>
              <button className="px-10 py-4 bg-green-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-full hover:bg-white hover:text-slate-900 transition-all active:scale-95 shadow-xl shadow-green-900/20">
                Contact Constituency Office
              </button>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}