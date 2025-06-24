
import React from 'react';
import { 
  Calendar, 
  Users, 
  Settings, 
  Mail, 
  FileText, 
  Briefcase,
  Package,
  DollarSign,
  BarChart3,
  User
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'careers', label: 'Careers', icon: FileText },
    { id: 'staff', label: 'Staff', icon: User },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'quotes', label: 'Quotes', icon: DollarSign },
    { id: 'subscribers', label: 'Subscribers', icon: Mail },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 h-screen bg-luxury-black border-r border-luxury-gold/20 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-luxury-gold/20">
        <h2 className="text-xl font-bold text-gradient-gold">SIROLE VVIP</h2>
        <p className="text-sm text-luxury-gold-light">Admin Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`sidebar-item ${activeSection === item.id ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
