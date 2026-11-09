import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  BookOpen,
  GraduationCap,
  Cpu,
  FolderGit2,
  Award,
  FileText,
  Mail,
  Home,
  Settings,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Code2,
  ChevronRight
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import Toast from './components/Toast';

// Views
import DashboardOverview from './views/DashboardOverview';
import ProfileManager from './views/ProfileManager';
import AboutManager from './views/AboutManager';
import EducationManager from './views/EducationManager';
import SkillsManager from './views/SkillsManager';
import ProjectManager from './views/ProjectManager';
import CertificateManager from './views/CertificateManager';
import DocumentManager from './views/DocumentManager';
import ContactManager from './views/ContactManager';
import HomepageManager from './views/HomepageManager';
import SettingsManager from './views/SettingsManager';
import MessagesManager from './views/MessagesManager';
import SecurityManager from './views/SecurityManager';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'profile', label: 'Personal Profile', icon: User },
  { id: 'about', label: 'About Page', icon: BookOpen },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills & Tech', icon: Cpu },
  { id: 'projects', label: 'Projects Manager', icon: FolderGit2 },
  { id: 'certificates', label: 'Certificates', icon: Award },
  { id: 'documents', label: 'Documents & Resume', icon: FileText },
  { id: 'contact', label: 'Contact & Social', icon: Mail },
  { id: 'homepage', label: 'Homepage Editor', icon: Home },
  { id: 'settings', label: 'Website & SEO', icon: Settings },
  { id: 'messages', label: 'Inbox Inquiries', icon: Mail },
  { id: 'security', label: 'Security & Auth', icon: ShieldCheck }
];

export default function AdminLayout() {
  const { logout, authorizedMobile, admin } = useAdminAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleNavigate = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview onNavigate={handleNavigate} showToast={showToast} />;
      case 'profile':
        return <ProfileManager showToast={showToast} />;
      case 'about':
        return <AboutManager showToast={showToast} />;
      case 'education':
        return <EducationManager showToast={showToast} />;
      case 'skills':
        return <SkillsManager showToast={showToast} />;
      case 'projects':
        return <ProjectManager showToast={showToast} />;
      case 'certificates':
        return <CertificateManager showToast={showToast} />;
      case 'documents':
        return <DocumentManager showToast={showToast} />;
      case 'contact':
        return <ContactManager showToast={showToast} />;
      case 'homepage':
        return <HomepageManager showToast={showToast} />;
      case 'settings':
        return <SettingsManager showToast={showToast} />;
      case 'messages':
        return <MessagesManager showToast={showToast} />;
      case 'security':
        return <SecurityManager showToast={showToast} />;
      default:
        return <DashboardOverview onNavigate={handleNavigate} showToast={showToast} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#060813] text-slate-100 flex flex-col md:flex-row">
      {/* Toast Notification Container */}
      <Toast
        message={toast?.message}
        type={toast?.type}
        onClose={() => setToast(null)}
      />

      {/* Mobile Top Header */}
      <header className="md:hidden sticky top-0 z-40 bg-[#080c1d]/95 backdrop-blur-xl border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-white">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-sm font-bold text-white block">Portfolio Admin</span>
            <span className="text-[10px] font-mono text-purple-400">{authorizedMobile}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900 border border-slate-800"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Sidebar Navigation (Desktop + Mobile Drawer) */}
      <aside
        className={`fixed md:sticky top-0 z-40 h-screen w-64 lg:w-72 bg-[#070a18] border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Sidebar Top Branding */}
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 p-[1px] shadow-lg shadow-purple-900/30">
                <div className="w-full h-full bg-[#070a18] rounded-[11px] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-cyan-300" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white tracking-tight">Admin Console</span>
                <span className="text-[11px] font-mono text-cyan-400">{authorizedMobile}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden p-1.5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links List */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600/30 to-cyan-600/20 text-white border border-purple-500/40 shadow-sm shadow-purple-950/50'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-300' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-cyan-300" />}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Bottom Footer: Public Link & Logout */}
          <div className="p-3 border-t border-slate-800/80 space-y-1.5 bg-[#050814]">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800/80 transition-all"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
                <span>Public Portfolio</span>
              </span>
              <span className="text-[10px] font-mono text-cyan-400">Live ↗</span>
            </a>

            <button
              type="button"
              onClick={logout}
              className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-300 hover:text-white hover:bg-rose-500/15 border border-rose-500/20 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-10 max-w-7xl">
        {renderActiveView()}
      </main>
    </div>
  );
}

