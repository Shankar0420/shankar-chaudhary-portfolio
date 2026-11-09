import React, { useState } from 'react';
import {
  FolderGit2,
  Github,
  ExternalLink,
  Code2,
  CheckCircle2,
  Info,
  FileCode,
  Video,
  ImageIcon
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { isValidUrl, isConfigured } from '../data/portfolioData';
import AssetPlaceholder from '../components/AssetPlaceholder';

export default function Projects() {
  const [activeLinkNotice, setActiveLinkNotice] = useState(null);
  const { projects = [] } = usePortfolio();

  // Exclude projects with visible === false
  const visibleProjects = projects.filter((p) => p.visible !== false);

  const handlePlaceholderLinkClick = (projectTitle, linkType, commentText) => {
    setActiveLinkNotice({
      projectTitle,
      linkType,
      commentText
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-14">
      {/* Page Header */}
      <section className="space-y-4 max-w-3xl">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-purple-500/10 text-purple-300 border border-purple-500/30">
          <FolderGit2 className="w-3.5 h-3.5" />
          Project Portfolio
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Software & Full-Stack Projects
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Every project below is rendered dynamically from{" "}
          <code className="font-mono text-cyan-300">src/data/projectsData.js</code>. Add, edit, or hide projects in that file to automatically update this page without modifying component code.
        </p>
      </section>

      {/* Notice when clicking a placeholder link */}
      {activeLinkNotice && (
        <div
          className="p-4 sm:p-5 rounded-2xl bg-slate-900/95 border border-cyan-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl"
          role="status"
        >
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs sm:text-sm">
              <p className="font-semibold text-white">
                {activeLinkNotice.linkType} for &ldquo;{activeLinkNotice.projectTitle}&rdquo;
              </p>
              <p className="text-slate-300">
                To prevent broken links, this link displays its configuration placeholder:{" "}
                <code className="font-mono text-cyan-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  {activeLinkNotice.commentText}
                </code>
              </p>
              <p className="text-slate-400 text-xs">
                Update this in <code className="font-mono text-purple-300">src/data/projectsData.js</code> with your actual URL.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setActiveLinkNotice(null)}
            className="self-end sm:self-center px-3.5 py-1.5 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Responsive Project Showcase Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {visibleProjects.map((project, index) => {
          const githubUrl = project.github || project.githubUrl;
          const liveUrl = project.liveDemo || project.liveUrl;

          const isRealGithub = isValidUrl(githubUrl);
          const hasGithubConfig = isConfigured(githubUrl);

          const isRealLive = isValidUrl(liveUrl);
          const hasLiveConfig = isConfigured(liveUrl);

          return (
            <article
              key={project.id || index}
              className="glass-card glass-card-hover rounded-3xl overflow-hidden flex flex-col justify-between p-6 sm:p-7 border border-slate-800/90"
            >
              <div className="space-y-6">
                {/* Project Screenshot / Fallback Placeholder */}
                <AssetPlaceholder
                  src={project.image}
                  isUploaded={project.imageUploaded}
                  alt={project.title}
                  comment={project.imagePlaceholderComment || "// UPLOAD PROJECT SCREENSHOT HERE"}
                  filePathHint={`public${project.image || "/assets/images/projects/"}`}
                  aspectClass="aspect-video"
                  roundedClass="rounded-2xl"
                  badgeText={project.number ? `Project ${project.number} Screenshot` : "Project Screenshot"}
                />

                {/* Project Meta & Description */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    {project.category && (
                      <span className="px-3 py-1 rounded-full text-xs font-mono bg-purple-500/15 text-purple-300 border border-purple-500/30">
                        {project.category}
                      </span>
                    )}
                    {project.number && (
                      <span className="text-xs font-mono text-cyan-300 font-bold">
                        #{project.number}
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {project.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.detailedDescription || project.description}
                  </p>
                </div>

                {/* Key Technical Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="space-y-2.5 pt-2">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
                      Key Highlights & Architecture:
                    </h3>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                      {project.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies Badges */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-purple-400" />
                      <span>Technologies Used:</span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-xl text-xs font-mono bg-slate-950/90 text-cyan-300 border border-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Explicit Configuration Box if placeholder */}
                {(hasGithubConfig || hasLiveConfig) && (!isRealGithub || !isRealLive) && (
                  <div className="p-3.5 rounded-2xl bg-slate-950/75 border border-slate-800/90 space-y-1.5 text-xs font-mono">
                    {hasGithubConfig && !isRealGithub && (
                      <div className="flex items-center gap-2 text-slate-400">
                        <Github className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span className="truncate text-cyan-300">{githubUrl}</span>
                      </div>
                    )}
                    {hasLiveConfig && !isRealLive && (
                      <div className="flex items-center gap-2 text-slate-400">
                        <ExternalLink className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate text-purple-300">{liveUrl}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons: Never render invalid placeholder URLs as clickable links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {/* GitHub Action */}
                  {isRealGithub ? (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 transition-all"
                    >
                      <Github className="w-4 h-4 text-purple-400" />
                      <span>GitHub Repository</span>
                    </a>
                  ) : hasGithubConfig ? (
                    <button
                      type="button"
                      onClick={() =>
                        handlePlaceholderLinkClick(
                          project.title,
                          "GitHub Repository Link",
                          githubUrl
                        )
                      }
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-purple-500/50 transition-all"
                    >
                      <Github className="w-4 h-4 text-purple-400" />
                      <span>GitHub Repository</span>
                    </button>
                  ) : null}

                  {/* Live Demo Action */}
                  {isRealLive ? (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  ) : hasLiveConfig ? (
                    <button
                      type="button"
                      onClick={() =>
                        handlePlaceholderLinkClick(
                          project.title,
                          "Live Demo Link",
                          liveUrl
                        )
                      }
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-600/85 to-cyan-600/85 hover:from-purple-500 hover:to-cyan-500 text-white transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </button>
                  ) : null}
                  {/* Video Demonstration Action */}
                  {isValidUrl(project.videoUrl) && (
                    <a
                      href={project.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-all sm:col-span-2"
                    >
                      <Video className="w-4 h-4 text-rose-400" />
                      <span>Watch Demonstration Video</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Guide Card */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800/90 space-y-3">
        <div className="flex items-center gap-2.5 text-cyan-300 text-sm font-mono font-semibold">
          <FileCode className="w-4 h-4" />
          <span>Adding or Updating Projects</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          All project cards are generated dynamically from{" "}
          <code className="font-mono text-purple-300">projectsData</code> in{" "}
          <code className="font-mono text-cyan-300">src/data/projectsData.js</code>. To add a new project, simply append an object to that array. No modifications to <code className="font-mono text-purple-300">Projects.jsx</code> are required.
        </p>
      </section>
    </div>
  );
}
