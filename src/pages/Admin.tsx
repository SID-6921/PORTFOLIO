import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Edit3, Save, X, LogOut, ExternalLink, Github, Mail, Check, MessageSquare } from 'lucide-react';
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
  demo_url?: string;
  github_url?: string;
  sort_order: number;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
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
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
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
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  
  // Edit states
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [editingAchievement, setEditingAchievement] = useState<string | null>(null);
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
    demo_url: '',
    github_url: '',
    sort_order: 0
  });

  const [achievementForm, setAchievementForm] = useState({
    title: '',
    description: '',
    date: '',
    category: '',
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

  // Local state for projects to handle editing
  const [localProjects, setLocalProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      loadAllContent();
      loadContactMessages();
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

  useEffect(() => {
    setLocalProjects(projects);
  }, [projects]);

  const loadContactMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      if (data) setContactMessages(data);
    } catch (error) {
      console.error('Failed to load contact messages:', error);
      toast({
        title: "Error",
        description: "Failed to load contact messages",
        variant: "destructive"
      });
    }
  };

  const loadAllContent = async () => {
    try {
      // Load achievements
      const { data: achievementsData } = await supabase
        .from('achievements')
        .select('*')
        .order('sort_order');
      if (achievementsData) setAchievements(achievementsData);

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

  // Contact messages management
  const markMessageAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status: 'read' })
        .eq('id', id);

      if (error) throw error;
      
      setContactMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === id ? { ...msg, status: 'read' } : msg
        )
      );
      
      toast({
        title: "Success",
        description: "Message marked as read"
      });
    } catch (error) {
      console.error('Error updating message status:', error);
      toast({
        title: "Error",
        description: "Failed to update message status",
        variant: "destructive"
      });
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setContactMessages(prevMessages => 
        prevMessages.filter(msg => msg.id !== id)
      );
      
      toast({
        title: "Success",
        description: "Message deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting message:', error);
      toast({
        title: "Error",
        description: "Failed to delete message",
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
        demo_url: '',
        github_url: '',
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
          demo_url: project.demo_url,
          github_url: project.github_url,
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
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm">
            <TabsTrigger value="hero">
              Hero
            </TabsTrigger>
            <TabsTrigger value="projects">
              Projects
            </TabsTrigger>
            <TabsTrigger value="achievements">
              Achievements
            </TabsTrigger>
            <TabsTrigger value="about">
              About
            </TabsTrigger>
            <TabsTrigger value="contact">
              Contact
            </TabsTrigger>
            <TabsTrigger value="messages" className="relative">
              Messages
              {contactMessages.filter(msg => msg.status === 'unread').length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {contactMessages.filter(msg => msg.status === 'unread').length}
                </span>
              )}
            </TabsTrigger>
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
                      <p><strong>Profile Image:</strong> {heroContent?.profile_image_url}</p>
                      <p><strong>Resume URL:</strong> {heroContent?.resume_url}</p>
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
                    placeholder="Demo URL (e.g., https://example.com)"
                    value={projectForm.demo_url}
                    onChange={(e) => setProjectForm({...projectForm, demo_url: e.target.value})}
                  />
                  <Input
                    placeholder="GitHub URL (e.g., https://github.com/username/repo)"
                    value={projectForm.github_url}
                    onChange={(e) => setProjectForm({...projectForm, github_url: e.target.value})}
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
                {localProjects.map((project) => (
                  <Card key={project.id}>
                    <CardContent className="pt-6">
                      {editingProject === project.id ? (
                        <div className="space-y-4">
                          <Input
                            placeholder="Project Title"
                            value={project.title}
                            onChange={(e) => {
                              const updatedProjects = localProjects.map(p => 
                                p.id === project.id ? {...p, title: e.target.value} : p
                              );
                              setLocalProjects(updatedProjects);
                            }}
                          />
                          <Textarea
                            placeholder="Project Description"
                            value={project.description}
                            onChange={(e) => {
                              const updatedProjects = localProjects.map(p => 
                                p.id === project.id ? {...p, description: e.target.value} : p
                              );
                              setLocalProjects(updatedProjects);
                            }}
                          />
                          <Textarea
                            placeholder="Detailed Description"
                            value={project.detailed_description}
                            onChange={(e) => {
                              const updatedProjects = localProjects.map(p => 
                                p.id === project.id ? {...p, detailed_description: e.target.value} : p
                              );
                              setLocalProjects(updatedProjects);
                            }}
                          />
                          <Input
                            placeholder="Technologies (comma-separated)"
                            value={project.technologies.join(', ')}
                            onChange={(e) => {
                              const updatedProjects = localProjects.map(p => 
                                p.id === project.id ? {...p, technologies: e.target.value.split(',').map(t => t.trim())} : p
                              );
                              setLocalProjects(updatedProjects);
                            }}
                          />
                          <Textarea
                            placeholder="Impact"
                            value={project.impact}
                            onChange={(e) => {
                              const updatedProjects = localProjects.map(p => 
                                p.id === project.id ? {...p, impact: e.target.value} : p
                              );
                              setLocalProjects(updatedProjects);
                            }}
                          />
                          <Input
                            placeholder="Image URL"
                            value={project.image_url}
                            onChange={(e) => {
                              const updatedProjects = localProjects.map(p => 
                                p.id === project.id ? {...p, image_url: e.target.value} : p
                              );
                              setLocalProjects(updatedProjects);
                            }}
                          />
                          <Input
                            placeholder="Icon"
                            value={project.icon}
                            onChange={(e) => {
                              const updatedProjects = localProjects.map(p => 
                                p.id === project.id ? {...p, icon: e.target.value} : p
                              );
                              setLocalProjects(updatedProjects);
                            }}
                          />
                          <Input
                            placeholder="Demo URL (e.g., https://example.com)"
                            value={project.demo_url || ''}
                            onChange={(e) => {
                              const updatedProjects = localProjects.map(p => 
                                p.id === project.id ? {...p, demo_url: e.target.value} : p
                              );
                              setLocalProjects(updatedProjects);
                            }}
                          />
                          <Input
                            placeholder="GitHub URL (e.g., https://github.com/username/repo)"
                            value={project.github_url || ''}
                            onChange={(e) => {
                              const updatedProjects = localProjects.map(p => 
                                p.id === project.id ? {...p, github_url: e.target.value} : p
                              );
                              setLocalProjects(updatedProjects);
                            }}
                          />
                          <Input
                            type="number"
                            placeholder="Sort Order"
                            value={project.sort_order}
                            onChange={(e) => {
                              const updatedProjects = localProjects.map(p => 
                                p.id === project.id ? {...p, sort_order: parseInt(e.target.value)} : p
                              );
                              setLocalProjects(updatedProjects);
                            }}
                          />
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
                                <Badge key={index} variant="secondary" className="mb-1">{tech}</Badge>
                              ))}
                            </div>
                            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                              {project.demo_url && (
                                <a 
                                  href={project.demo_url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                  Demo
                                </a>
                              )}
                              {project.github_url && (
                                <a 
                                  href={project.github_url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 text-gray-700 hover:text-gray-900 hover:underline"
                                >
                                  <Github className="w-3.5 h-3.5" />
                                  GitHub
                                </a>
                              )}
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
                      {editingAchievement === achievement.id ? (
                        <div className="space-y-4">
                          <Input
                            placeholder="Achievement Title"
                            value={achievement.title}
                            onChange={(e) => {
                              const updatedAchievements = achievements.map(a => 
                                a.id === achievement.id ? {...a, title: e.target.value} : a
                              );
                              setAchievements(updatedAchievements);
                            }}
                          />
                          <Textarea
                            placeholder="Achievement Description"
                            value={achievement.description}
                            onChange={(e) => {
                              const updatedAchievements = achievements.map(a => 
                                a.id === achievement.id ? {...a, description: e.target.value} : a
                              );
                              setAchievements(updatedAchievements);
                            }}
                          />
                          <Input
                            type="date"
                            placeholder="Date"
                            value={achievement.date}
                            onChange={(e) => {
                              const updatedAchievements = achievements.map(a => 
                                a.id === achievement.id ? {...a, date: e.target.value} : a
                              );
                              setAchievements(updatedAchievements);
                            }}
                          />
                          <Input
                            placeholder="Category"
                            value={achievement.category}
                            onChange={(e) => {
                              const updatedAchievements = achievements.map(a => 
                                a.id === achievement.id ? {...a, category: e.target.value} : a
                              );
                              setAchievements(updatedAchievements);
                            }}
                          />
                          <Input
                            type="number"
                            placeholder="Sort Order"
                            value={achievement.sort_order}
                            onChange={(e) => {
                              const updatedAchievements = achievements.map(a => 
                                a.id === achievement.id ? {...a, sort_order: parseInt(e.target.value)} : a
                              );
                              setAchievements(updatedAchievements);
                            }}
                          />
                          <div className="flex gap-2">
                            <Button onClick={() => updateAchievement(achievement)}>
                              <Save className="h-4 w-4 mr-2" />
                              Save
                            </Button>
                            <Button variant="outline" onClick={() => setEditingAchievement(null)}>
                              <X className="h-4 w-4 mr-2" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
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
                      )}
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

          {/* Contact Messages Management */}
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Contact Form Messages
                </CardTitle>
                <CardDescription>
                  View and manage messages submitted through the contact form
                </CardDescription>
              </CardHeader>
              <CardContent>
                {contactMessages.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>No messages received yet</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {contactMessages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`border rounded-lg p-6 ${
                          message.status === 'unread' 
                            ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/50' 
                            : 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                              {message.subject}
                              {message.status === 'unread' && (
                                <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                  New
                                </Badge>
                              )}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                              <span className="font-medium">{message.name}</span>
                              <span>•</span>
                              <a 
                                href={`mailto:${message.email}`} 
                                className="text-blue-600 hover:underline flex items-center gap-1"
                              >
                                <Mail className="h-3 w-3" />
                                {message.email}
                              </a>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(message.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md mb-4 whitespace-pre-wrap">
                          {message.message}
                        </div>
                        
                        <div className="flex justify-end gap-2">
                          {message.status === 'unread' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => markMessageAsRead(message.id)}
                              className="flex items-center gap-1"
                            >
                              <Check className="h-4 w-4" />
                              Mark as Read
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(`mailto:${message.email}?subject=Re: ${message.subject}`)}
                            className="flex items-center gap-1"
                          >
                            <Mail className="h-4 w-4" />
                            Reply
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteMessage(message.id)}
                            className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
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