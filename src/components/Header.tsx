import { Home, User, Award, Users, HardHat, FileText, UserCircle, MessageSquareWarning } from 'lucide-react';
import { Link } from 'react-router-dom';

const mobileNavItems = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'about', label: 'About Profile', icon: User, path: '/about' },
  { id: 'achievements', label: 'Achievements', icon: Award, path: '/achievements' },
  { id: 'assemblymen', label: 'Assemblymen', icon: Users, path: '/assemblymen' },
  { id: 'ongoing-projects', label: 'Projects', icon: HardHat, path: '/projects' },
  { id: 'reports', label: 'Reports', icon: FileText, path: '/reports' },
  { id: 'appointments', label: 'Book Appointment', icon: UserCircle, path: '/appointments' },
  { id: 'issues', label: 'Report Issue', icon: MessageSquareWarning, path: '/issues' },
];

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900">
              Logo
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {mobileNavItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
