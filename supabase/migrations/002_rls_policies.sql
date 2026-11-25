-- 002_rls_policies.sql
-- SRFTI Student Union Platform - RLS Policies and Seed Data

-- ============================================================
-- Enable RLS on all tables
-- ============================================================
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.screenings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rotation_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.film_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.poll_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bulletins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_voices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- Helper function to get current user's role
-- ============================================================
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    role_name text;
BEGIN
    SELECT r.name INTO role_name
    FROM public.profiles p
    JOIN public.roles r ON p.role_id = r.id
    WHERE p.id = auth.uid();
    
    RETURN COALESCE(role_name, 'student');
END;
$$;

-- ============================================================
-- Helper function to check if user has a specific role
-- ============================================================
CREATE OR REPLACE FUNCTION public.has_role(role_name text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN public.get_current_user_role() = role_name;
END;
$$;

-- ============================================================
-- Helper function to check if user is admin (super_admin or union_admin)
-- ============================================================
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    role_name text;
BEGIN
    role_name := public.get_current_user_role();
    RETURN role_name IN ('super_admin', 'union_admin');
END;
$$;

-- ============================================================
-- Helper function to check if user is curator or above
-- ============================================================
CREATE OR REPLACE FUNCTION public.is_curator_or_above()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    role_name text;
BEGIN
    role_name := public.get_current_user_role();
    RETURN role_name IN ('super_admin', 'union_admin', 'cinema_curator');
END;
$$;

-- ============================================================
-- Helper function to check if user is editor or above
-- ============================================================
CREATE OR REPLACE FUNCTION public.is_editor_or_above()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    role_name text;
BEGIN
    role_name := public.get_current_user_role();
    RETURN role_name IN ('super_admin', 'union_admin', 'awaz_do_editor');
END;
$$;

-- ============================================================
-- RLS Policies: roles
-- ============================================================
-- Everyone can read roles
CREATE POLICY "roles_select_all" ON public.roles
    FOR SELECT USING (true);

-- Only super_admin can modify roles
CREATE POLICY "roles_modify_super_admin" ON public.roles
    FOR ALL USING (public.has_role('super_admin'))
    WITH CHECK (public.has_role('super_admin'));

-- ============================================================
-- RLS Policies: wings, departments, batches, groups
-- ============================================================
-- Everyone can read academic structure
CREATE POLICY "wings_select_all" ON public.wings FOR SELECT USING (true);
CREATE POLICY "departments_select_all" ON public.departments FOR SELECT USING (true);
CREATE POLICY "batches_select_all" ON public.batches FOR SELECT USING (true);
CREATE POLICY "groups_select_all" ON public.groups FOR SELECT USING (true);

-- Only admins can modify academic structure
CREATE POLICY "wings_modify_admin" ON public.wings FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "departments_modify_admin" ON public.departments FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "batches_modify_admin" ON public.batches FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "groups_modify_admin" ON public.groups FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============================================================
-- RLS Policies: profiles
-- ============================================================
-- Users can read their own profile fully
CREATE POLICY "profiles_select_own" ON public.profiles
    FOR SELECT USING (id = auth.uid());

-- Public can read public profiles (respecting visibility_flags)
CREATE POLICY "profiles_select_public" ON public.profiles
    FOR SELECT USING (
        is_public = true 
        AND id != auth.uid()
    );

-- Users can update their own profile
CREATE POLICY "profiles_update_own" ON public.profiles
    FOR UPDATE USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- Admins can read all profiles
CREATE POLICY "profiles_select_admin" ON public.profiles
    FOR SELECT USING (public.is_admin());

-- Admins can update any profile (role, etc.)
CREATE POLICY "profiles_update_admin" ON public.profiles
    FOR UPDATE USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- ============================================================
-- RLS Policies: screenings
-- ============================================================
-- Everyone can read active screenings
CREATE POLICY "screenings_select_public" ON public.screenings
    FOR SELECT USING (is_active = true);

-- Curators and admins can read all screenings
CREATE POLICY "screenings_select_curator" ON public.screenings
    FOR SELECT USING (public.is_curator_or_above());

-- Curators and admins can create screenings
CREATE POLICY "screenings_insert_curator" ON public.screenings
    FOR INSERT WITH CHECK (public.is_curator_or_above());

-- Curators and admins can update screenings
CREATE POLICY "screenings_update_curator" ON public.screenings
    FOR UPDATE USING (public.is_curator_or_above())
    WITH CHECK (public.is_curator_or_above());

-- ============================================================
-- RLS Policies: rotation_assignments
-- ============================================================
-- Everyone can read rotation assignments
CREATE POLICY "rotation_select_all" ON public.rotation_assignments
    FOR SELECT USING (true);

-- Only admins can manage rotation assignments
CREATE POLICY "rotation_modify_admin" ON public.rotation_assignments
    FOR ALL USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- ============================================================
-- RLS Policies: film_recommendations
-- ============================================================
-- Students can read their own recommendations
CREATE POLICY "film_rec_select_own" ON public.film_recommendations
    FOR SELECT USING (student_id = auth.uid());

-- Everyone can read shortlisted/selected recommendations
CREATE POLICY "film_rec_select_published" ON public.film_recommendations
    FOR SELECT USING (status IN ('shortlisted', 'selected'));

-- Curators and admins can read all recommendations
CREATE POLICY "film_rec_select_curator" ON public.film_recommendations
    FOR SELECT USING (public.is_curator_or_above());

-- Students in the assigned group can submit recommendations for their week
CREATE POLICY "film_rec_insert_student" ON public.film_recommendations
    FOR INSERT WITH CHECK (
        student_id = auth.uid()
        AND EXISTS (
            SELECT 1 FROM public.rotation_assignments ra
            JOIN public.profiles p ON p.group_id = ra.group_id
            WHERE ra.id = week_id
            AND p.id = auth.uid()
            AND ra.is_completed = false
        )
    );

-- Students can update their own recommendations before shortlist
CREATE POLICY "film_rec_update_own" ON public.film_recommendations
    FOR UPDATE USING (
        student_id = auth.uid()
        AND status = 'submitted'
    )
    WITH CHECK (
        student_id = auth.uid()
        AND status = 'submitted'
    );

-- Curators and admins can update status (shortlist, select, reject)
CREATE POLICY "film_rec_update_curator" ON public.film_recommendations
    FOR UPDATE USING (public.is_curator_or_above())
    WITH CHECK (public.is_curator_or_above());

-- ============================================================
-- RLS Policies: polls
-- ============================================================
-- Everyone can read polls
CREATE POLICY "polls_select_all" ON public.polls
    FOR SELECT USING (true);

-- Curators and admins can manage polls
CREATE POLICY "polls_modify_curator" ON public.polls
    FOR ALL USING (public.is_curator_or_above())
    WITH CHECK (public.is_curator_or_above());

-- ============================================================
-- RLS Policies: poll_options
-- ============================================================
-- Everyone can read poll options
CREATE POLICY "poll_options_select_all" ON public.poll_options
    FOR SELECT USING (true);

-- Curators and admins can manage poll options
CREATE POLICY "poll_options_modify_curator" ON public.poll_options
    FOR ALL USING (public.is_curator_or_above())
    WITH CHECK (public.is_curator_or_above());

-- ============================================================
-- RLS Policies: votes
-- ============================================================
-- Students can read their own votes
CREATE POLICY "votes_select_own" ON public.votes
    FOR SELECT USING (student_id = auth.uid());

-- Curators and admins can read all votes
CREATE POLICY "votes_select_curator" ON public.votes
    FOR SELECT USING (public.is_curator_or_above());

-- Students can vote (one vote per poll)
CREATE POLICY "votes_insert_student" ON public.votes
    FOR INSERT WITH CHECK (
        student_id = auth.uid()
        AND EXISTS (
            SELECT 1 FROM public.polls p
            WHERE p.id = poll_id
            AND p.status = 'open'
            AND p.voting_start <= now()
            AND (p.voting_end IS NULL OR p.voting_end >= now())
        )
    );

-- ============================================================
-- RLS Policies: articles
-- ============================================================
-- Everyone can read published articles
CREATE POLICY "articles_select_published" ON public.articles
    FOR SELECT USING (is_published = true);

-- Editors and admins can read all articles
CREATE POLICY "articles_select_editor" ON public.articles
    FOR SELECT USING (public.is_editor_or_above());

-- Editors and admins can manage articles
CREATE POLICY "articles_modify_editor" ON public.articles
    FOR ALL USING (public.is_editor_or_above())
    WITH CHECK (public.is_editor_or_above());

-- ============================================================
-- RLS Policies: bulletins
-- ============================================================
-- Everyone can read published bulletins
CREATE POLICY "bulletins_select_published" ON public.bulletins
    FOR SELECT USING (is_published = true);

-- Editors and admins can read all bulletins
CREATE POLICY "bulletins_select_editor" ON public.bulletins
    FOR SELECT USING (public.is_editor_or_above());

-- Editors and admins can manage bulletins
CREATE POLICY "bulletins_modify_editor" ON public.bulletins
    FOR ALL USING (public.is_editor_or_above())
    WITH CHECK (public.is_editor_or_above());

-- ============================================================
-- RLS Policies: student_voices
-- ============================================================
-- Everyone can read non-archived voices
CREATE POLICY "voices_select_published" ON public.student_voices
    FOR SELECT USING (is_archived = false);

-- Editors and admins can read all voices
CREATE POLICY "voices_select_editor" ON public.student_voices
    FOR SELECT USING (public.is_editor_or_above());

-- Students can create voices (consent required for non-official)
CREATE POLICY "voices_insert_student" ON public.student_voices
    FOR INSERT WITH CHECK (
        author = (SELECT full_name FROM public.profiles WHERE id = auth.uid())
        AND (is_official = false AND consent_obtained = true OR is_official = true)
    );

-- Editors and admins can manage voices
CREATE POLICY "voices_modify_editor" ON public.student_voices
    FOR ALL USING (public.is_editor_or_above())
    WITH CHECK (public.is_editor_or_above());

-- ============================================================
-- RLS Policies: notices
-- ============================================================
-- Everyone can read non-archived notices
CREATE POLICY "notices_select_published" ON public.notices
    FOR SELECT USING (is_archived = false);

-- Admins can read all notices
CREATE POLICY "notices_select_admin" ON public.notices
    FOR SELECT USING (public.is_admin());

-- Admins can manage notices
CREATE POLICY "notices_modify_admin" ON public.notices
    FOR ALL USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- ============================================================
-- RLS Policies: events
-- ============================================================
-- Everyone can read events
CREATE POLICY "events_select_all" ON public.events
    FOR SELECT USING (true);

-- Admins can manage events
CREATE POLICY "events_modify_admin" ON public.events
    FOR ALL USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- ============================================================
-- RLS Policies: portfolio_items
-- ============================================================
-- Everyone can read portfolio items of public profiles
CREATE POLICY "portfolio_select_public" ON public.portfolio_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles p
            WHERE p.id = profile_id
            AND p.is_public = true
        )
    );

