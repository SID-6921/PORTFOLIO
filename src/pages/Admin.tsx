
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Edit } from 'lucide-react';

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
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState<Partial<Project>>({});

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Redirect to Google OAuth
        await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/admin`
          }
        });
        return;
      }

      // Check if user is authorized
      const { data: adminUser } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', user.email)
        .single();

      if (!adminUser) {
        alert('Access denied. Only authorized users can access this panel.');
        await supabase.auth.signOut();
        return;
      }

      setUser(user);
      loadContent();
    } catch (error) {
      console.error('Auth error:', error);
      setLoading(false);
    }
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
        // Transform the data to match our interface
        const transformedProjects: Project[] = projectsData.map(project => ({
          id: project.id,
          title: project.title,
          description: project.description,
          detailed_description: project.detailed_description || '',
          technologies: Array.isArray(project.technologies) ? project.technologies : [],
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

  const updateHeroContent = async (updates: Partial<HeroContent>) => {
    if (!heroContent) return;

    try {
      const { error } = await supabase
        .from('hero_content')
        .update(updates)
        .eq('id', heroContent.id);

      if (error) throw error;
      
      setHeroContent({ ...heroContent, ...updates });
      alert('Hero content updated successfully!');
    } catch (error) {
      console.error('Error updating hero content:', error);
      alert('Failed to update hero content');
    }
  };

  const saveProject = async (project: Partial<Project>) => {
    try {
      if (project.id) {
        // Update existing project
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
      } else {
        // Create new project
        const { error } = await supabase
          .from('projects')
          .insert({
            title: project.title,
            description: project.description,
            detailed_description: project.detailed_description,
            technologies: project.technologies,
            impact: project.impact,
            image_url: project.image_url,
            icon: project.icon,
            sort_order: project.sort_order || 0,
            status: 'active'
          });

        if (error) throw error;
      }

      loadContent();
      setEditingProject(null);
      setNewProject({});
      alert('Project saved successfully!');
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project');
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      loadContent();
      alert('Project deleted successfully!');
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project');
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Redirecting to login...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <span>Welcome, {user.email}</span>
            <Button onClick={handleSignOut} variant="outline">Sign Out</Button>
          </div>
        </div>

        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList>
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="hero">
            {heroContent && (
              <Card>
                <CardHeader>
                  <CardTitle>Hero Section Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={heroContent.name}
                      onChange={(e) => setHeroContent({ ...heroContent, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={heroContent.title}
                      onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="subtitle">Subtitle</Label>
                    <Input
                      id="subtitle"
                      value={heroContent.subtitle || ''}
                      onChange={(e) => setHeroContent({ ...heroContent, subtitle: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={heroContent.description || ''}
                      onChange={(e) => setHeroContent({ ...heroContent, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="profile_image_url">Profile Image URL</Label>
                    <Input
                      id="profile_image_url"
                      value={heroContent.profile_image_url || ''}
                      onChange={(e) => setHeroContent({ ...heroContent, profile_image_url: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="resume_url">Resume URL</Label>
                    <Input
                      id="resume_url"
                      value={heroContent.resume_url || ''}
                      onChange={(e) => setHeroContent({ ...heroContent, resume_url: e.target.value })}
                    />
                  </div>
                  <Button onClick={() => updateHeroContent(heroContent)}>
                    Update Hero Content
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="projects">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Projects</h2>
                <Button onClick={() => setEditingProject({} as Project)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </div>

              {/* Projects List */}
              <div className="grid gap-4">
                {projects.map((project) => (
                  <Card key={project.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{project.title}</h3>
                          <p className="text-gray-600 mb-2">{project.description}</p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {project.technologies.map((tech, index) => (
                              <Badge key={index} variant="secondary">{tech}</Badge>
                            ))}
                          </div>
                          <p className="text-sm text-gray-500">{project.impact}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingProject(project)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteProject(project.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Edit/Add Project Modal */}
              {editingProject && (
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle>
                      {editingProject.id ? 'Edit Project' : 'Add New Project'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="project_title">Title</Label>
                      <Input
                        id="project_title"
                        value={editingProject.title || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="project_description">Description</Label>
                      <Textarea
                        id="project_description"
                        value={editingProject.description || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="project_detailed_description">Detailed Description</Label>
                      <Textarea
                        id="project_detailed_description"
                        value={editingProject.detailed_description || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, detailed_description: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="project_technologies">Technologies (comma-separated)</Label>
                      <Input
                        id="project_technologies"
                        value={editingProject.technologies?.join(', ') || ''}
                        onChange={(e) => setEditingProject({ 
                          ...editingProject, 
                          technologies: e.target.value.split(',').map(t => t.trim()) 
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="project_impact">Impact</Label>
                      <Textarea
                        id="project_impact"
                        value={editingProject.impact || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, impact: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="project_image_url">Image URL</Label>
                      <Input
                        id="project_image_url"
                        value={editingProject.image_url || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, image_url: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="project_icon">Icon</Label>
                      <Input
                        id="project_icon"
                        value={editingProject.icon || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, icon: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="project_sort_order">Sort Order</Label>
                      <Input
                        id="project_sort_order"
                        type="number"
                        value={editingProject.sort_order || 0}
                        onChange={(e) => setEditingProject({ ...editingProject, sort_order: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => saveProject(editingProject)}>
                        Save Project
                      </Button>
                      <Button variant="outline" onClick={() => setEditingProject(null)}>
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
