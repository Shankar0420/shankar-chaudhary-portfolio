import React, { useState, useEffect } from 'react';
import { Save, Globe, RefreshCw, Sparkles, Image as ImageIcon } from 'lucide-react';
import { portfolioApi } from '../../services/portfolioApi';
import ImageUploader from '../components/ImageUploader';

export default function SettingsManager({ showToast }) {
  const [settings, setSettings] = useState({
    websiteTitle: '',
    websiteDescription: '',
    faviconUrl: '',
    logoUrl: '',
    footerText: '',
    copyrightNotice: '',
    seoTitle: '',
    seoDescription: '',
    ogImageUrl: '',
    isPublished: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const data = await portfolioApi.getSettings();
      if (data) setSettings(data);
    } catch (err) {
      showToast?.(err.message || 'Failed to load website settings', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const saved = await portfolioApi.updateSettings(settings);
      setSettings(saved);
      showToast?.('Website & SEO settings updated successfully!', 'success');
    } catch (err) {
      showToast?.(err.message || 'Failed to save settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-slate-400">
        <RefreshCw className="w-6 h-6 animate-spin mr-2 text-cyan-400" />
        <span>Loading website settings...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 animate-fade-in max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-purple-400">Site Configuration</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Website Settings & SEO</h1>
          <p className="text-xs sm:text-sm text-slate-400">Customize document titles, SEO metadata, Open Graph preview image, and footer notices.</p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-purple-900/30 transition-all self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      {/* Global Branding & Footer */}
      <div className="glass-card rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-5">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Globe className="w-4 h-4 text-cyan-400" />
          <span>General Branding & Footer</span>
        </h3>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Website Title (Browser Tab Default)</label>
            <input
              type="text"
              name="websiteTitle"
              value={settings.websiteTitle || ''}
              onChange={handleChange}
              placeholder="Shankar Chaudhary | Software & Full Stack Developer"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Footer Tagline</label>
              <input
                type="text"
                name="footerText"
                value={settings.footerText || ''}
                onChange={handleChange}
                placeholder="Crafted with React, Tailwind CSS, Java Spring Boot & Clean Architecture"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Copyright Text</label>
              <input
                type="text"
                name="copyrightNotice"
                value={settings.copyrightNotice || ''}
                onChange={handleChange}
                placeholder="All rights reserved."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SEO & Social Sharing */}
      <div className="glass-card rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-5">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>SEO & Search Engine Metadata</span>
        </h3>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">SEO Meta Title</label>
            <input
              type="text"
              name="seoTitle"
              value={settings.seoTitle || ''}
              onChange={handleChange}
              placeholder="Shankar Chaudhary - Portfolio & Software Engineering Projects"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">SEO Meta Description</label>
            <textarea
              name="seoDescription"
              rows={3}
              value={settings.seoDescription || ''}
              onChange={handleChange}
              placeholder="Personal portfolio of Shankar Chaudhary, showcasing full-stack projects in React, Spring Boot, and Node.js..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 resize-y"
            />
          </div>

          <div className="space-y-1.5">
            <ImageUploader
              value={settings.ogImageUrl}
              onChange={(url) => setSettings((prev) => ({ ...prev, ogImageUrl: url }))}
              category="branding"
              label="Open Graph / Social Sharing Image"
              aspectHint="1200x630 (1.91:1 ratio)"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-xl shadow-purple-900/30 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save All Settings'}</span>
        </button>
      </div>
    </form>
  );
}

