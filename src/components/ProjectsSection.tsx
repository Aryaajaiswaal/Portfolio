import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';
import LiveProjectButton from './LiveProjectButton';
import { ProjectData } from './ProjectModal';

import datanovaImg from '../assets/images/datanova_bi_1792177067040.jpg';
import ignitiaImg from '../assets/images/ignitia_agentic_1792177068326.jpg';
import rasaImg from '../assets/images/rasa_dialogue_1792177088130.jpg';
import chapsImg from '../assets/images/chaps_monitoring.jpg';
import astrostocksImg from '../assets/images/astrostocks_ai_1792177068289.jpg';

export const projectsData: ProjectData[] = [
  {
    id: 'datanova',
    number: '01',
    name: 'DataNova',
    category: 'AI BUSINESS INTELLIGENCE · TEXT-TO-SQL',
    tagline: 'Natural-language queries, multi-table schema introspection, and SQL execution guardrails',
    overview:
      'An AI-powered Business Intelligence system that translates natural-language business questions into validated SQL queries, introspects multi-table relational schemas, and delivers interactive visual analytics with execution guardrails.',
    deliverables: [
      'Natural-Language to SQL Generation',
      'Multi-Table Schema Introspection',
      'Dynamic Interactive Plotly Visualizations',
      'Safe SQL Execution & Guardrails',
    ],
    tools: ['Python', 'Streamlit', 'LangGraph', 'SQLAlchemy', 'PostgreSQL', 'Pandas', 'Plotly'],
    repoUrl: 'https://github.com/Aryaajaiswaal/DataNova',
    images: {
      col1Top: datanovaImg,
      col1Bottom: datanovaImg,
      col2: datanovaImg,
    },
  },
  {
    id: 'ignitia',
    number: '02',
    name: 'Ignitia',
    category: 'AGENTIC AI · STARTUP OPERATING SYSTEM',
    tagline: 'Multi-agent startup operating system decomposing product vision into structured architectural artifacts',
    overview:
      'An agentic startup operating system built with LangGraph that coordinates specialized autonomous AI agents to plan, decompose, and execute startup development cycles—generating market roadmaps, architectural schemas, and code skeletons.',
    deliverables: [
      'Multi-Agent LangGraph Orchestration Pipeline',
      'Hierarchical Goal Decomposition & Planning',
      'Automated Code & Artifact Generation',
      'Dockerized Execution & State Management',
    ],
    tools: ['Python', 'LangGraph', 'FastAPI', 'React', 'PostgreSQL', 'Docker'],
    repoUrl: 'https://github.com/Aryaajaiswaal/ignitia_langGraph',
    images: {
      col1Top: ignitiaImg,
      col1Bottom: ignitiaImg,
      col2: ignitiaImg,
    },
  },
  {
    id: 'rasa-mental-health',
    number: '03',
    name: 'RASA: Your Mental Health Companion',
    category: 'MULTIMODAL EMOTION RECOGNITION · CONVERSATIONAL AI',
    tagline: 'Multimodal facial and vocal emotion recognition with empathetic dialogue state modeling',
    overview:
      'A multimodal conversational AI companion engineered for empathetic mental health support. Combines computer vision facial micro-expression analysis via OpenCV and DeepFace with speech acoustic emotion extraction using Librosa to provide contextually adaptive, supportive dialogue with clinical boundary safety filters.',
    deliverables: [
      'Facial Micro-Expression & Emotion Detection',
      'Acoustic Pitch & Voice Tone Sentiment Analysis',
      'Contextual Conversational Dialogue Policy',
      'Responsible Safety & Boundary Filtering Guardrails',
    ],
    tools: ['Python', 'DeepFace', 'OpenCV', 'Librosa', 'SpeechRecognition', 'FastAPI', 'PyTorch'],
    repoUrl: 'https://github.com/Aryaajaiswaal',
    images: {
      col1Top: rasaImg,
      col1Bottom: rasaImg,
      col2: rasaImg,
    },
  },
  {
    id: 'chaps-agent',
    number: '04',
    name: 'CHAPS: AI Post-Care Monitoring Agent',
    category: 'MULTIMODAL HEALTHCARE AI · PATIENT MONITORING',
    tagline: 'Multimodal patient monitoring agent generating automated recovery reports and clinical alerts',
    overview:
      'An intelligent healthcare monitoring agent that continuously monitors post-operative patient recovery across multimodal signals (vitals telemetry, symptom progression logs, and patient voice inputs), synthesizes longitudinal trends, and automatically generates comprehensive clinical recovery reports for care teams.',
    deliverables: [
      'Multimodal Vitals & Symptom Ingestion Pipeline',
      'Automated Clinical Recovery-Report Generation',
      'Longitudinal Trend & Anomaly Detection',
      'Care Team Alerting & Patient Status Dashboard',
    ],
    tools: ['Python', 'FastAPI', 'LangGraph', 'Transformers', 'PostgreSQL', 'React'],
    repoUrl: 'https://github.com/Aryaajaiswaal',
    images: {
      col1Top: chapsImg,
      col1Bottom: chapsImg,
      col2: chapsImg,
    },
  },
  {
    id: 'astrostocks',
    number: '05',
    name: 'AstroStocks',
    category: 'EXPERIMENTAL ASTROLOGY · AI MARKET RESEARCH',
    tagline: 'Experimental astrology, planetary cycles, and AI-assisted equity analytics',
    overview:
      'An experimental application exploring astrology, planetary cycles, and AI-assisted equity analytics through an interactive financial charting terminal.',
    deliverables: [
      'Interactive Candlestick Analytics Terminal',
      'Correlation Index & Planetary Cycle Visualizer',
      'AI-Assisted Stock Research Feed',
      'Real-time Market Telemetry Data',
    ],
    tools: ['Python', 'FastAPI', 'Streamlit', 'Pandas', 'Financial APIs'],
    repoUrl: 'https://github.com/Aryaajaiswaal',
    images: {
      col1Top: astrostocksImg,
      col1Bottom: astrostocksImg,
      col2: astrostocksImg,
    },
  },
];

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
  onOpenProject: (project: ProjectData) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
  onOpenProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  return (
    <div
      ref={containerRef}
      className="h-[85vh] sticky top-24 md:top-32 flex items-center justify-center w-full"
      style={{
        top: `calc(5.5rem + ${index * 26}px)`,
      }}
    >
      <motion.div
        style={{ scale }}
        className="w-full h-full max-h-[780px] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden"
      >
        {/* Top row: Number, category label, project name, and Live Project ghost button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 md:pb-6 border-b border-[#D7E2EA]/20">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="font-black text-[#D7E2EA] text-[clamp(2.5rem,6vw,80px)] leading-none select-none">
              {project.number}
            </span>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-[#BBCCD7] font-medium">
                {project.category}
              </span>
              <h3 className="text-lg sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
                {project.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <LiveProjectButton onClick={() => onOpenProject(project)} />
          </div>
        </div>

        {/* Bottom row: Two-column image grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 flex-1 pt-3 sm:pt-4 min-h-0">
          {/* Left column (40% width / 5 cols of 12) with 2 stacked images */}
          <div className="lg:col-span-5 flex flex-col gap-3 sm:gap-4 h-full">
            {/* Top image: clamp(130px, 16vw, 230px) */}
            <div
              onClick={() => onOpenProject(project)}
              className="relative w-full h-[clamp(130px,16vw,230px)] rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden bg-[#181a20] cursor-pointer group"
            >
              <img
                src={project.images.col1Top}
                alt={`${project.name} preview 1`}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-medium">
                  Inspect
                </span>
              </div>
            </div>

            {/* Bottom image: clamp(160px, 22vw, 340px) */}
            <div
              onClick={() => onOpenProject(project)}
              className="relative w-full h-[clamp(160px,22vw,340px)] rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden bg-[#181a20] flex-1 cursor-pointer group"
            >
              <img
                src={project.images.col1Bottom}
                alt={`${project.name} preview 2`}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-medium">
                  Inspect
                </span>
              </div>
            </div>
          </div>

          {/* Right column (60% width / 7 cols of 12) has 1 tall image */}
          <div
            onClick={() => onOpenProject(project)}
            className="lg:col-span-7 relative w-full h-full min-h-[220px] rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden bg-[#181a20] cursor-pointer group"
          >
            <img
              src={project.images.col2}
              alt={`${project.name} full render`}
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white font-medium">
                View Full Showcase
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface ProjectsSectionProps {
  onOpenProject: (project: ProjectData) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenProject }) => {
  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative px-4 sm:px-6 md:px-10 pt-20 pb-28"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Heading: "Project" (singular) using .hero-heading gradient */}
        <FadeIn delay={0} y={40} className="w-full text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center text-[clamp(3rem,12vw,160px)]">
            Project
          </h2>
        </FadeIn>

        {/* 5 sticky-stacking project cards */}
        <div className="relative space-y-12 sm:space-y-16">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              totalCards={projectsData.length}
              onOpenProject={onOpenProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
