
import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Plus, Search, Calendar, MapPin, User, Phone, DollarSign } from 'lucide-react';
import { supabase } from '../../integrations/supabase/client';

interface Booking {
  id: string;
  client_name: string | null;
  service_type: string | null;
  scheduled_at: string | null;
  status: string | null;
  approval_status: string | null;
  revenue: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string | null;
}

const BookingsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching bookings:', error);
        return;
      }

      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string | null) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'completed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not scheduled';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredBookings = bookings.filter(booking =>
    booking.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.service_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gradient-gold">Bookings Management</h1>
            <p className="text-luxury-gold-light">Loading bookings data...</p>
          </div>
        </div>
        <div className="grid gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="luxury-card p-6 animate-pulse">
              <div className="h-20 bg-luxury-gold/10 rounded"></div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gradient-gold">Bookings Management</h1>
          <p className="text-luxury-gold-light">Manage all VIP protocol and event bookings ({bookings.length} total)</p>
        </div>
        <Button className="luxury-button">
          <Plus className="w-4 h-4 mr-2" />
          New Booking
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="luxury-card p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/60 w-4 h-4" />
            <Input
              placeholder="Search bookings by client, service type, or booking ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="luxury-input pl-10"
            />
          </div>
        </div>
      </Card>

      {/* Bookings List */}
      <div className="grid gap-6">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <Card key={booking.id} className="luxury-card p-6">
              <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                <div className="flex-1 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-luxury-gold">
                        {booking.client_name || 'Unknown Client'}
                      </h3>
                      <p className="text-luxury-gold-light">
                        {booking.service_type || 'Service type not specified'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`${getStatusColor(booking.status)} border`}>
                        {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1) || 'Unknown'}
                      </Badge>
                      {booking.revenue && (
                        <span className="text-lg font-bold text-luxury-gold">
                          KSh {parseFloat(booking.revenue.toString()).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-luxury-gold-light">
                      <Calendar className="w-4 h-4 text-luxury-gold" />
                      <span>{formatDate(booking.scheduled_at)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-luxury-gold-light">
                      <DollarSign className="w-4 h-4 text-luxury-gold" />
                      <span>Approval: {booking.approval_status || 'Pending'}</span>
                    </div>
                  </div>

                  {booking.notes && (
                    <div className="text-sm text-luxury-gold-light bg-luxury-black-light p-3 rounded-lg">
                      <strong>Notes:</strong> {booking.notes}
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xs text-luxury-gold/60">
                    <User className="w-3 h-3" />
                    <span>Booking ID: {booking.id.substring(0, 8)}...</span>
                    <span>•</span>
                    <span>Created: {formatDate(booking.created_at)}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" size="sm" className="border-luxury-gold/30 text-luxury-gold hover:bg-luxury-gold/10">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="border-luxury-gold/30 text-luxury-gold hover:bg-luxury-gold/10">
                    Edit
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="luxury-card p-12 text-center">
            <Calendar className="w-12 h-12 text-luxury-gold/60 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-luxury-gold mb-2">
              {searchTerm ? 'No bookings found' : 'No bookings yet'}
            </h3>
            <p className="text-luxury-gold-light">
              {searchTerm ? 'Try adjusting your search terms.' : 'Create your first booking to get started.'}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BookingsManagement;
