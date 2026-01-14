import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Calendar, Users, DollarSign } from 'lucide-react';
import { getAchievements, getYears, type SearchFilters } from '../lib/achievementsApi';
import type { Database } from '../lib/database.types';

type Achievement = Database['public']['Tables']['achievements']['Row'];

interface AchievementGridProps {
  category: string;
}

export function AchievementGrid({ category }: AchievementGridProps) {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeYear, setActiveYear] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    loadYears();
  }, []);

  useEffect(() => {
    loadAchievements();
  }, [category, activeYear, searchQuery]);

  async function loadYears() {
    const data = await getYears();
    setYears(data);
  }

  async function loadAchievements() {
    setLoading(true);
    const filters: SearchFilters = {
      category,
      search: searchQuery || undefined,
      year: activeYear === 'all' ? undefined : activeYear,
    };
    const data = await getAchievements(filters);
    setAchievements(data);
    setLoading(false);
  }

  const filteredAchievements = achievements;

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search achievements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveYear('all')}
              className={`px-6 py-2 rounded-full text-xs font-black uppercase transition-all ${
                activeYear === 'all'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Years
            </button>
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setActiveYear(y)}
                className={`px-6 py-2 rounded-full text-xs font-black uppercase transition-all ${
                  activeYear === y
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        {searchQuery && (
          <div className="mt-4 text-sm text-slate-600">
            Found <span className="font-bold text-green-600">{filteredAchievements.length}</span> result(s)
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
        </div>
      ) : filteredAchievements.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-500 text-lg">No achievements found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredAchievements.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-md flex flex-col hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-40 overflow-hidden shrink-0">
                  <img
                    src={item.image_url || 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800'}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 bg-green-600 text-white text-[10px] font-black px-2 py-1 rounded shadow-lg">
                    {item.year}
                  </div>
                  {item.status !== 'completed' && (
                    <div className="absolute top-3 right-3 bg-yellow-500 text-white text-[10px] font-black px-2 py-1 rounded shadow-lg uppercase">
                      {item.status.replace('_', ' ')}
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-sm font-black text-slate-900 mb-3 leading-tight uppercase">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed font-medium mb-4 flex-1">
                    {item.description}
                  </p>

                  {(item.location || item.beneficiaries_count > 0 || item.budget_amount > 0) && (
                    <div className="mt-auto pt-4 border-t border-slate-100 space-y-2">
                      {item.location && (
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <MapPin className="w-3 h-3 text-green-600" />
                          <span>{item.location}</span>
                        </div>
                      )}
                      {item.beneficiaries_count > 0 && (
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Users className="w-3 h-3 text-green-600" />
                          <span>{item.beneficiaries_count.toLocaleString()} beneficiaries</span>
                        </div>
                      )}
                      {item.budget_amount > 0 && (
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <DollarSign className="w-3 h-3 text-green-600" />
                          <span>GH₵{Number(item.budget_amount).toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
