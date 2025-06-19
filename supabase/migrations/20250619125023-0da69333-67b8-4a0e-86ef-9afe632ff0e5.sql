
-- Create content management tables
CREATE TABLE public.hero_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  profile_image_url TEXT,
  resume_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.about_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  skills JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  detailed_description TEXT,
  technologies JSONB NOT NULL,
  impact TEXT,
  image_url TEXT,
  icon TEXT,
  status TEXT DEFAULT 'active',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE,
  category TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.blog_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  published_url TEXT,
  published_date DATE,
  status TEXT DEFAULT 'draft',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.contact_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  social_links JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create admin users table for restricted access
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  google_id TEXT UNIQUE,
  name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'admin',
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert the restricted admin email
INSERT INTO public.admin_users (email, role) 
VALUES ('sn3199@columbia.edu', 'super_admin');

-- Disable RLS on all tables as requested
ALTER TABLE public.hero_content DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_content DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_articles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_info DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users DISABLE ROW LEVEL SECURITY;

-- Insert default content
INSERT INTO public.hero_content (name, title, subtitle, description, profile_image_url, resume_url)
VALUES (
  'Siddhardha Nanda',
  'Engineer. Innovator. Human.',
  'Looking for opportunities',
  'Pioneering at the intersection of med-tech, embedded systems, and digital health. Clinical precision. Creative innovation.',
  '/public/lovable-uploads/31b97417-8931-4a4d-859c-4ba132c82167.png',
  '/resume.pdf'
);

INSERT INTO public.contact_info (email, phone, location, social_links)
VALUES (
  'sn3199@columbia.edu',
  NULL,
  'New York, NY',
  '{"linkedin": "", "github": "", "twitter": ""}'::jsonb
);

-- Insert current projects data
INSERT INTO public.projects (title, description, detailed_description, technologies, impact, image_url, icon, sort_order)
VALUES 
(
  'DRDO Sonar + YOLO',
  'Augmented sonar signal analysis for defense using deep learning — YOLO-enabled object localization, real-time visualization, system prototyping.',
  'Developed robust sonar data pipelines, training deep detection models on real-world sequences. Collaborated with DRDO, built hardware interface modules, and led evaluation protocols.',
  '["YOLOv4", "PyTorch", "DSP", "Sonar HW"]'::jsonb,
  'Enhanced underwater threat detection. Deployed for critical defense evaluations.',
  '/placeholder.svg',
  'Microscope',
  1
),
(
  'IoT Health Monitor',
  'Wireless device for real-time patient health signals (ECG, SpO2, temp). Embedded C, Bluetooth, live dashboard, and phone alerts.',
  'Designed compact wearable PCB, implemented power-efficient firmware, and created secure cloud dashboard. Piloted in community health centers.',
  '["ESP32", "ECG Frontend", "Bluetooth", "React"]'::jsonb,
  'Enabled remote monitoring for at-risk individuals. Prototype adopted by rural clinics.',
  '/placeholder.svg',
  'TestTube',
  2
),
(
  'Med-Caption',
  'Accessible real-time medical media captioning (video/image/audio) with AI. Focus: hospital documentation, care accessibility.',
  'Blended CV + NLP, optimized for noisy input, integrated with hospital IT APIs.',
  '["Python", "TensorFlow", "NLP", "React Native"]'::jsonb,
  'Improved info accessibility in clinical settings. Launched pilot with two hospitals.',
  '/placeholder.svg',
  'Microscope',
  3
),
(
  'Biomedical Signal Interface',
  'Toolkit for acquiring, transforming, and visualizing biosignals (EEG, EMG, ECG). Modular, open source.',
  'Built plug-n-play components for signal acquisition, filtration, and live App plotting. Published for class adoption.',
  '["MATLAB", "Python", "bioamp", "Plotly"]'::jsonb,
  'Streamlined experimentation for peers and labs. Used in academic courses.',
  '/placeholder.svg',
  'Axis3d',
  4
);
