import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, Plus, Trash2, GripVertical, CheckCircle2 } from 'lucide-react';
import { portfolioApi } from '../../services/portfolioApi';

export default function AboutManager({ showToast }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const data = await portfolioApi.getProfile();
      setProfile(data);
    } catch (err) {
      showToast?.(err.message || 'Failed to load About page data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const saved = await portfolioApi.updateProfile(profile);
      setProfile(saved);
      showToast?.('About page content saved and published live!', 'success');
    } catch (err) {
      showToast?.(err.message || 'Failed to update About content', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !profile) {
    return (
      <div className="flex items-center justify-center p-12 text-slate-400">
        <RefreshCw className="w-6 h-6 animate-spin mr-2 text-cyan-400" />
        <span>Loading About page editor...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 animate-fade-in max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">Page Content</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">About Me Page Editor</h1>
          <p className="text-xs sm:text-sm text-slate-400">Edit developer journey, overview narrative, career objectives, and learning philosophy.</p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-purple-900/30 transition-all self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save & Publish About Page'}</span>
        </button>
      </div>

      {/* Developer Overview & Journey */}
      <div className="glass-card rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-6">
        <h3 className="text-base font-bold text-white">Narrative Sections</h3>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">My Developer Journey (Highlights background, C/C++, Java, Full Stack)</label>
            <textarea
              rows={4}
              value={profile.developerJourney || ''}
              onChange={(e) => handleFieldChange('developerJourney', e.target.value)}
              placeholder="My journey in programming started with core languages like C and C++..."
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors resize-y leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Developer Overview Summary</label>
            <textarea
              rows={4}
              value={profile.developerOverview || ''}
              onChange={(e) => handleFieldChange('developerOverview', e.target.value)}
              placeholder="As a B.Tech student in India, I approach software engineering with curiosity and discipline..."
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors resize-y leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Career Goals & Objectives</label>
            <textarea
              rows={3}
              value={profile.careerObjective || ''}
              onChange={(e) => handleFieldChange('careerObjective', e.target.value)}
              placeholder="My primary goal is to grow into a versatile, dependable Software & Full Stack Engineer..."
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors resize-y leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-xl shadow-purple-900/30 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save About Page'}</span>
        </button>
      </div>
    </form>
  );
}

