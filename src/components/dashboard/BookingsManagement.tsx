
import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Plus, Search, Calendar, MapPin, User, Phone } from 'lucide-react';

const BookingsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock bookings data - in real implementation, this would come from Supabase
  const bookings = [
    {
      id: 'BK-2024-001',
      clientName: 'Kenya Airways',
      eventType: 'VIP Protocol Service',
      date: '2024-12-28',
      time: '14:00',
      location: 'JKIA Terminal 1A',
      status: 'confirmed',
      contact: '+254 700 123 456',
      value: 'KSh 75,000'
    },
    {
      id: 'BK-2024-002',
      clientName: 'Embassy of France',
      eventType: 'Diplomatic Event Coordination',
      date: '2024-12-30',
      time: '10:00',
      location: 'Serena Hotel Nairobi',
      status: 'pending',
      contact: '+254 700 789 012',
      value: 'KSh 120,000'
    },
    {
      id: 'BK-2024-003',
      clientName: 'Safaricom PLC',
      eventType: 'Corporate VIP Service',
      date: '2024-12-25',
      time: '09:00',
      location: 'Safaricom House',
      status: 'completed',
      contact: '+254 700 345 678',
      value: 'KSh 95,000'
    },
    {
      id: 'BK-2024-004',
      clientName: 'UN-Habitat',
      eventType: 'International Protocol Service',
      date: '2025-01-05',
      time: '16:00',
      location: 'UN Complex Gigiri',
      status: 'confirmed',
      contact: '+254 700 456 789',
      value: 'KSh 200,000'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'completed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const filteredBookings = bookings.filter(booking =>
    booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gradient-gold">Bookings Management</h1>
          <p className="text-luxury-gold-light">Manage all VIP protocol and event bookings</p>
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
              placeholder="Search bookings by client, event type, or booking ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="luxury-input pl-10"
            />
          </div>
        </div>
      </Card>

      {/* Bookings List */}
      <div className="grid gap-6">
        {filteredBookings.map((booking) => (
          <Card key={booking.id} className="luxury-card p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
              <div className="flex-1 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-luxury-gold">{booking.clientName}</h3>
                    <p className="text-luxury-gold-light">{booking.eventType}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getStatusColor(booking.status)} border`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                    <span className="text-lg font-bold text-luxury-gold">{booking.value}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-luxury-gold-light">
                    <Calendar className="w-4 h-4 text-luxury-gold" />
                    <span>{booking.date} at {booking.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-luxury-gold-light">
                    <MapPin className="w-4 h-4 text-luxury-gold" />
                    <span>{booking.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-luxury-gold-light">
                    <Phone className="w-4 h-4 text-luxury-gold" />
                    <span>{booking.contact}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-luxury-gold/60">
                  <User className="w-3 h-3" />
                  <span>Booking ID: {booking.id}</span>
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
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <Card className="luxury-card p-12 text-center">
          <Calendar className="w-12 h-12 text-luxury-gold/60 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-luxury-gold mb-2">No bookings found</h3>
          <p className="text-luxury-gold-light">
            {searchTerm ? 'Try adjusting your search terms.' : 'Create your first booking to get started.'}
          </p>
        </Card>
      )}
    </div>
  );
};

export default BookingsManagement;
