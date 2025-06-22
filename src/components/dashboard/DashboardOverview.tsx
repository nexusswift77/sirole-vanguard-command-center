
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../ui/card';
import { Calendar, Users, DollarSign, TrendingUp, Mail, Briefcase } from 'lucide-react';
import { supabase } from '../../integrations/supabase/client';

const DashboardOverview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalBookings: 0,
    activeClients: 0,
    monthlyRevenue: 0,
    pendingQuotes: 0,
    totalSubscribers: 0,
    activeServices: 0
  });
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch bookings count
        const { count: bookingsCount } = await supabase
          .from('bookings')
          .select('*', { count: 'exact', head: true });

        // Fetch clients count
        const { count: clientsCount } = await supabase
          .from('clients')
          .select('*', { count: 'exact', head: true });

        // Fetch revenue from bookings
        const { data: bookingsRevenue } = await supabase
          .from('bookings')
          .select('revenue')
          .not('revenue', 'is', null);

        const totalRevenue = bookingsRevenue?.reduce((sum, booking) => 
          sum + (parseFloat(booking.revenue?.toString() || '0') || 0), 0) || 0;

        // Fetch quotes count with pending status
        const { count: quotesCount } = await supabase
          .from('quotes')
          .select('*', { count: 'exact', head: true });

        // Fetch subscribers count
        const { count: subscribersCount } = await supabase
          .from('subscribers')
          .select('*', { count: 'exact', head: true });

        // Fetch services count
        const { count: servicesCount } = await supabase
          .from('services')
          .select('*', { count: 'exact', head: true });

        // Fetch recent activities (latest bookings and contact messages)
        const { data: recentBookings } = await supabase
          .from('bookings')
          .select('client_name, service_type, created_at')
          .order('created_at', { ascending: false })
          .limit(2);

        const { data: recentMessages } = await supabase
          .from('contact_messages')
          .select('full_name, created_at')
          .order('created_at', { ascending: false })
          .limit(2);

        // Format activities
        const activities = [
          ...(recentBookings?.map(booking => ({
            id: Math.random(),
            type: 'booking',
            message: `New booking from ${booking.client_name} for ${booking.service_type}`,
            time: formatTimeAgo(booking.created_at)
          })) || []),
          ...(recentMessages?.map(message => ({
            id: Math.random(),
            type: 'contact',
            message: `New contact message from ${message.full_name}`,
            time: formatTimeAgo(message.created_at)
          })) || [])
        ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 4);

        setStats({
          totalBookings: bookingsCount || 0,
          activeClients: clientsCount || 0,
          monthlyRevenue: totalRevenue,
          pendingQuotes: quotesCount || 0,
          totalSubscribers: subscribersCount || 0,
          activeServices: servicesCount || 0
        });

        setRecentActivities(activities);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours === 0) return 'Just now';
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="luxury-card p-6 animate-pulse">
          <div className="h-8 bg-luxury-gold/20 rounded mb-2"></div>
          <div className="h-4 bg-luxury-gold/10 rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="luxury-card p-6 animate-pulse">
              <div className="h-20 bg-luxury-gold/10 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="luxury-card p-6">
        <h1 className="text-2xl font-bold text-gradient-gold mb-2">
          Welcome back, {user?.name}
        </h1>
        <p className="text-luxury-gold-light">
          Here's what's happening with your SIROLE VVIP Protocol & Event Management System today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="luxury-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-luxury-gold-light">Total Bookings</p>
              <p className="text-3xl font-bold text-luxury-gold">{stats.totalBookings}</p>
            </div>
            <div className="p-3 bg-luxury-gold/10 rounded-lg">
              <Calendar className="w-6 h-6 text-luxury-gold" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">Live data</span>
            <span className="text-luxury-gold-light ml-1">from database</span>
          </div>
        </Card>

        <Card className="luxury-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-luxury-gold-light">Active Clients</p>
              <p className="text-3xl font-bold text-luxury-gold">{stats.activeClients}</p>
            </div>
            <div className="p-3 bg-luxury-gold/10 rounded-lg">
              <Users className="w-6 h-6 text-luxury-gold" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">Live data</span>
            <span className="text-luxury-gold-light ml-1">from database</span>
          </div>
        </Card>

        <Card className="luxury-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-luxury-gold-light">Total Revenue</p>
              <p className="text-3xl font-bold text-luxury-gold">KSh {stats.monthlyRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-luxury-gold/10 rounded-lg">
              <DollarSign className="w-6 h-6 text-luxury-gold" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">Live data</span>
            <span className="text-luxury-gold-light ml-1">from database</span>
          </div>
        </Card>

        <Card className="luxury-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-luxury-gold-light">Total Quotes</p>
              <p className="text-3xl font-bold text-luxury-gold">{stats.pendingQuotes}</p>
            </div>
            <div className="p-3 bg-luxury-gold/10 rounded-lg">
              <DollarSign className="w-6 h-6 text-luxury-gold" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <span className="text-luxury-gold-light">All quotes</span>
          </div>
        </Card>

        <Card className="luxury-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-luxury-gold-light">Subscribers</p>
              <p className="text-3xl font-bold text-luxury-gold">{stats.totalSubscribers}</p>
            </div>
            <div className="p-3 bg-luxury-gold/10 rounded-lg">
              <Mail className="w-6 h-6 text-luxury-gold" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">Live data</span>
            <span className="text-luxury-gold-light ml-1">from database</span>
          </div>
        </Card>

        <Card className="luxury-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-luxury-gold-light">Active Services</p>
              <p className="text-3xl font-bold text-luxury-gold">{stats.activeServices}</p>
            </div>
            <div className="p-3 bg-luxury-gold/10 rounded-lg">
              <Briefcase className="w-6 h-6 text-luxury-gold" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <span className="text-luxury-gold-light">All services</span>
          </div>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="luxury-card p-6">
        <h3 className="text-xl font-bold text-luxury-gold mb-4">Recent Activities</h3>
        <div className="space-y-4">
          {recentActivities.length > 0 ? (
            recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-4 bg-luxury-black-light rounded-lg">
                <div className="w-2 h-2 bg-luxury-gold rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-luxury-gold-light">{activity.message}</p>
                  <p className="text-sm text-luxury-gold/60 mt-1">{activity.time}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-luxury-gold-light">No recent activities found</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default DashboardOverview;
