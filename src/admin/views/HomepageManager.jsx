import React, { useState, useEffect } from 'react';
import { Save, Home, Sparkles, RefreshCw, Layers } from 'lucide-react';
import { portfolioApi } from '../../services/portfolioApi';
import ImageUploader from '../components/ImageUploader';

export default function HomepageManager({ showToast }) {
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
      showToast?.(err.message || 'Failed to load homepage settings', 'error');
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
      showToast?.('Homepage content updated live!', 'success');
    } catch (err) {
      showToast?.(err.message || 'Failed to save homepage settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !profile) {
    return (
      <div className="flex items-center justify-center p-12 text-slate-400">
        <RefreshCw className="w-6 h-6 animate-spin mr-2 text-cyan-400" />
        <span>Loading homepage editor...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 animate-fade-in max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">Visual Layout</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Homepage Editor</h1>
          <p className="text-xs sm:text-sm text-slate-400">Manage hero banners, primary call-to-actions, and main introduction.</p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-purple-900/30 transition-all self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save & Publish Homepage'}</span>
        </button>
      </div>

      {/* Hero Content Editor */}
      <div className="glass-card rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-5">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Hero Banner Content</span>
        </h3>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Hero Main Headline</label>
            <input
              type="text"
              value={profile.heroHeading || ''}
              onChange={(e) => handleFieldChange('heroHeading', e.target.value)}
              placeholder="Building Digital Experiences Through Code."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 font-semibold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Hero Subtitle</label>
            <textarea
              rows={2}
              value={profile.heroSubtitle || ''}
              onChange={(e) => handleFieldChange('heroSubtitle', e.target.value)}
              placeholder="Crafting modern, accessible web applications and reliable software solutions with React, Spring Boot, Node.js, and clean code."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 resize-y"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Homepage Short Introduction</label>
            <textarea
              rows={3}
              value={profile.shortIntro || ''}
              onChange={(e) => handleFieldChange('shortIntro', e.target.value)}
              placeholder="I am a passionate developer who enjoys building modern websites..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 resize-y"
            />
          </div>
        </div>
      </div>

      {/* Profile Photo Upload */}
      <div className="glass-card rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Home className="w-4 h-4 text-cyan-400" />
          <span>Hero Avatar & Photo</span>
        </h3>
        <ImageUploader
          value={profile.profileImageUrl}
          onChange={(url) => handleFieldChange('profileImageUrl', url)}
          category="profile"
          label="Hero Portrait Photo"
          aspectHint="Aspect ratio 4:5"
        />
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-xl shadow-purple-900/30 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Homepage Content'}</span>
        </button>
      </div>
    </form>
  );
}

