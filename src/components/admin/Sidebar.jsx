"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Gamepad2, 
  DownloadCloud, 
  Bug, 
  MessageSquare, 
  Newspaper, 
  BarChart2, 
  Image as ImageIcon, 
  Mail, 
  Users, 
  LineChart, 
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Games', path: '/admin/games', icon: Gamepad2 },
  { name: 'Downloads', path: '/admin/downloads', icon: DownloadCloud },
  { name: 'Bug Reports', path: '/admin/bug-reports', icon: Bug },
  { name: 'Reviews', path: '/admin/reviews', icon: MessageSquare },
  { name: 'News & Updates', path: '/admin/news', icon: Newspaper },
  { name: 'Community Polls', path: '/admin/polls', icon: BarChart2 },
  { name: 'Media Gallery', path: '/admin/media', icon: ImageIcon },
  { name: 'Contact Requests', path: '/admin/contact', icon: Mail },
  { name: 'Users', path: '/admin/users', icon: Users },
  { name: 'Analytics', path: '/admin/analytics', icon: LineChart },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <div className="w-64 bg-[#0a0a0f] border-r border-[#1f1f2e] min-h-screen flex flex-col fixed left-0 top-0 overflow-y-auto">
      <div className="p-6 border-b border-[#1f1f2e]">
        <Link href="/admin" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#007acc]">
          BLACK PEARL
          <span className="block text-xs text-gray-400 mt-1 uppercase tracking-widest">Admin Hub</span>
        </Link>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive 
                  ? 'bg-[#00e5ff]/10 text-[#00e5ff] font-bold border border-[#00e5ff]/30' 
                  : 'text-gray-400 hover:text-white hover:bg-[#1f1f2e] border border-transparent'
              }`}
            >
              <item.icon size={20} className={isActive ? "text-[#00e5ff]" : "text-gray-500"} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#1f1f2e]">
        <button 
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-all font-bold"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}
