"use client";

import { 
  Users, 
  DownloadCloud, 
  MessageSquare, 
  Bug, 
  Gamepad2, 
  BarChart2, 
  Activity,
  PlusCircle,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import '../../pages/Home.css';

export default function AdminDashboardOverview() {
  const { user } = useAuth();

  const stats = [
    { title: 'Total Users', value: '0', icon: Users, color: 'var(--color-accent-cyan)' },
    { title: 'Downloads', value: '0', icon: DownloadCloud, color: 'var(--color-accent-purple)' },
    { title: 'Reviews', value: '0', icon: MessageSquare, color: 'var(--color-electric-blue)' },
    { title: 'Bug Reports', value: '0', icon: Bug, color: '#f43f5e' },
    { title: 'Total Games', value: '0', icon: Gamepad2, color: '#10b981' },
    { title: 'Active Polls', value: '0', icon: BarChart2, color: '#e879f9' },
  ];

  const quickActions = [
    { label: 'Add New Game', icon: PlusCircle, href: '/admin/games' },
    { label: 'Create News Post', icon: PlusCircle, href: '/admin/news' },
    { label: 'Review Bug Reports', icon: Bug, href: '/admin/bug-reports' },
    { label: 'Manage Downloads', icon: DownloadCloud, href: '/admin/downloads' },
    { label: 'Moderate Reviews', icon: MessageSquare, href: '/admin/reviews' },
  ];

  return (
    <div className="admin-dashboard-page">
      {/* Header */}
      <div className="section-header" style={{ paddingTop: '0', paddingBottom: '20px', borderBottom: '1px solid var(--glass-border)', marginBottom: '30px' }}>
        <div>
          <h2 style={{ fontSize: '2rem' }}>Dashboard Overview</h2>
          <p style={{ color: 'var(--color-text-secondary)' }}>Welcome back, <span style={{ color: 'var(--color-accent-cyan)' }}>{user?.displayName || 'Admin'}</span></p>
        </div>
        <div className="glass-panel" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }}></div>
          <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>System Healthy</span>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="stats-grid" style={{ marginBottom: '40px' }}>
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card glass-panel" style={{ padding: '20px', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <stat.icon size={32} color={stat.color} />
            </div>
            <h3 style={{ fontSize: '2.5rem', margin: '0 0 5px 0' }}>{stat.value}</h3>
            <p style={{ color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        
        {/* Recent Activity Feed */}
        <div className="glass-panel" style={{ padding: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Activity color="var(--color-accent-cyan)" size={24} />
            <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Recent Activities</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>No recent activities found.</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-panel" style={{ padding: '30px' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '1.5rem' }}>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {quickActions.map((action, idx) => (
              <Link key={idx} href={action.href} style={{ textDecoration: 'none' }}>
                <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <action.icon size={18} />
                    {action.label}
                  </span>
                  <ArrowRight size={16} color="var(--color-text-secondary)" />
                </button>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
