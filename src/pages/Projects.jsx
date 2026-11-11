import React from 'react';
import {
  FolderGit2,
  Github,
  ExternalLink,
  Code2,
  CheckCircle2,
  Layers
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { isValidUrl } from '../data/portfolioData';
import AssetPlaceholder from '../components/AssetPlaceholder';

export default function Projects() {
  const { projects = [] } = usePortfolio();

  // Filter only published projects
  const visibleProjects = projects.filter((p) => p.visible !== false);

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
          Explore featured full-stack web applications, academic learning platforms, and modern responsive frontend systems engineered with clean architecture.
        </p>
      </section>

      {/* Responsive Project Showcase Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {visibleProjects.map((project, index) => {
          const githubUrl = project.github || project.githubUrl;
          const liveUrl = project.liveDemo || project.liveUrl;

          const hasRealGithub = isValidUrl(githubUrl);
          const hasRealLive = isValidUrl(liveUrl);

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
                  aspectClass="aspect-video"
                  roundedClass="rounded-2xl"
                  title={project.title}
                  category={project.category}
                />

                {/* Project Meta & Title */}
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono font-medium text-purple-400 bg-purple-500/10 border border-purple-500/25 px-2.5 py-1 rounded-full">
                      {project.category}
                    </span>
                    {project.number && (
                      <span className="text-xs font-mono text-slate-500">
                        Project #{project.number}
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {project.title}
                  </h2>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {project.detailedDescription || project.description}
                  </p>
                </div>

                {/* Key Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="space-y-2 pt-1 border-t border-slate-800/80">
                    <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-300">
                      Key Highlights & Capabilities
                    </h3>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-400">
                      {project.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technology Badges */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="space-y-2 pt-1 border-t border-slate-800/80">
                    <span className="text-xs font-mono text-slate-400 block">
                      Technologies & Tools
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-900/90 text-slate-300 border border-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons (Only rendered when URLs are real and configured) */}
              {(hasRealGithub || hasRealLive) && (
                <div className="pt-6 mt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-3">
                  {hasRealGithub && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-colors"
                    >
                      <Github className="w-4 h-4 text-purple-400" />
                      <span>Source Code</span>
                    </a>
                  )}

                  {hasRealLive && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-md shadow-purple-950/40 transition-all"
                    >
                      <ExternalLink className="w-4 h-4 text-white" />
                      <span>Live Website</span>
                    </a>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
