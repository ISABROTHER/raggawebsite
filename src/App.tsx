// src/App.tsx
import { Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Assemblymen } from './pages/Assemblymen';
import { OngoingProjects } from './pages/OngoingProjects';
import { Appointments } from './pages/Appointments';
import { Reports } from './pages/Reports'; // Import the new page

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* --- NAVIGATION HEADER --- */}
      <header className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="font-black text-slate-900 tracking-tighter uppercase">
            Cape Coast North
          </Link>
          
          <nav className="flex gap-1">
            <Link to="/assemblymen" className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-green-700 transition-colors">Assemblymen</Link>
            <Link to="/projects" className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-green-700 transition-colors">Projects</Link>
            <Link to="/appointments" className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-green-700 transition-colors">Appointments</Link>
            {/* THIS IS THE NEW CLICKABLE LINK */}
            <Link to="/reports" className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-900/20">Reports</Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assemblymen" element={<Assemblymen />} />
          <Route path="/projects" element={<OngoingProjects />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/reports" element={<Reports />} /> 
        </Routes>
      </main>
    </div>
  );
}

export default App;