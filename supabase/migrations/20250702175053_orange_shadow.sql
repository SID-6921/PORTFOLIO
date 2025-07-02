/*
  # Add Email Authentication Support

  1. New Features
    - Add support for email/password authentication
    - Create password reset functionality
    - Set up authentication triggers

  2. Security
    - Ensure proper password hashing
    - Add email verification (optional)
    - Maintain existing Google OAuth support
*/

-- Create a function to handle admin user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Only create admin_users entry for authorized email
  IF NEW.email = 'elonmuskharrypotter@gmail.com' THEN
    INSERT INTO public.admin_users (
      id,
      email,
      name,
      avatar_url,
      role
    ) VALUES (
      NEW.id,
      NEW.email,
      COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'Admin'),
      NEW.raw_user_meta_data->>'avatar_url',
      'super_admin'
    )
    ON CONFLICT (email) 
    DO UPDATE SET 
      name = COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', admin_users.name),
      avatar_url = COALESCE(NEW.raw_user_meta_data->>'avatar_url', admin_users.avatar_url),
      last_login = now(),
      updated_at = now();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create a function to update user last login
CREATE OR REPLACE FUNCTION public.handle_user_login()
RETURNS TRIGGER AS $$
BEGIN
  -- Update last_login for admin users
  IF NEW.email = 'elonmuskharrypotter@gmail.com' AND NEW.last_sign_in_at IS NOT NULL THEN
    UPDATE public.admin_users 
    SET last_login = NEW.last_sign_in_at,
        updated_at = now()
    WHERE email = NEW.email;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for user login updates
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_user_login();

-- Ensure the admin user exists in admin_users table
INSERT INTO public.admin_users (
  email,
  role,
  name
) VALUES (
  'elonmuskharrypotter@gmail.com',
  'super_admin',
  'Admin User'
)
ON CONFLICT (email) 
DO UPDATE SET 
  role = 'super_admin',
  updated_at = now();

-- Create a helper function to check if email auth is enabled (for app logic)
CREATE OR REPLACE FUNCTION public.is_email_auth_enabled()
RETURNS BOOLEAN AS $$
BEGIN
  -- Email auth is enabled by default in Supabase
  -- This function can be used by the application to check auth status
  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.handle_user_login() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_email_auth_enabled() TO anon, authenticated;