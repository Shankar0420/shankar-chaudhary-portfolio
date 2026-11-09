import React from 'react';
import {
  GraduationCap,
  Target,
  BookOpen,
  Code,
  Calendar,
  MapPin,
  Award,
  ExternalLink,
  Building
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { isValidUrl, isConfigured } from '../data/portfolioData';
import AssetPlaceholder from '../components/AssetPlaceholder';
import ResumeButton from '../components/ResumeButton';

export default function About() {
  const { personal = {}, education = {} } = usePortfolio();
  const educationState = education;
  const educationList = (educationState.education || []).filter((e) => e.visible !== false);
  const certificatesList = (educationState.certificates || []).filter((c) => c.visible !== false);

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
            <ResumeButton />
          </div>
        </div>

        {/* Dedicated About Page Profile Image Section */}
        <div className="lg:col-span-5">
          <div className="glass-card rounded-3xl p-5 border border-slate-800/90 space-y-4">
            <AssetPlaceholder
              src={personal.aboutImage || personal.aboutPhoto}
              isUploaded={personal.aboutImageUploaded || personal.aboutPhotoUploaded}
              alt={`${personal.fullName || personal.name} - About Page Photo`}
              comment={personal.aboutImageComment || "// UPLOAD YOUR ABOUT PAGE PHOTO HERE"}
              filePathHint="public/assets/images/profile/about-photo.jpg"
              aspectClass="aspect-[4/4.2]"
              roundedClass="rounded-2xl"
              badgeText="About Page Photo Slot"
            />
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="font-semibold text-white">{personal.fullName || personal.name}</span>
              <span className="font-mono text-cyan-300">{personal.educationSummary || personal.education}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Education Details Section (Centralized & Multi-record capable) */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
            Academic Background
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Education Details
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Managed dynamically in <code className="font-mono text-purple-300">src/data/educationData.js</code>
          </p>
        </div>

        <div className="space-y-6">
          {educationList.map((edu, idx) => {
            const hasInstitution = isConfigured(edu.institution);
            const hasBranch = isConfigured(edu.branch);
            const hasDates = isConfigured(edu.dates) || (isConfigured(edu.startYear) && isConfigured(edu.endYear));
            const displayDates = isConfigured(edu.dates)
              ? edu.dates
              : `${edu.startYear} - ${edu.endYear}`;

            return (
              <div key={edu.id || idx} className="glass-card rounded-3xl p-6 sm:p-8 border border-purple-500/30">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                      {edu.logo ? (
                        <img src={edu.logo} alt={edu.institution} className="w-7 h-7 object-contain" />
                      ) : (
                        <GraduationCap className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        {edu.degree || "Degree Program"}
                      </h3>
                      {edu.location && (
                        <p className="text-xs sm:text-sm text-slate-400 flex items-center gap-1.5 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{edu.location}</span>
                        </p>
                      )}
                    </div>
                  </div>
                  {hasDates && (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono bg-slate-900 border border-slate-700 text-cyan-300">
                      <Calendar className="w-3.5 h-3.5" />
                      {displayDates}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
                  <div className="p-4 rounded-2xl bg-slate-950/75 border border-slate-800/80 space-y-1">
                    <span className="text-[11px] font-mono uppercase text-slate-400">
                      Institution / College
                    </span>
                    <p className={`text-sm font-semibold ${hasInstitution ? "text-white" : "font-mono text-cyan-300"}`}>
                      {edu.institution}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/75 border border-slate-800/80 space-y-1">
                    <span className="text-[11px] font-mono uppercase text-slate-400">
                      Course & Branch
                    </span>
                    <p className={`text-sm font-semibold ${hasBranch ? "text-white" : "font-mono text-cyan-300"}`}>
                      {edu.branch}
                    </p>
                  </div>

                  {isConfigured(edu.currentYearOrSemester) && (
                    <div className="p-4 rounded-2xl bg-slate-950/75 border border-slate-800/80 space-y-1">
                      <span className="text-[11px] font-mono uppercase text-slate-400">
                        Current Academic Standing
                      </span>
                      <p className="text-sm font-semibold font-mono text-cyan-300">
                        {edu.currentYearOrSemester}
                      </p>
                    </div>
                  )}
                </div>

                {edu.description && (
                  <p className="text-xs sm:text-sm text-slate-300 pt-5 leading-relaxed">
                    {edu.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Technical Interests & Career Goals */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400">
              Focus Areas
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Technical Interests & Engineering Focus
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {technicalInterests.map((item) => (
              <div
                key={item.title}
                className="glass-card glass-card-hover rounded-2xl p-5 space-y-2 border border-slate-800"
              >
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <Target className="w-5 h-5 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">My Career Goals</h2>
              </div>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {personal.careerGoals}
              </p>
            </div>

            {/* Certificates Showcase or Clean Placeholder */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                <Award className="w-4 h-4" />
                <span>Certificates & Achievements</span>
              </div>

              {certificatesList.length > 0 ? (
                <div className="space-y-3">
                  {certificatesList.map((cert) => (
                    <div key={cert.id || cert.name} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-white">{cert.name}</span>
                        {cert.issueDate && <span className="text-[11px] font-mono text-cyan-300">{cert.issueDate}</span>}
                      </div>
                      <p className="text-[11px] text-slate-400">{cert.issuer}</p>
                      {isValidUrl(cert.credentialUrl) && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-cyan-300 hover:underline pt-1"
                        >
                          <span>Verify Certificate</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-1.5">
                  <code className="block text-[11px] font-mono text-cyan-300">
                    {educationState.certificatesPlaceholderComment || "// ADD YOUR CERTIFICATE IMAGE HERE"}
                  </code>
                  <p className="text-[11px] text-slate-400">
                    No unverified certificates or awards are displayed. Add future certificates in{" "}
                    <span className="font-mono text-slate-300">public/assets/images/certificates/</span> and configure in{" "}
                    <span className="font-mono text-purple-300">src/data/educationData.js</span>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Approach to Learning and Development */}
      {learningApproach.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              My Approach to Learning & Development
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learningApproach.map((item) => (
              <div
                key={item.step}
                className="glass-card glass-card-hover rounded-3xl p-6 border border-slate-800 space-y-3"
              >
                <span className="inline-block font-mono text-xs font-bold px-3 py-1 rounded-lg bg-purple-500/15 text-purple-300 border border-purple-500/30">
                  STEP {item.step}
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

      {/* Professional Timeline */}
      {timeline.length > 0 && (
        <section className="space-y-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              Progression
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Developer Progression Timeline
            </h2>
          </div>

          <div className="relative border-l-2 border-purple-500/35 ml-3 sm:ml-6 pl-6 sm:pl-8 space-y-8">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-4 h-4 rounded-full bg-[#060813] border-2 border-cyan-400 group-hover:scale-125 transition-transform" />
                <div className="glass-card glass-card-hover rounded-2xl p-5 sm:p-6 border border-slate-800/90 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono font-semibold text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/25">
                      {item.phase}
                    </span>
                    <span className="text-xs font-mono text-cyan-300 flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5" />
                      {item.subtitle}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
