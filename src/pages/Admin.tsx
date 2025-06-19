import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Edit3, Save, X, LogOut } from 'lucide-react';
import { useSupabaseContent } from '@/hooks/useSupabaseContent';
import { useToast } from '@/hooks/use-toast';
import AdminAuth from '@/components/AdminAuth';

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

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const { heroContent, projects, loading, refetch } = useSupabaseContent();
  const { toast } = useToast();
  
  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email === 'elonmuskharrypotter@gmail.com') {
        setIsAuthenticated(true);
        setAdminEmail(session.user.email);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = (email: string) => {
    setIsAuthenticated(true);
    setAdminEmail(email);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setAdminEmail('');
    toast({
      title: "Logged out",
      description: "Successfully signed out of admin panel"
    });
  };

  // State for different content types
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [blogArticles, setBlogArticles] = useState<BlogArticle[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  
  // Edit states
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [editingAchievement, setEditingAchievement] = useState<string | null>(null);
  const [editingBlog, setEditingBlog] = useState<string | null>(null);
  const [editingHero, setEditingHero] = useState(false);
  const [editingContact, setEditingContact] = useState(false);
  const [editingAbout, setEditingAbout] = useState(false);

  // Form states
  const [heroForm, setHeroForm] = useState({
    name: '',
    title: '',
    subtitle: '',
    description: '',
    profile_image_url: '',
    resume_url: ''
  });

  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    detailed_description: '',
    technologies: '',
    impact: '',
    image_url: '',
    icon: '',
    sort_order: 0
  });

  const [achievementForm, setAchievementForm] = useState({
    title: '',
    description: '',
    date: '',
    category: '',
    sort_order: 0
  });

  const [blogForm, setBlogForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    image_url: '',
    published_url: '',
    published_date: '',
    status: 'draft',
    sort_order: 0
  });

  const [contactForm, setContactForm] = useState({
    email: '',
    phone: '',
    location: '',
    social_links: '{}'
  });

  const [aboutForm, setAboutForm] = useState({
    content: '',
    skills: '{}'
  });

  useEffect(() => {
    if (isAuthenticated) {
      loadAllContent();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (heroContent) {
      setHeroForm({
        name: heroContent.name || '',
        title: heroContent.title || '',
        subtitle: heroContent.subtitle || '',
        description: heroContent.description || '',
        profile_image_url: heroContent.profile_image_url || '',
        resume_url: heroContent.resume_url || ''
      });
    }
  }, [heroContent]);

  const loadAllContent = async () => {
    try {
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
      if (contactData) {
        setContactInfo(contactData);
        setContactForm({
          email: contactData.email || '',
          phone: contactData.phone || '',
          location: contactData.location || '',
          social_links: JSON.stringify(contactData.social_links || {})
        });
      }

      // Load about content
      const { data: aboutData } = await supabase
        .from('about_content')
        .select('*')
        .limit(1)
        .single();
      if (aboutData) {
        setAboutContent(aboutData);
        setAboutForm({
          content: aboutData.content || '',
          skills: JSON.stringify(aboutData.skills || {})
        });
      }
    } catch (error) {
      console.error('Failed to load content:', error);
      toast({
        title: "Error",
        description: "Failed to load content",
        variant: "destructive"
      });
    }
  };

  // Hero content management
  const updateHeroContent = async () => {
    try {
      const { error } = await supabase
        .from('hero_content')
        .update(heroForm)
        .eq('id', heroContent?.id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Hero content updated successfully"
      });
      setEditingHero(false);
      refetch();
    } catch (error) {
      console.error('Error updating hero content:', error);
      toast({
        title: "Error",
        description: "Failed to update hero content",
        variant: "destructive"
      });
    }
  };

  // Project management
  const addProject = async () => {
    try {
      const { error } = await supabase
        .from('projects')
        .insert([{
          ...projectForm,
          technologies: JSON.parse(`[${projectForm.technologies.split(',').map(t => `"${t.trim()}"`).join(',')}]`)
        }]);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Project added successfully"
      });
      setProjectForm({
        title: '',
        description: '',
        detailed_description: '',
        technologies: '',
        impact: '',
        image_url: '',
        icon: '',
        sort_order: 0
      });
      refetch();
    } catch (error) {
      console.error('Error adding project:', error);
      toast({
        title: "Error",
        description: "Failed to add project",
        variant: "destructive"
      });
    }
  };

  const updateProject = async (project: Project) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({
          title: project.title,
          description: project.description,
          detailed_description: project.detailed_description,
          technologies: project.technologies,
          impact: project.impact,
          image_url: project.image_url,
          icon: project.icon,
          sort_order: project.sort_order
        })
        .eq('id', project.id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Project updated successfully"
      });
      setEditingProject(null);
      refetch();
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive"
      });
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Project deleted successfully"
      });
      refetch();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive"
      });
    }
  };

  // Achievement management
  const addAchievement = async () => {
    try {
      const { error } = await supabase
        .from('achievements')
        .insert([achievementForm]);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Achievement added successfully"
      });
      setAchievementForm({
        title: '',
        description: '',
        date: '',
        category: '',
        sort_order: 0
      });
      loadAllContent();
    } catch (error) {
      console.error('Error adding achievement:', error);
      toast({
        title: "Error",
        description: "Failed to add achievement",
        variant: "destructive"
      });
    }
  };

  const updateAchievement = async (achievement: Achievement) => {
    try {
      const { error } = await supabase
        .from('achievements')
        .update(achievement)
        .eq('id', achievement.id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Achievement updated successfully"
      });
      setEditingAchievement(null);
      loadAllContent();
    } catch (error) {
      console.error('Error updating achievement:', error);
      toast({
        title: "Error",
        description: "Failed to update achievement",
        variant: "destructive"
      });
    }
  };

  const deleteAchievement = async (id: string) => {
    try {
      const { error } = await supabase
        .from('achievements')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Achievement deleted successfully"
      });
      loadAllContent();
    } catch (error) {
      console.error('Error deleting achievement:', error);
      toast({
        title: "Error",
        description: "Failed to delete achievement",
        variant: "destructive"
      });
    }
  };

  // Blog management
  const addBlogArticle = async () => {
    try {
      const { error } = await supabase
        .from('blog_articles')
        .insert([blogForm]);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Blog article added successfully"
      });
      setBlogForm({
        title: '',
        excerpt: '',
        content: '',
        image_url: '',
        published_url: '',
        published_date: '',
        status: 'draft',
        sort_order: 0
      });
      loadAllContent();
    } catch (error) {
      console.error('Error adding blog article:', error);
      toast({
        title: "Error",
        description: "Failed to add blog article",
        variant: "destructive"
      });
    }
  };

  const updateBlogArticle = async (article: BlogArticle) => {
    try {
      const { error } = await supabase
        .from('blog_articles')
        .update(article)
        .eq('id', article.id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Blog article updated successfully"
      });
      setEditingBlog(null);
      loadAllContent();
    } catch (error) {
      console.error('Error updating blog article:', error);
      toast({
        title: "Error",
        description: "Failed to update blog article",
        variant: "destructive"
      });
    }
  };

  const deleteBlogArticle = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_articles')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Blog article deleted successfully"
      });
      loadAllContent();
    } catch (error) {
      console.error('Error deleting blog article:', error);
      toast({
        title: "Error",
        description: "Failed to delete blog article",
        variant: "destructive"
      });
    }
  };

  // Contact info management
  const updateContactInfo = async () => {
    try {
      const updateData = {
        ...contactForm,
        social_links: JSON.parse(contactForm.social_links)
      };

      const { error } = await supabase
        .from('contact_info')
        .update(updateData)
        .eq('id', contactInfo?.id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Contact info updated successfully"
      });
      setEditingContact(false);
      loadAllContent();
    } catch (error) {
      console.error('Error updating contact info:', error);
      toast({
        title: "Error",
        description: "Failed to update contact info",
        variant: "destructive"
      });
    }
  };

  // About content management
  const updateAboutContent = async () => {
    try {
      const updateData = {
        ...aboutForm,
        skills: JSON.parse(aboutForm.skills)
      };

      if (aboutContent) {
        const { error } = await supabase
          .from('about_content')
          .update(updateData)
          .eq('id', aboutContent.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('about_content')
          .insert([updateData]);
        if (error) throw error;
      }
      
      toast({
        title: "Success",
        description: "About content updated successfully"
      });
      setEditingAbout(false);
      loadAllContent();
    } catch (error) {
      console.error('Error updating about content:', error);
      toast({
        title: "Error",
        description: "Failed to update about content",
        variant: "destructive"
      });
    }
  };

  if (!isAuthenticated) {
    return <AdminAuth onLogin={handleLogin} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-lg text-slate-600">Loading admin panel...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Admin Panel</h1>
            <p className="text-slate-600 text-sm">Welcome, {adminEmail}</p>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8">
        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white shadow-sm">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          {/* Hero Content Management */}
          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>Manage the main hero section content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {editingHero ? (
                  <>
                    <Input
                      placeholder="Name"
                      value={heroForm.name}
                      onChange={(e) => setHeroForm({...heroForm, name: e.target.value})}
                    />
                    <Input
                      placeholder="Title"
                      value={heroForm.title}
                      onChange={(e) => setHeroForm({...heroForm, title: e.target.value})}
                    />
                    <Input
                      placeholder="Subtitle"
                      value={heroForm.subtitle}
                      onChange={(e) => setHeroForm({...heroForm, subtitle: e.target.value})}
                    />
                    <Textarea
                      placeholder="Description"
                      value={heroForm.description}
                      onChange={(e) => setHeroForm({...heroForm, description: e.target.value})}
                    />
                    <Input
                      placeholder="Profile Image URL"
                      value={heroForm.profile_image_url}
                      onChange={(e) => setHeroForm({...heroForm, profile_image_url: e.target.value})}
                    />
                    <Input
                      placeholder="Resume URL"
                      value={heroForm.resume_url}
                      onChange={(e) => setHeroForm({...heroForm, resume_url: e.target.value})}
                    />
                    <div className="flex gap-2">
                      <Button onClick={updateHeroContent}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" onClick={() => setEditingHero(false)}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <p><strong>Name:</strong> {heroContent?.name}</p>
                      <p><strong>Title:</strong> {heroContent?.title}</p>
                      <p><strong>Subtitle:</strong> {heroContent?.subtitle}</p>
                      <p><strong>Description:</strong> {heroContent?.description}</p>
                    </div>
                    <Button onClick={() => setEditingHero(true)}>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Hero Content
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Management */}
          <TabsContent value="projects">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Project</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Project Title"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                  />
                  <Textarea
                    placeholder="Project Description"
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                  />
                  <Textarea
                    placeholder="Detailed Description"
                    value={projectForm.detailed_description}
                    onChange={(e) => setProjectForm({...projectForm, detailed_description: e.target.value})}
                  />
                  <Input
                    placeholder="Technologies (comma-separated)"
                    value={projectForm.technologies}
                    onChange={(e) => setProjectForm({...projectForm, technologies: e.target.value})}
                  />
                  <Textarea
                    placeholder="Impact"
                    value={projectForm.impact}
                    onChange={(e) => setProjectForm({...projectForm, impact: e.target.value})}
                  />
                  <Input
                    placeholder="Image URL"
                    value={projectForm.image_url}
                    onChange={(e) => setProjectForm({...projectForm, image_url: e.target.value})}
                  />
                  <Input
                    placeholder="Icon"
                    value={projectForm.icon}
                    onChange={(e) => setProjectForm({...projectForm, icon: e.target.value})}
                  />
                  <Input
                    type="number"
                    placeholder="Sort Order"
                    value={projectForm.sort_order}
                    onChange={(e) => setProjectForm({...projectForm, sort_order: parseInt(e.target.value)})}
                  />
                  <Button onClick={addProject}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Project
                  </Button>
                </CardContent>
              </Card>

              <div className="grid gap-4">
                {projects.map((project) => (
                  <Card key={project.id}>
                    <CardContent className="pt-6">
                      {editingProject === project.id ? (
                        <div className="space-y-4">
                          <Input
                            value={project.title}
                            onChange={(e) => {
                              const updatedProjects = projects.map(p => 
                                p.id === project.id ? {...p, title: e.target.value} : p
                              );
                              // Update local state for immediate UI feedback
                            }}
                          />
                          {/* Add more editable fields as needed */}
                          <div className="flex gap-2">
                            <Button onClick={() => updateProject(project)}>
                              <Save className="h-4 w-4 mr-2" />
                              Save
                            </Button>
                            <Button variant="outline" onClick={() => setEditingProject(null)}>
                              <X className="h-4 w-4 mr-2" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold">{project.title}</h3>
                            <p className="text-gray-600 mb-2">{project.description}</p>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {project.technologies.map((tech, index) => (
                                <Badge key={index} variant="secondary">{tech}</Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingProject(project.id)}
                            >
                              <Edit3 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteProject(project.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Achievements Management */}
          <TabsContent value="achievements">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Achievement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Achievement Title"
                    value={achievementForm.title}
                    onChange={(e) => setAchievementForm({...achievementForm, title: e.target.value})}
                  />
                  <Textarea
                    placeholder="Achievement Description"
                    value={achievementForm.description}
                    onChange={(e) => setAchievementForm({...achievementForm, description: e.target.value})}
                  />
                  <Input
                    type="date"
                    placeholder="Date"
                    value={achievementForm.date}
                    onChange={(e) => setAchievementForm({...achievementForm, date: e.target.value})}
                  />
                  <Input
                    placeholder="Category"
                    value={achievementForm.category}
                    onChange={(e) => setAchievementForm({...achievementForm, category: e.target.value})}
                  />
                  <Input
                    type="number"
                    placeholder="Sort Order"
                    value={achievementForm.sort_order}
                    onChange={(e) => setAchievementForm({...achievementForm, sort_order: parseInt(e.target.value)})}
                  />
                  <Button onClick={addAchievement}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Achievement
                  </Button>
                </CardContent>
              </Card>

              <div className="grid gap-4">
                {achievements.map((achievement) => (
                  <Card key={achievement.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold">{achievement.title}</h3>
                          <p className="text-gray-600 mb-2">{achievement.description}</p>
                          <div className="flex gap-4 text-sm text-gray-500">
                            <span>Date: {achievement.date}</span>
                            <span>Category: {achievement.category}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingAchievement(achievement.id)}
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteAchievement(achievement.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Blog Management */}
          <TabsContent value="blog">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Blog Article</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Article Title"
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({...blogForm, title: e.target.value})}
                  />
                  <Textarea
                    placeholder="Article Excerpt"
                    value={blogForm.excerpt}
                    onChange={(e) => setBlogForm({...blogForm, excerpt: e.target.value})}
                  />
                  <Textarea
                    placeholder="Article Content"
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({...blogForm, content: e.target.value})}
                  />
                  <Input
                    placeholder="Image URL"
                    value={blogForm.image_url}
                    onChange={(e) => setBlogForm({...blogForm, image_url: e.target.value})}
                  />
                  <Input
                    placeholder="Published URL"
                    value={blogForm.published_url}
                    onChange={(e) => setBlogForm({...blogForm, published_url: e.target.value})}
                  />
                  <Input
                    type="date"
                    placeholder="Published Date"
                    value={blogForm.published_date}
                    onChange={(e) => setBlogForm({...blogForm, published_date: e.target.value})}
                  />
                  <select
                    value={blogForm.status}
                    onChange={(e) => setBlogForm({...blogForm, status: e.target.value})}
                    className="w-full p-2 border rounded"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                  <Button onClick={addBlogArticle}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Article
                  </Button>
                </CardContent>
              </Card>

              <div className="grid gap-4">
                {blogArticles.map((article) => (
                  <Card key={article.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold">{article.title}</h3>
                          <p className="text-gray-600 mb-2">{article.excerpt}</p>
                          <div className="flex gap-4 text-sm text-gray-500">
                            <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                              {article.status}
                            </Badge>
                            <span>Date: {article.published_date}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingBlog(article.id)}
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteBlogArticle(article.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* About Content Management */}
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About Section</CardTitle>
                <CardDescription>Manage the about section content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {editingAbout ? (
                  <>
                    <Textarea
                      placeholder="About Content"
                      value={aboutForm.content}
                      onChange={(e) => setAboutForm({...aboutForm, content: e.target.value})}
                      rows={10}
                    />
                    <Textarea
                      placeholder="Skills (JSON format)"
                      value={aboutForm.skills}
                      onChange={(e) => setAboutForm({...aboutForm, skills: e.target.value})}
                      rows={5}
                    />
                    <div className="flex gap-2">
                      <Button onClick={updateAboutContent}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" onClick={() => setEditingAbout(false)}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <p><strong>Content:</strong></p>
                      <p className="text-gray-600">{aboutContent?.content || 'No content available'}</p>
                    </div>
                    <Button onClick={() => setEditingAbout(true)}>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit About Content
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Info Management */}
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Manage contact information and social links</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {editingContact ? (
                  <>
                    <Input
                      placeholder="Email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    />
                    <Input
                      placeholder="Phone"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                    />
                    <Input
                      placeholder="Location"
                      value={contactForm.location}
                      onChange={(e) => setContactForm({...contactForm, location: e.target.value})}
                    />
                    <Textarea
                      placeholder="Social Links (JSON format)"
                      value={contactForm.social_links}
                      onChange={(e) => setContactForm({...contactForm, social_links: e.target.value})}
                      rows={5}
                    />
                    <div className="flex gap-2">
                      <Button onClick={updateContactInfo}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" onClick={() => setEditingContact(false)}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <p><strong>Email:</strong> {contactInfo?.email}</p>
                      <p><strong>Phone:</strong> {contactInfo?.phone || 'Not provided'}</p>
                      <p><strong>Location:</strong> {contactInfo?.location}</p>
                    </div>
                    <Button onClick={() => setEditingContact(true)}>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Contact Info
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
