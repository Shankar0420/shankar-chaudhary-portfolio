import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { navLinks } from './Navbar';

export default function Footer() {
  const { personal, contact, social } = usePortfolio();

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
                {personal?.fullName || "Shankar Kumar Chaudhary"}
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              {personal?.introduction}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{personal?.location || "India"}</span>
              </div>
              <span className="hidden sm:inline text-slate-600">•</span>
              <span className="text-purple-300">
                {personal?.educationSummary || "Galgotias University"}
              </span>
            </div>
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
            </ul>
          </div>

          {/* Column 3: Direct Contact & Verified Profiles */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Connect & Profiles
            </h3>
            <div className="space-y-2.5 text-xs sm:text-sm">
              {/* GitHub */}
              {social?.github && (
                <div className="flex items-center gap-2.5">
                  <Github className="w-4 h-4 text-purple-400 shrink-0" />
                  <a
                    href={social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-cyan-300 inline-flex items-center gap-1"
                  >
                    <span>GitHub Profile</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-500" />
                  </a>
                </div>
              )}

              {/* LinkedIn */}
              {social?.linkedin && (
                <div className="flex items-center gap-2.5">
                  <Linkedin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-cyan-300 inline-flex items-center gap-1"
                  >
                    <span>LinkedIn Profile</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-500" />
                  </a>
                </div>
              )}

              {/* Professional Email */}
              {contact?.email && (
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-slate-300 hover:text-cyan-300 inline-flex items-center gap-1"
                  >
                    <span>{contact.email}</span>
                  </a>
                </div>
              )}

              {/* Mobile Phone */}
              {contact?.phone && (
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-slate-300 hover:text-cyan-300 inline-flex items-center gap-1"
                  >
                    <span>{contact.phoneFormatted || contact.phone}</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {personal?.fullName || "Shankar Kumar Chaudhary"}. All rights reserved.</p>
          <p className="font-mono text-slate-400">
            {personal?.footerText || "Crafted with React, Tailwind CSS & Clean Architecture"}
          </p>
        </div>
      </div>
    </footer>
  );
}
