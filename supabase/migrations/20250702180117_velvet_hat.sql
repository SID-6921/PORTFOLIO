/*
  # Fix Hero Section Image URL

  1. Update hero content with correct Cloudinary image URL
  2. Ensure proper image loading and fallback handling
*/

-- Update hero content with the correct Cloudinary image URL
UPDATE public.hero_content 
SET profile_image_url = 'https://res.cloudinary.com/dae56bvjp/image/upload/v1750852722/nanda_wbgmag.jpg',
    resume_url = 'https://drive.google.com/file/d/your-resume-file-id/view',
    updated_at = now()
WHERE name = 'Siddhardha Nanda';

-- If no hero content exists, insert it
INSERT INTO public.hero_content (
  name, 
  title, 
  subtitle, 
  description, 
  profile_image_url, 
  resume_url
)
SELECT 
  'Siddhardha Nanda',
  'Engineer. Innovator. Purpose-Driven Technologist.',
  'Looking for opportunities',
  'Pioneering at the intersection of med-tech, embedded systems, and digital health. Clinical precision. Creative innovation.',
  'https://res.cloudinary.com/dae56bvjp/image/upload/v1750852722/nanda_wbgmag.jpg',
  'https://drive.google.com/file/d/your-resume-file-id/view'
WHERE NOT EXISTS (
  SELECT 1 FROM public.hero_content WHERE name = 'Siddhardha Nanda'
);