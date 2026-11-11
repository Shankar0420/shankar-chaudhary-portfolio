import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';

function RouteChangeHandler() {
  const { pathname } = useLocation();
  const { personal } = usePortfolio();
  const name = personal?.fullName || "Shankar Kumar Chaudhary";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const titles = {
      '/': `${name} | Full Stack Developer`,
      '/about': `About Me | ${name}`,
      '/skills': `Skills & Technologies | ${name}`,
      '/projects': `Projects | ${name}`,
      '/contact': `Contact Me | ${name}`
    };
    document.title = titles[pathname] || `${name} | Developer Portfolio`;
  }, [pathname, name]);

  return null;
}

function MainAppShell() {
  return (
    <div className="min-h-screen flex flex-col bg-[#060813] text-slate-100 selection:bg-purple-500/30 selection:text-cyan-200">
      <RouteChangeHandler />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <PortfolioProvider>
        <MainAppShell />
      </PortfolioProvider>
    </BrowserRouter>
  );
}
