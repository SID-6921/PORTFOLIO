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

      // Enhanced Supabase connection test with better error handling
      try {
        console.log('Testing Supabase connection...');
        const { data, error: connectionError } = await supabase
          .from('achievements')
          .select('count')
          .limit(1);
        
        if (connectionError) {
          console.error('Supabase connection test failed:', connectionError);
          throw new Error(`Database connection failed: ${connectionError.message}`);
        }
        
        console.log('Supabase connection successful');
      } catch (fetchError) {
        console.error('Network connectivity test failed:', fetchError);
        
        if (fetchError instanceof TypeError && fetchError.message.includes('Failed to fetch')) {
          const detailedError = `
            Network connection failed. This could be due to:
            1. No internet connection
            2. CORS configuration issue - ensure your development URL (${window.location.origin}) is added to Supabase CORS settings
            3. Incorrect Supabase URL or API key
            4. Supabase project is paused or inactive
            
            Please check:
            - Your internet connection
            - Supabase project status at https://supabase.com/dashboard
            - CORS settings in your Supabase project (Project Settings > API > Web origins)
          `;
          throw new Error(detailedError);
        }
        throw fetchError;
      }

      // Load hero content with improved error handling
      try {
        console.log('Loading hero content...');
        const { data: heroData, error: heroError } = await supabase
          .from('hero_content')
          .select('*')
          .limit(1)
          .single();
        
        if (heroError && heroError.code !== 'PGRST116') {
          console.error('Error loading hero content:', heroError);
          // Use fallback content if database fails
          setHeroContent({
            id: 'fallback',
            name: 'Siddhardha Nanda',
            title: 'Engineer. Innovator. Purpose-Driven Technologist.',
            subtitle: 'Looking for opportunities',
            description: 'Pioneering at the intersection of med-tech, embedded systems, and digital health. Clinical precision. Creative innovation.',
            profile_image_url: 'https://res.cloudinary.com/dae56bvjp/image/upload/v1750852722/nanda_wbgmag.jpg',
            resume_url: 'https://drive.google.com/file/d/your-resume-file-id/view'
          });
        } else if (heroData) {
          // Ensure the image URL is properly set
          if (!heroData.profile_image_url || heroData.profile_image_url.includes('/public/lovable-uploads/')) {
            heroData.profile_image_url = 'https://res.cloudinary.com/dae56bvjp/image/upload/v1750852722/nanda_wbgmag.jpg';
          }
          setHeroContent(heroData);
          console.log('Hero content loaded successfully');
        }
      } catch (heroFetchError) {
        console.error('Failed to fetch hero content:', heroFetchError);
        // Set fallback content if fetch fails
        setHeroContent({
          id: 'fallback',
          name: 'Siddhardha Nanda',
          title: 'Engineer. Innovator. Purpose-Driven Technologist.',
          subtitle: 'Looking for opportunities',
          description: 'Pioneering at the intersection of med-tech, embedded systems, and digital health. Clinical precision. Creative innovation.',
          profile_image_url: 'https://res.cloudinary.com/dae56bvjp/image/upload/v1750852722/nanda_wbgmag.jpg',
          resume_url: 'https://drive.google.com/file/d/your-resume-file-id/view'
        });
      }

      // Load projects with enhanced error handling
      try {
        console.log('Loading projects...');
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .eq('status', 'active')
          .order('sort_order');
        
        if (projectsError) {
          console.error('Error loading projects:', projectsError);
          throw new Error(`Failed to load projects: ${projectsError.message}`);
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
          console.log(`Loaded ${transformedProjects.length} projects successfully`);
        }
      } catch (projectsFetchError) {
        console.error('Failed to fetch projects:', projectsFetchError);
        if (projectsFetchError instanceof TypeError && projectsFetchError.message.includes('Failed to fetch')) {
          throw new Error('Network error while loading projects. Please check your connection and CORS settings.');
        }
        throw projectsFetchError;
      }

      // Load achievements with better error handling
      try {
        console.log('Loading achievements...');
        const { data: achievementsData, error: achievementsError } = await supabase
          .from('achievements')
          .select('*')
          .order('sort_order');
        
        if (achievementsError) {
          console.error('Error loading achievements:', achievementsError);
          throw new Error(`Failed to load achievements: ${achievementsError.message}`);
        } else if (achievementsData) {
          setAchievements(achievementsData);
          console.log(`Loaded ${achievementsData.length} achievements successfully`);
        }
      } catch (achievementsFetchError) {
        console.error('Failed to fetch achievements:', achievementsFetchError);
        if (achievementsFetchError instanceof TypeError && achievementsFetchError.message.includes('Failed to fetch')) {
          throw new Error('Network error while loading achievements. Please check your connection and CORS settings.');
        }
        throw achievementsFetchError;
      }

      // Load published blog articles
      try {
        console.log('Loading blog articles...');
        const { data: blogData, error: blogError } = await supabase
          .from('blog_articles')
          .select('*')
          .eq('status', 'published')
          .order('sort_order');
        
        if (blogError) {
          console.error('Error loading blog articles:', blogError);
        } else if (blogData) {
          setBlogArticles(blogData);
          console.log(`Loaded ${blogData.length} blog articles successfully`);
        }
      } catch (blogFetchError) {
        console.error('Failed to fetch blog articles:', blogFetchError);
        // Continue with other content even if blog fails
      }

      // Load contact info
      try {
        console.log('Loading contact info...');
        const { data: contactData, error: contactError } = await supabase
          .from('contact_info')
          .select('*')
          .limit(1)
          .single();
        
        if (contactError && contactError.code !== 'PGRST116') {
          console.error('Error loading contact info:', contactError);
        } else if (contactData) {
          setContactInfo(contactData);
          console.log('Contact info loaded successfully');
        }
      } catch (contactFetchError) {
        console.error('Failed to fetch contact info:', contactFetchError);
        // Continue with other content even if contact fails
      }

      // Load about content
      try {
        console.log('Loading about content...');
        const { data: aboutData, error: aboutError } = await supabase
          .from('about_content')
          .select('*')
          .limit(1)
          .single();
        
        if (aboutError && aboutError.code !== 'PGRST116') {
          console.error('Error loading about content:', aboutError);
        } else if (aboutData) {
          setAboutContent(aboutData);
          console.log('About content loaded successfully');
        }
      } catch (aboutFetchError) {
        console.error('Failed to fetch about content:', aboutFetchError);
        // Continue even if about content fails
      }

      console.log('All content loading completed');

    } catch (error) {
      console.error('Failed to load content:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to load content. Please try again later.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }
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