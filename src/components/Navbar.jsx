import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Code2, Menu, X, Home, User, Cpu, FolderGit2, Mail, Shield } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import ResumeButton from './ResumeButton';

export const navLinks = [
  { name: "Home", path: "/", icon: Home },
  { name: "About", path: "/about", icon: User },
  { name: "Skills", path: "/skills", icon: Cpu },
  { name: "Projects", path: "/projects", icon: FolderGit2 },
  { name: "Contact", path: "/contact", icon: Mail },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const { personal } = usePortfolio();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#060813]/85 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-black/20'
          : 'bg-[#060813]/60 backdrop-blur-md border-b border-slate-900/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 group focus:outline-none"
          aria-label={`${personal?.fullName || "Developer"} Home`}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 p-[1px] shadow-md shadow-purple-900/30">
            <div className="w-full h-full bg-[#070a18] rounded-[11px] flex items-center justify-center group-hover:bg-transparent transition-colors">
              <Code2 className="w-5 h-5 text-cyan-300 group-hover:text-white transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-cyan-200 transition-colors">
              {personal?.fullName || personal?.name}
            </span>
            <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
              {personal?.displayName || personal?.shortName || "Developer"} • Portfolio
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                    isActive
                      ? 'text-white bg-purple-500/15 border border-purple-500/40 shadow-sm shadow-purple-950/50'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50 border border-transparent'
                  }`
                }
              >
                <Icon className="w-4 h-4 text-purple-400" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ResumeButton variant="nav" />
          <Link
            to="/admin"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            title="Owner Admin Login"
            aria-label="Admin Portal"
          >
            <Shield className="w-4 h-4 text-purple-400/80 hover:text-cyan-300" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden inline-flex items-center justify-center p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/70 border border-slate-800 focus:outline-none"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-cyan-300" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#080c1d]/95 backdrop-blur-2xl border-b border-slate-800 px-4 pt-3 pb-6 space-y-2">
          <nav className="flex flex-col space-y-1.5" aria-label="Mobile Navigation">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600/25 to-cyan-600/15 text-white border border-purple-500/40'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}

            <Link
              to="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60"
            >
              <Shield className="w-4 h-4 text-purple-400" />
              <span>Admin Portal</span>
            </Link>
          </nav>
          <div className="pt-3 border-t border-slate-800/80 flex flex-col">
            <ResumeButton variant="nav" className="w-full justify-center py-3" />
          </div>
        </div>
      )}
    </header>
  );
}