-- Users can manage their own portfolio
CREATE POLICY "portfolio_modify_own" ON public.portfolio_items
    FOR ALL USING (profile_id = auth.uid())
    WITH CHECK (profile_id = auth.uid());

-- ============================================================
-- Seed Data: Roles
-- ============================================================
INSERT INTO public.roles (name, permissions) VALUES
    ('super_admin', '["*"]'::jsonb),
    ('union_admin', '["manage_users", "manage_roles", "manage_academic", "manage_all_content", "view_analytics"]'::jsonb),
    ('awaz_do_editor', '["manage_articles", "manage_bulletins", "manage_voices", "manage_notices"]'::jsonb),
    ('cinema_curator', '["manage_screenings", "manage_rotation", "manage_polls", "manage_recommendations"]'::jsonb),
    ('student', '["view_screenings", "submit_recommendations", "vote_polls", "view_articles", "view_bulletins", "view_voices", "view_notices", "view_events", "manage_own_profile", "manage_own_portfolio", "submit_voices"]'::jsonb)
ON CONFLICT (name) DO UPDATE SET permissions = EXCLUDED.permissions;

-- ============================================================
-- Seed Data: Academic Structure (Film Wing + EDM)
-- ============================================================
-- Wings
INSERT INTO public.wings (name) VALUES 
    ('Film Wing'), 
    ('Electronic Dance Music')
