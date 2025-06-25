/*
  # Enable Row Level Security and Create Policies

  1. Security Implementation
    - Enable RLS on all content tables
    - Create policies for public read access to published content
    - Restrict write access to authenticated admin users only
    - Ensure data integrity and security

  2. Public Access Policies
    - Allow public read access to hero content, projects, achievements, and contact info
    - Allow public read access to published blog articles only
    - Restrict admin_users table to authenticated users only

  3. Admin Access Policies
    - Allow full CRUD operations for authenticated admin users
    - Verify admin email against authorized list
*/

-- Enable RLS on all tables
ALTER TABLE public.hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if the current user's email is in the admin_users table
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE email = auth.jwt() ->> 'email'
    AND role IN ('admin', 'super_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Public read policies for portfolio content
CREATE POLICY "Public can read hero content"
  ON public.hero_content
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can read active projects"
  ON public.projects
  FOR SELECT
  TO public
  USING (status = 'active');

CREATE POLICY "Public can read achievements"
  ON public.achievements
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can read published blog articles"
  ON public.blog_articles
  FOR SELECT
  TO public
  USING (status = 'published');

CREATE POLICY "Public can read contact info"
  ON public.contact_info
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can read about content"
  ON public.about_content
  FOR SELECT
  TO public
  USING (true);

-- Admin-only policies for content management
CREATE POLICY "Admins can manage hero content"
  ON public.hero_content
  FOR ALL
  TO authenticated
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

CREATE POLICY "Admins can manage projects"
  ON public.projects
  FOR ALL
  TO authenticated
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

CREATE POLICY "Admins can manage achievements"
  ON public.achievements
  FOR ALL
  TO authenticated
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

CREATE POLICY "Admins can manage blog articles"
  ON public.blog_articles
  FOR ALL
  TO authenticated
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

CREATE POLICY "Admins can manage contact info"
  ON public.contact_info
  FOR ALL
  TO authenticated
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

CREATE POLICY "Admins can manage about content"
  ON public.about_content
  FOR ALL
  TO authenticated
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

CREATE POLICY "Admins can manage site settings"
  ON public.site_settings
  FOR ALL
  TO authenticated
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

-- Admin users table policies
CREATE POLICY "Admins can read admin users"
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING (public.is_admin_user());

CREATE POLICY "Super admins can manage admin users"
  ON public.admin_users
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE email = auth.jwt() ->> 'email'
      AND role = 'super_admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE email = auth.jwt() ->> 'email'
      AND role = 'super_admin'
    )
  );

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.hero_content TO anon;
GRANT SELECT ON public.projects TO anon;
GRANT SELECT ON public.achievements TO anon;
GRANT SELECT ON public.blog_articles TO anon;
GRANT SELECT ON public.contact_info TO anon;
GRANT SELECT ON public.about_content TO anon;

-- Grant full access to authenticated users (will be filtered by RLS policies)
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;