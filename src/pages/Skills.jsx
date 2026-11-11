import React, { useState } from 'react';
import { Cpu, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
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
          A structured overview of the programming languages, full-stack frameworks, databases, developer tools, and modern workflows I use to build scalable web applications.
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
                      <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center p-2.5 shrink-0">
                        {tech.icon ? (
                          <img
                            src={tech.icon}
                            alt={tech.name}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        ) : (
                          <span className="font-bold font-mono text-sm text-cyan-300">
                            {tech.name.substring(0, 2)}
                          </span>
                        )}
                      </div>
                      {tech.featured && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/25">
                          <Sparkles className="w-2.5 h-2.5 text-cyan-300" />
                          Featured
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {tech.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {tech.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>{category.title}</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Ongoing Learning Focus */}
      {learningInterests.length > 0 && (
        <section className="space-y-6 pt-4 border-t border-slate-800/80">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              Technical Growth
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Current Engineering Focus Areas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {learningInterests.map((item, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 border border-slate-800/90 space-y-2"
              >
                <div className="flex items-center gap-2 text-purple-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6">
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
