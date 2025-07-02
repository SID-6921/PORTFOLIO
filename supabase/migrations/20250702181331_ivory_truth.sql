/*
  # Update Project Links Schema and Data

  1. Schema Changes
    - Add demo_url and github_url columns to projects table if they don't exist
    - Add comments to explain the purpose of these fields

  2. Data Updates
    - Update existing projects with sample demo and GitHub links
    - Ensure all projects have valid URLs for testing
*/

-- Add new columns to projects table if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'demo_url') THEN
    ALTER TABLE public.projects ADD COLUMN demo_url TEXT;
    COMMENT ON COLUMN public.projects.demo_url IS 'URL to the live demo of the project';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'github_url') THEN
    ALTER TABLE public.projects ADD COLUMN github_url TEXT;
    COMMENT ON COLUMN public.projects.github_url IS 'URL to the GitHub repository of the project';
  END IF;
END
$$;

-- Update existing projects with sample links if they don't have links yet
UPDATE public.projects
SET 
  demo_url = CASE 
    WHEN title = 'AI-Powered Diagnostic Assistant' THEN 'https://ai-diagnostic-demo.vercel.app'
    WHEN title = 'Smart Wearable Health Monitor' THEN 'https://health-monitor-demo.vercel.app'
    WHEN title = 'Biomedical Signal Processing Toolkit' THEN 'https://biosignal-toolkit.vercel.app'
    WHEN title = 'Telemedicine Platform' THEN 'https://telemedicine-demo.vercel.app'
    WHEN title = 'DRDO Sonar + YOLO' THEN 'https://sonar-yolo-demo.vercel.app'
    WHEN title = 'IoT Health Monitor' THEN 'https://iot-health-demo.vercel.app'
    WHEN title = 'Med-Caption' THEN 'https://med-caption-demo.vercel.app'
    WHEN title = 'Biomedical Signal Interface' THEN 'https://biosignal-interface.vercel.app'
    ELSE 'https://example.com/demo/' || id
  END,
  github_url = CASE
    WHEN title = 'AI-Powered Diagnostic Assistant' THEN 'https://github.com/SID-6921/ai-diagnostic'
    WHEN title = 'Smart Wearable Health Monitor' THEN 'https://github.com/SID-6921/health-monitor'
    WHEN title = 'Biomedical Signal Processing Toolkit' THEN 'https://github.com/SID-6921/biosignal-toolkit'
    WHEN title = 'Telemedicine Platform' THEN 'https://github.com/SID-6921/telemedicine'
    WHEN title = 'DRDO Sonar + YOLO' THEN 'https://github.com/SID-6921/sonar-yolo'
    WHEN title = 'IoT Health Monitor' THEN 'https://github.com/SID-6921/iot-health'
    WHEN title = 'Med-Caption' THEN 'https://github.com/SID-6921/med-caption'
    WHEN title = 'Biomedical Signal Interface' THEN 'https://github.com/SID-6921/biosignal-interface'
    ELSE 'https://github.com/SID-6921/' || LOWER(REPLACE(title, ' ', '-'))
  END
WHERE demo_url IS NULL OR github_url IS NULL;