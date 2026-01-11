// src/pages/OngoingProjects.tsx
import { HardHat, MapPin, Calendar, ArrowUpRight } from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';

const projects = [
  {
    id: 1,
    title: "Pedu Park Construction",
    category: "Sports Infrastructure",
    progress: 45,
    location: "Pedu Electoral Area",
    timeline: "Q1 2026 Delivery",
    image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=2029&auto=format&fit=crop",
    description: "Transformation of the Pedu Community Park into a FIFA-standard astro-turf facility. This project includes modern floodlighting, gated fencing, and spectator seating to foster local talent."
  },
  {
    id: 2,
    title: "Abura 3-Unit Classroom Block",
    category: "Education",
    progress: 85,
    location: "Abura",
    timeline: "December 2025 Handover",
    image: "https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=2070&auto=format&fit=crop",
    description: "Addressing educational infrastructure deficits. This modern facility includes faculty offices and storage units, designed to provide a conducive environment for over 150 students."
  },
  {
    id: 3,
    title: "Duakor Water Expansion",
    category: "Public Utilities",
    progress: 20,
    location: "Duakor/Abakam",
    timeline: "Mid 2026 Estimated",
    image: "https://images.unsplash.com/photo-1541339907198-e08756eaa539?q=80&w=2070&auto=format&fit=crop",
    description: "Expanding the primary water distribution network to Duakor. This phase focuses on high-capacity pipeline installation and reservoir stabilization to ensure reliable water access."
  }
];

export function OngoingProjects() {
  return (
    <div className="min-h-screen bg-white pt-16 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- PREMIUM EDITORIAL HEADING --- */}
        <div className="mb-20">
          <AnimatedSection>
            <div className="flex flex-col items-start max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-[2px] w-12 bg-green-600"></span>
                <span className="text-xs font-black tracking-[0.3em] text-green-700 uppercase">
                  Development Tracker
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tighter leading-[0.9] mb-8 uppercase">
                Building <br /> 
                <span className="text-green-700">The Future</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed">
                A live look at the infrastructure and developmental projects currently under construction across Cape Coast North.
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* --- PROJECTS LIST (EDITORIAL LAYOUT) --- */}
        <div className="space-y-32">
          {projects.map((project, index) => (
            <AnimatedSection key={project.id}>
              <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
                
                {/* Visual Content Block */}
                <div className="w-full lg:w-3/5 group cursor-pointer">
                  <div className="relative overflow-hidden rounded-[2rem] bg-slate-100 aspect-[16/10]">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    
                    {/* Overlay Progress Bar (Minimalist) */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="flex items-center justify-between text-white mb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Construction Progress</span>
                        <span className="text-xl font-black">{project.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${project.progress}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-green-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Narrative Content Block */}
                <div className="w-full lg:w-2/5 flex flex-col items-start">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-wider mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
                    {project.category}
                  </div>

                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6 uppercase">
                    {project.title}
                  </h2>

                  <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-2 gap-8 w-full border-t border-slate-100 pt-8 mb-8">
                    <div>
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Location</span>
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <MapPin className="w-4 h-4 text-green-600" />
                        {project.location}
                      </div>
                    </div>
                    <div>
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Timeline</span>
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Calendar className="w-4 h-4 text-green-600" />
                        {project.timeline}
                      </div>
                    </div>
                  </div>

                  <button className="inline-flex items-center gap-3 text-slate-900 font-black text-xs uppercase tracking-[0.2em] border-b-2 border-green-600 pb-2 hover:text-green-700 hover:border-slate-900 transition-all group">
                    View Project Details
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                </div>

              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom Banner */}
        <AnimatedSection>
          <div className="mt-40 bg-slate-950 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-green-600 rounded-full blur-[120px] opacity-20 -translate-y-32 translate-x-32" />
             <div className="relative z-10 max-w-3xl mx-auto">
               <HardHat className="w-12 h-12 text-green-500 mx-auto mb-8" />
               <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">
                 Have a Project suggestion?
               </h2>
               <p className="text-slate-400 text-lg font-medium mb-10">
                 Development is a collaborative effort. Reach out to the constituency office with community-specific infrastructure needs.
               </p>
               <button className="bg-white text-slate-900 px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-green-600 hover:text-white transition-all active:scale-95 shadow-2xl">
                 Contact Office
               </button>
             </div>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}