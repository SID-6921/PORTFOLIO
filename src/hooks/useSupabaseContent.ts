
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface HeroContent {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  profile_image_url: string;
  resume_url: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  detailed_description: string;
  technologies: string[];
  impact: string;
  image_url: string;
  icon: string;
  sort_order: number;
}

export const useSupabaseContent = () => {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      // Load hero content
      const { data: heroData } = await supabase
        .from('hero_content')
        .select('*')
        .limit(1)
        .single();
      
      if (heroData) setHeroContent(heroData);

      // Load projects
      const { data: projectsData } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'active')
        .order('sort_order');
      
      if (projectsData) {
        // Transform the data to match our interface
        const transformedProjects: Project[] = projectsData.map(project => ({
          id: project.id,
          title: project.title,
          description: project.description,
          detailed_description: project.detailed_description || '',
          technologies: Array.isArray(project.technologies) 
            ? (project.technologies as string[]).filter((tech): tech is string => typeof tech === 'string')
            : [],
          impact: project.impact || '',
          image_url: project.image_url || '',
          icon: project.icon || '',
          sort_order: project.sort_order || 0
        }));
        setProjects(transformedProjects);
      }
    } catch (error) {
      console.error('Failed to load content:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    heroContent,
    projects,
    loading,
    refetch: loadContent
  };
};
