import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Calendar, ArrowUpRight, Sparkles, Briefcase } from 'lucide-react';
import FadeIn from './FadeIn';
import TechCarousel from './TechCarousel';

interface ServiceItem {
  number: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  accent: string;
}

const services: ServiceItem[] = [
  {
    number: '01',
    name: 'AGENTIC AI',
    category: 'Autonomous Workflows',
    description:
      'Exploring AI agents, tool use, planning, and multi-step cyclical workflows that connect language models with purposeful actions.',
    tags: ['Autonomous Agents', 'LangGraph', 'Planning & Tool Calling', 'Stateful Workflows'],
    accent: '#7C3AED', // Violet
  },
  {
    number: '02',
    name: 'LLM APPLICATIONS & RAG',
    category: 'Contextual AI',
    description:
      'Learning to build contextual AI applications through retrieval pipelines, dense embeddings, semantic search, and output validation.',
    tags: ['Vector Embeddings', 'Chunking Strategies', 'Semantic Retrieval', 'Guardrails'],
    accent: '#4F46E5', // Indigo
  },
  {
    number: '03',
    name: 'AI + BACKEND ENGINEERING',
    category: 'Production Systems',
    description:
      'Connecting AI systems to robust asynchronous APIs, relational databases, application logic, and user-facing interfaces.',
    tags: ['FastAPI & Uvicorn', 'PostgreSQL / SQL', 'Docker', 'Async Microservices'],
    accent: '#0284C7', // Sky
  },
  {
    number: '04',
    name: 'DATA INTELLIGENCE',
    category: 'Analytical Systems',
    description:
      'Transforming natural-language business questions into validated SQL queries, actionable metrics, and interactive visualizations.',
    tags: ['Text-to-SQL', 'Schema Introspection', 'Pandas & NumPy', 'Interactive Plotly'],
    accent: '#059669', // Emerald
  },
  {
    number: '05',
    name: 'MACHINE LEARNING & COMPUTER VISION',
    category: 'Perception & Models',
    description:
      'Exploring computer vision pipelines, image processing, real-time feature extraction, and machine learning models.',
    tags: ['OpenCV', 'DeepFace & MediaPipe', 'scikit-learn', 'PyTorch & TensorFlow'],
    accent: '#D97706', // Amber
  },
];

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  focus: string;
  badge: string;
  description: string;
  highlights: string[];
  skills: string[];
  accent: string;
}

const experiences: ExperienceItem[] = [
  {
    company: 'Rezzure Info Solutions',
    role: 'Software Developer Intern',
    period: 'December 2025 – January 2026',
    focus: 'Tracknofy · Construction Documents RAG Workflow',
    badge: 'Production RAG System',
    description:
      'Engineered an end-to-end Retrieval-Augmented Generation (RAG) pipeline for construction documents on the Tracknofy platform. Designed document ingestion and chunking workflows, generated dense vector embeddings, implemented semantic retrieval mechanisms, and built high-performance FastAPI endpoints to serve grounded answers to engineering and field teams.',
    highlights: [
      'Automated document ingestion & semantic chunking strategies',
      'Dense vector embeddings & FAISS / vector index retrieval',
      'High-performance async FastAPI endpoints with schema validation',
      'Context-grounded answering reducing search time across technical specs',
    ],
    skills: ['FastAPI', 'RAG', 'Document Ingestion', 'Embeddings', 'Semantic Retrieval', 'Python', 'Vector Search'],
    accent: '#4F46E5',
  },
  {
    company: 'SAE India BAJA',
    role: 'Research Intern',
    period: 'May 2024 – August 2024',
    focus: 'ADAS Perception & Reinforcement Learning Research',
    badge: 'Autonomous Systems Research',
    description:
      'Researched and developed Advanced Driver Assistance Systems (ADAS) perception modules using OpenCV, featuring real-time lane detection, obstacle identification, and environmental analysis. Conducted simulation research integrating Deep Reinforcement Learning (DRL) with computer vision for adaptive path planning in dynamic vehicle environments.',
    highlights: [
      'Real-time lane boundary detection & road feature filtering with OpenCV',
      'Spatial obstacle identification & tracking in off-road simulations',
      'Deep Reinforcement Learning (DRL) integration for dynamic path planning',
      'Sensor-to-action simulation benchmarks for autonomous off-road vehicles',
    ],
    skills: ['OpenCV', 'Computer Vision', 'Lane Detection', 'Obstacle Identification', 'Deep Reinforcement Learning', 'Path Planning'],
    accent: '#059669',
  },
];

