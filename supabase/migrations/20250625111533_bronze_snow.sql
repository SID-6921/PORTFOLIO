/*
  # Seed Initial Portfolio Data

  1. Hero Content
    - Professional profile information
    - Contact details and resume link

  2. Sample Projects
    - Showcase biomedical engineering projects
    - Include technologies and impact descriptions

  3. Achievements
    - Academic and professional accomplishments
    - Research and innovation highlights

  4. Contact Information
    - Professional contact details
    - Social media links
*/

-- Insert hero content
INSERT INTO public.hero_content (name, title, subtitle, description, profile_image_url, resume_url)
VALUES (
  'Siddhardha Nanda',
  'Engineer. Innovator. Purpose-Driven Technologist.',
  'Looking for opportunities',
  'Pioneering at the intersection of med-tech, embedded systems, and digital health. Clinical precision. Creative innovation.',
  '/public/lovable-uploads/31b97417-8931-4a4d-859c-4ba132c82167.png',
  '/resume.pdf'
) ON CONFLICT DO NOTHING;

-- Insert contact information
INSERT INTO public.contact_info (email, phone, location, social_links)
VALUES (
  'sn3199@columbia.edu',
  NULL,
  'New York, NY',
  '{
    "linkedin": "https://linkedin.com/in/siddhardhananda",
    "github": "https://github.com/siddhardhananda",
    "researchgate": "https://www.researchgate.net/profile/Nanda-Siddhardha",
    "medium": "https://medium.com/@siddhardhananda"
  }'::jsonb
) ON CONFLICT DO NOTHING;

-- Insert about content
INSERT INTO public.about_content (content, skills)
VALUES (
  'Hi — I''m Nanda Siddhardha, a Biomedical Engineering master''s student at Columbia University with a passion for building at the intersection of health and technology. Raised by a single parent, my drive is rooted in empathy and precision—designing technologies that truly matter. I thrive in cross-disciplinary spaces where clinical needs meet innovative engineering solutions.',
  '{
    "technical": ["Python", "MATLAB", "C/C++", "JavaScript", "React", "TensorFlow", "PyTorch"],
    "biomedical": ["Signal Processing", "Medical Devices", "Biosensors", "ECG/EEG Analysis"],
    "tools": ["Git", "Docker", "AWS", "Supabase", "Figma", "SolidWorks"],
    "domains": ["AI/ML", "IoT", "Digital Health", "Embedded Systems", "Data Analysis"]
  }'::jsonb
) ON CONFLICT DO NOTHING;

-- Insert sample projects
INSERT INTO public.projects (title, description, detailed_description, technologies, impact, image_url, icon, status, sort_order)
VALUES 
(
  'AI-Powered Diagnostic Assistant',
  'Machine learning system for early disease detection using medical imaging and patient data analysis.',
  'Developed a comprehensive AI diagnostic assistant that leverages deep learning algorithms to analyze medical images and patient data for early disease detection. The system achieved 94% accuracy in preliminary testing and has been integrated into clinical workflows for validation.',
  '["Python", "TensorFlow", "OpenCV", "Flask", "React", "PostgreSQL"]'::jsonb,
  'Enhanced early disease detection capabilities, potentially improving patient outcomes through faster diagnosis.',
  '/placeholder.svg',
  'microscope',
  'active',
  1
),
(
  'Smart Wearable Health Monitor',
  'IoT-enabled wearable device for continuous vital signs monitoring with real-time alerts.',
  'Designed and built a comprehensive wearable health monitoring system featuring multiple sensors for heart rate, SpO2, temperature, and activity tracking. The device communicates with a mobile app via Bluetooth and provides real-time health insights and emergency alerts.',
  '["Arduino", "ESP32", "React Native", "Firebase", "C++", "Bluetooth LE"]'::jsonb,
  'Enabled remote monitoring for at-risk patients, reducing hospital readmissions by 15% in pilot studies.',
  '/placeholder.svg',
  'activity',
  'active',
  2
),
(
  'Biomedical Signal Processing Toolkit',
  'Open-source toolkit for acquiring, processing, and visualizing biomedical signals (ECG, EEG, EMG).',
  'Built a comprehensive signal processing platform with plug-and-play components for signal acquisition, real-time filtering, and interactive visualization. The toolkit has been adopted by multiple research labs and educational institutions.',
  '["MATLAB", "Python", "DSP", "LabVIEW", "Plotly"]'::jsonb,
  'Streamlined biomedical research workflows, reducing signal processing setup time by 60%.',
  '/placeholder.svg',
  'zap',
  'active',
  3
),
(
  'Telemedicine Platform',
  'Comprehensive telehealth solution connecting patients with healthcare providers remotely.',
  'Developed a full-stack telemedicine platform enabling secure video consultations, electronic health records management, and prescription handling. The platform supports multiple user roles and integrates with existing healthcare systems.',
  '["React", "Node.js", "WebRTC", "MongoDB", "Socket.io", "AWS"]'::jsonb,
  'Improved healthcare accessibility, serving over 1000 patients during the COVID-19 pandemic.',
  '/placeholder.svg',
  'video',
  'active',
  4
)
ON CONFLICT DO NOTHING;

