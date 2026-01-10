// src/pages/about/AboutFullProfile.tsx
import React from 'react';
import { 
  User, Smile, Flag, Briefcase as DesignationIcon, MapPin, Megaphone, 
  CheckSquare, Users, Landmark, Eye, ArrowLeft
} from 'lucide-react';
import { AnimatedSection } from '../../components/AnimatedSection';

interface AboutFullProfileProps {
  onBack: () => void;
}

// Helper component for Profile items
const ProfileItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-start space-x-3">
        <Icon className="w-5 h-5 text-blue-700 mt-1 flex-shrink-0"/>
        <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</h4>
            <p className="text-sm font-medium text-gray-800">{value}</p>
        </div>
    </div>
);

export function AboutFullProfile({ onBack }: AboutFullProfileProps) {
  const mpPortraitUrl = "https://i.imgur.com/5H0XBuV.jpeg";

  const electionResults = [
    { year: 2020, nyarkuVotes: "22,972", nyarkuPercent: "51.48%", opponentVotes: "21,643", opponentPercent: "48.51%", margin: "1,329" },
    { year: 2024, nyarkuVotes: "23,521", nyarkuPercent: "57.6%", opponentVotes: "17,045", opponentPercent: "41.7%", margin: "6,476" }
  ];

  const educationData = [
      { institution: "University of Ghana Business School", qualification: "PhD", completed: "07-2019" },
      { institution: "University of Leicester, UK", qualification: "MBA", completed: "09-2003" },
      { institution: "University of Cape Coast", qualification: "Bachelor of Education", completed: "06-2000" },
      { institution: "Worker College", qualification: "A Level", completed: "09-1996" },
      { institution: "Komenda Training College", qualification: "Teacher Certificate A", completed: "06-1995" },
      { institution: "Adisadel College", qualification: "GCE O Level", completed: "09-1992" },
  ];

   const employmentData = [
       { institution: "University of Cape Coast", position: "Senior Lecturer" },
       { institution: "GOIL PLC (Ghana Oil Company)", position: "Board Member" }
   ];

  const getYear = (dateStr: string) => {
      if (!dateStr) return 'N/A';
      const parts = dateStr.split('-');
      return parts.length > 1 ? parts[1] : dateStr; 
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <div className="mb-8">
            <button 
                onClick={onBack}
                className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-700 font-bold transition-colors"
            >
                <ArrowLeft className="w-5 h-5" /> Back to About
            </button>
        </div>

        <div className="space-y-16">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl flex-shrink-0">
                    <img src={mpPortraitUrl} alt="Hon. Dr. Kwamena Minta Nyarku" className="w-full h-full object-cover" />
                </div>
                <div className="text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">Hon. Dr. Kwamena Minta Nyarku</h1>
                    <p className="text-lg text-slate-600 font-medium">Member of Parliament for Cape Coast North</p>
                </div>
            </div>

            {/* FULL MP INFORMATION SECTION */}
            <AnimatedSection>
                <h2 className="text-3xl font-bold text-green-800 mb-6 border-b-2 border-amber-500 pb-2 inline-block">
                    Profile
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <ProfileItem icon={User} label="Full Name" value="Hon. Dr. Kwamena Minta Nyarku, PhD" />
                    <ProfileItem icon={Smile} label="Nickname" value="Ragga" />
                    <ProfileItem icon={Flag} label="Nationality" value="Ghanaian" />
                    <ProfileItem icon={DesignationIcon} label="Designation" value="MP for Cape Coast North" />
                    <ProfileItem icon={MapPin} label="Place of Birth" value="Apewosika, Cape Coast" />
                    <ProfileItem icon={Megaphone} label="Slogan" value="Obiara Ka Ho (Everyone is involved)" />
                </div>
            </AnimatedSection>

            {/* Educational Qualifications */}
            <AnimatedSection delay={220}>
                <h3 className="text-2xl font-semibold text-blue-900 mb-4">Educational Qualifications</h3>
                <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
                    <table className="w-full text-sm text-left text-gray-700">
                    <thead className="text-xs text-gray-500 uppercase bg-blue-100">
                        <tr>
                        <th scope="col" className="px-6 py-3">Institution & Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {educationData.map((edu, index) => (
                        <tr
                            key={edu.institution}
                            className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'} border-b border-gray-100 last:border-b-0 hover:bg-gray-50`}
                        >
                            <td className="px-6 py-3">
                            <span className="font-medium text-gray-900 block">{edu.institution}</span>
                            <div className="mt-1 text-gray-600">
                                <span className="mr-4">
                                Qualification: <span className="font-medium">{edu.qualification}</span>
                                </span>
                                <span>
                                Year: <span className="font-medium">{getYear(edu.completed)}</span>
                                </span>
                            </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </AnimatedSection>

            {/* Employment History */}
            <AnimatedSection delay={260}>
                <h3 className="text-2xl font-semibold text-blue-900 mb-4">Employment History</h3>
                <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
                    <table className="w-full text-sm text-left text-gray-700">
                    <thead className="text-xs text-gray-500 uppercase bg-blue-100">
                        <tr>
                        <th scope="col" className="px-6 py-3">Institution</th>
                        <th scope="col" className="px-6 py-3">Position</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employmentData.map((job, index) => (
                        <tr
                            key={job.institution}
                            className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'} border-b border-gray-100 last:border-b-0 hover:bg-gray-50`}
                        >
                            <td className="px-6 py-3 font-medium text-gray-900">
                            {job.institution}
                            </td>
                            <td className="px-6 py-3">{job.position}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </AnimatedSection>

            {/* Service in Parliament */}
            <AnimatedSection delay={300}>
                <h2 className="text-3xl font-bold text-green-800 mb-6 border-b-2 border-amber-500 pb-2 inline-block">
                    Service in Parliament
                </h2>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Elected MP */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start shadow-sm">
                        <CheckSquare className="w-6 h-6 text-blue-700 mr-3 mt-1 flex-shrink-0" />
                        <div>
                        <h4 className="font-semibold text-blue-900 mb-1">
                            Elected MP (Cape Coast North)
                        </h4>
                        <ul className="list-none space-y-1 mb-3">
                            {electionResults.map((result) => (
                            <li
                                key={result.year}
                                className="text-sm text-gray-600 flex items-center flex-wrap"
                            >
                                <span className="font-semibold text-gray-800 mr-2">
                                {result.year}:
                                </span>
                                <span className="text-green-700 font-medium mr-2">
                                {result.nyarkuVotes} votes ({result.nyarkuPercent})
                                </span>
                                <span className="text-blue-800">
                                (Margin: {result.margin})
                                </span>
                            </li>
                            ))}
                        </ul>
                        </div>
                    </div>

                    {/* Party Affiliation */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start shadow-sm">
                        <Users className="w-6 h-6 text-blue-700 mr-3 mt-1 flex-shrink-0" />
                        <div>
                        <h4 className="font-semibold text-blue-900">Party Affiliation</h4>
                        <p className="text-sm text-gray-600">
                            National Democratic Congress (NDC)
                        </p>
                        </div>
                    </div>

                    {/* Parliamentary Committees */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start shadow-sm md:col-span-2">
                        <Landmark className="w-6 h-6 text-blue-700 mr-3 mt-1 flex-shrink-0" />
                        <div>
                        <h4 className="font-semibold text-blue-900 mb-2">
                            Parliamentary Committees
                        </h4>
                        <div className="space-y-1.5">
                            <p className="text-sm text-gray-700">
                            Member, Committee on Defence & Interior.
                            </p>
                            <p className="text-sm text-gray-700">
                            Member, Committee on Environment, Science & Technology.
                            </p>
                            <p className="text-sm text-gray-700">
                            Member, Committee on Ways & Means.
                            </p>
                            <p className="text-sm text-gray-700">
                            Vice-Chairman, Committee of Petitions.
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </AnimatedSection>

            {/* Vision / Welcome Philosophy */}
            <AnimatedSection delay={340}>
                <h2 className="text-3xl font-bold text-green-800 mb-6 border-b-2 border-amber-500 pb-2 inline-block">
                    My Vision
                </h2>
                <blockquote className="relative p-6 bg-gradient-to-r from-blue-50 to-white border-l-4 border-amber-500 italic rounded-r-lg shadow-sm">
                    <Eye className="absolute top-4 right-4 w-8 h-8 text-amber-300 opacity-50" />
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    "For me, leadership is not about titles or recognition. It is about what endures
                    after one’s service, the systems, opportunities and hope that remain."
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                    "My vision is to help build a Cape Coast North where fairness, opportunity and
                    respect are shared by all, where everyone feels they belong and every young person
                    knows their dream matters."
                    </p>
                    <footer className="mt-4 text-md font-semibold text-blue-800">
                    — Hon. Dr. Kwamena Minta Nyarku (Ragga)
                    </footer>
                </blockquote>
            </AnimatedSection>
        </div>
      </div>
    </div>
  );
}