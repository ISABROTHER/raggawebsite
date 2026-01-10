// src/pages/OngoingProjects.tsx
import { HardHat, MapPin, Calendar } from 'lucide-react';

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
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 border border-amber-100 mb-4">
              <HardHat className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-amber-600">
                Development Tracker
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Ongoing Projects
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Tracking the progress of infrastructure and development initiatives across Cape Coast North.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-xl transition-shadow duration-300 group flex flex-col relative">
                
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden bg-slate-100 flex items-center justify-center">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Status Badge (Bottom Left) */}
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/95 text-slate-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                    {project.title}
                  </h3>
                  
                  {/* Meta Details */}
                  <div className="flex flex-wrap gap-4 text-xs text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {project.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {project.date}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 mb-6 text-sm leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  {/* Segmented Progress Visualization */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mt-auto">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Completion</span>
                      <span className="text-xl font-black text-blue-700">{project.progress}%</span>
                    </div>
                    <div className="flex gap-1 h-2.5">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-sm transition-all duration-500 ${
                            i < Math.round(project.progress / 10)
                              ? 'bg-blue-600 shadow-sm'
                              : 'bg-blue-100/50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}