import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, GraduationCap, Calendar, MapPin, Check, X, RefreshCw } from 'lucide-react';
import { portfolioApi } from '../../services/portfolioApi';
import ConfirmModal from '../components/ConfirmModal';
import ImageUploader from '../components/ImageUploader';

export default function EducationManager({ showToast }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadEducation();
  }, []);

  const loadEducation = async () => {
    setLoading(true);
    try {
      const data = await portfolioApi.getEducationList();
      setList(data || []);
    } catch (err) {
      showToast?.(err.message || 'Failed to load education records', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingItem({
      institution: '',
      university: '',
      degree: 'Bachelor of Technology (B.Tech)',
      branch: '',
      currentSemesterOrYear: '',
      startYear: '',
      endYear: '',
      dates: '',
      description: '',
      location: 'India',
      logoUrl: '',
      displayOrder: list.length + 1,
      isPublished: true
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingItem.id) {
        await portfolioApi.updateEducation(editingItem.id, editingItem);
        showToast?.('Education record updated successfully', 'success');
      } else {
        await portfolioApi.createEducation(editingItem);
        showToast?.('Education record created successfully', 'success');
      }
      setEditingItem(null);
      loadEducation();
    } catch (err) {
      showToast?.(err.message || 'Failed to save education record', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    setDeleting(true);
    try {
      await portfolioApi.deleteEducation(deleteTargetId);
      showToast?.('Education record deleted', 'success');
      setDeleteTargetId(null);
      loadEducation();
    } catch (err) {
      showToast?.(err.message || 'Failed to delete education record', 'error');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">Academic History</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Education Management</h1>
          <p className="text-xs sm:text-sm text-slate-400">Add and manage degree programs, colleges, branches, and timeline details.</p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-purple-950/40 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education Record</span>
        </button>
      </div>

      {/* Editor Modal / Inline Form */}
      {editingItem && (
        <form onSubmit={handleSave} className="glass-card rounded-3xl p-6 sm:p-7 border border-cyan-500/40 space-y-5 bg-[#090e24]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-cyan-400" />
              <span>{editingItem.id ? 'Edit Education Record' : 'Add New Education Record'}</span>
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
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Degree / Qualification *</label>
              <input
                type="text"
                value={editingItem.degree || ''}
                onChange={(e) => setEditingItem({ ...editingItem, degree: e.target.value })}
                placeholder="Bachelor of Technology (B.Tech)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Branch / Specialization</label>
              <input
                type="text"
                value={editingItem.branch || ''}
                onChange={(e) => setEditingItem({ ...editingItem, branch: e.target.value })}
                placeholder="Computer Science & Engineering"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">College / Institution *</label>
              <input
                type="text"
                value={editingItem.institution || ''}
                onChange={(e) => setEditingItem({ ...editingItem, institution: e.target.value })}
                placeholder="University / College Name"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Affiliated University</label>
              <input
                type="text"
                value={editingItem.university || ''}
                onChange={(e) => setEditingItem({ ...editingItem, university: e.target.value })}
                placeholder="State / Central University"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Dates / Years</label>
              <input
                type="text"
                value={editingItem.dates || ''}
                onChange={(e) => setEditingItem({ ...editingItem, dates: e.target.value })}
                placeholder="2022 - 2026"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Current Semester / Year</label>
              <input
                type="text"
                value={editingItem.currentSemesterOrYear || ''}
                onChange={(e) => setEditingItem({ ...editingItem, currentSemesterOrYear: e.target.value })}
                placeholder="6th Semester / 3rd Year"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Description / Focus Areas</label>
            <textarea
              rows={3}
              value={editingItem.description || ''}
              onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
              placeholder="Focusing on algorithms, object-oriented design in Java, and modern full-stack web architectures..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 resize-y"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isPublishedEdu"
              checked={editingItem.isPublished !== false}
              onChange={(e) => setEditingItem({ ...editingItem, isPublished: e.target.checked })}
              className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-purple-600"
            />
            <label htmlFor="isPublishedEdu" className="text-xs text-slate-300 cursor-pointer">
              Publish this qualification publicly
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
              {saving ? 'Saving...' : 'Save Record'}
            </button>
          </div>
        </form>
      )}

      {/* List */}
      {loading ? (
        <div className="text-center py-12 text-slate-400">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-cyan-400" />
          <span>Loading education records...</span>
        </div>
      ) : list.length === 0 ? (
        <div className="glass-card rounded-3xl p-10 text-center border border-slate-800 space-y-3">
          <GraduationCap className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No Education Records Yet</h3>
          <p className="text-xs text-slate-400">Click &ldquo;Add Education Record&rdquo; above to create your first entry.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {list.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-bold text-white">{item.degree}</h3>
                  {item.branch && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-purple-500/15 text-purple-300 border border-purple-500/30">
                      {item.branch}
                    </span>
                  )}
                  {!item.isPublished && (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      Draft (Hidden)
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-medium">
                  {item.institution} {item.university ? `• ${item.university}` : ''}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  {item.dates && (
                    <span className="inline-flex items-center gap-1 font-mono text-cyan-300">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.dates}
                    </span>
                  )}
                  {item.location && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.location}
                    </span>
                  )}
                </div>

                {item.description && (
                  <p className="text-xs text-slate-400 pt-1 line-clamp-2">{item.description}</p>
                )}
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => setEditingItem(item)}
                  className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
                  title="Edit record"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTargetId(item.id)}
                  className="p-2 rounded-xl text-rose-400 hover:bg-rose-500/15 border border-slate-800 hover:border-rose-500/30 transition-colors"
                  title="Delete record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Education Record"
        message="Are you sure you want to delete this educational qualification? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTargetId(null)}
        loading={deleting}
      />
    </div>
  );
}

