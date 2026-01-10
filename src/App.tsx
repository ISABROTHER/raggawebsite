import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Events } from './pages/Events';
import { Issues } from './pages/Issues';
import { Volunteer } from './pages/Volunteer';
import { Admin } from './pages/Admin';
import { OngoingProjects } from './pages/OngoingProjects';
import { Appointments } from './pages/Appointments';
import { ReadStory } from './pages/ReadStory';
import { Polls } from './pages/Polls';
import { Assemblymen } from './pages/Assemblymen';
import { Achievements } from './pages/Achievements';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null); 

  // SEO: Dynamic Page Titles and Descriptions
  useEffect(() => {
    const siteTitle = "Hon. Dr. Kwamena Minta Nyarku (Ragga)";
    const slogan = "Obiara Ka Ho";
    let pageTitle = "";
    let metaDescription = "";

    switch (currentPage) {
      case 'about':
        pageTitle = `About Profile | ${siteTitle}`;
        metaDescription = `Learn about the background, academic vision, and leadership of Hon. Dr. Kwamena Minta Nyarku in Cape Coast North.`;
        break;
      case 'achievements':
        pageTitle = `Verifiable Achievements | ${siteTitle}`;
        metaDescription = `A record of promises kept: infrastructure, education support, and community development in Cape Coast North.`;
        break;
      case 'ongoing-projects':
        pageTitle = `Ongoing Infrastructure Projects | ${siteTitle}`;
        metaDescription = `Track the current road grading, lighting, and community projects managed by Hon. Ragga's office.`;
        break;
      case 'events':
        pageTitle = `Campaign Events | ${siteTitle}`;
        metaDescription = `Stay updated with upcoming town hall meetings and community engagement events in Cape Coast North.`;
        break;
      case 'assemblymen':
        pageTitle = `Local Representatives | ${siteTitle}`;
        metaDescription = `Meet the local assemblymen working with Hon. Ragga to bring development to your area.`;
        break;
      default:
        pageTitle = `${siteTitle} | MP for Cape Coast North | ${slogan}`;
        metaDescription = `Official website for Hon. Dr. Kwamena Minta Nyarku (Ragga). Tracking progress and community services in Cape Coast North.`;
    }

    document.title = pageTitle;
    
    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (metaDescriptionTag) {
      metaDescriptionTag.setAttribute('content', metaDescription);
    }
  }, [currentPage]);

  const handleNavigate = (page: string, param: string | null = null) => {
    setCurrentPage(page);
    
    if (page === 'read-story') {
      setSelectedStoryId(param);
    } else {
      setSelectedStoryId(null);
    }

    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    if (currentPage === 'read-story') {
      return (
        <ReadStory 
          storyId={selectedStoryId} 
          onBack={() => handleNavigate('home')} 
        />
      );
    }

    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'about':
        return <About />;
      case 'assemblymen':
        return <Assemblymen />;
      case 'events':
        return <Events />;
      case 'issues':
        return <Issues />;
      case 'polls':
        return <Polls />;
      case 'policies':
      case 'achievements': 
        return <Achievements />;
      case 'volunteer':
        return <Volunteer />;
      case 'admin':
        return <Admin />;
      case 'ongoing-projects':
        return <OngoingProjects />;
      case 'appointments':
        return <Appointments />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors text-slate-900">
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
        <main>{renderPage()}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;