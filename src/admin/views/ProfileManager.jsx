import React, { useState, useEffect } from 'react';
import { Save, User, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';
import { portfolioApi } from '../../services/portfolioApi';
import ImageUploader from '../components/ImageUploader';

export default function ProfileManager({ showToast }) {
  const [profile, setProfile] = useState({
    fullName: '',
    displayName: '',
    professionalTitle: '',
    heroHeading: '',
    heroSubtitle: '',
    shortIntro: '',
    supportingText: '',
    detailedBio: '',
    developerOverview: '',
    developerJourney: '',
    currentStatus: '',
    location: '',
    careerObjective: '',
    profileImageUrl: '',
    aboutImageUrl: '',
    isPublished: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const data = await portfolioApi.getProfile();
      if (data) {
        setProfile(data);
      }
    } catch (err) {
      showToast?.(err.message || 'Failed to load profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const saved = await portfolioApi.updateProfile(profile);
      setProfile(saved);
      showToast?.('Profile updated successfully! Live website updated.', 'success');
    } catch (err) {
      showToast?.(err.message || 'Failed to save profile changes.', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-slate-400">
        <RefreshCw className="w-6 h-6 animate-spin mr-2 text-cyan-400" />
        <span>Loading personal profile data...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 animate-fade-in max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-purple-400">Personal Information</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Profile & Hero Details</h1>
          <p className="text-xs sm:text-sm text-slate-400">Manage names, professional titles, hero headlines, and profile photos.</p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-purple-900/30 transition-all self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
        </button>
      </div>

      {/* Profile Photos Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-cyan-400" />
            <span>Homepage Profile Photo</span>
          </h3>
          <ImageUploader
            value={profile.profileImageUrl}
            onChange={(url) => setProfile((prev) => ({ ...prev, profileImageUrl: url }))}
            category="profile"
            label="Profile Photograph"
            aspectHint="Square / portrait (4:5)"
          />
        </div>

        <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-purple-400" />
            <span>About Page Photograph</span>
          </h3>
          <ImageUploader
            value={profile.aboutImageUrl}
            onChange={(url) => setProfile((prev) => ({ ...prev, aboutImageUrl: url }))}
            category="profile"
            label="About Page Photo"
            aspectHint="Square / portrait (4:5)"
          />
        </div>
      </div>

      {/* Basic Identity Details */}
      <div className="glass-card rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-6">
        <h3 className="text-base font-bold text-white">Identity & Titles</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={profile.fullName || ''}
              onChange={handleChange}
              placeholder="Shankar Chaudhary"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Display / Short Name</label>
            <input
              type="text"
              name="displayName"
              value={profile.displayName || ''}
              onChange={handleChange}
              placeholder="Shankar"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Professional Title *</label>
            <input
              type="text"
              name="professionalTitle"
              value={profile.professionalTitle || ''}
              onChange={handleChange}
              placeholder="Aspiring Software Developer and Full Stack Developer"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Current Status & Availability</label>
            <input
              type="text"
              name="currentStatus"
              value={profile.currentStatus || ''}
              onChange={handleChange}
              placeholder="B.Tech Student • Available for software engineering opportunities"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Location</label>
            <input
              type="text"
              name="location"
              value={profile.location || ''}
              onChange={handleChange}
              placeholder="India"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Hero Section Headlines */}
      <div className="glass-card rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-6">
        <h3 className="text-base font-bold text-white">Hero Section Headlines</h3>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Hero Heading</label>
            <input
              type="text"
              name="heroHeading"
              value={profile.heroHeading || ''}
              onChange={handleChange}
              placeholder="Building Digital Experiences Through Code."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Hero Subtitle</label>
            <textarea
              name="heroSubtitle"
              rows={2}
              value={profile.heroSubtitle || ''}
              onChange={handleChange}
              placeholder="Crafting modern, accessible web applications and reliable software solutions with React, Spring Boot, Node.js, and clean code."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors resize-y"
            />
          </div>
        </div>
      </div>

      {/* Introductions & Biographies */}
      <div className="glass-card rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-6">
        <h3 className="text-base font-bold text-white">Introductions & Biographies</h3>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Short Introduction (Homepage & Footer)</label>
            <textarea
              name="shortIntro"
              rows={3}
              value={profile.shortIntro || ''}
              onChange={handleChange}
              placeholder="I am a passionate developer who enjoys building modern websites..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors resize-y"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Supporting Text</label>
            <textarea
              name="supportingText"
              rows={2}
              value={profile.supportingText || ''}
              onChange={handleChange}
              placeholder="Focused on writing clean, maintainable code across full-stack web architectures..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors resize-y"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Detailed Biography (About Me)</label>
            <textarea
              name="detailedBio"
              rows={4}
              value={profile.detailedBio || ''}
              onChange={handleChange}
              placeholder="Hello! I'm Shankar Chaudhary, an aspiring Software Developer..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors resize-y"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-xl shadow-purple-900/30 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save All Profile Changes'}</span>
        </button>
      </div>
    </form>
  );
}

