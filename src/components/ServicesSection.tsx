import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Calendar, ArrowUpRight, Sparkles, Briefcase, Maximize2, X } from 'lucide-react';
import FadeIn from './FadeIn';
import TechCarousel from './TechCarousel';

import ragPipelineImg from '../assets/images/rag_pipeline_diagram_1792178226403.jpg';
import adasPerceptionImg from '../assets/images/adas_perception.jpg';

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
  accentSecondary: string;
  bgGradient: string;
  glowColor: string;
  borderColor: string;
  image: string;
  imageCaption: string;
  tagline: string;
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
    accent: '#06B6D4', // Vibrant Cyan matching RAG pipeline glow
    accentSecondary: '#8B5CF6', // Purple matching RAG LLM synthesis
    bgGradient: 'linear-gradient(135deg, #0A0E18 0%, #0E1626 50%, #0B101C 100%)', // Deep cyber-navy matching RAG diagram
    glowColor: 'rgba(6, 182, 212, 0.28)',
    borderColor: 'rgba(6, 182, 212, 0.24)',
    image: ragPipelineImg,
    imageCaption: 'Tracknofy End-to-End RAG Architecture & Vector Index Pipeline',
    tagline: 'RAG Architecture Diagram',
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
    accent: '#10B981', // Neon Emerald matching ADAS lane telemetry
    accentSecondary: '#06B6D4', // Cyan HUD secondary
    bgGradient: 'linear-gradient(135deg, #07130F 0%, #0B1E17 50%, #091712 100%)', // Deep cockpit emerald-black matching HUD
    glowColor: 'rgba(16, 185, 129, 0.28)',
    borderColor: 'rgba(16, 185, 129, 0.24)',
    image: adasPerceptionImg,
    imageCaption: 'Real-Time ADAS Computer Vision & Deep RL Trajectory HUD',
    tagline: 'Perception & DRL Simulation HUD',
  },
];

