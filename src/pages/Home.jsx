import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Terminal,
  Layers,
  Database,
  ExternalLink,
  Github,
  MapPin,
  GraduationCap
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { isConfigured } from '../data/portfolioData';
import AssetPlaceholder from '../components/AssetPlaceholder';
import ResumeButton from '../components/ResumeButton';

export default function Home() {
  const [roleIndex, setRoleIndex] = useState(0);

  const { personal, skills, projects } = usePortfolio();
  const categories = skills?.categories || [];
  const projectsList = projects || [];

  const roles = personal?.roles && personal.roles.length > 0
    ? personal.roles
    : ["Software Developer", "Full Stack Developer", "B.Tech Student", "Problem Solver"];

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

  // Total visible skills count
  const totalVisibleSkills = categories
    .flatMap((cat) => (cat.items || []))
    .filter((s) => s.visible !== false)
    .length;

  const showUniversity = isConfigured(personal?.university);
  const showEducation = isConfigured(personal?.educationSummary || personal?.education);
  const showLocation = isConfigured(personal?.location);

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
                  Hi, I&apos;m <span className="font-semibold text-white">{personal?.fullName || personal?.name}</span> —{" "}
                  <span className="underline decoration-purple-500/60 underline-offset-4">
                    {roles[roleIndex]}
                  </span>
                </p>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                  {personal?.heroHeading || "Building Digital Experiences Through Code."}
                </h1>
              </div>

              {(personal?.introduction || personal?.shortIntro) && (
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  {personal.introduction || personal.shortIntro}
                </p>
              )}

              {personal?.supportingText && (
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
                  {personal.supportingText}
                </p>
              )}

              {/* Location & Education Badges */}
              {(showEducation || showLocation) && (
                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs sm:text-sm text-slate-300">
                  {showEducation && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800">
                      <GraduationCap className="w-4 h-4 text-purple-400" />
                      <span>{personal.educationSummary || personal.education}</span>
                      {showUniversity && (
                        <code className="text-cyan-300 font-mono text-xs">({personal.university})</code>
                      )}
                    </span>
                  )}
                  {showLocation && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                      <span>{personal.location}</span>
                    </span>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-3">
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-purple-900/30 transition-all"
                >
                  <span>Explore My Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-slate-900/90 hover:bg-slate-800/90 text-slate-200 border border-slate-700/80 hover:border-purple-500/50 transition-all"
                >
                  <span>About My Journey</span>
                </Link>

                <ResumeButton variant="primary" />
              </div>
            </div>

            {/* Hero Right Column: Profile Image Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/40 via-cyan-500/30 to-indigo-600/40 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />

                <div className="relative glass-card rounded-3xl p-5 border border-slate-800/90 space-y-4">
                  <AssetPlaceholder
                    src={personal?.profileImage || personal?.profilePhoto}
                    isUploaded={personal?.profileImageUploaded || personal?.profilePhotoUploaded}
                    alt={`${personal?.fullName || personal?.name} - Profile Photo`}
                    comment={personal?.profileImageComment || "// REPLACE YOUR PROFILE PHOTO HERE"}
                    filePathHint="public/assets/images/profile/profile-photo.jpg"
                    aspectClass="aspect-[4/4.5]"
                    roundedClass="rounded-2xl"
                    badgeText="Homepage Profile Photo"
                  />

                  {/* Status Bar */}
                  <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-left">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">{personal?.fullName || personal?.name}</span>
                      <span className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Active
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {personal?.currentStatus || "Software & Full Stack Developer"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE PILLARS HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Terminal className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white">Full-Stack Foundations</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Strong grounding in procedural and object-oriented programming with C, C++, and Java, extended to full-stack architectures.
            </p>
          </div>

          <div className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Layers className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white">Modern Frontend & UI</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Crafting responsive web interfaces using semantic HTML, CSS, JavaScript, React, and utility-first Tailwind CSS.
            </p>
          </div>

          <div className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Database className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white">Backends & Databases</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Developing RESTful services and controllers with Java Spring Boot and Node.js, backed by MySQL and MariaDB schemas.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED SKILLS SECTION */}
      {featuredSkills.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400">
                Core Stack
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Featured Skills & Technologies
              </h2>
            </div>
            <Link
              to="/skills"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 hover:text-purple-300 transition-colors"
            >
              <span>View All {totalVisibleSkills} Technologies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {featuredSkills.map((skill) => (
              <div
                key={skill.name}
                className="glass-card glass-card-hover rounded-2xl p-4 flex flex-col items-center text-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center p-2.5">
                  <img
                    src={skill.icon || skill.iconUrl}
                    alt={skill.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-white">{skill.name}</p>
                  <p className="text-[11px] text-slate-400">{skill.category}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FEATURED PROJECTS SECTION */}
      {featuredProjects.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
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
                    src={project.image || project.thumbnailUrl}
                    isUploaded={project.imageUploaded}
                    alt={project.title}
                    comment={project.imagePlaceholderComment || "// UPLOAD PROJECT SCREENSHOT HERE"}
                    filePathHint={`public${project.image || "/assets/images/projects/"}`}
                    aspectClass="aspect-video"
                    roundedClass="rounded-2xl"
                    badgeText={project.number ? `Project ${project.number}` : "Project Screenshot"}
                  />

                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-purple-300 uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="text-lg font-bold text-white">{project.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2">
                      {project.shortDescription || project.description}
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
                      <span>Project Details & Links</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <span className="inline-flex items-center gap-1 text-slate-400 font-mono">
                      <Github className="w-3.5 h-3.5" />
                      <ExternalLink className="w-3.5 h-3.5" />
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
