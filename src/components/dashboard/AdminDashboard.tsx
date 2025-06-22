
import React, { useState } from 'react';
import Sidebar from '../layout/Sidebar';
import DashboardOverview from './DashboardOverview';
import BookingsManagement from './BookingsManagement';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'bookings':
        return <BookingsManagement />;
      case 'clients':
        return (
          <div className="luxury-card p-8 text-center">
            <h2 className="text-2xl font-bold text-luxury-gold mb-4">Clients Management</h2>
            <p className="text-luxury-gold-light">This section will manage all client profiles and interactions.</p>
          </div>
        );
      case 'services':
        return (
          <div className="luxury-card p-8 text-center">
            <h2 className="text-2xl font-bold text-luxury-gold mb-4">Services Management</h2>
            <p className="text-luxury-gold-light">Manage all SIROLE VVIP services and offerings.</p>
          </div>
        );
      case 'careers':
        return (
          <div className="luxury-card p-8 text-center">
            <h2 className="text-2xl font-bold text-luxury-gold mb-4">Careers & Applicants</h2>
            <p className="text-luxury-gold-light">Manage job postings and view applications.</p>
          </div>
        );
      case 'staff':
        return (
          <div className="luxury-card p-8 text-center">
            <h2 className="text-2xl font-bold text-luxury-gold mb-4">Staff Management</h2>
            <p className="text-luxury-gold-light">Manage staff members and their roles.</p>
          </div>
        );
      case 'inventory':
        return (
          <div className="luxury-card p-8 text-center">
            <h2 className="text-2xl font-bold text-luxury-gold mb-4">Inventory Management</h2>
            <p className="text-luxury-gold-light">Track and manage all inventory items.</p>
          </div>
        );
      case 'quotes':
        return (
          <div className="luxury-card p-8 text-center">
            <h2 className="text-2xl font-bold text-luxury-gold mb-4">Quote Management</h2>
            <p className="text-luxury-gold-light">Create, view, and manage client quotes.</p>
          </div>
        );
      case 'subscribers':
        return (
          <div className="luxury-card p-8 text-center">
            <h2 className="text-2xl font-bold text-luxury-gold mb-4">Subscriber Management</h2>
            <p className="text-luxury-gold-light">Manage newsletter subscribers and communications.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="luxury-card p-8 text-center">
            <h2 className="text-2xl font-bold text-luxury-gold mb-4">System Settings</h2>
            <p className="text-luxury-gold-light">Configure system-wide settings and preferences.</p>
          </div>
        );
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-luxury-black">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
