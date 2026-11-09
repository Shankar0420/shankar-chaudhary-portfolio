import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Cpu, Eye, EyeOff, Star, RefreshCw, X, Layers } from 'lucide-react';
import { portfolioApi } from '../../services/portfolioApi';
import ConfirmModal from '../components/ConfirmModal';

const CATEGORIES = [
  "Programming Languages",
  "Frontend Development",
  "Backend Development",
  "Databases",
  "Frameworks",
  "Developer Tools",
  "Other Technical Skills"
];

const PRESET_ICONS = {
  "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  "Spring Boot": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
  "React": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  "HTML": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  "CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  "Express.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
  "MySQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  "MariaDB": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mariadb/mariadb-original.svg",
  "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  "GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  "VS Code": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
  "IntelliJ IDEA": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg",
  "C": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
  "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
};

export default function SkillsManager({ showToast }) {
  const [skills, setSkills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    setLoading(true);
    try {
      const data = await portfolioApi.getSkillsList();
      setSkills(data || []);
    } catch (err) {
      showToast?.(err.message || 'Failed to load skills', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingItem({
      name: '',
      category: CATEGORIES[0],
      iconUrl: '',
      skillLevel: 'Proficient',
      description: '',
      displayOrder: skills.length + 1,
      featured: false,
      isPublished: true
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingItem.id) {
        await portfolioApi.updateSkill(editingItem.id, editingItem);
        showToast?.('Skill updated successfully', 'success');
      } else {
        await portfolioApi.createSkill(editingItem);
        showToast?.('Skill created successfully', 'success');
      }
      setEditingItem(null);
      loadSkills();
    } catch (err) {
      showToast?.(err.message || 'Failed to save skill', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await portfolioApi.deleteSkill(deleteTargetId);
      showToast?.('Skill removed successfully', 'success');
      setDeleteTargetId(null);
      loadSkills();
    } catch (err) {
      showToast?.(err.message || 'Failed to delete skill', 'error');
    }
  };

  const handleTogglePublished = async (skill) => {
    try {
      const updated = { ...skill, isPublished: !skill.isPublished };
      await portfolioApi.updateSkill(skill.id, updated);
      showToast?.(`${skill.name} is now ${updated.isPublished ? 'published' : 'hidden'}`, 'success');
      loadSkills();
    } catch (err) {
      showToast?.(err.message || 'Failed to toggle visibility', 'error');
    }
  };

  const handleToggleFeatured = async (skill) => {
    try {
      const updated = { ...skill, featured: !skill.featured };
      await portfolioApi.updateSkill(skill.id, updated);
      showToast?.(`${skill.name} ${updated.featured ? 'added to' : 'removed from'} homepage featured section`, 'success');
      loadSkills();
    } catch (err) {
      showToast?.(err.message || 'Failed to toggle featured status', 'error');
    }
  };

  const filteredSkills = selectedCategory === "all"
    ? skills
    : skills.filter((s) => s.category === selectedCategory);

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">Technical Stack</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Skills Management</h1>
          <p className="text-xs sm:text-sm text-slate-400">Add, edit, reorder, or hide technical skills. Toggle featured skills for the homepage.</p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-purple-950/40 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Skill</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSelectedCategory("all")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
            selectedCategory === "all"
              ? "bg-purple-600 text-white shadow-md shadow-purple-950/40"
              : "bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
          }`}
        >
          All Categories ({skills.length})
        </button>
        {CATEGORIES.map((cat) => {
          const count = skills.filter((s) => s.category === cat).length;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-purple-600 text-white shadow-md shadow-purple-950/40"
                  : "bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Editor Modal */}
      {editingItem && (
        <form onSubmit={handleSave} className="glass-card rounded-3xl p-6 sm:p-7 border border-cyan-500/40 space-y-4 bg-[#090e24]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <span>{editingItem.id ? 'Edit Skill' : 'Add New Skill'}</span>
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
              <label className="text-xs font-medium text-slate-300">Skill Name *</label>
              <input
                type="text"
                value={editingItem.name || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  const autoIcon = PRESET_ICONS[val] || editingItem.iconUrl;
                  setEditingItem({ ...editingItem, name: val, iconUrl: autoIcon });
                }}
                placeholder="e.g. Java Spring Boot"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Category *</label>
              <select
                value={editingItem.category || CATEGORIES[0]}
                onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Skill Level / Proficiency</label>
              <select
                value={editingItem.skillLevel || 'Proficient'}
                onChange={(e) => setEditingItem({ ...editingItem, skillLevel: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400"
              >
                {['Beginner', 'Familiar', 'Intermediate', 'Proficient', 'Advanced'].map((lvl) => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-medium text-slate-300">Icon URL (SVG / PNG / CDN)</label>
              <input
                type="url"
                value={editingItem.iconUrl || ''}
                onChange={(e) => setEditingItem({ ...editingItem, iconUrl: e.target.value })}
                placeholder="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-medium text-slate-300">Description</label>
              <textarea
                rows={2}
                value={editingItem.description || ''}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                placeholder="Briefly describe how you use this technology in real projects..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 resize-y"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
              <input
                type="checkbox"
                checked={editingItem.featured || false}
                onChange={(e) => setEditingItem({ ...editingItem, featured: e.target.checked })}
                className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-purple-600"
              />
              <span>Feature on Homepage grid</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
              <input
                type="checkbox"
                checked={editingItem.isPublished !== false}
                onChange={(e) => setEditingItem({ ...editingItem, isPublished: e.target.checked })}
                className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-cyan-600"
              />
              <span>Visible on public site</span>
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
              {saving ? 'Saving...' : 'Save Skill'}
            </button>
          </div>
        </form>
      )}

      {/* Grid */}
      {loading ? (
        <div className="text-center py-12 text-slate-400">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-cyan-400" />
          <span>Loading skills...</span>
        </div>
      ) : filteredSkills.length === 0 ? (
        <div className="glass-card rounded-3xl p-10 text-center border border-slate-800 space-y-3">
          <Cpu className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No skills in this category</h3>
          <p className="text-xs text-slate-400">Click &ldquo;Add New Skill&rdquo; to create an entry.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className={`glass-card rounded-2xl p-4 sm:p-5 border flex flex-col justify-between gap-3 ${
                skill.isPublished ? 'border-slate-800' : 'border-dashed border-slate-700/60 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-slate-950 border border-slate-800 p-2 flex items-center justify-center shrink-0">
                    {skill.iconUrl ? (
                      <img src={skill.iconUrl} alt={skill.name} className="w-full h-full object-contain" />
                    ) : (
                      <Cpu className="w-5 h-5 text-cyan-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{skill.name}</h3>
                    <span className="text-[11px] font-mono text-purple-300">{skill.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleToggleFeatured(skill)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      skill.featured ? 'text-amber-400 bg-amber-500/10' : 'text-slate-500 hover:text-slate-300'
                    }`}
                    title={skill.featured ? "Featured on Home (Click to unfeature)" : "Not featured (Click to feature on Home)"}
                  >
                    <Star className="w-4 h-4 fill-current" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTogglePublished(skill)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      skill.isPublished ? 'text-emerald-400 hover:text-slate-400' : 'text-slate-500 hover:text-emerald-400'
                    }`}
                    title={skill.isPublished ? "Visible (Click to hide)" : "Hidden (Click to publish)"}
                  >
                    {skill.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {skill.description && (
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{skill.description}</p>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                <span className="text-[11px] font-mono text-slate-400">
                  {skill.isPublished ? '● Published' : '○ Draft'}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setEditingItem(skill)}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTargetId(skill.id)}
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
        title="Delete Skill"
        message="Are you sure you want to remove this skill from your portfolio?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}

