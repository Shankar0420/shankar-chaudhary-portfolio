import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Mail,
  MapPin,
  ArrowUpRight,
  Shield
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { isValidUrl, isValidEmail, isConfigured } from '../data/portfolioData';
import { navLinks } from './Navbar';

export default function Footer() {
  const { personal, contact, social } = usePortfolio();

  const hasEmail = isConfigured(contact?.email) || isValidEmail(contact?.email);
  const hasGithub = isConfigured(social?.github) || isValidUrl(social?.github);
  const hasLinkedin = isConfigured(social?.linkedin) || isValidUrl(social?.linkedin);
  const hasInstagram = isConfigured(social?.instagram) || isValidUrl(social?.instagram);
  const hasTwitter = isConfigured(social?.twitter) || isValidUrl(social?.twitter);

  return (
    <footer className="relative border-t border-slate-800/80 bg-[#050711] text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-slate-800/80">
          {/* Column 1: Brand & Short Intro */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-white">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                {personal?.fullName || personal?.name}
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              {personal?.introduction || personal?.shortIntro}
            </p>
            {(personal?.location || personal?.educationSummary) && (
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>
                  {personal.location}
                  {personal.educationSummary ? ` • ${personal.educationSummary}` : ""}
                </span>
              </div>
            )}
          </div>

          {/* Column 2: Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/admin"
                  className="text-purple-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Console</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Social & Direct Contact */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Connect & Profiles
            </h3>
            <div className="space-y-2.5 text-xs sm:text-sm">
              {/* GitHub */}
              {hasGithub && (
                <div className="flex items-start gap-2.5">
                  <Github className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  {isValidUrl(social?.github) ? (
                    <a
                      href={social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-300 hover:text-cyan-300 inline-flex items-center gap-1 break-all"
                    >
                      <span>GitHub Profile</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <div>
                      <span className="text-slate-300 font-medium block">GitHub</span>
                      <code className="text-[11px] font-mono text-cyan-300/90 break-all">
                        {social?.github}
                      </code>
                    </div>
                  )}
                </div>
              )}

              {/* LinkedIn */}
              {hasLinkedin && (
                <div className="flex items-start gap-2.5">
                  <Linkedin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  {isValidUrl(social?.linkedin) ? (
                    <a
                      href={social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-300 hover:text-cyan-300 inline-flex items-center gap-1 break-all"
                    >
                      <span>LinkedIn Profile</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <div>
                      <span className="text-slate-300 font-medium block">LinkedIn</span>
                      <code className="text-[11px] font-mono text-cyan-300/90 break-all">
                        {social?.linkedin}
                      </code>
                    </div>
                  )}
                </div>
              )}

              {/* Instagram */}
              {hasInstagram && (
                <div className="flex items-start gap-2.5">
                  <Instagram className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                  {isValidUrl(social?.instagram) ? (
                    <a
                      href={social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-300 hover:text-cyan-300 inline-flex items-center gap-1 break-all"
                    >
                      <span>Instagram Profile</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <div>
                      <span className="text-slate-300 font-medium block">Instagram</span>
                      <code className="text-[11px] font-mono text-cyan-300/90 break-all">
                        {social?.instagram}
                      </code>
                    </div>
                  )}
                </div>
              )}

              {/* Twitter / X */}
              {hasTwitter && (
                <div className="flex items-start gap-2.5">
                  <Twitter className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  {isValidUrl(social?.twitter) ? (
                    <a
                      href={social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-300 hover:text-cyan-300 inline-flex items-center gap-1 break-all"
                    >
                      <span>Twitter / X Profile</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <div>
                      <span className="text-slate-300 font-medium block">Twitter / X</span>
                      <code className="text-[11px] font-mono text-cyan-300/90 break-all">
                        {social?.twitter}
                      </code>
                    </div>
                  )}
                </div>
              )}

              {/* Email */}
              {hasEmail && (
                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  {isValidEmail(contact?.email) ? (
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-slate-300 hover:text-cyan-300 break-all"
                    >
                      {contact.email}
                    </a>
                  ) : (
                    <div>
                      <span className="text-slate-300 font-medium block">Email</span>
                      <code className="text-[11px] font-mono text-cyan-300/90 break-all">
                        {contact?.email}
                      </code>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {personal?.fullName || personal?.name}. All rights reserved.
          </p>
          <p className="font-mono text-slate-400">
            {personal?.footerText || "Crafted with React, Tailwind CSS, Java Spring Boot & Clean Architecture"}
          </p>
        </div>
      </div>
    </footer>
  );
}