export const ServicesSection: React.FC = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <section
      id="specialization"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-0"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Heading: Specialization */}
        <FadeIn delay={0} y={40} className="w-full text-center mb-14 sm:mb-18 md:mb-24">
          <span className="text-xs uppercase tracking-widest text-[#0C0C0C]/50 font-semibold">
            Core Competencies
          </span>
          <h2 className="text-[#0C0C0C] font-black uppercase text-center leading-none tracking-tight text-[clamp(2.5rem,10vw,140px)] mt-2">
            Specialization
          </h2>
        </FadeIn>

        {/* Animated & Highlighted 5 Specialization Items */}
        <div className="w-full border-t border-[rgba(12,12,12,0.15)]">
          {services.map((item, index) => {
            const isHovered = hoveredService === index;

            return (
              <FadeIn key={item.number} delay={index * 0.08} y={25}>
                <motion.div
                  onMouseEnter={() => setHoveredService(index)}
                  onMouseLeave={() => setHoveredService(null)}
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className={`py-7 sm:py-9 md:py-11 border-b border-[rgba(12,12,12,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-8 md:gap-14 group transition-all duration-300 px-4 sm:px-6 rounded-2xl relative cursor-default ${
                    isHovered
                      ? 'bg-[#0C0C0C]/[0.035] shadow-[0_8px_30px_rgba(0,0,0,0.04)]'
                      : 'hover:bg-[#0C0C0C]/[0.015]'
                  }`}
                  style={
                    {
                      '--accent': item.accent,
                    } as React.CSSProperties
                  }
                >
                  {/* Left Accent Indicator Bar */}
                  <div
                    className={`absolute left-0 top-3 bottom-3 w-1.5 rounded-full transition-all duration-300 ${
                      isHovered ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                    }`}
                    style={{ backgroundColor: item.accent }}
                  />

                  {/* Left Column: Number and Category */}
                  <div className="flex flex-row sm:flex-col items-baseline sm:items-start gap-3 sm:gap-1 shrink-0 min-w-[90px] sm:min-w-[130px] md:min-w-[160px]">
                    <span
                      className="font-black text-[clamp(2.8rem,7.5vw,110px)] leading-none select-none transition-colors duration-300"
                      style={{
                        color: isHovered ? item.accent : '#0C0C0C',
                      }}
                    >
                      {item.number}
                    </span>
                    <span
                      className="text-[11px] font-mono uppercase tracking-wider font-semibold transition-colors duration-300"
                      style={{
                        color: isHovered ? item.accent : 'rgba(12, 12, 12, 0.45)',
                      }}
                    >
                      {item.category}
                    </span>
                  </div>

                  {/* Center Column: Name, Description & Focus Tags */}
                  <div className="flex-1 flex flex-col justify-center space-y-2.5 sm:space-y-3">
                    <h3 className="font-black uppercase text-[#0C0C0C] text-[clamp(1.1rem,2vw,1.85rem)] tracking-tight transition-transform duration-300">
                      {item.name}
                    </h3>
                    <p className="font-light leading-relaxed max-w-2xl text-[clamp(0.85rem,1.3vw,1.1rem)] opacity-70 text-[#0C0C0C]">
                      {item.description}
                    </p>

                    {/* Skill / Focus Tags */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-mono transition-all duration-200"
                          style={{
                            backgroundColor: isHovered ? `${item.accent}14` : 'rgba(12,12,12,0.04)',
                            color: isHovered ? item.accent : 'rgba(12,12,12,0.7)',
                            borderColor: isHovered ? `${item.accent}30` : 'transparent',
                            borderWidth: 1,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Interactive Arrow Icon */}
                  <div className="hidden sm:flex items-center justify-center shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isHovered
                          ? 'shadow-md scale-110'
                          : 'border-[rgba(12,12,12,0.12)] text-[#0C0C0C]/30 bg-transparent'
                      }`}
                      style={{
                        backgroundColor: isHovered ? item.accent : 'transparent',
                        borderColor: isHovered ? item.accent : 'rgba(12,12,12,0.12)',
                        color: isHovered ? '#FFFFFF' : 'rgba(12,12,12,0.35)',
                      }}
                    >
                      <ArrowUpRight
                        size={18}
                        className={`transition-transform duration-300 ${
                          isHovered ? 'translate-x-0.5 -translate-y-0.5' : ''
                        }`}
                      />
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>

        {/* Tech Stack Block */}
        <div id="stack" className="mt-20 sm:mt-24 md:mt-32 pt-16 border-t border-[rgba(12,12,12,0.15)]">
          <FadeIn delay={0.1} y={20}>
            <div className="text-center mb-10 sm:mb-12">
              <span className="text-xs uppercase tracking-widest text-[#0C0C0C]/50 font-semibold">ENGINEERING TOOLKIT</span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-[#0C0C0C] mt-1">
                TECHNOLOGY STACK
              </h3>
            </div>
          </FadeIn>

          <TechCarousel />
        </div>

        {/* Animated & Highlighted Internship Experience Block */}
        <div id="experience" className="mt-20 sm:mt-24 md:mt-32 pt-16 border-t border-[rgba(12,12,12,0.15)]">
          <FadeIn delay={0.1} y={20}>
            <div className="text-center mb-12 sm:mb-16">
              <span className="text-xs uppercase tracking-widest text-[#0C0C0C]/50 font-semibold">
                INDUSTRY & RESEARCH
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-[#0C0C0C] mt-1">
                INTERNSHIP EXPERIENCE
              </h3>
            </div>
          </FadeIn>

          {/* Experience Cards Grid */}
          <div className="space-y-8 sm:space-y-10">
            {experiences.map((item, index) => (
              <FadeIn key={item.company} delay={index * 0.12} y={30}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[rgba(12,12,12,0.1)] hover:border-[#0C0C0C]/25 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.09)] transition-all duration-300 relative overflow-hidden group"
                >
                  {/* Left Accent Border Stripe */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300 opacity-60 group-hover:opacity-100 group-hover:w-2.5"
                    style={{ backgroundColor: item.accent }}
                  />

                  {/* Header Row: Role, Company, Period & Badge */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[rgba(12,12,12,0.08)]">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide"
                          style={{
                            backgroundColor: `${item.accent}14`,
                            color: item.accent,
                          }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full animate-pulse"
                            style={{ backgroundColor: item.accent }}
                          />
                          {item.badge}
                        </span>
                      </div>
                      <h4 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-[#0C0C0C] group-hover:text-[var(--accent)] transition-colors">
                        {item.role}
                      </h4>
                      <div className="text-sm sm:text-base font-bold text-[#0C0C0C]/75 uppercase tracking-wide mt-1">
                        {item.company}
                      </div>
                      <div className="text-xs text-[#0C0C0C]/50 font-medium font-mono mt-0.5">
                        {item.focus}
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-3">
                      <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-[#0C0C0C]/5 text-[#0C0C0C]/75 border border-[#0C0C0C]/10 shadow-xs">
                        <Calendar size={13} className="text-[#0C0C0C]/50" />
                        {item.period}
                      </span>
                    </div>
                  </div>

                  {/* Narrative Description */}
                  <div className="py-5">
                    <p className="font-light leading-relaxed text-[#0C0C0C]/85 text-sm sm:text-base">
                      {item.description}
                    </p>
                  </div>

                  {/* Key Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pb-5">
                    {item.highlights.map((highlight, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0C0C0C]/85 bg-[#0C0C0C]/[0.025] group-hover:bg-[#0C0C0C]/[0.04] p-3 rounded-xl border border-[rgba(12,12,12,0.06)] transition-colors"
                      >
                        <CheckCircle2
                          size={16}
                          style={{ color: item.accent }}
                          className="shrink-0 mt-0.5"
                        />
                        <span className="leading-snug">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Skill Tags */}
                  <div className="pt-4 border-t border-[rgba(12,12,12,0.06)] flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-medium text-[#0C0C0C]/40 uppercase tracking-wider mr-1">
                      Key Stack:
                    </span>
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-[#0C0C0C]/5 text-[#0C0C0C]/75 border border-[#0C0C0C]/10 hover:bg-[#0C0C0C] hover:text-white transition-all cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
