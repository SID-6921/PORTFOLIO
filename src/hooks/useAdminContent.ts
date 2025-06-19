
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

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

export const useAdminContent = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [blogArticles, setBlogArticles] = useState<BlogArticle[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);

  const loadAllContent = async () => {
    try {
      setLoading(true);
      
      // Load achievements
      const { data: achievementsData } = await supabase
        .from('achievements')
        .select('*')
        .order('sort_order');
      if (achievementsData) setAchievements(achievementsData);

      // Load blog articles
      const { data: blogData } = await supabase
        .from('blog_articles')
        .select('*')
        .order('sort_order');
      if (blogData) setBlogArticles(blogData);

      // Load contact info
      const { data: contactData } = await supabase
        .from('contact_info')
        .select('*')
        .limit(1)
        .single();
      if (contactData) setContactInfo(contactData);

      // Load about content
      const { data: aboutData } = await supabase
        .from('about_content')
        .select('*')
        .limit(1)
        .single();
      if (aboutData) setAboutContent(aboutData);
    } catch (error) {
      console.error('Failed to load admin content:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllContent();
  }, []);

  return {
    achievements,
    blogArticles,
    contactInfo,
    aboutContent,
    loading,
    refetch: loadAllContent,
    setAchievements,
    setBlogArticles,
    setContactInfo,
    setAboutContent
  };
};
