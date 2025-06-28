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

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  sort_order: number;
}

interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  published_url: string;
  published_date: string;
  status: string;
  sort_order: number;
}

interface ContactInfo {
  id: string;
  email: string;
  phone: string;
  location: string;
  social_links: any;
}

interface AboutContent {
  id: string;
  content: string;
  skills: any;
}

export const useSupabaseContent = () => {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [blogArticles, setBlogArticles] = useState<BlogArticle[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      setError(null);

      // Test Supabase connection first
      try {
        const { error: connectionError } = await supabase.from('achievements').select('count').limit(1);
        if (connectionError) {
          console.error('Supabase connection test failed:', connectionError);
          throw new Error(`Database connection failed: ${connectionError.message}`);
        }
      } catch (fetchError) {
        console.error('Network connectivity test failed:', fetchError);
        if (fetchError instanceof TypeError && fetchError.message.includes('Failed to fetch')) {
          throw new Error('Unable to connect to database. Please check your internet connection and Supabase configuration.');
        }
        throw fetchError;
      }

      // Load hero content
      try {
        const { data: heroData, error: heroError } = await supabase
          .from('hero_content')
          .select('*')
          .limit(1)
          .single();
        
        if (heroError && heroError.code !== 'PGRST116') {
          console.error('Error loading hero content:', heroError);
        } else if (heroData) {
          setHeroContent(heroData);
        }
      } catch (heroFetchError) {
        console.error('Failed to fetch hero content:', heroFetchError);
        // Continue with other content even if hero fails
      }

      // Load projects
      try {
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .eq('status', 'active')
          .order('sort_order');
        
        if (projectsError) {
          console.error('Error loading projects:', projectsError);
        } else if (projectsData) {
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
      } catch (projectsFetchError) {
        console.error('Failed to fetch projects:', projectsFetchError);
        // Continue with other content even if projects fail
      }

      // Load achievements with better error handling
      try {
        const { data: achievementsData, error: achievementsError } = await supabase
          .from('achievements')
          .select('*')
          .order('sort_order');
        
        if (achievementsError) {
          console.error('Error loading achievements:', achievementsError);
          throw new Error(`Failed to load achievements: ${achievementsError.message}`);
        } else if (achievementsData) {
          setAchievements(achievementsData);
        }
      } catch (achievementsFetchError) {
        console.error('Failed to fetch achievements:', achievementsFetchError);
        if (achievementsFetchError instanceof TypeError && achievementsFetchError.message.includes('Failed to fetch')) {
          throw new Error('Network error while loading achievements. Please check your connection.');
        }
        throw achievementsFetchError;
      }

      // Load published blog articles
      try {
        const { data: blogData, error: blogError } = await supabase
          .from('blog_articles')
          .select('*')
          .eq('status', 'published')
          .order('sort_order');
        
        if (blogError) {
          console.error('Error loading blog articles:', blogError);
        } else if (blogData) {
          setBlogArticles(blogData);
        }
      } catch (blogFetchError) {
        console.error('Failed to fetch blog articles:', blogFetchError);
        // Continue with other content even if blog fails
      }

      // Load contact info
      try {
        const { data: contactData, error: contactError } = await supabase
          .from('contact_info')
          .select('*')
          .limit(1)
          .single();
        
        if (contactError && contactError.code !== 'PGRST116') {
          console.error('Error loading contact info:', contactError);
        } else if (contactData) {
          setContactInfo(contactData);
        }
      } catch (contactFetchError) {
        console.error('Failed to fetch contact info:', contactFetchError);
        // Continue with other content even if contact fails
      }

      // Load about content
      try {
        const { data: aboutData, error: aboutError } = await supabase
          .from('about_content')
          .select('*')
          .limit(1)
          .single();
        
        if (aboutError && aboutError.code !== 'PGRST116') {
          console.error('Error loading about content:', aboutError);
        } else if (aboutData) {
          setAboutContent(aboutData);
        }
      } catch (aboutFetchError) {
        console.error('Failed to fetch about content:', aboutFetchError);
        // Continue even if about content fails
      }

    } catch (error) {
      console.error('Failed to load content:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to load content. Please try again later.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    heroContent,
    projects,
    achievements,
    blogArticles,
    contactInfo,
    aboutContent,
    loading,
    error,
    refetch: loadContent
  };
};