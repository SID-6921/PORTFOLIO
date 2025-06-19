
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Save, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminUser {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
}

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

export default function Admin() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Check if user is authorized admin
        const { data: adminUser, error } = await supabase
          .from('admin_users')
          .select('*')
          .eq('email', session.user.email)
          .single();

        if (error || !adminUser) {
          await supabase.auth.signOut();
          toast({
            title: "Access Denied",
            description: "You are not authorized to access this admin panel.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        setUser({
          id: adminUser.id,
          email: adminUser.email,
          name: session.user.user_metadata?.full_name || adminUser.name || 'Admin',
          avatar_url: session.user.user_metadata?.avatar_url || adminUser.avatar_url || '',
        });

        // Update last login
        await supabase
          .from('admin_users')
          .update({ 
            last_login: new Date().toISOString(),
            name: session.user.user_metadata?.full_name,
            avatar_url: session.user.user_metadata?.avatar_url,
            google_id: session.user.id
          })
          .eq('email', session.user.email);

        loadContent();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
    setLoading(false);
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/admin`
        }
      });
      if (error) throw error;
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

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
        .order('sort_order');
      
      if (projectsData) setProjects(projectsData);
    } catch (error) {
      console.error('Failed to load content:', error);
    }
  };

  const saveHeroContent = async () => {
    if (!heroContent) return;
    
    try {
      const { error } = await supabase
        .from('hero_content')
        .upsert(heroContent);
      
      if (error) throw error;
      
      toast({
        title: "Hero content saved",
        description: "Changes have been applied to the website.",
      });
    } catch (error) {
      toast({
        title: "Save failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const saveProject = async (project: Project) => {
    try {
      const { error } = await supabase
        .from('projects')
        .upsert(project);
      
      if (error) throw error;
      
      toast({
        title: "Project saved",
        description: "Changes have been applied to the website.",
      });
      loadContent();
    } catch (error) {
      toast({
        title: "Save failed",
        description: "Please try again.",
        variant: "destructive",
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
        title: "Project deleted",
        description: "Project has been removed from the website.",
      });
      loadContent();
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const addNewProject = () => {
    const newProject: Project = {
      id: '',
      title: 'New Project',
      description: 'Project description',
      detailed_description: 'Detailed project description',
      technologies: ['Technology'],
      impact: 'Project impact',
      image_url: '/placeholder.svg',
      icon: 'Microscope',
      sort_order: projects.length + 1
    };
    setProjects([...projects, newProject]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading admin panel...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-96">
          <CardHeader className="text-center">
            <CardTitle>Admin Panel Access</CardTitle>
            <p className="text-sm text-gray-600">Sign in with your authorized Google account</p>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={signInWithGoogle} className="w-full">
              Sign in with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Portfolio Admin Panel</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img src={user.avatar_url} alt={user.name} className="w-8 h-8 rounded-full" />
              <span>{user.name}</span>
            </div>
            <Button onClick={signOut} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList>
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="blog">Blog Articles</TabsTrigger>
            <TabsTrigger value="contact">Contact Info</TabsTrigger>
          </TabsList>

          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {heroContent && (
                  <>
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={heroContent.name}
                        onChange={(e) => setHeroContent({...heroContent, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={heroContent.title}
                        onChange={(e) => setHeroContent({...heroContent, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="subtitle">Subtitle</Label>
                      <Input
                        id="subtitle"
                        value={heroContent.subtitle || ''}
                        onChange={(e) => setHeroContent({...heroContent, subtitle: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={heroContent.description || ''}
                        onChange={(e) => setHeroContent({...heroContent, description: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="profile_image">Profile Image URL</Label>
                      <Input
                        id="profile_image"
                        value={heroContent.profile_image_url || ''}
                        onChange={(e) => setHeroContent({...heroContent, profile_image_url: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="resume_url">Resume URL</Label>
                      <Input
                        id="resume_url"
                        value={heroContent.resume_url || ''}
                        onChange={(e) => setHeroContent({...heroContent, resume_url: e.target.value})}
                      />
                    </div>
                    <Button onClick={saveHeroContent}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Hero Content
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Projects Management</h2>
                <Button onClick={addNewProject}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Project
                </Button>
              </div>
              
              {projects.map((project, index) => (
                <Card key={project.id || index}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>{project.title}</CardTitle>
                      <Button
                        onClick={() => deleteProject(project.id)}
                        variant="destructive"
                        size="sm"
                        disabled={!project.id}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={project.title}
                        onChange={(e) => {
                          const updated = [...projects];
                          updated[index] = {...project, title: e.target.value};
                          setProjects(updated);
                        }}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={project.description}
                        onChange={(e) => {
                          const updated = [...projects];
                          updated[index] = {...project, description: e.target.value};
                          setProjects(updated);
                        }}
                      />
                    </div>
                    <div>
                      <Label>Detailed Description</Label>
                      <Textarea
                        value={project.detailed_description}
                        onChange={(e) => {
                          const updated = [...projects];
                          updated[index] = {...project, detailed_description: e.target.value};
                          setProjects(updated);
                        }}
                      />
                    </div>
                    <div>
                      <Label>Technologies (comma-separated)</Label>
                      <Input
                        value={project.technologies.join(', ')}
                        onChange={(e) => {
                          const updated = [...projects];
                          updated[index] = {...project, technologies: e.target.value.split(', ').map(t => t.trim())};
                          setProjects(updated);
                        }}
                      />
                    </div>
                    <div>
                      <Label>Impact</Label>
                      <Textarea
                        value={project.impact}
                        onChange={(e) => {
                          const updated = [...projects];
                          updated[index] = {...project, impact: e.target.value};
                          setProjects(updated);
                        }}
                      />
                    </div>
                    <div>
                      <Label>Image URL</Label>
                      <Input
                        value={project.image_url}
                        onChange={(e) => {
                          const updated = [...projects];
                          updated[index] = {...project, image_url: e.target.value};
                          setProjects(updated);
                        }}
                      />
                    </div>
                    <div>
                      <Label>Icon</Label>
                      <select
                        value={project.icon}
                        onChange={(e) => {
                          const updated = [...projects];
                          updated[index] = {...project, icon: e.target.value};
                          setProjects(updated);
                        }}
                        className="w-full p-2 border rounded"
                      >
                        <option value="Microscope">Microscope</option>
                        <option value="TestTube">TestTube</option>
                        <option value="Axis3d">Axis3d</option>
                      </select>
                    </div>
                    <Button onClick={() => saveProject(project)}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Project
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="blog">
            <Card>
              <CardHeader>
                <CardTitle>Blog Articles Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Blog article management will be implemented here. Currently using Medium RSS feed.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Contact information management will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
