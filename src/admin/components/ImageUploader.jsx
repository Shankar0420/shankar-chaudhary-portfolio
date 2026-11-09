import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, FileText, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { portfolioApi } from '../../services/portfolioApi';

export default function ImageUploader({
  value,
  onChange,
  category = "images",
  label = "Upload Asset",
  accept = "image/*",
  aspectHint = "Recommended: PNG, JPG, WebP"
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    setError(null);

    try {
      const res = await portfolioApi.uploadFile(file, category);
      if (res.fileUrl) {
        onChange(res.fileUrl);
      }
    } catch (err) {
      setError(err.message || "Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  };

  const isPdf = value && value.toLowerCase().endsWith('.pdf');

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs sm:text-sm font-medium text-slate-200">{label}</label>
        <span className="text-[11px] font-mono text-slate-400">{aspectHint}</span>
      </div>

      {value ? (
        <div className="relative group rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/80 p-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center shrink-0">
              {isPdf ? (
                <FileText className="w-7 h-7 text-purple-400" />
              ) : (
                <img src={value} alt="Uploaded asset preview" className="w-full h-full object-cover" />
              )}
            </div>
            <div className="truncate">
              <span className="text-xs font-semibold text-white block truncate">{value.split('/').pop()}</span>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Uploaded & Active
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-colors"
              title="Remove asset"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
            dragOver
              ? 'border-cyan-400 bg-cyan-500/10'
              : 'border-slate-800 hover:border-purple-500/50 bg-slate-950/60 hover:bg-slate-900/60'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300">
            {accept.includes('pdf') ? <FileText className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
          </div>
          <div>
            <p className="text-xs sm:text-sm font-semibold text-white">
              {uploading ? "Uploading file..." : "Click or drag & drop to upload"}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Max size 25MB. Processed and stored securely.</p>
          </div>
        </div>
      )}

      {error && (
        <p className="text-xs text-rose-400 flex items-center gap-1.5 mt-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

