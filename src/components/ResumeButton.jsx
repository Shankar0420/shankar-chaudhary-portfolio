import React from 'react';
import { Download, ExternalLink, FileText } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

/**
 * Renders a clean, professional static Resume button.
 * Downloads or views the permanent PDF stored at /assets/documents/resume/Shankar_Chaudhary_Resume.pdf
 */
export default function ResumeButton({
  variant = "primary",
  className = "",
  showViewOption = false
}) {
  const { personal } = usePortfolio();
  const resume = personal?.resume || {};

  const resumeFilePath = resume.filePath || "/assets/documents/resume/Shankar_Chaudhary_Resume.pdf";
  const resumeFileName = resume.fileName || "Shankar_Chaudhary_Resume.pdf";

  if (variant === "nav") {
    return (
      <a
        href={resumeFilePath}
        download={resumeFileName}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-gradient-to-r from-purple-600/90 to-cyan-600/90 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-purple-900/25 transition-all ${className}`}
        aria-label="Download Resume"
      >
        <Download className="w-4 h-4 text-cyan-300" />
        <span>Resume</span>
      </a>
    );
  }

  return (
    <div className={`inline-flex flex-wrap items-center gap-3 ${className}`}>
      {/* Primary Download Button */}
      <a
        href={resumeFilePath}
        download={resumeFileName}
        className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-purple-950/40 hover:shadow-cyan-950/30 transition-all cursor-pointer"
        aria-label="Download Resume PDF"
      >
        <Download className="w-4 h-4 text-white" />
        <span>Download Resume</span>
      </a>

      {/* Secondary Direct View Button */}
      {showViewOption !== false && (
        <a
          href={resumeFilePath}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-slate-900/90 hover:bg-slate-800/90 text-slate-200 border border-slate-700/80 hover:border-cyan-500/50 transition-all cursor-pointer"
          aria-label="View Resume in Browser"
        >
          <ExternalLink className="w-4 h-4 text-cyan-300" />
          <span>View Resume</span>
        </a>
      )}
    </div>
  );
}
