// src/App.tsx
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { Home } from './pages/Home';
import { Assemblymen } from './pages/Assemblymen';
import { OngoingProjects } from './pages/OngoingProjects';
import { Appointments } from './pages/Appointments';
import { Reports } from './pages/Reports';
import { Achievements } from './pages/Achievements';
import { Issues } from './pages/Issues';
import { ReadStory } from './pages/ReadStory';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Wrapper for the ReadStory page to handle URL parameters
function ReadStoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  return <ReadStory storyId={id || null} onBack={() => navigate('/')} />;
}

function App() {
  const navigate = useNavigate();

  // This function makes your "onNavigate" buttons work with the router
  const handleNavigate = (page: string, param?: string) => {
    if (param) {
      navigate(`/${page}/${param}`);
    } else {
      navigate(`/${page}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header /> 
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home onNavigate={handleNavigate} />} />
          <Route path="/assemblymen" element={<Assemblymen />} />
          <Route path="/ongoing-projects" element={<OngoingProjects />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/reports" element={<Reports />} /> 
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="/read-story/:id" element={<ReadStoryPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;