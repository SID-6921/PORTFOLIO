/*
  # Update Project Technologies Schema

  1. New Features
    - Standardize technology tags for projects
    - Update existing project technologies to use standardized tags
    - Ensure all projects have at least one technology tag

  2. Data Integrity
    - Maintain existing project data
    - Convert custom technology strings to standardized tags
    - Ensure backward compatibility
*/

-- Define standard technology tags
DO $$
DECLARE
  standard_tags TEXT[] := ARRAY[
    'Python', 'TensorFlow', 'PyTorch', 'React', 'JavaScript', 
    'C++', 'Arduino', 'ESP32', 'IoT', 'AI', 'ML', 'DSP', 
    'MATLAB', 'Hardware', 'Mobile', 'Web', 'Biomedical'
  ];
  project_record RECORD;
  project_technologies JSONB;
  standardized_technologies TEXT[];
  tech TEXT;
BEGIN
  -- Process each project
  FOR project_record IN SELECT id, technologies FROM public.projects
  LOOP
    project_technologies := project_record.technologies;
    standardized_technologies := '{}';
    
    -- Map existing technologies to standard tags
    IF jsonb_typeof(project_technologies) = 'array' THEN
      -- Process each technology in the project
      FOR i IN 0..jsonb_array_length(project_technologies) - 1
      LOOP
        tech := lower(trim(project_technologies->i::TEXT, '"'));
        
        -- Map technologies to standard tags
        IF tech LIKE '%python%' THEN
          standardized_technologies := array_append(standardized_technologies, 'Python');
        END IF;
        
        IF tech LIKE '%tensorflow%' OR tech LIKE '%tf%' THEN
          standardized_technologies := array_append(standardized_technologies, 'TensorFlow');
        END IF;
        
        IF tech LIKE '%pytorch%' OR tech LIKE '%torch%' THEN
          standardized_technologies := array_append(standardized_technologies, 'PyTorch');
        END IF;
        
        IF tech LIKE '%react%' THEN
          standardized_technologies := array_append(standardized_technologies, 'React');
        END IF;
        
        IF tech LIKE '%javascript%' OR tech LIKE '%js%' THEN
          standardized_technologies := array_append(standardized_technologies, 'JavaScript');
        END IF;
        
        IF tech LIKE '%c++%' OR tech LIKE '%cpp%' THEN
          standardized_technologies := array_append(standardized_technologies, 'C++');
        END IF;
        
        IF tech LIKE '%arduino%' THEN
          standardized_technologies := array_append(standardized_technologies, 'Arduino');
        END IF;
        
        IF tech LIKE '%esp32%' OR tech LIKE '%esp8266%' THEN
          standardized_technologies := array_append(standardized_technologies, 'ESP32');
        END IF;
        
        IF tech LIKE '%iot%' OR tech LIKE '%internet of things%' THEN
          standardized_technologies := array_append(standardized_technologies, 'IoT');
        END IF;
        
        IF tech LIKE '%ai%' OR tech LIKE '%artificial intelligence%' THEN
          standardized_technologies := array_append(standardized_technologies, 'AI');
        END IF;
        
        IF tech LIKE '%ml%' OR tech LIKE '%machine learning%' THEN
          standardized_technologies := array_append(standardized_technologies, 'ML');
        END IF;
        
        IF tech LIKE '%dsp%' OR tech LIKE '%signal processing%' THEN
          standardized_technologies := array_append(standardized_technologies, 'DSP');
        END IF;
        
        IF tech LIKE '%matlab%' THEN
          standardized_technologies := array_append(standardized_technologies, 'MATLAB');
        END IF;
        
        IF tech LIKE '%hardware%' OR tech LIKE '%pcb%' OR tech LIKE '%circuit%' THEN
          standardized_technologies := array_append(standardized_technologies, 'Hardware');
        END IF;
        
        IF tech LIKE '%mobile%' OR tech LIKE '%android%' OR tech LIKE '%ios%' OR tech LIKE '%react native%' THEN
          standardized_technologies := array_append(standardized_technologies, 'Mobile');
        END IF;
        
        IF tech LIKE '%web%' OR tech LIKE '%html%' OR tech LIKE '%css%' THEN
          standardized_technologies := array_append(standardized_technologies, 'Web');
        END IF;
        
        IF tech LIKE '%bio%' OR tech LIKE '%medical%' OR tech LIKE '%health%' THEN
          standardized_technologies := array_append(standardized_technologies, 'Biomedical');
        END IF;
      END LOOP;
    END IF;
    
    -- Ensure at least one technology tag
    IF array_length(standardized_technologies, 1) IS NULL THEN
      -- Assign default tag based on project title if no matches
      IF lower(project_record.id::TEXT) LIKE '%ai%' OR lower(project_record.id::TEXT) LIKE '%ml%' THEN
        standardized_technologies := array_append(standardized_technologies, 'AI');
      ELSIF lower(project_record.id::TEXT) LIKE '%iot%' OR lower(project_record.id::TEXT) LIKE '%monitor%' THEN
        standardized_technologies := array_append(standardized_technologies, 'IoT');
      ELSE
        standardized_technologies := array_append(standardized_technologies, 'Biomedical');
      END IF;
    END IF;
    
    -- Remove duplicates
    standardized_technologies := ARRAY(SELECT DISTINCT unnest(standardized_technologies));
    
    -- Update the project with standardized technologies
    UPDATE public.projects
    SET technologies = array_to_json(standardized_technologies)::jsonb
    WHERE id = project_record.id;
  END LOOP;
END;
$$;

-- Add sample projects with standardized technologies if none exist
INSERT INTO public.projects (
  title, 
  description, 
  detailed_description, 
  technologies, 
  impact, 
  image_url, 
  demo_url,
  github_url,
  status
)
SELECT
  'AI-Powered Diagnostic Assistant',
  'Machine learning system for early disease detection using medical imaging and patient data analysis.',
  'Developed a comprehensive AI diagnostic assistant that leverages deep learning algorithms to analyze medical images and patient data for early disease detection. The system achieved 94% accuracy in preliminary testing and has been integrated into clinical workflows for validation.',
  '["Python", "TensorFlow", "AI", "ML"]'::jsonb,
  'Enhanced early disease detection capabilities, potentially improving patient outcomes through faster diagnosis.',
  '/placeholder.svg',
  'https://ai-diagnostic-demo.vercel.app',
  'https://github.com/SID-6921/ai-diagnostic',
  'active'
WHERE NOT EXISTS (SELECT 1 FROM public.projects LIMIT 1);

-- Add more sample projects if none exist
INSERT INTO public.projects (
  title, 
  description, 
  detailed_description, 
  technologies, 
  impact, 
  image_url, 
  demo_url,
  github_url,
  status
)
SELECT
  'Smart Wearable Health Monitor',
  'IoT-enabled wearable device for continuous vital signs monitoring with real-time alerts.',
  'Designed and built a comprehensive wearable health monitoring system featuring multiple sensors for heart rate, SpO2, temperature, and activity tracking. The device communicates with a mobile app via Bluetooth and provides real-time health insights and emergency alerts.',
  '["Arduino", "ESP32", "IoT", "C++", "Mobile"]'::jsonb,
  'Enabled remote monitoring for at-risk patients, reducing hospital readmissions by 15% in pilot studies.',
  '/placeholder.svg',
  'https://health-monitor-demo.vercel.app',
  'https://github.com/SID-6921/health-monitor',
  'active'
WHERE NOT EXISTS (SELECT 1 FROM public.projects LIMIT 1);