import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Layers,
  Database,
  ExternalLink,
  Github,
  MapPin,
  GraduationCap
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import AssetPlaceholder from '../components/AssetPlaceholder';
import ResumeButton from '../components/ResumeButton';

export default function Home() {
  const [roleIndex, setRoleIndex] = useState(0);

  const { personal, skills, projects } = usePortfolio();
  const categories = skills?.categories || [];
  const projectsList = projects || [];

  const roles = personal?.roles && personal.roles.length > 0
    ? personal.roles
    : ["Full Stack Developer", "B.Tech Computer Science Student", "Software Developer", "Problem Solver"];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [roles.length]);

  // Featured skills: visible and marked as featured
  const featuredSkills = categories
    .flatMap((cat) => (cat.items || []))
    .filter(
      (skill, index, self) =>
        skill.visible !== false &&
        skill.featured &&
        self.findIndex((s) => s.name === skill.name) === index
    );

  // Featured projects: visible and marked as featured
  const featuredProjects = projectsList
    .filter((p) => p.visible !== false && p.featured)
    .slice(0, 3);

  return (
    <div className="space-y-24 sm:space-y-32 pb-12">
      {/* HERO SECTION */}
      <section className="relative pt-8 sm:pt-14 lg:pt-20 overflow-hidden">
        {/* Subtle Animated Ambient Glows */}
        <div className="absolute top-6 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Hero Left Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {personal?.professionalTitle && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                  <span>{personal.professionalTitle}</span>
                </div>
              )}

              <div className="space-y-3">
                <p className="text-sm sm:text-base font-mono text-cyan-300 tracking-wide">
                  Hi, I&apos;m <span className="font-semibold text-white">{personal?.fullName}</span> —{" "}
                  <span className="underline decoration-purple-500/60 underline-offset-4">
                    {roles[roleIndex]}
                  </span>
                </p>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                  {personal?.heroHeading || "Building Digital Experiences Through Code."}
                </h1>
              </div>

              {personal?.introduction && (
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  {personal.introduction}
                </p>
              )}

              {personal?.supportingText && (
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
                  {personal.supportingText}
                </p>
              )}

              {/* Verified Education & Location Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-300">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <GraduationCap className="w-4 h-4 text-purple-400" />
                  <span>Galgotias University • Second Year (3rd Sem)</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>India</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-purple-950/40 hover:shadow-cyan-950/30 transition-all group"
                >
                  <span>Explore My Work</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <ResumeButton variant="primary" showViewOption={true} />
              </div>
            </div>

            {/* Hero Right Column: Profile Image Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/40 via-cyan-500/30 to-indigo-600/40 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />

                <div className="relative glass-card rounded-3xl p-5 border border-slate-800/90 space-y-4">
                  <AssetPlaceholder
                    src={personal?.profileImage}
                    isUploaded={personal?.profileImageUploaded}
                    alt={`${personal?.fullName} - Profile Photo`}
                    aspectClass="aspect-[4/4.5]"
                    roundedClass="rounded-2xl"
                    title={personal?.fullName}
                    category="Full Stack Developer"
                  />

                  {/* Status Bar */}
                  <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-left">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">{personal?.fullName}</span>
                      <span className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Active
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {personal?.currentStatus || "B.Tech Student • Full Stack Developer"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED TECHNICAL SKILLS PREVIEW */}
      {featuredSkills.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                Core Stack
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Featured Technical Skills
              </h2>
            </div>
            <Link
              to="/skills"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 hover:text-purple-300 transition-colors"
            >
              <span>View All Skills & Categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {featuredSkills.map((skill) => (
              <div
                key={skill.id || skill.name}
                className="glass-card glass-card-hover rounded-2xl p-4 border border-slate-800/90 text-center flex flex-col items-center justify-center gap-3 group"
              >
                {skill.icon ? (
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-cyan-300 font-bold">
                    {skill.name.substring(0, 2)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-cyan-200 transition-colors">
                    {skill.name}
                  </p>
                  <span className="text-[10px] font-mono text-slate-400 block line-clamp-1">
                    {skill.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FEATURED PROJECTS SHOWCASE */}
      {featuredProjects.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400">
                Selected Work
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Featured Software Projects
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 hover:text-purple-300 transition-colors"
            >
              <span>Explore Full Project Showcase</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="glass-card glass-card-hover rounded-3xl overflow-hidden flex flex-col justify-between p-5 border border-slate-800/90"
              >
                <div className="space-y-4">
                  <AssetPlaceholder
                    src={project.image}
                    isUploaded={project.imageUploaded}
                    alt={project.title}
                    aspectClass="aspect-video"
                    roundedClass="rounded-2xl"
                    title={project.title}
                    category={project.category}
                  />

                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-purple-300 uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="text-lg font-bold text-white">{project.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-800/80 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {(project.technologies || []).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-900/90 text-cyan-300 border border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-2 text-xs">
                    <Link
                      to="/projects"
                      className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-cyan-300 transition-colors"
                    >
                      <span>Project Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <span className="text-xs font-mono text-slate-500">
                      Project #{project.number}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
