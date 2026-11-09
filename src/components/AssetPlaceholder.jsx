import React, { useState } from 'react';
import { Image, Upload, FileCode, Eye } from 'lucide-react';

/**
 * Displays the actual image if uploaded and valid,
 * or gracefully renders a professional fallback placeholder to prevent broken images.
 */
export default function AssetPlaceholder({
  src,
  isUploaded = false,
  alt = "Asset preview",
  comment = "// UPLOAD YOUR IMAGE HERE",
  filePathHint = "public/assets/images/",
  aspectClass = "aspect-video",
  roundedClass = "rounded-2xl",
  badgeText = "Upload Placeholder"
}) {
  const [imgError, setImgError] = useState(false);
  const [localPreviewUrl, setLocalPreviewUrl] = useState(null);

  const handleLocalPreview = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setLocalPreviewUrl(objectUrl);
      setImgError(false);
    }
  };

  const isRealSrc = src && typeof src === 'string' && !src.startsWith("//") && src.trim() !== "";
  const activeSrc = localPreviewUrl || (isUploaded && isRealSrc && !imgError ? src : null);

  if (activeSrc) {
    return (
      <div className={`relative overflow-hidden bg-slate-900/90 border border-slate-800/80 ${aspectClass} ${roundedClass} group`}>
        <img
          src={activeSrc}
          alt={alt}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {localPreviewUrl && (
          <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-slate-950/85 backdrop-blur-md border border-cyan-500/40 px-3 py-1.5 rounded-full text-xs text-cyan-300">
            <Eye className="w-3.5 h-3.5" />
            <span>Live Browser Preview</span>
            <label className="cursor-pointer underline ml-1 hover:text-white">
              Change
              <input type="file" accept="image/*" onChange={handleLocalPreview} className="hidden" />
            </label>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-[#0c1228] via-[#090d1d] to-[#12102b] border border-dashed border-purple-500/35 hover:border-cyan-400/50 transition-all duration-300 ${aspectClass} ${roundedClass} flex flex-col items-center justify-center p-5 text-center group`}
    >
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-300 mb-3 group-hover:scale-105 group-hover:border-cyan-400/40 group-hover:text-cyan-300 transition-all">
        <Image className="w-6 h-6" />
      </div>

      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-purple-500/15 text-purple-300 border border-purple-500/25 mb-2">
        <FileCode className="w-3 h-3" />
        {badgeText}
      </span>

      <code className="font-mono text-xs sm:text-sm font-semibold text-cyan-300 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800/90 max-w-full break-all">
        {comment}
      </code>

      <p className="text-xs text-slate-400 mt-2 max-w-xs">
        Place file at: <span className="font-mono text-slate-300">{filePathHint}</span>
      </p>

      <label className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 cursor-pointer transition-colors">
        <Upload className="w-3.5 h-3.5 text-cyan-400" />
        <span>Test Image Preview</span>
        <input type="file" accept="image/*" onChange={handleLocalPreview} className="hidden" />
      </label>
    </div>
  );
}