ON CONFLICT (name) DO NOTHING;

-- Departments (Film Wing)
INSERT INTO public.departments (wing_id, name) 
SELECT id, d.name FROM public.wings w, (VALUES 
    ('Direction'), ('Cinematography'), ('Editing'), ('Sound Recording & Design'), 
    ('Producing'), ('Screenwriting'), ('Animation'), ('Film Studies')
) AS d(name) 
WHERE w.name = 'Film Wing'
ON CONFLICT (name) DO NOTHING;

-- Departments (EDM)
INSERT INTO public.departments (wing_id, name) 
SELECT id, d.name FROM public.wings w, (VALUES 
    ('Electronic Music Production'), ('Sound Design'), ('Music Technology'), ('Performance & DJ')
) AS d(name) 
WHERE w.name = 'Electronic Dance Music'
ON CONFLICT (name) DO NOTHING;

-- Batches
INSERT INTO public.batches (year, name) VALUES
    (2021, 'Batch 2021'),
    (2022, 'Batch 2022'),
    (2023, 'Batch 2023'),
    (2024, 'Batch 2024'),
    (2025, 'Batch 2025')
ON CONFLICT (year) DO NOTHING;

-- Groups (sample - will be populated by admin)
-- Groups are created via admin UI

-- ============================================================
-- Grants for service role
-- ============================================================
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO service_role;