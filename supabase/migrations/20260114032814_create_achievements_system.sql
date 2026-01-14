/*
  # Achievements System

  ## Overview
  Complete achievement tracking system for political constituency projects with metrics,
  testimonials, and geographic data.

  ## New Tables
  
  ### `achievements`
  Stores all constituency projects and initiatives with comprehensive tracking
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Achievement title (e.g., "500 LED Bulbs Donated to Adisadel College")
  - `description` (text) - Detailed description of the achievement
  - `category` (text) - Sector: education, health, employment, infrastructure, agriculture
  - `year` (integer) - Year of completion
  - `image_url` (text) - Featured image URL
  - `location` (text) - Specific location/community name
  - `latitude` (decimal) - GPS latitude for mapping
  - `longitude` (decimal) - GPS longitude for mapping
  - `status` (text) - Project status: completed, in_progress, planned
  - `beneficiaries_count` (integer) - Number of people directly benefited
  - `budget_amount` (decimal) - Project cost in GHS
  - `completion_date` (date) - Actual completion date
  - `tags` (text[]) - Searchable tags for filtering
  - `published` (boolean) - Visibility control
  - `created_at` (timestamptz) - Record creation
  - `updated_at` (timestamptz) - Last modification

  ### `achievement_testimonials`
  Community verification and testimonials
  - `id` (uuid, primary key) - Unique identifier
  - `achievement_id` (uuid, foreign key) - Links to achievement
  - `author_name` (text) - Testimonial author
  - `author_role` (text) - Author's role/position (e.g., "School Principal", "Community Member")
  - `content` (text) - Testimonial text
  - `image_url` (text) - Optional photo
  - `verified` (boolean) - Admin verification status
  - `featured` (boolean) - Highlight on achievement card
  - `created_at` (timestamptz) - Submission date

  ### `achievement_media`
  Before/after photos and project documentation
  - `id` (uuid, primary key) - Unique identifier
  - `achievement_id` (uuid, foreign key) - Links to achievement
  - `media_type` (text) - Type: before, after, progress, video
  - `url` (text) - Media file URL
  - `caption` (text) - Description
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz) - Upload date

  ## Security
  - RLS enabled on all tables
  - Public read access for published achievements and verified testimonials
  - Public write for testimonial submissions (with moderation)
  - Authenticated admin access for full CRUD operations
*/

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL CHECK (category IN ('education', 'health', 'employment', 'infrastructure', 'agriculture')),
  year integer NOT NULL,
  image_url text DEFAULT '',
  location text DEFAULT '',
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  status text DEFAULT 'completed' CHECK (status IN ('completed', 'in_progress', 'planned')),
  beneficiaries_count integer DEFAULT 0,
  budget_amount decimal(12, 2) DEFAULT 0,
  completion_date date,
  tags text[] DEFAULT '{}',
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create achievement_testimonials table
CREATE TABLE IF NOT EXISTS achievement_testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  achievement_id uuid REFERENCES achievements(id) ON DELETE CASCADE NOT NULL,
  author_name text NOT NULL,
  author_role text DEFAULT '',
  content text NOT NULL,
  image_url text DEFAULT '',
  verified boolean DEFAULT false,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create achievement_media table
CREATE TABLE IF NOT EXISTS achievement_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  achievement_id uuid REFERENCES achievements(id) ON DELETE CASCADE NOT NULL,
  media_type text NOT NULL CHECK (media_type IN ('before', 'after', 'progress', 'video')),
  url text NOT NULL,
  caption text DEFAULT '',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievement_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievement_media ENABLE ROW LEVEL SECURITY;

-- Achievements policies
CREATE POLICY "Anyone can view published achievements"
  ON achievements FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can view all achievements"
  ON achievements FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert achievements"
  ON achievements FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update achievements"
  ON achievements FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete achievements"
  ON achievements FOR DELETE
  TO authenticated
  USING (true);

-- Testimonials policies
CREATE POLICY "Anyone can view verified testimonials"
  ON achievement_testimonials FOR SELECT
  USING (verified = true);

CREATE POLICY "Authenticated users can view all testimonials"
  ON achievement_testimonials FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can submit testimonials"
  ON achievement_testimonials FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update testimonials"
  ON achievement_testimonials FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete testimonials"
  ON achievement_testimonials FOR DELETE
  TO authenticated
  USING (true);

-- Media policies
CREATE POLICY "Anyone can view media for published achievements"
  ON achievement_media FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM achievements
      WHERE achievements.id = achievement_media.achievement_id
      AND achievements.published = true
    )
  );

CREATE POLICY "Authenticated users can view all media"
  ON achievement_media FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert media"
  ON achievement_media FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update media"
  ON achievement_media FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete media"
  ON achievement_media FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_achievements_category ON achievements(category);
CREATE INDEX IF NOT EXISTS idx_achievements_year ON achievements(year);
CREATE INDEX IF NOT EXISTS idx_achievements_status ON achievements(status);
CREATE INDEX IF NOT EXISTS idx_achievements_published ON achievements(published);
CREATE INDEX IF NOT EXISTS idx_achievements_location ON achievements(location);
CREATE INDEX IF NOT EXISTS idx_achievements_tags ON achievements USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_testimonials_achievement ON achievement_testimonials(achievement_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_verified ON achievement_testimonials(verified);
CREATE INDEX IF NOT EXISTS idx_media_achievement ON achievement_media(achievement_id);

-- Create full-text search index
CREATE INDEX IF NOT EXISTS idx_achievements_search ON achievements 
USING GIN(to_tsvector('english', title || ' ' || description || ' ' || location));