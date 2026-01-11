// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Assemblymen } from './pages/Assemblymen';
import { OngoingProjects } from './pages/OngoingProjects';
import { Appointments } from './pages/Appointments';
import { Reports } from './pages/Reports';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header /> 
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assemblymen" element={<Assemblymen />} />
          <Route path="/projects" element={<OngoingProjects />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/reports" element={<Reports />} /> 
          {/* Volunteer route removed */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;