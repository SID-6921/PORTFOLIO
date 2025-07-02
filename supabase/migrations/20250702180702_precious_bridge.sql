/*
  # Add Project Links Fields

  1. New Fields
    - Add demo_url field to projects table
    - Add github_url field to projects table
    - Update existing projects with sample links
  
  2. Purpose
    - Enable linking to live demos and code repositories
    - Make projects more interactive and accessible
*/

-- Add new columns to projects table
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS demo_url TEXT,
ADD COLUMN IF NOT EXISTS github_url TEXT;

-- Update existing projects with sample links
UPDATE public.projects
SET 
  demo_url = 'https://example.com/demo/' || id,
  github_url = 'https://github.com/SID-6921/' || LOWER(REPLACE(title, ' ', '-'))
WHERE demo_url IS NULL AND github_url IS NULL;

-- Add comment to explain the purpose of these fields
COMMENT ON COLUMN public.projects.demo_url IS 'URL to the live demo of the project';
COMMENT ON COLUMN public.projects.github_url IS 'URL to the GitHub repository of the project';