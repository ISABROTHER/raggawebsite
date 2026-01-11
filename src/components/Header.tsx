// src/components/Header.tsx
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Phone, Mail, MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Achievements', href: '/achievements' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      {/* Top Bar - Hidden on scroll for cleaner look */}
      {!isScrolled && (
        <div className="hidden lg:block border-b border-white/10 pb-4 mb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs font-bold text-white/80 uppercase tracking-widest">
            <div className="flex gap-6">
              <span className="flex items-center gap-2"><Phone className="w-3 h-3 text-amber-400" /> +233 (0) 244 123 456</span>
              <span className="flex items-center gap-2"><Mail className="w-3 h-3 text-amber-400" /> office@ragga.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 text-amber-400" /> Cape Coast North Constituency
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo Section - Now clickable and leads home */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-green-700 rounded-xl flex items-center justify-center shadow-xl group-hover:rotate-6 transition-transform duration-300">
                <span className="text-white font-black text-xl md:text-2xl">R</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-500 rounded-lg border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className={`font-black text-lg md:text-xl leading-none tracking-tighter transition-colors ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
                HON. RAGGA
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-[0.2em] mt-1 transition-colors ${isScrolled ? 'text-green-700' : 'text-amber-400'}`}>
                Cape Coast North
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${
                  location.pathname === link.href
                    ? 'bg-green-700 text-white shadow-lg'
                    : isScrolled
                      ? 'text-slate-600 hover:text-green-700 hover:bg-slate-100'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="ml-4 pl-4 border-l border-white/20">
              <Link 
                to="/appointments"
                className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95"
              >
                Book Appointment
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className={`lg:hidden p-2 rounded-xl transition-colors ${isScrolled ? 'text-slate-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[72px] bg-white z-40 p-6 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`p-4 rounded-2xl text-lg font-black uppercase tracking-widest transition-all ${
                  location.pathname === link.href
                    ? 'bg-green-50 text-green-700 border-2 border-green-100'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/appointments"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 bg-green-700 text-white p-5 rounded-2xl font-black text-center uppercase tracking-widest shadow-xl"
            >
              Book Appointment
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}