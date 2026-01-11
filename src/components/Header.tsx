// src/components/Header.tsx
import { useState } from 'react';
import { 
  Menu, X, Home, User, Users, HardHat, Award, 
  Calendar, MessageSquareWarning, LayoutDashboard, 
  LogIn, ChevronRight, Vote, UserCircle, FileText 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const headerHeight = 99; 

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'about', label: 'About', path: '/about' },
    { id: 'assemblymen', label: 'Assemblymen', path: '/assemblymen' },
    { id: 'projects', label: 'Projects', path: '/projects' },
    { id: 'appointments', label: 'Appointments', path: '/appointments' },
    { id: 'reports', label: 'Reports', path: '/reports' }, // Added Reports
  ];

  const mobileNavItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'about', label: 'About Profile', icon: User, path: '/about' },
    { id: 'achievements', label: 'Achievements', icon: Award, path: '/achievements' },
    { id: 'assemblymen', label: 'Assemblymen', icon: Users, path: '/assemblymen' },
    { id: 'ongoing-projects', label: 'Projects', icon: HardHat, path: '/projects' },
    { id: 'reports', label: 'Reports', icon: FileText, path: '/reports' }, // Added Reports
    { id: 'appointments', label: 'Book Appointment', icon: UserCircle, path: '/appointments' },
    { id: 'issues', label: 'Report Issue', icon: MessageSquareWarning, path: '/issues' },
    // Volunteer (Get Involved) removed here
  ];

  return (
    <div className="relative w-full">
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm"
        style={{ height: `${headerHeight}px` }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group font-black text-slate-900 tracking-tighter uppercase text-xl">
            Cape Coast North
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                  location.pathname === item.path
                    ? 'bg-green-700 text-white shadow-lg shadow-green-900/20'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-900 text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-[100px] left-4 right-4 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-6"
            >
              <div className="flex flex-col gap-2">
                {mobileNavItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-4 rounded-2xl transition-all ${
                      location.pathname === item.path ? 'bg-green-50 text-green-700' : 'bg-slate-50 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <item.icon className="w-5 h-5" />
                      <span className="font-black uppercase text-xs tracking-widest">{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-30" />
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}