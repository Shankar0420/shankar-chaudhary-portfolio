import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Copy,
  FolderGit2,
  Star,
  Eye,
  EyeOff,
  ExternalLink,
  Github,
  Video,
  ChevronUp,
  ChevronDown,
  X,
  RefreshCw,
  Tag,
  Image as ImageIcon
} from 'lucide-react';
import { portfolioApi } from '../../services/portfolioApi';
import ConfirmModal from '../components/ConfirmModal';
import ImageUploader from '../components/ImageUploader';

export default function ProjectManager({ showToast }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [saving, setSaving] = useState(false);

  // Helper for technology tags in editor
  const [techInput, setTechInput] = useState('');
  // Helper for highlight bullets in editor
  const [highlightInput, setHighlightInput] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await portfolioApi.getProjectsList();
      setProjects(data || []);
    } catch (err) {
      showToast?.(err.message || 'Failed to load projects', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingItem({
      title: '',
      slug: '',
      category: 'Full Stack Web Application',
      shortDescription: '',
      detailedDescription: '',
      thumbnailUrl: '',
      screenshotsJson: '[]',
      technologiesJson: '["React", "Java", "Spring Boot", "MySQL"]',
      highlightsJson: '[]',
      githubUrl: '',
      liveDemoUrl: '',
      videoUrl: '',
      startDate: '',
      completionDate: '',
      projectStatus: 'Completed',
      featured: true,
      isPublished: true,
      displayOrder: projects.length + 1
    });
    setTechInput('');
    setHighlightInput('');
  };

  const handleOpenEdit = (project) => {
    setEditingItem({ ...project });
    setTechInput('');
    setHighlightInput('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingItem.title?.trim()) {
      showToast?.('Project title is required', 'error');
      return;
    }

    setSaving(true);
    try {
      if (editingItem.id) {
        await portfolioApi.updateProject(editingItem.id, editingItem);
        showToast?.('Project updated successfully', 'success');
      } else {
        await portfolioApi.createProject(editingItem);
        showToast?.('Project created successfully', 'success');
      }
      setEditingItem(null);
      loadProjects();
    } catch (err) {
      showToast?.(err.message || 'Failed to save project', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDuplicate = async (id) => {
    try {
      await portfolioApi.duplicateProject(id);
      showToast?.('Project duplicated as draft', 'success');
      loadProjects();
    } catch (err) {
      showToast?.(err.message || 'Failed to duplicate project', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await portfolioApi.deleteProject(deleteTargetId);
      showToast?.('Project deleted', 'success');
      setDeleteTargetId(null);
      loadProjects();
    } catch (err) {
      showToast?.(err.message || 'Failed to delete project', 'error');
    }
  };

  const handleTogglePublished = async (project) => {
    try {
      const updated = { ...project, isPublished: !project.isPublished };
      await portfolioApi.updateProject(project.id, updated);
      showToast?.(`${project.title} is now ${updated.isPublished ? 'published live' : 'saved as draft'}`, 'success');
      loadProjects();
    } catch (err) {
      showToast?.(err.message || 'Failed to toggle project visibility', 'error');
    }
  };

  const handleToggleFeatured = async (project) => {
    try {
      const updated = { ...project, featured: !project.featured };
      await portfolioApi.updateProject(project.id, updated);
      showToast?.(`${project.title} ${updated.featured ? 'featured on homepage' : 'removed from homepage'}`, 'success');
      loadProjects();
    } catch (err) {
      showToast?.(err.message || 'Failed to toggle featured status', 'error');
    }
  };

  // Parsing helpers
  const parseJsonArray = (str) => {
    if (!str) return [];
    if (Array.isArray(str)) return str;
    try { return JSON.parse(str); } catch { return []; }
  };

  const addTechTag = (tag) => {
    if (!tag.trim()) return;
    const current = parseJsonArray(editingItem.technologiesJson);
    if (!current.includes(tag.trim())) {
      const updated = [...current, tag.trim()];
      setEditingItem({ ...editingItem, technologiesJson: JSON.stringify(updated) });
    }
    setTechInput('');
  };

  const removeTechTag = (tagToRemove) => {
    const current = parseJsonArray(editingItem.technologiesJson);
    const updated = current.filter(t => t !== tagToRemove);
    setEditingItem({ ...editingItem, technologiesJson: JSON.stringify(updated) });
  };

  const addHighlight = (text) => {
    if (!text.trim()) return;
    const current = parseJsonArray(editingItem.highlightsJson);
    const updated = [...current, text.trim()];
    setEditingItem({ ...editingItem, highlightsJson: JSON.stringify(updated) });
    setHighlightInput('');
  };

  const removeHighlight = (idxToRemove) => {
    const current = parseJsonArray(editingItem.highlightsJson);
    const updated = current.filter((_, idx) => idx !== idxToRemove);
    setEditingItem({ ...editingItem, highlightsJson: JSON.stringify(updated) });
  };

  const addScreenshot = (url) => {
    if (!url) return;
    const current = parseJsonArray(editingItem.screenshotsJson);
    const updated = [...current, url];
    setEditingItem({ ...editingItem, screenshotsJson: JSON.stringify(updated) });
  };

  const removeScreenshot = (idxToRemove) => {
    const current = parseJsonArray(editingItem.screenshotsJson);
    const updated = current.filter((_, idx) => idx !== idxToRemove);
    setEditingItem({ ...editingItem, screenshotsJson: JSON.stringify(updated) });
  };

  const handleMoveOrder = async (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const currentProject = projects[index];
    const targetProject = projects[targetIndex];

    const currentOrder = currentProject.displayOrder || (index + 1);
    const targetOrder = targetProject.displayOrder || (targetIndex + 1);

    try {
      await portfolioApi.updateProject(currentProject.id, { ...currentProject, displayOrder: targetOrder });
      await portfolioApi.updateProject(targetProject.id, { ...targetProject, displayOrder: currentOrder });
      showToast?.('Project display order updated', 'success');
      loadProjects();
    } catch (err) {
      showToast?.('Failed to reorder projects', 'error');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-purple-400">Portfolio Showcase</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Project Management</h1>
          <p className="text-xs sm:text-sm text-slate-400">Add, edit, duplicate, upload screenshots, and manage technology stacks for all projects.</p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-purple-950/40 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Editor Modal / Inline Form */}
      {editingItem && (
        <form onSubmit={handleSave} className="glass-card rounded-3xl p-6 sm:p-8 border border-cyan-500/40 space-y-6 bg-[#090e24]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-cyan-400" />
              <span>{editingItem.id ? 'Edit Project Details' : 'Create New Project'}</span>
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
              <label className="text-xs font-medium text-slate-300">Project Title *</label>
              <input
                type="text"
                value={editingItem.title || ''}
                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                placeholder="Smart Learning Management System (LMS)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 font-semibold"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Category</label>
              <input
                type="text"
                value={editingItem.category || ''}
                onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                placeholder="Full Stack • Java Spring Boot"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Status</label>
              <select
                value={editingItem.projectStatus || 'Completed'}
                onChange={(e) => setEditingItem({ ...editingItem, projectStatus: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Maintained">Maintained</option>
              </select>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-medium text-slate-300">Short Summary</label>
              <textarea
                rows={2}
                value={editingItem.shortDescription || ''}
                onChange={(e) => setEditingItem({ ...editingItem, shortDescription: e.target.value })}
                placeholder="A complete learning management platform designed to manage students, teachers..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 resize-y"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-medium text-slate-300">Detailed Description / Architecture Overview</label>
              <textarea
                rows={3}
                value={editingItem.detailedDescription || ''}
                onChange={(e) => setEditingItem({ ...editingItem, detailedDescription: e.target.value })}
                placeholder="Detailed explanation of system architecture, database design, and key modules..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 resize-y"
              />
            </div>
          </div>

          {/* Thumbnail & Multiple Screenshots Upload */}
          <div className="space-y-4 pt-2 border-t border-slate-800">
            <ImageUploader
              value={editingItem.thumbnailUrl}
              onChange={(url) => setEditingItem({ ...editingItem, thumbnailUrl: url })}
              category="projects"
              label="Project Main Cover Thumbnail"
              aspectHint="16:9 Aspect Ratio"
            />

            {/* Multiple Screenshots Gallery */}
            <div className="space-y-2 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Multiple Project Screenshots ({parseJsonArray(editingItem.screenshotsJson).length})</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">Click &times; to remove individual screenshot</span>
              </label>

              {parseJsonArray(editingItem.screenshotsJson).length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                  {parseJsonArray(editingItem.screenshotsJson).map((ssUrl, ssIdx) => (
                    <div key={ssIdx} className="relative group rounded-xl overflow-hidden border border-slate-800 aspect-video bg-slate-900">
                      <img src={ssUrl} alt={`Screenshot ${ssIdx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeScreenshot(ssIdx)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-rose-600/90 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove screenshot"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-2">
                <ImageUploader
                  value=""
                  onChange={(url) => addScreenshot(url)}
                  category="projects"
                  label="Upload Additional Project Screenshot"
                  aspectHint="Upload another screenshot to append to gallery"
                />
              </div>
            </div>
          </div>

          {/* Technology Tags Editor */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-cyan-400" />
              <span>Technologies Used</span>
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {parseJsonArray(editingItem.technologiesJson).map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono bg-slate-950 text-cyan-300 border border-slate-800"
                >
                  <span>{tech}</span>
                  <button
                    type="button"
                    onClick={() => removeTechTag(tech)}
                    className="hover:text-rose-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTechTag(techInput); }}}
                placeholder="Type technology (e.g. Docker, PostgreSQL) and press Add or Enter"
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
              <button
                type="button"
                onClick={() => addTechTag(techInput)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200"
              >
                Add Tag
              </button>
            </div>
          </div>

          {/* Highlights Bullet Points */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="text-xs font-medium text-slate-300">Key Features / Architecture Bullet Points</label>
            <div className="space-y-1.5 mb-2">
              {parseJsonArray(editingItem.highlightsJson).map((hl, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-300">
                  <span className="truncate">• {hl}</span>
                  <button type="button" onClick={() => removeHighlight(idx)} className="text-slate-500 hover:text-rose-400">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={highlightInput}
                onChange={(e) => setHighlightInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addHighlight(highlightInput); }}}
                placeholder="e.g. Role-based academic workflows for instructors"
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
              <button
                type="button"
                onClick={() => addHighlight(highlightInput)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200"
              >
                Add Bullet
              </button>
            </div>
          </div>

          {/* URLs & Video Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-800">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-purple-400" />
                <span>GitHub Repository URL</span>
              </label>
              <input
                type="url"
                value={editingItem.githubUrl || ''}
                onChange={(e) => setEditingItem({ ...editingItem, githubUrl: e.target.value })}
                placeholder="https://github.com/shankarchaudhary/project-name"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                <span>Live Demo / Production URL</span>
              </label>
              <input
                type="url"
                value={editingItem.liveDemoUrl || ''}
                onChange={(e) => setEditingItem({ ...editingItem, liveDemoUrl: e.target.value })}
                placeholder="https://project-demo.vercel.app"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-rose-400" />
                <span>Video / Demo Link (YouTube, Loom, MP4)</span>
              </label>
              <input
                type="url"
                value={editingItem.videoUrl || ''}
                onChange={(e) => setEditingItem({ ...editingItem, videoUrl: e.target.value })}
                placeholder="https://youtube.com/watch?v=... or Loom"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-rose-300 focus:outline-none focus:border-rose-400"
              />
            </div>
          </div>

          {/* Display Order and Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Display Order</label>
              <input
                type="number"
                value={editingItem.displayOrder ?? 0}
                onChange={(e) => setEditingItem({ ...editingItem, displayOrder: parseInt(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Visibility and Featured Toggles */}
          <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-slate-800">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
              <input
                type="checkbox"
                checked={editingItem.featured || false}
                onChange={(e) => setEditingItem({ ...editingItem, featured: e.target.checked })}
                className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-purple-600"
              />
              <span>Feature on Homepage Work showcase</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
              <input
                type="checkbox"
                checked={editingItem.isPublished !== false}
                onChange={(e) => setEditingItem({ ...editingItem, isPublished: e.target.checked })}
                className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-cyan-600"
              />
              <span>Published (Visible publicly)</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="px-4 py-2.5 rounded-xl text-xs font-medium bg-slate-800 text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white"
            >
              {saving ? 'Saving...' : 'Save Project'}
            </button>
          </div>
        </form>
      )}

      {/* Projects List */}
      {loading ? (
        <div className="text-center py-12 text-slate-400">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-cyan-400" />
          <span>Loading projects...</span>
        </div>
      ) : projects.length === 0 ? (
        <div className="glass-card rounded-3xl p-10 text-center border border-slate-800 space-y-3">
          <FolderGit2 className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No Projects Found</h3>
          <p className="text-xs text-slate-400">Click &ldquo;Add New Project&rdquo; to showcase your software work.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className={`glass-card rounded-3xl p-5 border flex flex-col justify-between gap-4 ${
                project.isPublished ? 'border-slate-800' : 'border-dashed border-slate-700/60 opacity-65'
              }`}
            >
              <div className="space-y-3.5">
                {/* Thumbnail Preview */}
                <div className="aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 relative">
                  {project.thumbnailUrl ? (
                    <img src={project.thumbnailUrl} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 text-xs">
                      <FolderGit2 className="w-8 h-8 mb-1" />
                      <span>No screenshot uploaded</span>
                    </div>
                  )}

                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    {project.featured && (
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" /> Featured
                      </span>
                    )}
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono backdrop-blur-md ${
                      project.isPublished
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-900/90 text-slate-400 border border-slate-700'
                    }`}>
                      {project.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-mono text-purple-300 uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="text-base font-bold text-white mt-0.5">{project.title}</h3>
                  <p className="text-xs text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {parseJsonArray(project.technologiesJson).map((tech) => (
                    <span key={tech} className="px-2 py-0.5 rounded-lg text-[10px] font-mono bg-slate-950 text-cyan-300 border border-slate-800">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Controls */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-slate-400">
                  <button
                    type="button"
                    onClick={() => handleToggleFeatured(project)}
                    className={`p-1.5 rounded-lg ${project.featured ? 'text-amber-400 bg-amber-500/10' : 'hover:text-white'}`}
                    title="Toggle Homepage Featured"
                  >
                    <Star className="w-4 h-4 fill-current" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTogglePublished(project)}
                    className={`p-1.5 rounded-lg ${project.isPublished ? 'text-emerald-400' : 'text-slate-500 hover:text-white'}`}
                    title={project.isPublished ? "Published (click to unpublish)" : "Draft (click to publish)"}
                  >
                    {project.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleMoveOrder(idx, -1)}
                    disabled={idx === 0}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move Project Up in Order"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleMoveOrder(idx, 1)}
                    disabled={idx === projects.length - 1}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move Project Down in Order"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDuplicate(project.id)}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800"
                    title="Duplicate Project"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenEdit(project)}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800"
                    title="Edit Project"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteTargetId(project.id)}
                    className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 border border-slate-800"
                    title="Delete Project"
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
        title="Delete Project"
        message="Are you sure you want to permanently delete this project? This will remove it from all public pages."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}

