
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../ui/card';
import { Calendar, Users, DollarSign, TrendingUp, Mail, Briefcase } from 'lucide-react';

const DashboardOverview = () => {
  const { user } = useAuth();

  // Mock data - in real implementation, this would come from Supabase
  const stats = {
    totalBookings: 156,
    activeClients: 89,
    monthlyRevenue: 245000,
    pendingQuotes: 23,
    totalSubscribers: 1240,
    activeServices: 12
  };

  const recentActivities = [
    { id: 1, type: 'booking', message: 'New VIP Protocol booking from Kenya Airways', time: '2 hours ago' },
    { id: 2, type: 'client', message: 'Client profile updated: Embassy of France', time: '4 hours ago' },
    { id: 3, type: 'quote', message: 'Quote #QT-2024-089 has been approved', time: '6 hours ago' },
    { id: 4, type: 'service', message: 'New service inquiry: Diplomatic Event Coordination', time: '1 day ago' },
  ];

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
            <span className="text-green-500">+12%</span>
            <span className="text-luxury-gold-light ml-1">from last month</span>
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
            <span className="text-green-500">+8%</span>
            <span className="text-luxury-gold-light ml-1">from last month</span>
          </div>
        </Card>

        <Card className="luxury-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-luxury-gold-light">Monthly Revenue</p>
              <p className="text-3xl font-bold text-luxury-gold">KSh {stats.monthlyRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-luxury-gold/10 rounded-lg">
              <DollarSign className="w-6 h-6 text-luxury-gold" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">+15%</span>
            <span className="text-luxury-gold-light ml-1">from last month</span>
          </div>
        </Card>

        <Card className="luxury-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-luxury-gold-light">Pending Quotes</p>
              <p className="text-3xl font-bold text-luxury-gold">{stats.pendingQuotes}</p>
            </div>
            <div className="p-3 bg-luxury-red/10 rounded-lg">
              <DollarSign className="w-6 h-6 text-luxury-red" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <span className="text-luxury-red">Requires attention</span>
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
            <span className="text-green-500">+23%</span>
            <span className="text-luxury-gold-light ml-1">from last month</span>
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
            <span className="text-luxury-gold-light">All services active</span>
          </div>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="luxury-card p-6">
        <h3 className="text-xl font-bold text-luxury-gold mb-4">Recent Activities</h3>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 p-4 bg-luxury-black-light rounded-lg">
              <div className="w-2 h-2 bg-luxury-gold rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-luxury-gold-light">{activity.message}</p>
                <p className="text-sm text-luxury-gold/60 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DashboardOverview;
