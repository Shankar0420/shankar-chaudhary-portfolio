import React from 'react';
import {
  GraduationCap,
  Target,
  BookOpen,
  Code,
  Calendar,
  MapPin,
  Building,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import AssetPlaceholder from '../components/AssetPlaceholder';
import ResumeButton from '../components/ResumeButton';

export default function About() {
  const { personal = {}, education = {} } = usePortfolio();
  const educationList = (education.education || []).filter((e) => e.visible !== false);

  const technicalInterests = personal.technicalInterests || [];
  const learningApproach = personal.learningApproach || [];
  const timeline = personal.timeline || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20">
      {/* Page Header & Personal Introduction */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-5">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-purple-500/10 text-purple-300 border border-purple-500/30">
            About Me
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Passionate About Clean Software & Practical Full-Stack Solutions
          </h1>
          {personal.aboutDescription && (
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {personal.aboutDescription}
            </p>
          )}
          {personal.developerJourney && (
            <div className="p-5 rounded-2xl bg-slate-900/75 border border-slate-800 space-y-2">
              <h2 className="text-sm font-semibold text-cyan-300 uppercase tracking-wider font-mono">
                My Developer Journey
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {personal.developerJourney}
              </p>
            </div>
          )}
          <div className="pt-2">
            <ResumeButton variant="primary" showViewOption={true} />
          </div>
        </div>

        {/* Dedicated About Page Profile Image Section */}
        <div className="lg:col-span-5">
          <div className="glass-card rounded-3xl p-5 border border-slate-800/90 space-y-4">
            <AssetPlaceholder
              src={personal.aboutImage}
              isUploaded={personal.aboutImageUploaded}
              alt={`${personal.fullName} - About Page Photo`}
              aspectClass="aspect-[4/4.2]"
              roundedClass="rounded-2xl"
              title={personal.fullName}
              category="Full Stack Developer"
            />
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="font-semibold text-white">{personal.fullName}</span>
              <span className="font-mono text-cyan-300">Galgotias University • CSE</span>
            </div>
          </div>
        </div>
      </section>

      {/* Education Details Section */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
            Academic Background
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Education Details
          </h2>
        </div>

        <div className="space-y-6">
          {educationList.map((edu, idx) => (
            <div
              key={edu.id || idx}
              className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800/90 space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600/20 to-cyan-500/20 border border-purple-500/30 flex items-center justify-center text-cyan-300 shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {edu.degree}
                    </h3>
                    <p className="text-base text-purple-300 font-medium">
                      {edu.branch}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Building className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span className="font-semibold">{edu.institution}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 text-xs font-mono">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/25">
                    {edu.currentYearOrSemester}
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {edu.location}
                  </span>
                </div>
              </div>

              {edu.description && (
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4">
                  {edu.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Technical Interests */}
      {technicalInterests.length > 0 && (
        <section className="space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400">
              Areas of Focus
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Technical Interests & System Design
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {technicalInterests.map((interest, idx) => (
              <div
                key={idx}
                className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800/90 space-y-2.5"
              >
                <div className="flex items-center gap-2.5 text-cyan-300">
                  <Code className="w-5 h-5 text-purple-400" />
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {interest.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {interest.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Learning Approach */}
      {learningApproach.length > 0 && (
        <section className="space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              Philosophy & Method
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              How I Approach Software Engineering
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learningApproach.map((item, idx) => (
              <div
                key={idx}
                className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800/90 space-y-3"
              >
                <span className="text-2xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Career Goals */}
      {personal.careerGoals && (
        <section className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800/90 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <Target className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400">
                Future Vision
              </span>
              <h2 className="text-xl font-bold text-white">Career Objective</h2>
            </div>
          </div>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {personal.careerGoals}
          </p>
        </section>
      )}
    </div>
  );
}
