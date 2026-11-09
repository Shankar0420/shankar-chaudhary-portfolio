import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { AdminAuthProvider } from './context/AdminAuthContext';

function RouteChangeHandler() {
  const { pathname } = useLocation();
  const { personal } = usePortfolio();
  const name = personal?.fullName || personal?.name || "Developer";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const titles = {
      '/': `${name} | Software & Full Stack Developer`,
      '/about': `About Me | ${name}`,
      '/skills': `Skills & Technologies | ${name}`,
      '/projects': `Projects | ${name}`,
      '/contact': `Contact Me | ${name}`,
      '/admin': `Admin Dashboard | ${name}`
    };
    document.title = titles[pathname] || `${name} | Developer Portfolio`;
  }, [pathname, name]);

  return null;
}

function MainAppShell() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-[#060813] text-slate-100 selection:bg-purple-500/30 selection:text-cyan-200">
      <RouteChangeHandler />
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <PortfolioProvider>
        <AdminAuthProvider>
          <MainAppShell />
        </AdminAuthProvider>
      </PortfolioProvider>
    </BrowserRouter>
  );
}
