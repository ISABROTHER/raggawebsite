import { useEffect, useState } from 'react';
import { TrendingUp, Users, DollarSign, Target, Award } from 'lucide-react';
import { getAchievementStats } from '../lib/achievementsApi';

export function AchievementStats() {
  const [stats, setStats] = useState<{
    total: number;
    byCategory: Record<string, number>;
    totalBeneficiaries: number;
    totalBudget: number;
    byStatus: Record<string, number>;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const data = await getAchievementStats();
      setStats(data);
      setLoading(false);
    }
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-slate-100 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const categoryTitles: Record<string, string> = {
    education: 'Education',
    health: 'Health',
    employment: 'Employment',
    infrastructure: 'Infrastructure',
    agriculture: 'Agriculture',
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-8 shadow-xl border border-slate-100">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-900 mb-2">Impact Dashboard</h2>
        <p className="text-slate-600">Tracking constituency development 2021-2025</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border-2 border-green-100 hover:border-green-300 transition-all shadow-sm hover:shadow-md">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Projects</p>
            </div>
          </div>
          <p className="text-4xl font-black text-slate-900">{stats.total}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-blue-100 hover:border-blue-300 transition-all shadow-sm hover:shadow-md">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Beneficiaries</p>
            </div>
          </div>
          <p className="text-4xl font-black text-slate-900">{stats.totalBeneficiaries.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-yellow-100 hover:border-yellow-300 transition-all shadow-sm hover:shadow-md">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Investment</p>
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900">GH₵{stats.totalBudget.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-purple-100 hover:border-purple-300 transition-all shadow-sm hover:shadow-md">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Completed</p>
            </div>
          </div>
          <p className="text-4xl font-black text-slate-900">{stats.byStatus.completed || 0}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-100">
        <h3 className="text-lg font-black text-slate-900 mb-4">Projects by Category</h3>
        <div className="space-y-4">
          {Object.entries(stats.byCategory)
            .sort(([, a], [, b]) => b - a)
            .map(([category, count]) => {
              const percentage = (count / stats.total) * 100;
              return (
                <div key={category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-slate-700">{categoryTitles[category]}</span>
                    <span className="text-sm font-black text-green-600">{count} projects</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
