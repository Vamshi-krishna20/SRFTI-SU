-- 001_initial_schema.sql
-- SRFTI Student Union Platform - Initial Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. roles table
-- ============================================================
CREATE TABLE public.roles (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name text UNIQUE NOT NULL,
    permissions jsonb DEFAULT '[]'::jsonb,
    created_at timestamptz DEFAULT now()
);

-- ============================================================
-- 2. wings table
-- ============================================================
CREATE TABLE public.wings (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name text UNIQUE NOT NULL
);

-- ============================================================
-- 3. departments table
-- ============================================================
CREATE TABLE public.departments (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    wing_id uuid NOT NULL REFERENCES public.wings(id) ON DELETE CASCADE,
    name text UNIQUE NOT NULL
);

-- ============================================================
-- 4. batches table
-- ============================================================
CREATE TABLE public.batches (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    year int UNIQUE NOT NULL,
    name text NOT NULL
);

-- ============================================================
-- 5. groups table
-- ============================================================
CREATE TABLE public.groups (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    department_id uuid NOT NULL REFERENCES public.departments(id) ON DELETE CASCADE,
    batch_id uuid NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
    name text NOT NULL,
    created_at timestamptz DEFAULT now(),
    UNIQUE(department_id, batch_id, name)
);

-- ============================================================
-- 6. profiles table
-- ============================================================
CREATE TABLE public.profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name text,
    email text,
    phone text,
    instagram text,
    linkedin text,
    website text,
    other_links jsonb DEFAULT '[]'::jsonb,
    visibility_flags jsonb DEFAULT '{"phone":true,"instagram":true,"linkedin":true,"website":true,"other":true}'::jsonb,
    bio text,
    photo_url text,
    wing_id uuid REFERENCES public.wings(id) ON DELETE SET NULL,
    department_id uuid REFERENCES public.departments(id) ON DELETE SET NULL,
    batch_id uuid REFERENCES public.batches(id) ON DELETE SET NULL,
    group_id uuid REFERENCES public.groups(id) ON DELETE SET NULL,
    specialisation text,
    role_id uuid REFERENCES public.roles(id) ON DELETE SET NULL,
    is_public boolean DEFAULT true,
    created_at timestamptz DEFAULT now()
);

-- ============================================================
-- 7. screenings table
-- ============================================================
CREATE TABLE public.screenings (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title text NOT NULL,
    director text,
    year int,
    country text,
    language text,
    duration int,
    poster_url text,
    description text,
    screening_date date,
    screening_time time,
    venue text,
    program_type public.program_type NOT NULL,
    is_active boolean DEFAULT true,
    created_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now()
);

-- ============================================================
-- 8. rotation_assignments table
-- ============================================================
CREATE TABLE public.rotation_assignments (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    week_start_date date UNIQUE NOT NULL,
    wing_id uuid NOT NULL REFERENCES public.wings(id) ON DELETE CASCADE,
    department_id uuid NOT NULL REFERENCES public.departments(id) ON DELETE CASCADE,
    batch_id uuid NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
    group_id uuid NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
    is_completed boolean DEFAULT false,
    overridden_by_admin boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
);

-- ============================================================
-- 9. film_recommendations table
-- ============================================================
CREATE TABLE public.film_recommendations (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    week_id uuid NOT NULL REFERENCES public.rotation_assignments(id) ON DELETE CASCADE,
    film_title text NOT NULL,
    director text,
    release_year int,
    country text,
    language text,
    duration int,
    poster_url text,
    description text,
    reason text,
    status public.recommendation_status DEFAULT 'submitted',
    created_at timestamptz DEFAULT now()
);

-- ============================================================
-- 10. polls table
-- ============================================================
CREATE TABLE public.polls (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    week_id uuid NOT NULL REFERENCES public.rotation_assignments(id) ON DELETE CASCADE,
    title text NOT NULL,
    status public.poll_status DEFAULT 'open',
    shortlist_published boolean DEFAULT false,
    voting_start timestamptz,
    voting_end timestamptz,
    live_results_enabled boolean DEFAULT false,
    created_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now()
);

