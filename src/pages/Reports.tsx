// src/pages/Reports.tsx
import React from 'react';
import { 
  FileText, ShieldCheck, Globe, Database, 
  Share2, PieChart, Activity, Users, Info 
} from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';

export function Reports() {
  const recommendations = [
    {
      cat: "Constituent Engagement",
      feature: "Integrated CRM System",
      desc: "Centralized platform to log and manage interactions (email, calls, visits).",
      benefit: "Personalized communication & data-driven insights.",
      tools: "CivicTrack, IndiGov"
    },
    {
      cat: "Constituent Engagement",
      feature: "AI Constituent Assistance",
      desc: "AI chatbot to provide 24/7 answers to FAQs and resource guidance.",
      benefit: "Instant support & reduced staff workload.",
      tools: "Custom AI Platforms"
    },
    {
      cat: "Constituent Engagement",
      feature: "Application Tracking",
      desc: "Portal for constituents to view real-time status of aid applications.",
      benefit: "Increased transparency and trust.",
      tools: "Custom Web App"
    },
    {
      cat: "Legislative Efficiency",
      feature: "AI Research Tools",
      desc: "AI platforms to analyze legislation and track policy impacts.",
      benefit: "Faster, more informed decision-making.",
      tools: "Legislative AI Tools"
    },
    {
      cat: "Transparency",
      feature: "Project & Budget Tracker",
      desc: "Interactive dashboard visualizing projects, budgets, and progress.",
      benefit: "Enhanced accountability for public funds.",
      tools: "Custom Dashboards"
    },
    {
      cat: "Accountability",
      feature: "Digital Voting Records",
      desc: "Searchable database of voting records and session attendance.",
      benefit: "Direct accountability to constituents.",
      tools: "Parliament Website"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-16 pb-24 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- STANDARD HEADING BLOCK --- */}
        <div className="text-center mb-16">
          <AnimatedSection>
            <div className="flex flex-col items-center justify-center group">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-center bg-gradient-to-r from-slate-900 via-green-700 to-slate-900 bg-clip-text text-transparent uppercase">
                Modernizing Parliamentary Engagement
              </h1>
              <p className="mt-2 text-sm md:text-xl font-bold text-green-700/80 tracking-[0.2em] uppercase">
                Recommendations for Ghanaian MPs
              </p>
              <span className="mt-4 h-1.5 w-16 rounded-full bg-gradient-to-r from-green-500 to-green-600 transition-all group-hover:w-32" />
            </div>
            <p className="mt-8 text-slate-400 font-bold uppercase tracking-widest text-xs">
              Date: January 11, 2026
            </p>
          </AnimatedSection>
        </div>

        <div className="space-y-20">
          
          {/* 1. INTRODUCTION */}
          <AnimatedSection delay={100}>
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-6 border-l-4 border-green-600 pl-6">
                1. Introduction
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed font-medium">
                <p className="mb-6">
                  The role of a Member of Parliament (MP) is undergoing a significant transformation in the digital age. Around the world, parliaments are adopting new technologies to enhance their legislative processes, improve transparency, and foster stronger connections with the citizens they serve.
                </p>
                <blockquote className="border-l-4 border-slate-200 pl-6 my-8 italic text-slate-500 text-lg">
                  "A digitally advanced parliament is a stronger and more effective institution that can deliver better outcomes for the people."
                  <footer className="text-xs font-black text-slate-400 uppercase tracking-widest mt-2 not-italic">— Inter-Parliamentary Union (IPU)</footer>
                </blockquote>
                <p>
                  This report provides actionable recommendations for Ghanaian MPs to adopt modern technologies, informed by global best practices and the specific context of constituent engagement.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* 2. THE CURRENT LANDSCAPE */}
          <AnimatedSection delay={200}>
            <div className="space-y-10">
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight border-l-4 border-green-600 pl-6">
                2. The Current Landscape
              </h2>
              
              {/* Case Study Sub-section */}
              <div className="grid md:grid-cols-5 gap-8 items-start">
                <div className="md:col-span-2">
                  <h3 className="text-lg font-black text-green-700 uppercase tracking-wide mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5" /> Case Study
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    The current digital engagement strategies, specifically the <span className="text-slate-900 font-bold">Appointments portal</span>, offer valuable insight. These features represent a strong foundation for digital constituent services.
                  </p>
                </div>
                <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "Direct Access", icon: Users, desc: "Clear pathways for meetings and applications." },
                    { title: "Checklists", icon: ShieldCheck, desc: "Guided documentation requirements (National ID)." },
                    { title: "Transparency", icon: Globe, desc: "Displaying office hours and real-time location." }
                  ].map((item, i) => (
                    <div key={i} className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
                      <div className="p-2 bg-green-50 rounded-lg shrink-0">
                        <item.icon className="w-4 h-4 text-green-700" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-900 uppercase mb-1">{item.title}</p>
                        <p className="text-[11px] text-slate-500 font-medium leading-tight">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
                <Info className="absolute -right-4 -top-4 w-32 h-32 text-white/5" />
                <h3 className="text-lg font-black uppercase tracking-widest mb-4">Broader Initiatives & Challenges</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-0 font-medium relative z-10">
                  While Ghana has implemented systems like 'Parliamentary Watch', obstacles remain. A significant challenge is the <span className="text-green-400 font-bold">digital skills gap</span>, which creates a hybrid system of physical and digital documentation. The IPU 2024 report highlights a growing digital divide that sub-Saharan Africa must proactively bridge.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* 3. CORE RECOMMENDATIONS TABLE */}
          <AnimatedSection delay={300}>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-8 border-l-4 border-green-600 pl-6">
              3. Core Recommendations
            </h2>
            <div className="overflow-x-auto rounded-[2rem] border border-slate-200 shadow-sm bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Feature</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Key Benefits</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recommendations.map((rec, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-5">
                        <span className="px-3 py-1 bg-green-50 text-green-700 text-[9px] font-black uppercase rounded-full">
                          {rec.cat}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm font-black text-slate-900 uppercase mb-1">{rec.feature}</p>
                        <p className="text-xs text-slate-500 font-medium leading-tight">{rec.desc}</p>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-xs font-bold text-slate-700 mb-1">{rec.benefit}</p>
                        <p className="text-[10px] text-green-600 font-black uppercase tracking-tighter">Tools: {rec.tools}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>

          {/* 4. ADDRESSING THE CHALLENGES */}
          <AnimatedSection delay={400}>
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-8 border-l-4 border-green-600 pl-6">
                4. Roadmap for Implementation
              </h2>
              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { t: "Comprehensive Strategy", d: "Create a clear, multi-year digital transformation roadmap with realistic timelines." },
                  { t: "Capacity Building", d: "A structured digital literacy program tailored to the specific needs of MPs and staff." },
                  { t: "Global Collaboration", d: "Leverage experiences from other parliaments via IPU regional hubs." },
                  { t: "User-Centric Approach", d: "Adopt a phased rollout, using pilot projects and gathering constant user feedback." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="text-3xl font-black text-slate-100 group-hover:text-green-200 transition-colors">{i + 1}</div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 uppercase mb-2">{step.t}</h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* 5. CONCLUSION */}
          <AnimatedSection delay={500}>
            <div className="text-center max-w-3xl mx-auto border-t border-slate-200 pt-16">
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-6">
                5. Conclusion
              </h2>
              <p className="text-slate-600 leading-relaxed font-medium italic">
                The journey towards a fully digital parliament is a continuous process of adaptation and improvement. By building on existing initiatives and strategically adopting modern features, the Parliament of Ghana can significantly enhance its effectiveness and connection with the people it represents.
              </p>
              <div className="mt-12 flex flex-col items-center">
                <span className="h-1 w-12 bg-green-600 rounded-full mb-4" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  End of Report
                </p>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </div>
  );
}