interface ExperienceCardProps {
  item: ExperienceItem;
  index: number;
  onOpenPreview: (data: { url: string; caption: string; company: string; badge: string }) => void;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ item, index, onOpenPreview }) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <FadeIn delay={index * 0.12} y={30}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -8, scale: 1.006 }}
        transition={{ type: 'spring', stiffness: 320, damping: 24 }}
        className="rounded-3xl p-6 sm:p-8 md:p-10 border transition-all duration-300 relative overflow-hidden group cursor-default text-[#D7E2EA]"
        style={
          {
            background: item.bgGradient,
            borderColor: isHovered ? item.accent : item.borderColor,
            boxShadow: isHovered
              ? `0 30px 60px -15px ${item.glowColor}, 0 0 0 1px ${item.accent}66`
              : `0 12px 36px -10px rgba(0,0,0,0.35), 0 0 0 1px ${item.borderColor}`,
            '--accent': item.accent,
          } as React.CSSProperties
        }
      >
        {/* Dynamic Cursor Spotlight Overlay */}
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
          style={{
            background: `radial-gradient(650px circle at ${mousePosition.x}px ${mousePosition.y}px, ${item.accent}20, transparent 70%)`,
          }}
        />

        {/* Left Glowing Accent Stripe */}
        <div
          className="absolute left-0 top-0 bottom-0 transition-all duration-300 z-10"
          style={{
            width: isHovered ? '8px' : '5px',
            background: `linear-gradient(180deg, ${item.accent}, ${item.accentSecondary})`,
            boxShadow: isHovered ? `0 0 20px ${item.accent}` : 'none',
          }}
        />

        {/* Card Content: 2-Column Responsive Split */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column (7 cols): Header, Narrative, Highlights, Tech Stack */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
            {/* Header: Role, Company, Period & Radar Badge */}
            <div className="pb-5 border-b border-white/10">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300"
                  style={{
                    backgroundColor: `${item.accent}1A`,
                    color: item.accent,
                    borderColor: `${item.accent}40`,
                  }}
                >
                  <span className="relative flex h-2 w-2">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ backgroundColor: item.accent }}
                    />
                    <span
                      className="relative inline-flex rounded-full h-2 w-2"
                      style={{ backgroundColor: item.accent }}
                    />
                  </span>
                  {item.badge}
                </span>

                <span
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold transition-all duration-300 border bg-white/5 border-white/10 text-white/70"
                >
                  <Calendar size={12} className="shrink-0" style={{ color: item.accent }} />
                  {item.period}
                </span>
              </div>

              <h4
                className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white transition-colors duration-300"
                style={{
                  color: isHovered ? item.accent : '#FFFFFF',
                }}
              >
                {item.role}
              </h4>
              <div
                className="text-sm sm:text-base font-bold uppercase tracking-wide mt-1 transition-colors duration-300"
                style={{ color: item.accent }}
              >
                {item.company}
              </div>
              <div className="text-xs text-slate-400 font-medium font-mono mt-0.5">
                {item.focus}
              </div>
            </div>

            {/* Narrative Description */}
            <p className="font-light leading-relaxed text-slate-300 text-sm sm:text-base">
              {item.description}
            </p>

            {/* Key Highlights Grid with Staggered Micro-Hovers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {item.highlights.map((highlight, hIdx) => (
                <motion.div
                  key={hIdx}
                  whileHover={{ x: 4, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 p-3 rounded-xl border transition-all duration-200 cursor-default"
                  style={{
                    backgroundColor: isHovered ? `${item.accent}14` : 'rgba(255, 255, 255, 0.04)',
                    borderColor: isHovered ? `${item.accent}35` : 'rgba(255, 255, 255, 0.08)',
                    boxShadow: isHovered ? `0 4px 16px ${item.accent}18` : 'none',
                  }}
                >
                  <motion.div whileHover={{ scale: 1.25, rotate: 10 }}>
                    <CheckCircle2
                      size={16}
                      style={{ color: item.accent }}
                      className="shrink-0 mt-0.5"
                    />
                  </motion.div>
                  <span className="leading-snug">{highlight}</span>
                </motion.div>
              ))}
            </div>

            {/* Bottom Skill Tags with Interactive Spring Bounces */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-wider mr-1">
                Key Stack:
              </span>
              {item.skills.map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ y: -3, scale: 1.06 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium border transition-all duration-200 cursor-default"
                  style={{
                    backgroundColor: `${item.accent}14`,
                    color: item.accent,
                    borderColor: `${item.accent}33`,
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Right Column (5 cols): Interactive Technical Graphic Card */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div
              onClick={() =>
                onOpenPreview({
                  url: item.image,
                  caption: item.imageCaption,
                  company: item.company,
                  badge: item.badge,
                })
              }
              className="relative w-full h-full min-h-[220px] sm:min-h-[260px] lg:min-h-[340px] rounded-2xl overflow-hidden bg-black border group/img cursor-pointer transition-all duration-500 flex flex-col justify-between"
              style={{
                borderColor: `${item.accent}35`,
                boxShadow: isHovered
                  ? `0 16px 36px -8px ${item.glowColor}`
                  : '0 8px 24px -4px rgba(0,0,0,0.5)',
              }}
            >
              <img
                src={item.image}
                alt={item.imageCaption}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                loading="lazy"
              />

              {/* Top Glass Tagline Badge */}
              <div className="relative z-10 p-3.5 sm:p-4 flex items-center justify-between">
                <span
                  className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold border backdrop-blur-md flex items-center gap-1.5"
                  style={{
                    backgroundColor: 'rgba(8, 12, 20, 0.88)',
                    borderColor: `${item.accent}55`,
                    color: item.accent,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: item.accent }}
                  />
                  <span>{item.tagline}</span>
                </span>

                <div
                  className="w-7 h-7 rounded-full backdrop-blur-md border flex items-center justify-center text-white/80 group-hover/img:text-white group-hover/img:scale-110 transition-all"
                  style={{
                    backgroundColor: 'rgba(8, 12, 20, 0.75)',
                    borderColor: `${item.accent}40`,
                  }}
                >
                  <Maximize2 size={12} style={{ color: item.accent }} />
                </div>
              </div>

              {/* Bottom Gradient Caption Bar */}
              <div className="relative z-10 p-4 sm:p-5 bg-gradient-to-t from-black/95 via-black/80 to-transparent pt-8">
                <p className="text-xs sm:text-sm font-semibold text-white tracking-wide line-clamp-2">
                  {item.imageCaption}
                </p>
                <div className="flex items-center gap-2 mt-1 text-[11px] font-mono">
                  <span style={{ color: item.accent }}>Click to inspect diagram</span>
                  <span style={{ color: item.accent }}>↗</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </FadeIn>
  );
};

export const ServicesSection: React.FC = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [activeGraphic, setActiveGraphic] = useState<{
    url: string;
    caption: string;
    company: string;
    badge: string;
  } | null>(null);

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
              <ExperienceCard
                key={item.company}
                item={item}
                index={index}
                onOpenPreview={setActiveGraphic}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal for Architecture Graphics */}
      <AnimatePresence>
        {activeGraphic && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveGraphic(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-5xl w-full bg-[#111318] border border-white/15 rounded-3xl p-4 sm:p-6 text-white shadow-2xl z-10 my-auto overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#BBCCD7] font-mono">
                    {activeGraphic.company} · {activeGraphic.badge}
                  </span>
                  <h3 className="text-base sm:text-xl font-bold tracking-tight text-white mt-0.5">
                    {activeGraphic.caption}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveGraphic(null)}
                  className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close preview"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-black aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center">
                <img
                  src={activeGraphic.url}
                  alt={activeGraphic.caption}
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServicesSection;
