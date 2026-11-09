import React, { useState, useEffect } from 'react';
import { Save, Mail, Phone, MapPin, Github, Linkedin, Instagram, Twitter, RefreshCw } from 'lucide-react';
import { portfolioApi } from '../../services/portfolioApi';

export default function ContactManager({ showToast }) {
  const [contact, setContact] = useState({
    email: '',
    mobileNumber: '',
    location: '',
    locationDisplay: '',
    heading: '',
    shortMessage: '',
    githubUrl: '',
    linkedinUrl: '',
    instagramUrl: '',
    twitterUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadContact();
  }, []);

  const loadContact = async () => {
    setLoading(true);
    try {
      const data = await portfolioApi.getContactInfo();
      if (data) setContact(data);
    } catch (err) {
      showToast?.(err.message || 'Failed to load contact info', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const saved = await portfolioApi.updateContactInfo(contact);
      setContact(saved);
      showToast?.('Contact details & social profiles updated successfully!', 'success');
    } catch (err) {
      showToast?.(err.message || 'Failed to update contact info', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-slate-400">
        <RefreshCw className="w-6 h-6 animate-spin mr-2 text-cyan-400" />
        <span>Loading contact info...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 animate-fade-in max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">Channels & Profiles</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Contact & Social Links</h1>
          <p className="text-xs sm:text-sm text-slate-400">Manage email, phone, location, and social links. Empty fields automatically hide on the public site.</p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-purple-900/30 transition-all self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Contact Details'}</span>
        </button>
      </div>

      {/* Headings */}
      <div className="glass-card rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white">Contact Page Headings</h3>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Heading</label>
            <input
              type="text"
              name="heading"
              value={contact.heading || ''}
              onChange={handleChange}
              placeholder="Let's Connect & Build Something Great"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Short Introduction / Message</label>
            <textarea
              name="shortMessage"
              rows={3}
              value={contact.shortMessage || ''}
              onChange={handleChange}
              placeholder="Whether you have a question about my projects..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 resize-y"
            />
          </div>
        </div>
      </div>

      {/* Direct Contact Channels */}
      <div className="glass-card rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-5">
        <h3 className="text-base font-bold text-white">Direct Communication Channels</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              name="email"
              value={contact.email || ''}
              onChange={handleChange}
              placeholder="shankar@example.com"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Mobile / Phone (Leave empty to hide)</span>
            </label>
            <input
              type="tel"
              name="mobileNumber"
              value={contact.mobileNumber || ''}
              onChange={handleChange}
              placeholder="+91 99053 40058"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Location (Country)</span>
            </label>
            <input
              type="text"
              name="location"
              value={contact.location || ''}
              onChange={handleChange}
              placeholder="India"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">City / State Display</label>
            <input
              type="text"
              name="locationDisplay"
              value={contact.locationDisplay || ''}
              onChange={handleChange}
              placeholder="New Delhi, India"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* Social Media Profiles */}
      <div className="glass-card rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-5">
        <h3 className="text-base font-bold text-white">Social Media Profiles</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5 text-purple-400" />
              <span>GitHub Profile URL</span>
            </label>
            <input
              type="url"
              name="githubUrl"
              value={contact.githubUrl || ''}
              onChange={handleChange}
              placeholder="https://github.com/shankarchaudhary"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5 text-blue-400" />
              <span>LinkedIn Profile URL</span>
            </label>
            <input
              type="url"
              name="linkedinUrl"
              value={contact.linkedinUrl || ''}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/shankarchaudhary"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <span>Instagram Profile URL (Optional)</span>
            </label>
            <input
              type="url"
              name="instagramUrl"
              value={contact.instagramUrl || ''}
              onChange={handleChange}
              placeholder="https://instagram.com/username"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Twitter className="w-3.5 h-3.5 text-sky-400" />
              <span>Twitter / X Profile URL (Optional)</span>
            </label>
            <input
              type="url"
              name="twitterUrl"
              value={contact.twitterUrl || ''}
              onChange={handleChange}
              placeholder="https://x.com/username"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
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
          <span>{saving ? 'Saving...' : 'Save All Contact Channels'}</span>
        </button>
      </div>
    </form>
  );
}

