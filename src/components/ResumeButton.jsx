import React, { useState } from 'react';
import { Download, FileText, Info, Upload, CheckCircle2, X } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

/**
 * Renders the Resume download button.
 * Automatically points to the latest active resume from the database or static config.
 * Automatically hidden if no resume is published, preventing broken links.
 */
export default function ResumeButton({
  variant = "primary",
  className = "",
  showInstructionModalWhenMissing = false
}) {
  const [showModal, setShowModal] = useState(false);
  const [customResumeFile, setCustomResumeFile] = useState(null);

  const { personal } = usePortfolio();
  const resume = personal?.resume || {};
  const isUploaded = Boolean(resume.isUploaded && resume.filePath && !resume.filePath.startsWith("//"));

  const handleResumeUploadTest = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const url = URL.createObjectURL(file);
      setCustomResumeFile({ url, name: file.name });
    }
  };

  const activeResumeUrl = customResumeFile?.url || (isUploaded ? resume.filePath : null);
  const activeFileName = customResumeFile?.name || resume.fileName || "Shankar_Chaudhary_Resume.pdf";

  const baseStyles =
    variant === "nav"
      ? "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-gradient-to-r from-purple-600/90 to-cyan-600/90 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-purple-900/25 transition-all"
      : "inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold bg-slate-900/90 hover:bg-slate-800/90 text-slate-100 border border-slate-700/80 hover:border-purple-500/50 transition-all";

  // If a valid resume is available, render the active download link
  if (activeResumeUrl) {
    return (
      <a
        href={activeResumeUrl}
        download={activeFileName}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseStyles} ${className}`}
        aria-label="Download Resume"
      >
        <Download className="w-4 h-4 text-cyan-300" />
        <span>Download Resume</span>
      </a>
    );
  }

  // Missing resume: hide download button
  if (!showInstructionModalWhenMissing) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className={`${baseStyles} ${className}`}
        title="Resume PDF is not currently uploaded"
      >
        <FileText className="w-4 h-4 text-purple-300" />
        <span>Download Resume</span>
      </button>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg rounded-2xl bg-[#0b1024] border border-purple-500/35 p-6 shadow-2xl text-left">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Resume PDF Setup
                </h3>
                <p className="text-xs text-slate-400">
                  Protected against broken download links
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              <p>Upload a new resume PDF anytime directly via the Admin Dashboard at <code className="text-cyan-300 font-mono">/admin</code>.</p>
            </div>

            <div className="mt-5 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
