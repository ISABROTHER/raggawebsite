import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import { getAchievements } from '../lib/achievementsApi';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Achievement = Database['public']['Tables']['achievements']['Row'];
type AchievementInsert = Database['public']['Tables']['achievements']['Insert'];

export function AchievementAdmin() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<AchievementInsert>>({
    title: '',
    description: '',
    category: 'education',
    year: new Date().getFullYear(),
    image_url: '',
    location: '',
    status: 'completed',
    beneficiaries_count: 0,
    budget_amount: 0,
    published: true,
  });

  useEffect(() => {
    loadAchievements();
  }, []);

  async function loadAchievements() {
    setLoading(true);
    const data = await getAchievements({});
    setAchievements(data);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (editingId) {
        const { error } = await supabase
          .from('achievements')
          .update(formData)
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('achievements')
          .insert([formData as AchievementInsert]);

        if (error) throw error;
      }

      resetForm();
      loadAchievements();
    } catch (error) {
      console.error('Error saving achievement:', error);
      alert('Failed to save achievement');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this achievement?')) return;

    try {
      const { error } = await supabase
        .from('achievements')
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadAchievements();
    } catch (error) {
      console.error('Error deleting achievement:', error);
      alert('Failed to delete achievement');
    }
  }

  function handleEdit(achievement: Achievement) {
    setFormData(achievement);
    setEditingId(achievement.id);
    setShowForm(true);
  }

  function resetForm() {
    setFormData({
      title: '',
      description: '',
      category: 'education',
      year: new Date().getFullYear(),
      image_url: '',
      location: '',
      status: 'completed',
      beneficiaries_count: 0,
      budget_amount: 0,
      published: true,
    });
    setEditingId(null);
    setShowForm(false);
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-slate-900">Achievement Management</h1>
            <p className="text-slate-600 mt-2">Add, edit, and manage constituency achievements</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all shadow-lg"
          >
            {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            {showForm ? 'Cancel' : 'Add Achievement'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 mb-8">
            <h2 className="text-2xl font-black text-slate-900 mb-6">
              {editingId ? 'Edit Achievement' : 'New Achievement'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Description *</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="education">Education</option>
                    <option value="health">Health</option>
                    <option value="employment">Employment</option>
                    <option value="infrastructure">Infrastructure</option>
                    <option value="agriculture">Agriculture</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Year *</label>
                  <input
                    type="number"
                    required
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="completed">Completed</option>
                    <option value="in_progress">In Progress</option>
                    <option value="planned">Planned</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Beneficiaries Count</label>
                  <input
                    type="number"
                    value={formData.beneficiaries_count}
                    onChange={(e) => setFormData({ ...formData, beneficiaries_count: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Budget Amount (GH₵)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.budget_amount}
                    onChange={(e) => setFormData({ ...formData, budget_amount: parseFloat(e.target.value) })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Image URL</label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                    />
                    <span className="text-sm font-bold text-slate-700">Published</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-6 py-3 border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors"
                >
                  {editingId ? 'Update' : 'Create'} Achievement
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent mx-auto"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-black text-slate-700 uppercase">Title</th>
                    <th className="px-6 py-4 text-left text-xs font-black text-slate-700 uppercase">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-black text-slate-700 uppercase">Year</th>
                    <th className="px-6 py-4 text-left text-xs font-black text-slate-700 uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-black text-slate-700 uppercase">Published</th>
                    <th className="px-6 py-4 text-right text-xs font-black text-slate-700 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {achievements.map((achievement) => (
                    <tr key={achievement.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900 text-sm">{achievement.title}</div>
                        <div className="text-xs text-slate-500 mt-1">{achievement.location}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                          {achievement.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">{achievement.year}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                          achievement.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                          achievement.status === 'in_progress' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {achievement.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {achievement.published ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <X className="w-5 h-5 text-slate-400" />
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(achievement)}
                            className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                          >
                            <Edit2 className="w-4 h-4 text-slate-600 group-hover:text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(achievement.id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                          >
                            <Trash2 className="w-4 h-4 text-slate-600 group-hover:text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
