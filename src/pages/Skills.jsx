import React, { useState } from 'react';
import { Cpu, Sparkles, CheckCircle2, Layers } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { skills = {} } = usePortfolio();

  const rawCategories = skills?.categories || [];
  const learningInterests = skills?.learningInterests || [];

  // Filter skills by visible !== false in each category
  const categories = rawCategories
    .map((cat) => ({
      ...cat,
      items: (cat.items || []).filter((item) => item.visible !== false)
    }))
    .filter((cat) => cat.items.length > 0);

  const visibleCategories =
    selectedCategory === "all"
      ? categories
      : categories.filter((c) => c.id === selectedCategory);

  const totalVisibleSkills = categories.reduce((sum, c) => sum + c.items.length, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Header */}
      <section className="space-y-4 max-w-3xl">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
          <Cpu className="w-3.5 h-3.5" />
          Skills & Technologies
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Technical Stack & Development Tools
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Centralized in <code className="font-mono text-cyan-300">src/data/skillsData.js</code>. Add, edit, or remove skills in that file to automatically update this page without modifying component code.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-3">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              selectedCategory === "all"
                ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-md shadow-purple-950/40"
                : "bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800"
            }`}
          >
            All Categories ({totalVisibleSkills})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-md shadow-purple-950/40"
                  : "bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800"
              }`}
            >
              {cat.title} ({cat.items.length})
            </button>
          ))}
        </div>
      </section>

      {/* Skill Category Sections */}
      <div className="space-y-12">
        {visibleCategories.map((category) => (
          <section key={category.id} className="space-y-5">
            <div className="border-b border-slate-800/80 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                  <Layers className="w-5 h-5 text-purple-400" />
                  <span>{category.title}</span>
                </h2>
                {category.subtitle && (
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                    {category.subtitle}
                  </p>
                )}
              </div>
              <span className="text-xs font-mono text-cyan-300">
                {category.items.length} {category.items.length === 1 ? "Technology" : "Technologies"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {category.items.map((tech) => (
                <div
                  key={`${category.id}-${tech.name}`}
                  className={`glass-card glass-card-hover rounded-2xl p-5 border border-slate-800/90 ${category.borderAccent || "hover:border-purple-500/50"} flex flex-col justify-between gap-4`}
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-950/90 border border-slate-800 p-2.5 flex items-center justify-center">
                        <img
                          src={tech.icon || tech.iconUrl}
                          alt={`${tech.name} icon`}
                          className="w-full h-full object-contain"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-slate-900 text-slate-300 border border-slate-800">
                        {tech.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white">{tech.name}</h3>
                      {tech.description && (
                        <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
                          {tech.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/60 flex items-center gap-1.5 text-[11px] font-mono text-cyan-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>Practical Project Stack</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Learning & Development Interests */}
      {learningInterests.length > 0 && (
        <section className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-800/90 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-300">
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>Continuous Improvement</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Learning & Development Interests
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              Areas where I actively invest study time to build stronger software engineering foundations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {learningInterests.map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-2xl bg-slate-950/75 border border-slate-800/90 space-y-2"
              >
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
