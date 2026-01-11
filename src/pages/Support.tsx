// src/pages/Support.tsx
import React from 'react';
import { Heart, Share2, ShieldCheck, TrendingUp, Star } from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';

export function Support() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- MAIN HEADING --- */}
        <AnimatedSection>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight uppercase text-center md:text-left">
            RAISING 200,000 EXERCISE BOOKS PROJECT FOR STUDENTS IN CAPE COAST NORTH
          </h1>
          <p className="text-lg md:text-2xl font-medium text-slate-600 mb-12 max-w-4xl text-center md:text-left">
            We want to ensure that no one in Cape Coast North faces this, that is why I am doing this with you. 
            Donate to support our students and write a better future together.
          </p>
        </AnimatedSection>

        <div className="flex flex-col lg:flex-row gap-8 md:gap-16">
          
          {/* --- LEFT SIDE: THE STORY & MEDIA --- */}
          <div className="lg:w-[60%]">
            <AnimatedSection delay={100}>
              <div className="relative aspect-[16/10] w-full rounded-[2.5rem] overflow-hidden bg-slate-100 shadow-2xl mb-10">
                <img 
                  src="https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                  alt="Students needing books" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-lg">
                <p className="mb-6 font-bold text-xl text-green-700">
                  Every child deserves a blank page to start their story.
                </p>
                <p className="mb-6">
                  In Cape Coast North, we are coming together to remove the basic barriers to education. 
                  This project is a direct response to the needs of our students, ensuring that 
                  financial constraints never stand in the way of a child's ability to take notes, 
                  complete assignments, and dream big.
                </p>
                <blockquote className="border-l-8 border-green-600 pl-8 py-4 my-10 italic bg-slate-50 rounded-r-3xl text-2xl font-medium text-slate-800">
                  "Education is the most powerful weapon which you can use to change the world."
                </blockquote>
              </div>
            </AnimatedSection>
          </div>

          {/* --- RIGHT SIDE: DONATION CARD --- */}
          <div className="lg:w-[40%]">
            <AnimatedSection delay={200}>
              <div className="sticky top-32 bg-white rounded-[3rem] border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8 md:p-10">
                
                {/* Progress Tracking */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative w-20 h-20 flex-shrink-0">
                     <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                       <path className="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                       <path className="text-green-600" strokeDasharray="45, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                     </svg>
                     <span className="absolute inset-0 flex items-center justify-center text-sm font-black text-slate-900">45%</span>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-slate-900 tracking-tight">90,000 <span className="text-base font-bold text-slate-500 uppercase">books</span></div>
                    <div className="text-xs font-black text-green-600 uppercase tracking-widest mt-1">Goal: 200,000 Books</div>
                  </div>
                </div>

                {/* Main Action */}
                <div className="space-y-4 mb-8">
                  <button className="w-full py-5 bg-green-700 hover:bg-green-800 text-white font-black rounded-2xl shadow-xl shadow-green-200 transition-all active:scale-95 flex items-center justify-center gap-3 text-lg uppercase tracking-widest">
                    <Heart className="w-6 h-6 fill-current" />
                    Donate Now
                  </button>
                  <button className="w-full py-5 bg-white border-2 border-slate-200 text-slate-700 font-black rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3 text-lg uppercase tracking-widest">
                    <Share2 className="w-6 h-6" />
                    Share Project
                  </button>
                </div>

                <div className="flex items-center gap-3 mb-8 text-amber-700 bg-amber-50 p-4 rounded-2xl border border-amber-100 font-bold text-sm">
                  <TrendingUp className="w-5 h-5" />
                  <span>Recent surge: 112 donations today</span>
                </div>

                {/* Verified Badge */}
                <div className="flex items-center gap-3 text-slate-500 font-bold text-xs uppercase tracking-widest justify-center">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  <span>Verified Project • Obiara Ka Ho</span>
                </div>
              </div>
            </AnimatedSection>
          </div>

        </div>
      </div>
    </div>
  );
}