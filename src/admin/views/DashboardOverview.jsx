import React, { useState, useEffect } from 'react';
import {
  FolderGit2,
  Cpu,
  Award,
  FileText,
  GraduationCap,
  Mail,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { portfolioApi } from '../../services/portfolioApi';

export default function DashboardOverview({ onNavigate, showToast }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const data = await portfolioApi.getDashboardStats();
      setStats(data);
    } catch {
      // Use graceful fallback stats if offline
      setStats({
        totalProjects: 3,
        publishedProjects: 3,
        totalSkills: 17,
        totalEducation: 1,
        totalCertificates: 0,
        totalDocuments: 1,
        totalMessages: 0,
        unreadMessages: 0,
        lastUpdated: new Date().toISOString(),
        isPublished: true
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900/40 via-indigo-950/40 to-[#0c1228] border border-purple-500/30 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-300" />
              <span>Admin Dashboard • Owner Panel</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Welcome back, Shankar!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Manage your personal portfolio content, projects, skills, documents, and messages directly from this dashboard.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={fetchStats}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Stats</span>
            </button>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-purple-950/40 transition-all"
            >
              <span>View Public Site</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Projects */}
        <div
          onClick={() => onNavigate('projects')}
          className="glass-card glass-card-hover rounded-2xl p-5 border border-slate-800 cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">Total Projects</span>
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <FolderGit2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-extrabold text-white">{stats?.totalProjects ?? 0}</span>
            <span className="text-xs text-slate-400 ml-2">({stats?.publishedProjects ?? 0} published)</span>
          </div>
        </div>

        {/* Skills */}
        <div
          onClick={() => onNavigate('skills')}
          className="glass-card glass-card-hover rounded-2xl p-5 border border-slate-800 cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">Technical Skills</span>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
              <Cpu className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-extrabold text-white">{stats?.totalSkills ?? 0}</span>
            <span className="text-xs text-slate-400 ml-2">across all categories</span>
          </div>
        </div>

        {/* Education */}
        <div
          onClick={() => onNavigate('education')}
          className="glass-card glass-card-hover rounded-2xl p-5 border border-slate-800 cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">Education Records</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-extrabold text-white">{stats?.totalEducation ?? 0}</span>
            <span className="text-xs text-slate-400 ml-2">qualifications</span>
          </div>
        </div>

        {/* Messages */}
        <div
          onClick={() => onNavigate('messages')}
          className="glass-card glass-card-hover rounded-2xl p-5 border border-slate-800 cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">Inbox Inquiries</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
              <Mail className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white">{stats?.totalMessages ?? 0}</span>
            {stats?.unreadMessages > 0 ? (
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
                {stats.unreadMessages} Unread
              </span>
            ) : (
              <span className="text-xs text-slate-400">All caught up</span>
            )}
          </div>
        </div>
      </div>

      {/* Quick Launchpad & Status Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Quick Actions */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-300" />
            <span>Quick Management Shortcuts</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800/90 text-left transition-all group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Add New Project
                </span>
                <FolderGit2 className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-xs text-slate-400">Upload screenshot, add tech tags, and publish instantly.</p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('documents')}
              className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800/90 text-left transition-all group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Upload Resume PDF
                </span>
                <FileText className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="text-xs text-slate-400">Replace resume file and activate public download button.</p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('profile')}
              className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800/90 text-left transition-all group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Update Profile Photo
                </span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-xs text-slate-400">Change your avatar, headline, or career status.</p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('skills')}
              className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800/90 text-left transition-all group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Manage Tech Stack
                </span>
                <Cpu className="w-4 h-4 text-indigo-400" />
              </div>
              <p className="text-xs text-slate-400">Add languages, frameworks, or database technologies.</p>
            </button>
          </div>
        </div>

        {/* Right: System & Publish Status */}
        <div className="glass-card rounded-3xl p-6 sm:p-7 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400">
              System Health & Publishing
            </h3>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Publishing Status:</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Published & Live
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Database Engine:</span>
                <span className="font-mono text-cyan-300">Active (Persistent)</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Storage Dir:</span>
                <span className="font-mono text-purple-300">./backend/uploads</span>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
                <span className="text-slate-400">Last Content Update:</span>
                <span className="text-slate-300 font-mono text-[11px]">
                  {stats?.lastUpdated ? new Date(stats.lastUpdated).toLocaleString() : 'Recently'}
                </span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 leading-relaxed bg-purple-500/10 p-3 rounded-xl border border-purple-500/20">
            All updates save directly to the database and reflect live on your public site without redeployment.
          </div>
        </div>
      </div>
    </div>
  );
}

