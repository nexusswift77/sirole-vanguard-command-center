
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
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
  User,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const { user, logout } = useAuth();

  const superAdminItems = [
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

  const subAdminItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'quotes', label: 'Quotes', icon: DollarSign },
    { id: 'careers', label: 'Careers', icon: FileText },
    { id: 'subscribers', label: 'Subscribers', icon: Mail },
  ];

  const menuItems = user?.role === 'super_admin' ? superAdminItems : subAdminItems;

  return (
    <div className="w-64 h-screen bg-luxury-black border-r border-luxury-gold/20 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-luxury-gold/20">
        <h2 className="text-xl font-bold text-gradient-gold">SIROLE VVIP</h2>
        <p className="text-sm text-luxury-gold-light">Admin Dashboard</p>
        <div className="mt-3 p-2 bg-luxury-black-light rounded-lg">
          <p className="text-xs text-luxury-gold">{user?.name}</p>
          <p className="text-xs text-luxury-gold-light capitalize">{user?.role.replace('_', ' ')}</p>
        </div>
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

      {/* Logout */}
      <div className="p-4 border-t border-luxury-gold/20">
        <div
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-luxury-red/10 hover:text-luxury-red cursor-pointer"
        >
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