-- ============================================================
-- 11. poll_options table
-- ============================================================
CREATE TABLE public.poll_options (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    poll_id uuid NOT NULL REFERENCES public.polls(id) ON DELETE CASCADE,
    recommendation_id uuid NOT NULL REFERENCES public.film_recommendations(id) ON DELETE CASCADE,
    UNIQUE(poll_id, recommendation_id)
);

-- ============================================================
-- 12. votes table
-- ============================================================
CREATE TABLE public.votes (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    poll_id uuid NOT NULL REFERENCES public.polls(id) ON DELETE CASCADE,
    student_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    recommendation_id uuid NOT NULL REFERENCES public.film_recommendations(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now(),
    UNIQUE(poll_id, student_id)
);

-- ============================================================
-- 13. articles table
-- ============================================================
CREATE TABLE public.articles (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title text NOT NULL,
    summary text,
    body text NOT NULL,
    author text NOT NULL,
    category text,
    poster_url text,
    published_at timestamptz,
    is_published boolean DEFAULT false,
    created_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now()
);

-- ============================================================
-- 14. bulletins table
-- ============================================================
CREATE TABLE public.bulletins (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title text NOT NULL,
    description text,
    author text NOT NULL,
    publication_date date,
    drive_file_id text,
    drive_url text,
    cover_image_url text,
    is_published boolean DEFAULT false,
    created_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now()
);

-- ============================================================
-- 15. student_voices table
-- ============================================================
CREATE TABLE public.student_voices (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title text NOT NULL,
    body text NOT NULL,
    type public.voice_type NOT NULL,
    author text NOT NULL,
    is_official boolean DEFAULT false,
    consent_obtained boolean DEFAULT false,
    poster_url text,
    published_at timestamptz,
    is_archived boolean DEFAULT false,
    created_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now()
);

-- ============================================================
-- 16. notices table
-- ============================================================
CREATE TABLE public.notices (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title text NOT NULL,
    body text NOT NULL,
    category text,
    date date,
    venue text,
    author text NOT NULL,
    is_archived boolean DEFAULT false,
    created_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now()
);

-- ============================================================
-- 17. events table
-- ============================================================
CREATE TABLE public.events (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title text NOT NULL,
    description text,
    date date,
    time time,
    venue text,
    poster_url text,
    organiser text,
    created_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now()
);

-- ============================================================
-- 18. portfolio_items table
-- ============================================================
CREATE TABLE public.portfolio_items (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title text NOT NULL,
    description text,
    category text,
    year int,
    poster_url text,
    video_url text,
    drive_url text,
    created_at timestamptz DEFAULT now()
);

-- ============================================================
-- Indexes
-- ============================================================
CREATE INDEX idx_profiles_wing_dept_batch_group ON public.profiles(wing_id, department_id, batch_id, group_id);
CREATE INDEX idx_profiles_role_id ON public.profiles(role_id);
CREATE INDEX idx_screenings_program_type ON public.screenings(program_type);
CREATE INDEX idx_screenings_date ON public.screenings(screening_date);
CREATE INDEX idx_rotation_week_start ON public.rotation_assignments(week_start_date);
CREATE INDEX idx_film_rec_week ON public.film_recommendations(week_id);
CREATE INDEX idx_polls_week ON public.polls(week_id);
CREATE INDEX idx_votes_poll ON public.votes(poll_id);
CREATE INDEX idx_articles_published ON public.articles(is_published, published_at DESC);
CREATE INDEX idx_bulletins_published ON public.bulletins(is_published, publication_date DESC);
CREATE INDEX idx_student_voices_published ON public.student_voices(is_archived, published_at DESC);
CREATE INDEX idx_notices_archived ON public.notices(is_archived, date DESC);
CREATE INDEX idx_events_date ON public.events(date);
CREATE INDEX idx_portfolio_profile ON public.portfolio_items(profile_id);