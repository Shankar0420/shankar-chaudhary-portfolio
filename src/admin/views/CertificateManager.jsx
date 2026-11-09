import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Award, ExternalLink, RefreshCw, X, Eye, EyeOff } from 'lucide-react';
import { portfolioApi } from '../../services/portfolioApi';
import ConfirmModal from '../components/ConfirmModal';
import ImageUploader from '../components/ImageUploader';

export default function CertificateManager({ showToast }) {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    setLoading(true);
    try {
      const data = await portfolioApi.getCertificatesList();
      setCertificates(data || []);
    } catch (err) {
      showToast?.(err.message || 'Failed to load certificates', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingItem({
      title: '',
      issuingOrganization: '',
      issueDate: '',
      description: '',
      fileUrl: '',
      verificationUrl: '',
      isPublished: true,
      displayOrder: certificates.length + 1
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingItem.title?.trim()) {
      showToast?.('Certificate title is required', 'error');
      return;
    }

    setSaving(true);
    try {
      if (editingItem.id) {
        await portfolioApi.updateCertificate(editingItem.id, editingItem);
        showToast?.('Certificate updated successfully', 'success');
      } else {
        await portfolioApi.createCertificate(editingItem);
        showToast?.('Certificate added successfully', 'success');
      }
      setEditingItem(null);
      loadCertificates();
    } catch (err) {
      showToast?.(err.message || 'Failed to save certificate', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await portfolioApi.deleteCertificate(deleteTargetId);
      showToast?.('Certificate removed', 'success');
      setDeleteTargetId(null);
      loadCertificates();
    } catch (err) {
      showToast?.(err.message || 'Failed to delete certificate', 'error');
    }
  };

  const handleTogglePublished = async (cert) => {
    try {
      const updated = { ...cert, isPublished: !cert.isPublished };
      await portfolioApi.updateCertificate(cert.id, updated);
      showToast?.(`Certificate is now ${updated.isPublished ? 'published' : 'hidden'}`, 'success');
      loadCertificates();
    } catch (err) {
      showToast?.(err.message || 'Failed to toggle visibility', 'error');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400">Credentials & Awards</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Certificate Management</h1>
          <p className="text-xs sm:text-sm text-slate-400">Upload and manage PDF, PNG, and JPG certificates, courses, and verification links.</p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-purple-950/40 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Certificate</span>
        </button>
      </div>

      {/* Editor Modal / Inline Form */}
      {editingItem && (
        <form onSubmit={handleSave} className="glass-card rounded-3xl p-6 sm:p-7 border border-cyan-500/40 space-y-4 bg-[#090e24]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>{editingItem.id ? 'Edit Certificate' : 'Upload New Certificate'}</span>
            </h3>
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-medium text-slate-300">Certificate Name / Course Title *</label>
              <input
                type="text"
                value={editingItem.title || ''}
                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                placeholder="e.g. AWS Certified Cloud Practitioner / Full Stack Web Development"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 font-semibold"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Issuing Organization</label>
              <input
                type="text"
                value={editingItem.issuingOrganization || ''}
                onChange={(e) => setEditingItem({ ...editingItem, issuingOrganization: e.target.value })}
                placeholder="e.g. Amazon Web Services / Coursera / Oracle"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Issue Date / Year</label>
              <input
                type="text"
                value={editingItem.issueDate || ''}
                onChange={(e) => setEditingItem({ ...editingItem, issueDate: e.target.value })}
                placeholder="e.g. 2025"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-medium text-slate-300">Public Verification URL</label>
              <input
                type="url"
                value={editingItem.verificationUrl || ''}
                onChange={(e) => setEditingItem({ ...editingItem, verificationUrl: e.target.value })}
                placeholder="https://example.com/verify/cert123"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-medium text-slate-300">Description</label>
              <textarea
                rows={2}
                value={editingItem.description || ''}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                placeholder="Key competencies demonstrated, modules mastered, etc."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 resize-y"
              />
            </div>
          </div>

          {/* Certificate File Upload */}
          <div className="pt-2 border-t border-slate-800">
            <ImageUploader
              value={editingItem.fileUrl}
              onChange={(url) => setEditingItem({ ...editingItem, fileUrl: url })}
              category="certificates"
              label="Certificate Document / Image"
              accept=".pdf,image/*"
              aspectHint="PDF document or PNG/JPG image"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isPublishedCert"
              checked={editingItem.isPublished !== false}
              onChange={(e) => setEditingItem({ ...editingItem, isPublished: e.target.checked })}
              className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-purple-600"
            />
            <label htmlFor="isPublishedCert" className="text-xs text-slate-300 cursor-pointer">
              Publish on public About page
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="px-4 py-2 rounded-xl text-xs font-medium bg-slate-800 text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white"
            >
              {saving ? 'Saving...' : 'Save Certificate'}
            </button>
          </div>
        </form>
      )}

      {/* Certificates List */}
      {loading ? (
        <div className="text-center py-12 text-slate-400">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-cyan-400" />
          <span>Loading certificates...</span>
        </div>
      ) : certificates.length === 0 ? (
        <div className="glass-card rounded-3xl p-10 text-center border border-slate-800 space-y-3">
          <Award className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No Certificates Added Yet</h3>
          <p className="text-xs text-slate-400">Click &ldquo;Upload Certificate&rdquo; above to attach your verified credentials.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className={`glass-card rounded-2xl p-5 border flex flex-col justify-between gap-4 ${
                cert.isPublished ? 'border-slate-800' : 'border-dashed border-slate-700/60 opacity-60'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300 shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white leading-snug">{cert.title}</h3>
                      <p className="text-xs text-slate-400">{cert.issuingOrganization}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleTogglePublished(cert)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      cert.isPublished ? 'text-emerald-400' : 'text-slate-500 hover:text-white'
                    }`}
                    title={cert.isPublished ? "Published (click to unpublish)" : "Draft (click to publish)"}
                  >
                    {cert.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>

                {cert.description && (
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{cert.description}</p>
                )}

                <div className="flex flex-wrap items-center gap-3 text-xs pt-1 font-mono">
                  {cert.issueDate && <span className="text-cyan-300">Issued: {cert.issueDate}</span>}
                  {cert.verificationUrl && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-300 hover:underline inline-flex items-center gap-1"
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                {cert.fileUrl ? (
                  <a
                    href={cert.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 hover:underline inline-flex items-center gap-1 text-[11px]"
                  >
                    <span>View Document</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-[11px] text-slate-500">No document attached</span>
                )}

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setEditingItem(cert)}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTargetId(cert.id)}
                    className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 border border-slate-800"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Certificate"
        message="Are you sure you want to remove this certificate record?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}

