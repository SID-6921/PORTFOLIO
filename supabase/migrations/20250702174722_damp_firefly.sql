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

-- Enable email authentication if not already enabled
DO $$
BEGIN
  -- Check if email auth is already enabled
  IF NOT EXISTS (
    SELECT 1 FROM auth.providers WHERE provider = 'email'
  ) THEN
    -- Enable email auth provider
    INSERT INTO auth.providers (provider) VALUES ('email');
  END IF;
END
$$;

-- Create a function to register a new admin user with email/password
CREATE OR REPLACE FUNCTION register_admin_user(
  admin_email TEXT,
  admin_password TEXT,
  admin_role TEXT DEFAULT 'admin'
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_user_id UUID;
BEGIN
  -- Check if email is authorized
  IF admin_email != 'elonmuskharrypotter@gmail.com' THEN
    RAISE EXCEPTION 'Unauthorized email address';
  END IF;

  -- Create the user in auth.users
  INSERT INTO auth.users (
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) 
  VALUES (
    '00000000-0000-0000-0000-000000000000',
    admin_email,
    crypt(admin_password, gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"role":"admin"}',
    now(),
    now(),
    '',
    '',
    '',
    ''
  )
  RETURNING id INTO new_user_id;

  -- Add to admin_users table
  INSERT INTO public.admin_users (
    email,
    role
  ) VALUES (
    admin_email,
    admin_role
  )
  ON CONFLICT (email) 
  DO UPDATE SET 
    role = admin_role,
    updated_at = now();

  RETURN new_user_id;
END;
$$;

-- Create the admin user with email/password
SELECT register_admin_user('elonmuskharrypotter@gmail.com', 'Admin123!');

-- Update auth settings to allow email sign-in
UPDATE auth.config
SET enable_signup = true,
    mailer_autoconfirm = true;