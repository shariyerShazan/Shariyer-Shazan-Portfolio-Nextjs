"use client";

import React from "react";
import { portfolioData } from "@/config/portfolioData";
import { FiGitPullRequest, FiGitBranch, FiExternalLink, FiCheckCircle, FiLayers } from "react-icons/fi";
import { SiNestjs } from "react-icons/si";

const OpenSource = () => {
  return (
    <section id="opensource" className="py-24 px-6 min-h-screen flex flex-col justify-center relative overflow-hidden bg-gradient-to-b from-[#0a0f1d] via-[#0d1527] to-[#0a0f1d]">
      {/* Visual background glows */}
      <div className="absolute top-[25%] left-[5%] w-[350px] h-[350px] bg-[#E0234E]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[5%] w-[320px] h-[320px] bg-[#00f0ff]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 flex items-center gap-4" data-aos="fade-right">
          <span className="text-[#00f0ff] font-mono text-2xl md:text-4xl">03.</span>
          Open Source Contributions
          <div className="h-[1px] flex-grow bg-gradient-to-r from-[#475569] to-transparent ml-4"></div>
        </h2>

        <div className="space-y-10">
          {portfolioData.openSourceContributions.map((item, index) => (
            <div 
              key={index} 
              className="bg-[#0f172a]/50 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-[#1e293b]/90 hover:border-[#E0234E]/50 transition-all duration-500 hover:-translate-y-1 group hover:shadow-[0_20px_50px_rgba(224,35,78,0.15)] relative overflow-hidden"
              data-aos="fade-up" 
              data-aos-delay={index * 100}
            >
              {/* Techy background scan grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(224,35,78,0.02)_1px,transparent_1px)] bg-[size:100%_8px] pointer-events-none group-hover:opacity-70 transition-opacity"></div>
              <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-[#E0234E]/15 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
              
              {/* Main Project Header Row */}
              <div className="flex flex-wrap justify-between items-start gap-4 mb-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-[#E0234E]/10 border border-[#E0234E]/30 text-[#E0234E] shadow-[0_0_20px_rgba(224,35,78,0.2)] group-hover:scale-105 transition-transform duration-300">
                    <SiNestjs className="text-3xl md:text-4xl" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-[#E0234E] uppercase tracking-widest flex items-center gap-1.5 font-bold">
                      <FiGitBranch className="text-xs" /> Core Framework Contribution
                    </div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white group-hover:text-[#E0234E] transition-colors font-sans tracking-tight">
                      {item.project}
                    </h3>
                  </div>
                </div>

                {/* Project Level Badges & Repo Link */}
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <FiCheckCircle className="w-3.5 h-3.5" /> {item.status || "Official Contributor"}
                  </span>
                  {item.repoUrl && (
                    <a 
                      href={item.repoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-xs font-mono text-[#cbd5e1] hover:text-white transition-all shadow-sm"
                    >
                      NestJS Repo <FiExternalLink className="w-3 h-3 text-[#00f0ff]" />
                    </a>
                  )}
                </div>
              </div>

              {/* Project Description */}
              {item.description && item.description.length > 0 && (
                <div className="mb-8 relative z-10">
                  {item.description.map((desc, dIdx) => (
                    <p key={dIdx} className="text-[#cbd5e1] text-xs md:text-sm leading-relaxed text-justify opacity-90">
                      {desc}
                    </p>
                  ))}
                </div>
              )}

              {/* Grouped Pull Requests Section (If Present) */}
              {item.pullRequests && item.pullRequests.length > 0 ? (
                <div className="space-y-4 mb-8 relative z-10">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    <FiLayers className="text-[#E0234E]" /> Merged Pull Requests ({item.pullRequests.length})
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {item.pullRequests.map((pr, prIdx) => (
                      <div 
                        key={prIdx} 
                        className="bg-[#0b1329]/80 border border-[#1e293b] hover:border-[#E0234E]/40 rounded-xl p-5 transition-all duration-300 hover:shadow-[0_8px_25px_rgba(0,0,0,0.3)] relative overflow-hidden group/pr"
                      >
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#E0234E] to-[#00f0ff] rounded-l-xl"></div>
                        
                        {/* PR Header */}
                        <div className="flex flex-wrap justify-between items-center gap-2 mb-2.5">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-[#E0234E]/15 border border-[#E0234E]/40 text-[#f43f5e]">
                              <FiGitPullRequest className="w-3.5 h-3.5" /> PR {pr.prNumber}
                            </span>
                            <h4 className="text-base md:text-lg font-bold text-white group-hover/pr:text-[#00f0ff] transition-colors">
                              {pr.title}
                            </h4>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                              <FiCheckCircle className="w-3 h-3" /> Merged
                            </span>
                            <a 
                              href={pr.prUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-mono font-medium bg-[#E0234E] hover:bg-[#c81e43] text-white transition-all shadow-[0_0_12px_rgba(224,35,78,0.25)]"
                            >
                              View PR <FiExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>

                        {/* PR Description */}
                        <p className="text-[#94a3b8] text-xs md:text-sm leading-relaxed mb-3">
                          {pr.description}
                        </p>

                        {/* PR Highlights */}
                        {pr.highlights && pr.highlights.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                            {pr.highlights.map((h, hIdx) => (
                              <div key={hIdx} className="flex items-start gap-2 text-xs text-[#cbd5e1]">
                                <FiCheckCircle className="text-[#00f0ff] w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                                <span>{h}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* PR Sub-tech Tags */}
                        {pr.tech && pr.tech.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#1e293b]/50">
                            {pr.tech.map((t) => (
                              <span key={t} className="text-[9px] font-mono text-slate-400 bg-[#070c18] px-2 py-0.5 rounded border border-slate-800">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Fallback for single PR format */
                <div className="space-y-4 mb-6 relative z-10">
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="pt-2 space-y-2">
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Key Details &amp; Impact:</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {item.highlights.map((h, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2 text-xs text-[#e2e8f0]">
                            <FiCheckCircle className="text-[#00f0ff] w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Bottom Project Level Tech Stack Tags */}
              {item.tech && item.tech.length > 0 && (
                <div className="pt-5 border-t border-[#1e293b]/70 flex flex-wrap justify-between items-center gap-4 relative z-10">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Core Topics:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tech.map((t) => (
                      <span 
                        key={t} 
                        className="text-[10px] font-mono text-[#cbd5e1] bg-[#0a0f1d] px-2.5 py-1 rounded-md border border-slate-800 hover:border-[#E0234E]/40 hover:text-white transition-colors cursor-default"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpenSource;
