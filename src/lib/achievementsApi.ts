import { supabase } from './supabase';
import type { Database } from './database.types';

type Achievement = Database['public']['Tables']['achievements']['Row'];
type Testimonial = Database['public']['Tables']['achievement_testimonials']['Row'];

export interface AchievementWithStats extends Achievement {
  testimonial_count?: number;
  media_count?: number;
}

export interface SearchFilters {
  search?: string;
  category?: string;
  year?: number;
  status?: string;
  location?: string;
}

export async function getAchievements(filters?: SearchFilters) {
  let query = supabase
    .from('achievements')
    .select('*')
    .eq('published', true)
    .order('year', { ascending: false })
    .order('created_at', { ascending: false });

  if (filters?.category) {
    query = query.eq('category', filters.category);
  }

  if (filters?.year) {
    query = query.eq('year', filters.year);
  }

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  if (filters?.location) {
    query = query.ilike('location', `%${filters.location}%`);
  }

  if (filters?.search) {
    query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,location.ilike.%${filters.search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching achievements:', error);
    return [];
  }

  return data as Achievement[];
}

export async function getAchievementById(id: string) {
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('Error fetching achievement:', error);
    return null;
  }

  return data;
}

export async function getAchievementTestimonials(achievementId: string) {
  const { data, error } = await supabase
    .from('achievement_testimonials')
    .select('*')
    .eq('achievement_id', achievementId)
    .eq('verified', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }

  return data as Testimonial[];
}

export async function submitTestimonial(testimonial: {
  achievement_id: string;
  author_name: string;
  author_role: string;
  content: string;
  image_url?: string;
}) {
  const { data, error } = await supabase
    .from('achievement_testimonials')
    .insert([testimonial])
    .select()
    .single();

  if (error) {
    console.error('Error submitting testimonial:', error);
    throw error;
  }

  return data;
}

export async function getAchievementStats() {
  const { data: achievements, error } = await supabase
    .from('achievements')
    .select('category, beneficiaries_count, budget_amount, status')
    .eq('published', true);

  if (error) {
    console.error('Error fetching stats:', error);
    return null;
  }

  const stats = {
    total: achievements.length,
    byCategory: {} as Record<string, number>,
    totalBeneficiaries: 0,
    totalBudget: 0,
    byStatus: {} as Record<string, number>,
  };

  achievements.forEach((achievement) => {
    stats.byCategory[achievement.category] = (stats.byCategory[achievement.category] || 0) + 1;
    stats.totalBeneficiaries += achievement.beneficiaries_count || 0;
    stats.totalBudget += Number(achievement.budget_amount) || 0;
    stats.byStatus[achievement.status] = (stats.byStatus[achievement.status] || 0) + 1;
  });

  return stats;
}

export async function getYears() {
  const { data, error } = await supabase
    .from('achievements')
    .select('year')
    .eq('published', true)
    .order('year', { ascending: false });

  if (error) {
    console.error('Error fetching years:', error);
    return [];
  }

  const uniqueYears = [...new Set(data.map(d => d.year))];
  return uniqueYears;
}

export async function getCategoryCount(category: string) {
  const { count, error } = await supabase
    .from('achievements')
    .select('*', { count: 'exact', head: true })
    .eq('category', category)
    .eq('published', true);

  if (error) {
    console.error('Error fetching category count:', error);
    return 0;
  }

  return count || 0;
}
