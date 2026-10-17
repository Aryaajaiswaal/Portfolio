import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ChevronLeft, ChevronRight, Layers, Box, Sparkles, CheckCircle2 } from 'lucide-react';
import ContactButton from './ContactButton';

export interface ProjectData {
  id: string;
  number: string;
  name: string;
  category: string;
  tagline: string;
  overview: string;
  deliverables: string[];
  tools: string[];
  repoUrl?: string;
  liveUrl?: string;
  images: {
    col1Top: string;
    col1Bottom: string;
    col2: string;
  };
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
  onSelectProject: (project: ProjectData) => void;
  allProjects: ProjectData[];
  onOpenContact: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onSelectProject,
  allProjects,
  onOpenContact,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  if (!project) return null;

  const imageList = [
    { url: project.images.col2, title: 'Hero Visualization' },
    { url: project.images.col1Top, title: 'Detail Framing' },
    { url: project.images.col1Bottom, title: 'Surface Texture & Lighting' },
  ];

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-[#101114] border border-[#2A2E35] rounded-3xl text-[#D7E2EA] shadow-2xl z-10 my-auto overflow-hidden max-h-[92vh] flex flex-col"
        >
          {/* Header bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#23272e] shrink-0 bg-[#14151a]">
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono text-[#BBCCD7] font-bold">{project.number}</span>
              <span className="text-xs uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/10 text-white font-medium">
                {project.category}
              </span>
              <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-white truncate max-w-xs sm:max-w-md">
                {project.name}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onSelectProject(prevProject)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#D7E2EA] transition-colors cursor-pointer"
                title={`Previous: ${prevProject.name}`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => onSelectProject(nextProject)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#D7E2EA] transition-colors cursor-pointer"
                title={`Next: ${nextProject.name}`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#D7E2EA] hover:text-white transition-colors cursor-pointer ml-2"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal body */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
            {/* Main Stage Image */}
            <div className="space-y-3">
              <div className="relative w-full h-[320px] sm:h-[440px] md:h-[500px] rounded-2xl overflow-hidden bg-[#181a20] border border-white/10 group">
                <img
                  src={imageList[activeImageIndex].url}
                  alt={`${project.name} - ${imageList[activeImageIndex].title}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                />
                <div className="absolute bottom-3 left-4 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md text-xs uppercase tracking-wider text-white">
                  {imageList[activeImageIndex].title} ({activeImageIndex + 1}/{imageList.length})
                </div>
              </div>

              {/* Thumbnails row */}
              <div className="grid grid-cols-3 gap-3">
                {imageList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative h-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'border-[#BBCCD7] scale-101 ring-2 ring-[#B600A8]/50' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Project Specs & Narrative */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-[#23272e]">
              <div className="md:col-span-2 space-y-4">
                <h4 className="text-xl font-bold uppercase tracking-tight text-white">Project Direction & Concept</h4>
                <p className="text-[#D7E2EA]/80 leading-relaxed font-light text-sm sm:text-base">
                  {project.overview}
                </p>
                <div className="pt-2">
                  <div className="text-xs uppercase tracking-wider text-[#BBCCD7] font-semibold mb-2">Key Deliverables</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.deliverables.map((deliv, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#D7E2EA]/90 bg-white/5 px-3 py-2 rounded-lg border border-white/5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#BBCCD7]" />
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6 bg-[#16181f] p-5 rounded-2xl border border-white/5">
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#D7E2EA]/60 font-medium mb-2">Software & Engine Stack</div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tools.map((tool, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/10 text-white">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wider text-[#D7E2EA]/60 font-medium mb-1">Role & Focus</div>
                  <div className="text-sm font-medium text-white">AI / ML Engineer & Developer</div>
                  <div className="text-xs text-[#D7E2EA]/60 mt-0.5">Aryaa Jaiswal</div>
                </div>

                <div className="pt-2 space-y-2">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/10"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View GitHub Repository</span>
                    </a>
                  )}
                  <ContactButton
                    label="Connect on LinkedIn"
                    onClick={() => {
                      window.open('https://www.linkedin.com/in/aaryaa-jaiswwall-7n/?isSelfProfile=true', '_blank', 'noopener,noreferrer');
                    }}
                    className="w-full !px-4 !py-3 text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
