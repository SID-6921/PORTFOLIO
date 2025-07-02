/*
  # Add Contact Messages Table and Functionality

  1. New Features
    - Create contact_messages table to store form submissions
    - Add timestamp tracking for messages
    - Set up appropriate security policies

  2. Schema Changes
    - New contact_messages table with fields for name, email, subject, message
    - Status field to track message handling
    - Created_at and updated_at timestamps
*/

-- Create contact messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable row level security
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for contact messages
CREATE POLICY "Public can insert contact messages"
  ON public.contact_messages
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admins can read contact messages"
  ON public.contact_messages
  FOR SELECT
  TO authenticated
  USING (public.is_admin_user());

CREATE POLICY "Admins can update contact messages"
  ON public.contact_messages
  FOR UPDATE
  TO authenticated
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

CREATE POLICY "Admins can delete contact messages"
  ON public.contact_messages
  FOR DELETE
  TO authenticated
  USING (public.is_admin_user());

-- Add sample messages for testing
INSERT INTO public.contact_messages (name, email, subject, message, status, created_at)
VALUES 
('John Smith', 'john.smith@example.com', 'Research Collaboration', 'I''m interested in collaborating on your biomedical signal processing research. I work at Memorial Hospital and would love to discuss potential applications.', 'unread', now() - interval '2 days'),
('Sarah Johnson', 'sarah.j@medtech.org', 'Speaking Opportunity', 'We''re organizing a conference on medical technology innovation and would like to invite you as a speaker. Please let me know if you''re interested.', 'unread', now() - interval '5 days'),
('Michael Chen', 'mchen@university.edu', 'Internship Inquiry', 'I''m a biomedical engineering student at University of California. I''m impressed by your work and would like to know if you offer any internship opportunities.', 'read', now() - interval '10 days');

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT INSERT ON public.contact_messages TO anon;