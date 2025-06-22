
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { useToast } from '../../hooks/use-toast';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await login(email, password);
    
    if (success) {
      toast({
        title: "Login Successful",
        description: "Welcome to SIROLE VVIP Admin Dashboard",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="luxury-card p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gradient-gold mb-2">SIROLE VVIP</h1>
            <p className="text-luxury-gold-light text-sm">Protocol & Event Management System</p>
            <div className="w-16 h-1 bg-gradient-to-r from-luxury-gold to-luxury-gold-dark mx-auto mt-4"></div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-luxury-gold mb-2">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="luxury-input"
                placeholder="admin@sirolevvipprotocolltd.co.ke"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-luxury-gold mb-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="luxury-input"
                placeholder="Enter your password"
                required
              />
            </div>
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full luxury-button text-base py-3"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <div className="bg-luxury-black-light rounded-lg p-4 text-xs text-luxury-gold-light">
              <p className="font-semibold mb-2">Demo Credentials:</p>
              <p>Super Admin: superadmin@sirolevvipprotocolltd.co.ke / admin123</p>
              <p>Sub Admin: subadmin@sirolevvipprotocolltd.co.ke / subadmin123</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
