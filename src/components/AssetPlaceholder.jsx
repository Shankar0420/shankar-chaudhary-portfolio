import React, { useState } from 'react';
import { Layers, Code2, Sparkles, Building2 } from 'lucide-react';

/**
 * Renders static verified images with proper object-fit,
 * or displays a graceful, high-tech CSS-based placeholder when no screenshot exists (e.g. Cafe & Hotel Haven).
 * Does not emit broken image requests or include client upload controls.
 */
export default function AssetPlaceholder({
  src,
  isUploaded = true,
  alt = "Asset preview",
  aspectClass = "aspect-video",
  roundedClass = "rounded-2xl",
  category = "Full Stack Application",
  title = "Project Showcase"
}) {
  const [imgError, setImgError] = useState(false);

  const hasValidSrc = Boolean(
    src &&
    typeof src === 'string' &&
    src.trim() !== '' &&
    !src.startsWith('//') &&
    isUploaded &&
    !imgError
  );

  // If a valid image exists, display the image
  if (hasValidSrc) {
    return (
      <div className={`relative overflow-hidden bg-slate-900/90 border border-slate-800/80 ${aspectClass} ${roundedClass} group`}>
        <img
          src={src}
          alt={alt}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060813]/60 via-transparent to-transparent pointer-events-none" />
      </div>
    );
  }

  // Professional CSS-based Architectural Mockup for projects without a screenshot (e.g. Cafe & Hotel Haven)
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-[#0c1228] via-[#090e21] to-[#141233] border border-slate-800/90 hover:border-purple-500/40 transition-all duration-300 ${aspectClass} ${roundedClass} flex flex-col justify-between p-6 group`}
    >
      {/* Background Decorative Grids & Glows */}
      <div className="absolute -top-12 -right-12 w-44 h-44 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

      {/* Top Header of the Mockup Card */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-purple-500/15 text-purple-300 border border-purple-500/30">
          <Sparkles className="w-3 h-3 text-cyan-300" />
          <span>Full Stack Architecture</span>
        </span>
      </div>

      {/* Center Graphic */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto space-y-2 py-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600/20 to-cyan-500/20 border border-purple-500/30 flex items-center justify-center text-cyan-300 shadow-lg shadow-purple-950/30 group-hover:scale-105 transition-transform">
          <Building2 className="w-7 h-7" />
        </div>
        <p className="text-base sm:text-lg font-bold text-white tracking-tight">
          {title}
        </p>
        <p className="text-xs text-slate-400 font-mono">
          {category}
        </p>
      </div>

      {/* Bottom Mockup Status */}
      <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-3">
        <span className="font-mono text-cyan-400/90 flex items-center gap-1.5">
          <Code2 className="w-3.5 h-3.5" />
          Interactive Web System
        </span>
        <span className="text-slate-500 font-mono text-[11px]">Source Code Verified</span>
      </div>
    </div>
  );
}
