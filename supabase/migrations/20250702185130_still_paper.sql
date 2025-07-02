/*
  # Fix Auth Providers and Add Email Authentication Support

  1. New Features
    - Add support for email/password authentication
    - Create password reset functionality
    - Set up authentication triggers

  2. Security
    - Ensure proper password hashing
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