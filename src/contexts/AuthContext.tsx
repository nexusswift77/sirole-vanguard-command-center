
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';

export type UserRole = 'super_admin' | 'sub_admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      }
      setIsLoading(false);
    };

    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: adminProfile, error } = await supabase
        .from('admin_users')
        .select('id, email, role, created_at')
        .eq('id', userId)
        .single();

      if (error || !adminProfile) {
        console.error('Error fetching admin profile:', error);
        await supabase.auth.signOut();
        return;
      }

      const userData: User = {
        id: adminProfile.id,
        email: adminProfile.email,
        role: adminProfile.role as UserRole,
        name: adminProfile.email.split('@')[0]
      };
      
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      await supabase.auth.signOut();
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Use Supabase Auth for secure authentication
      const { data: { user: authUser, session }, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError || !authUser || !session) {
        console.error('Authentication error:', authError);
        setIsLoading(false);
        return false;
      }

      // After successful authentication, fetch admin profile
      const { data: adminProfile, error: profileError } = await supabase
        .from('admin_users')
        .select('id, email, role, created_at')
        .eq('id', authUser.id)
        .single();

      if (profileError || !adminProfile) {
        console.error('Admin profile not found:', profileError);
        await supabase.auth.signOut();
        setIsLoading(false);
        return false;
      }

      const userData: User = {
        id: adminProfile.id,
        email: adminProfile.email,
        role: adminProfile.role as UserRole,
        name: adminProfile.email.split('@')[0]
      };
      
      setUser(userData);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