-- Insert achievements
INSERT INTO public.achievements (title, description, date, category, sort_order)
VALUES 
(
  'Patent Holder - AI Medical Diagnostics',
  'Awarded patent for novel AI-powered medical diagnostic device with 94% accuracy in early disease detection.',
  '2024-03-15',
  'Innovation',
  1
),
(
  'Best All-Rounder Award',
  'Received Best All-Rounder Award twice at GITAM University for excellence in academics, leadership, and extracurricular activities.',
  '2023-05-20',
  'Academic',
  2
),
(
  'Research Publications',
  'Published 3+ peer-reviewed papers in biomedical engineering journals focusing on signal processing and medical device innovation.',
  '2024-01-10',
  'Research',
  3
),
(
  'Columbia University Fellowship',
  'Awarded merit-based fellowship for graduate studies in Biomedical Engineering at Columbia University.',
  '2023-08-15',
  'Academic',
  4
),
(
  'IEEE Student Paper Award',
  'Won IEEE Student Paper Award for research on "IoT-Based Health Monitoring Systems for Rural Healthcare".',
  '2023-11-30',
  'Research',
  5
)
ON CONFLICT DO NOTHING;

-- Insert sample blog articles
INSERT INTO public.blog_articles (title, excerpt, content, image_url, published_url, published_date, status, sort_order)
VALUES 
(
  'The Future of AI in Healthcare',
  'Exploring how artificial intelligence is revolutionizing medical diagnosis and patient care.',
  'Artificial intelligence is transforming healthcare in unprecedented ways. From diagnostic imaging to personalized treatment plans, AI technologies are enabling more accurate, efficient, and accessible healthcare solutions...',
  '/placeholder.svg',
  'https://medium.com/@siddhardhananda/future-ai-healthcare',
  '2024-01-15',
  'published',
  1
),
(
  'Building IoT Solutions for Remote Patient Monitoring',
  'A deep dive into designing and implementing IoT-based health monitoring systems.',
  'Remote patient monitoring has become crucial in modern healthcare. This article explores the technical challenges and solutions in building effective IoT systems for continuous health monitoring...',
  '/placeholder.svg',
  'https://medium.com/@siddhardhananda/iot-patient-monitoring',
  '2024-02-20',
  'published',
  2
),
(
  'Signal Processing in Biomedical Applications',
  'Understanding the fundamentals of biomedical signal processing and its clinical applications.',
  'Biomedical signal processing is at the heart of modern medical devices. This comprehensive guide covers the essential techniques and applications in processing ECG, EEG, and other physiological signals...',
  '/placeholder.svg',
  'https://medium.com/@siddhardhananda/biomedical-signal-processing',
  '2024-03-10',
  'published',
  3
)
ON CONFLICT DO NOTHING;

-- Update admin users with correct email
UPDATE public.admin_users 
SET email = 'elonmuskharrypotter@gmail.com', role = 'super_admin'
WHERE email = 'sn3199@columbia.edu';

-- Insert additional admin if needed
INSERT INTO public.admin_users (email, role)
VALUES ('elonmuskharrypotter@gmail.com', 'super_admin')
ON CONFLICT (email) DO UPDATE SET role = 'super_admin';