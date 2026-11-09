import React, { useState, useEffect } from 'react';
import {
  FileText,
  Upload,
  Download,
  Trash2,
  CheckCircle2,
  Eye,
  EyeOff,
  ExternalLink,
  Shield,
  Sparkles,
  RefreshCw,
  X
} from 'lucide-react';
import { portfolioApi } from '../../services/portfolioApi';
import ConfirmModal from '../components/ConfirmModal';

const DOC_CATEGORIES = ["Resume", "CV", "Certificate", "Academic", "Project Documentation", "Other"];

export default function DocumentManager({ showToast }) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Quick upload state
  const [selectedFile, setSelectedFile] = useState(null);
  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState('Resume');
  const [isResumeFlag, setIsResumeFlag] = useState(false);
  const [isPublicFlag, setIsPublicFlag] = useState(true);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    setLoading(true);
    try {
      const data = await portfolioApi.getDocumentsList();
      setDocuments(data || []);
    } catch (err) {
      showToast?.(err.message || 'Failed to load documents', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      showToast?.('Please choose a file to upload', 'error');
      return;
    }
    if (!docTitle.trim()) {
      showToast?.('Please provide a document title', 'error');
      return;
    }

    setUploading(true);
    try {
      // 1. Upload to storage
      const uploaded = await portfolioApi.uploadFile(selectedFile, 'documents');

      // 2. Create document record in database
      const newDoc = {
        title: docTitle.trim(),
        fileName: uploaded.originalFileName || selectedFile.name,
        fileType: uploaded.contentType || selectedFile.type,
        fileSize: uploaded.size || selectedFile.size,
        fileUrl: uploaded.fileUrl,
        documentCategory: docCategory,
        isResume: isResumeFlag || docCategory === 'Resume',
        isPublic: isPublicFlag
      };

      await portfolioApi.createDocument(newDoc);
      showToast?.('Document uploaded and saved successfully!', 'success');

      // Reset form
      setSelectedFile(null);
      setDocTitle('');
      setIsResumeFlag(false);
      loadDocuments();
    } catch (err) {
      showToast?.(err.message || 'Failed to upload document', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleSetActiveResume = async (id) => {
    try {
      await portfolioApi.setActiveResume(id);
      showToast?.('Primary resume updated! Public download button now points to this file.', 'success');
      loadDocuments();
    } catch (err) {
      showToast?.(err.message || 'Failed to set active resume', 'error');
    }
  };

  const handleToggleVisibility = async (id) => {
    try {
      await portfolioApi.toggleDocumentVisibility(id);
      showToast?.('Document visibility toggled', 'success');
      loadDocuments();
    } catch (err) {
      showToast?.(err.message || 'Failed to toggle visibility', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await portfolioApi.deleteDocument(deleteTargetId);
      showToast?.('Document removed', 'success');
      setDeleteTargetId(null);
      loadDocuments();
    } catch (err) {
      showToast?.(err.message || 'Failed to delete document', 'error');
    }
  };

  const activeResume = documents.find((d) => d.isResume && d.isPublic);

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">File Storage</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Resume & Document Management</h1>
          <p className="text-xs sm:text-sm text-slate-400">Upload PDF resumes, CVs, project reports, and academic credentials. Set your primary public resume.</p>
        </div>
      </div>

      {/* Active Resume Status Card */}
      <div className="glass-card rounded-3xl p-6 border border-purple-500/30 bg-gradient-to-r from-purple-950/20 via-[#0a0f26] to-[#090d1f] flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-cyan-300 shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">Active Public Resume</h3>
              {activeResume ? (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Live
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Not Configured
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {activeResume
                ? `${activeResume.title} (${activeResume.fileName}) — ${formatFileSize(activeResume.fileSize)}`
                : 'Upload your resume PDF below and mark it as active to enable the public download button.'}
            </p>
          </div>
        </div>

        {activeResume && (
          <a
            href={activeResume.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 transition-colors"
          >
            <Download className="w-4 h-4 text-cyan-300" />
            <span>Download Active Resume</span>
          </a>
        )}
      </div>

      {/* Upload New Document Box */}
      <form onSubmit={handleUploadSubmit} className="glass-card rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-5">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Upload className="w-5 h-5 text-purple-400" />
          <span>Upload Document or New Resume</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-medium text-slate-300">Document Title *</label>
            <input
              type="text"
              value={docTitle}
              onChange={(e) => setDocTitle(e.target.value)}
              placeholder="e.g. Shankar Chaudhary Resume 2026"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Category</label>
            <select
              value={docCategory}
              onChange={(e) => {
                const val = e.target.value;
                setDocCategory(val);
                if (val === 'Resume') setIsResumeFlag(true);
              }}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400"
            >
              {DOC_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* File Picker */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300">Choose File (PDF, DOC, DOCX) *</label>
          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 cursor-pointer transition-colors">
              <Upload className="w-4 h-4 text-cyan-400" />
              <span>{selectedFile ? 'Change Selected File' : 'Select PDF File'}</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) {
                    setSelectedFile(f);
                    if (!docTitle) setDocTitle(f.name.replace(/\.[^/.]+$/, ""));
                  }
                }}
                className="hidden"
              />
            </label>

            {selectedFile && (
              <span className="text-xs text-cyan-300 font-mono truncate max-w-sm">
                Selected: {selectedFile.name} ({formatFileSize(selectedFile.size)})
              </span>
            )}
          </div>
        </div>

        {/* Checkbox Options */}
        <div className="flex flex-wrap items-center gap-6 pt-2">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
            <input
              type="checkbox"
              checked={isResumeFlag || docCategory === 'Resume'}
              onChange={(e) => setIsResumeFlag(e.target.checked)}
              className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-purple-600"
            />
            <span className="font-semibold text-white">Set as primary active resume</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
            <input
              type="checkbox"
              checked={isPublicFlag}
              onChange={(e) => setIsPublicFlag(e.target.checked)}
              className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-cyan-600"
            />
            <span>Publicly accessible</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-purple-950/40 transition-all"
        >
          <Upload className="w-4 h-4" />
          <span>{uploading ? 'Uploading & Processing...' : 'Upload & Save Document'}</span>
        </button>
      </form>

      {/* Uploaded Documents List */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white">All Stored Documents</h3>

        {loading ? (
          <div className="text-center py-10 text-slate-400">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-cyan-400" />
            <span>Loading documents...</span>
          </div>
        ) : documents.length === 0 ? (
          <div className="glass-card rounded-2xl p-8 text-center border border-slate-800 text-slate-400 text-xs">
            No documents uploaded yet.
          </div>
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-purple-400 shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{doc.title}</h4>
                      {doc.isResume && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          Active Resume
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-800">
                        {doc.documentCategory}
                      </span>
                      {!doc.isPublic && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Private
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-1 font-mono">
                      {doc.fileName} • {formatFileSize(doc.fileSize)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {!doc.isResume && (
                    <button
                      type="button"
                      onClick={() => handleSetActiveResume(doc.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 transition-colors"
                      title="Set as primary active resume"
                    >
                      Set Active Resume
                    </button>
                  )}

                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800"
                    title="Download / View"
                  >
                    <Download className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => handleToggleVisibility(doc.id)}
                    className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800"
                    title={doc.isPublic ? "Public (click to make private)" : "Private (click to make public)"}
                  >
                    {doc.isPublic ? <Eye className="w-4 h-4 text-emerald-400" /> : <EyeOff className="w-4 h-4 text-amber-400" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteTargetId(doc.id)}
                    className="p-2 rounded-xl text-rose-400 hover:bg-rose-500/20 border border-slate-800"
                    title="Delete document"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Document"
        message="Are you sure you want to delete this document? The file will be removed from server storage."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}

