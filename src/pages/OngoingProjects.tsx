// src/pages/OngoingProjects.tsx
import { HardHat, MapPin, Calendar } from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';

const projects = [
  {
    id: 1,
    title: "Pedu Park Construction",
    status: "In Progress",
    progress: 45,
    location: "Pedu Electoral Area",
    date: "Completion: Q1 2026",
    image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=2029&auto=format&fit=crop",
    description: "Major redevelopment of the Pedu Community Park into a modern astro-turf facility with lighting and spectator stands to boost local sports."
  },
  {
    id: 2,
    title: "Abura 3-Unit Classroom Block",
    status: "Finishing Stage",
    progress: 85,
    location: "Abura",
    date: "Completion: Dec 2025",
    image: "https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=2070&auto=format&fit=crop",
    description: "Construction of a new classroom block to reduce overcrowding and provide a better learning environment for students in the Abura community."
  },
  {
    id: 3,
    title: "Duakor Water Expansion",
    status: "Initial Phase",
    progress: 20,
    location: "Duakor/Abakam",
    date: "Completion: Mid 2026",
    image: "https://images.unsplash.com/photo-1541339907198-e08756eaa539?q=80&w=2070&auto=format&fit=crop",
    description: "Laying of new pipelines and installation of storage tanks to improve access to potable water for coastal communities."
  }
];

export function OngoingProjects() {
  return (
    <div className="min-h-screen bg-slate-50 pt-16 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- STANDARD HEADING BLOCK --- */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex flex-col items-center justify-center group">
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-center bg-gradient-to-r from-slate-900 via-green-700 to-slate-900 bg-clip-text text-transparent uppercase">
              Ongoing Projects
            </h1>
            
            {/* Subtitle */}
            <p className="mt-2 text-sm md:text-xl font-bold text-green-700/80 tracking-[0.2em] uppercase">
              Development Tracker
            </p>

            <span className="mt-4 h-1.5 w-16 rounded-full bg-gradient-to-r from-green-500 to-green-600 transition-all group-hover:w-32" />
          </div>
          
          <p className="mt-6 text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Tracking the progress of infrastructure and development initiatives across Cape Coast North Constituency.
          </p>
        </div>

        {/* --- PROJECTS GRID (ANIMATED ON SCROLL) --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <AnimatedSection key={project.id} delay={index * 100}>
              <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300 group flex flex-col h-full">
                
                {/* Image Section */}
                <div className="relative h-60 overflow-hidden bg-slate-100">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/95 backdrop-blur text-slate-900 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-lg border border-white">
                      {project.status}
                    </span>
                  </div>

                  {/* Icon Badge */}
                  <div className="absolute bottom-4 left-4 bg-green-600 p-2 rounded-xl shadow-lg">
                    <HardHat className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-black text-slate-900 mb-3 leading-tight group-hover:text-green-700 transition-colors">
                    {project.title}
                  </h3>
                  
                  {/* Meta Details */}
                  <div className="flex flex-wrap gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-6">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-green-600" /> {project.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-green-600" /> {project.date}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 mb-8 text-sm leading-relaxed font-medium flex-1">
                    {project.description}
                  </p>

                  {/* Standard Segmented Progress UI */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <div className="flex justify-between items-end mb-3">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Completion</span>
                      <span className="text-2xl font-black text-green-700 tracking-tighter">{project.progress}%</span>
                    </div>
                    <div className="flex gap-1.5 h-3">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-sm transition-all duration-700 delay-${i * 50} ${
                            i < Math.round(project.progress / 10)
                              ? 'bg-gradient-to-b from-green-500 to-green-600 shadow-sm'
                              : 'bg-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </div>
  );
}