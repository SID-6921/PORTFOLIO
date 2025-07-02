
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Lock, Mail, AtSign, KeyRound } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';

interface AdminAuthProps {
  onLogin: (email: string) => void;
}

const AdminAuth = ({ onLogin }: AdminAuthProps) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMethod, setAuthMethod] = useState<'google' | 'email'>('google');
  const { toast } = useToast();

  const AUTHORIZED_EMAIL = 'elonmuskharrypotter@gmail.com';

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email === AUTHORIZED_EMAIL) {
        onLogin(session.user.email);
      }
    };
    checkUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user?.email === AUTHORIZED_EMAIL) {
        onLogin(session.user.email);
        toast({
          title: "Success",
          description: "Admin access granted"
        });
      } else if (event === 'SIGNED_IN' && session?.user?.email !== AUTHORIZED_EMAIL) {
        // Sign out unauthorized user
        supabase.auth.signOut();
        toast({
          title: "Access Denied",
          description: "You are not authorized to access the admin panel",
          variant: "destructive"
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [onLogin, toast]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email !== AUTHORIZED_EMAIL) {
      toast({
        title: "Access Denied",
        description: "You are not authorized to access the admin panel",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      } else if (data.user) {
        toast({
          title: "Success",
          description: "Logged in successfully"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Authentication failed",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/admin`
        }
      });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to sign in with Google",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Authentication failed",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMethod = () => {
    setAuthMethod(authMethod === 'google' ? 'email' : 'google');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-8">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto mb-6 w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-slate-800 mb-2">Admin Portal</CardTitle>
          <p className="text-slate-600 text-lg">Secure access required</p>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <div className="space-y-4">
            <div className="flex justify-center mb-4">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  onClick={() => setAuthMethod('google')}
                  className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                    authMethod === 'google' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Google
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod('email')}
                  className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                    authMethod === 'email' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Email
                </button>
              </div>
            </div>

            {authMethod === 'google' ? (
              <Button 
                onClick={handleGoogleLogin}
                className="w-full h-12 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm text-base font-medium"
                disabled={loading}
              >
                <div className="flex items-center justify-center space-x-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>{loading ? 'Signing in...' : 'Sign in with Google'}</span>
                </div>
              </Button>
            ) : (
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <AtSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Admin Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12"
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign in with Email'}
                </Button>
              </form>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">Access Restriction</p>
                  <p className="text-xs text-blue-700">
                    Only authorized email addresses can access the admin panel. 
                    Please sign in with your authorized Google account.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center text-sm text-gray-500 mt-4">
              <button 
                type="button" 
                onClick={toggleAuthMethod}
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {authMethod === 'google' ? 'Use email and password instead' : 'Use Google sign in instead'}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAuth;
