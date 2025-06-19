
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

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

const Admin = () => {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      // Redirect to Google OAuth
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/#/admin`
        }
      });
      return;
    }

    // Check if user is authorized admin
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', user.email)
      .single();

    if (!adminUser) {
      toast.error('Unauthorized access');
      await supabase.auth.signOut();
      return;
    }

    setUser(user);
    loadContent();
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
      
      if (projectsData) {
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
      toast.error('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const updateHeroContent = async (updatedHero: Partial<HeroContent>) => {
    if (!heroContent) return;

    try {
      const { error } = await supabase
        .from('hero_content')
        .update(updatedHero)
        .eq('id', heroContent.id);

      if (error) throw error;

      setHeroContent({ ...heroContent, ...updatedHero });
      toast.success('Hero content updated successfully');
    } catch (error) {
      console.error('Error updating hero content:', error);
      toast.error('Failed to update hero content');
    }
  };

  const updateProject = async (projectId: string, updatedProject: Partial<Project>) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update(updatedProject)
        .eq('id', projectId);

      if (error) throw error;

      setProjects(projects.map(p => p.id === projectId ? { ...p, ...updatedProject } : p));
      toast.success('Project updated successfully');
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Authenticating...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <span>Welcome, {user.email}</span>
            <Button onClick={signOut} variant="outline">Sign Out</Button>
          </div>
        </div>

        <Tabs defaultValue="hero" className="space-y-4">
          <TabsList>
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="hero">
            {heroContent && (
              <Card>
                <CardHeader>
                  <CardTitle>Hero Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input
                      value={heroContent.name}
                      onChange={(e) => setHeroContent({ ...heroContent, name: e.target.value })}
                      onBlur={(e) => updateHeroContent({ name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <Input
                      value={heroContent.title}
                      onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })}
                      onBlur={(e) => updateHeroContent({ title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subtitle</label>
                    <Input
                      value={heroContent.subtitle || ''}
                      onChange={(e) => setHeroContent({ ...heroContent, subtitle: e.target.value })}
                      onBlur={(e) => updateHeroContent({ subtitle: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Textarea
                      value={heroContent.description || ''}
                      onChange={(e) => setHeroContent({ ...heroContent, description: e.target.value })}
                      onBlur={(e) => updateHeroContent({ description: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Profile Image URL</label>
                    <Input
                      value={heroContent.profile_image_url || ''}
                      onChange={(e) => setHeroContent({ ...heroContent, profile_image_url: e.target.value })}
                      onBlur={(e) => updateHeroContent({ profile_image_url: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Resume URL</label>
                    <Input
                      value={heroContent.resume_url || ''}
                      onChange={(e) => setHeroContent({ ...heroContent, resume_url: e.target.value })}
                      onBlur={(e) => updateHeroContent({ resume_url: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="projects">
            <div className="space-y-4">
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Title</label>
                        <Input
                          value={project.title}
                          onChange={(e) => {
                            const updatedProjects = projects.map(p => 
                              p.id === project.id ? { ...p, title: e.target.value } : p
                            );
                            setProjects(updatedProjects);
                          }}
                          onBlur={(e) => updateProject(project.id, { title: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Icon</label>
                        <Input
                          value={project.icon}
                          onChange={(e) => {
                            const updatedProjects = projects.map(p => 
                              p.id === project.id ? { ...p, icon: e.target.value } : p
                            );
                            setProjects(updatedProjects);
                          }}
                          onBlur={(e) => updateProject(project.id, { icon: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <Textarea
                        value={project.description}
                        onChange={(e) => {
                          const updatedProjects = projects.map(p => 
                            p.id === project.id ? { ...p, description: e.target.value } : p
                          );
                          setProjects(updatedProjects);
                        }}
                        onBlur={(e) => updateProject(project.id, { description: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Detailed Description</label>
                      <Textarea
                        value={project.detailed_description}
                        onChange={(e) => {
                          const updatedProjects = projects.map(p => 
                            p.id === project.id ? { ...p, detailed_description: e.target.value } : p
                          );
                          setProjects(updatedProjects);
                        }}
                        onBlur={(e) => updateProject(project.id, { detailed_description: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Technologies (comma-separated)</label>
                      <Input
                        value={project.technologies.join(', ')}
                        onChange={(e) => {
                          const techs = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
                          const updatedProjects = projects.map(p => 
                            p.id === project.id ? { ...p, technologies: techs } : p
                          );
                          setProjects(updatedProjects);
                        }}
                        onBlur={(e) => {
                          const techs = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
                          updateProject(project.id, { technologies: techs });
                        }}
                      />
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.technologies.map((tech, idx) => (
                          <Badge key={idx} variant="secondary">{tech}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Impact</label>
                      <Textarea
                        value={project.impact}
                        onChange={(e) => {
                          const updatedProjects = projects.map(p => 
                            p.id === project.id ? { ...p, impact: e.target.value } : p
                          );
                          setProjects(updatedProjects);
                        }}
                        onBlur={(e) => updateProject(project.id, { impact: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Image URL</label>
                      <Input
                        value={project.image_url}
                        onChange={(e) => {
                          const updatedProjects = projects.map(p => 
                            p.id === project.id ? { ...p, image_url: e.target.value } : p
                          );
                          setProjects(updatedProjects);
                        }}
                        onBlur={(e) => updateProject(project.id, { image_url: e.target.value })}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
