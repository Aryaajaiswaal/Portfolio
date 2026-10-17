import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  SiPython,
  SiCplusplus,
  SiJavascript,
  SiTypescript,
  SiFastapi,
  SiFlask,
  SiDjango,
  SiExpress,
  SiReact,
  SiStreamlit,
  SiPandas,
  SiNumpy,
  SiSqlite,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiHuggingface,
  SiPytorch,
  SiScikitlearn,
  SiTensorflow,
  SiOpencv,
  SiRasa,
  SiDocker,
  SiGit,
  SiLinux,
  SiGooglecloud,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa6';
import {
  TbDatabase,
  TbHierarchy,
  TbDatabaseSearch,
  TbScan,
  TbFaceId,
  TbWaveSine,
  TbMicrophone,
} from 'react-icons/tb';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { IconType } from 'react-icons';

export interface Technology {
  name: string;
  category:
    | 'Languages'
    | 'Frameworks'
    | 'Data & Databases'
    | 'AI & Multimodal'
    | 'Tools & Cloud';
  description: string;
  Icon: IconType;
  accent: string;
}

// Centralized typed data structure for all 35 technologies from the resume
export const technologies: Technology[] = [
  // 1. Languages (6)
  {
    name: 'Python',
    category: 'Languages',
    description: 'Versatile language powering AI models, deep learning pipelines, and backend architectures.',
    Icon: SiPython,
    accent: '#4F46E5', // Indigo
  },
  {
    name: 'Java',
    category: 'Languages',
    description: 'Object-oriented programming language for scalable enterprise software and multithreading.',
    Icon: FaJava,
    accent: '#4F46E5',
  },
  {
    name: 'C++',
    category: 'Languages',
    description: 'High-speed compiled language for performance-critical systems, vision compute, and algorithms.',
    Icon: SiCplusplus,
    accent: '#4F46E5',
  },
  {
    name: 'SQL',
    category: 'Languages',
    description: 'Declarative query standard for relational database modeling, analytical queries, and schema.',
    Icon: TbDatabase,
    accent: '#4F46E5',
  },
  {
    name: 'JavaScript',
    category: 'Languages',
    description: 'Dynamic scripting language enabling interactive web experiences, DOM logic, and async flows.',
    Icon: SiJavascript,
    accent: '#4F46E5',
  },
  {
    name: 'TypeScript',
    category: 'Languages',
    description: 'Statically typed superset of JavaScript providing robust type safety for full-stack engineering.',
    Icon: SiTypescript,
    accent: '#4F46E5',
  },

  // 2. Frameworks (6)
  {
    name: 'FastAPI',
    category: 'Frameworks',
    description: 'Modern, high-performance async Python framework for building production REST APIs and schemas.',
    Icon: SiFastapi,
    accent: '#0284C7', // Sky
  },
  {
    name: 'Flask',
    category: 'Frameworks',
    description: 'Lightweight and extensible Python microframework for rapid microservices and web services.',
    Icon: SiFlask,
    accent: '#0284C7',
  },
  {
    name: 'Django',
    category: 'Frameworks',
    description: 'Batteries-included Python web framework with built-in ORM, security, and admin ecosystem.',
    Icon: SiDjango,
    accent: '#0284C7',
  },
  {
    name: 'Express.js',
    category: 'Frameworks',
    description: 'Fast, minimalist backend web application framework for Node.js RESTful service architectures.',
    Icon: SiExpress,
    accent: '#0284C7',
  },
  {
    name: 'React',
    category: 'Frameworks',
    description: 'Component-based declarative library for dynamic, responsive single-page web user interfaces.',
    Icon: SiReact,
    accent: '#0284C7',
  },
  {
    name: 'Streamlit',
    category: 'Frameworks',
    description: 'Rapid prototyping UI framework turning data science and machine learning scripts into web apps.',
    Icon: SiStreamlit,
    accent: '#0284C7',
  },

  // 3. Data & Databases (7)
  {
    name: 'Pandas',
    category: 'Data & Databases',
    description: 'High-performance dataframe manipulation library for data exploration, cleaning, and analysis.',
    Icon: SiPandas,
    accent: '#059669', // Emerald
  },
  {
    name: 'NumPy',
    category: 'Data & Databases',
    description: 'Core scientific computing package for multidimensional arrays and vectorized linear algebra.',
    Icon: SiNumpy,
    accent: '#059669',
  },
  {
    name: 'SQLAlchemy',
    category: 'Data & Databases',
    description: 'Enterprise-grade Python SQL toolkit and Object Relational Mapper (ORM) for database abstraction.',
    Icon: SiSqlite,
    accent: '#059669',
  },
  {
    name: 'PostgreSQL',
    category: 'Data & Databases',
    description: 'Advanced open-source relational database supporting ACID compliance, vector search, and JSONB.',
    Icon: SiPostgresql,
    accent: '#059669',
  },
  {
    name: 'MySQL',
    category: 'Data & Databases',
    description: 'Widely used relational database management system for structured transactional application data.',
    Icon: SiMysql,
    accent: '#059669',
  },
  {
    name: 'MongoDB',
    category: 'Data & Databases',
    description: 'Document-oriented NoSQL database engineered for flexible, hierarchical JSON data stores.',
    Icon: SiMongodb,
    accent: '#059669',
  },
  {
    name: 'Redis',
    category: 'Data & Databases',
    description: 'In-memory key-value data structure store used for low-latency caching, sessions, and pub/sub.',
    Icon: SiRedis,
    accent: '#059669',
  },

  // 4. AI & Multimodal (11)
  {
    name: 'LangGraph',
    category: 'AI & Multimodal',
    description: 'Stateful multi-actor agent orchestration framework for cyclical graphs and multi-step LLMs.',
    Icon: TbHierarchy,
    accent: '#7C3AED', // Violet
  },
  {
    name: 'RAG',
    category: 'AI & Multimodal',
    description: 'Retrieval-Augmented Generation connecting LLMs to external knowledge bases via vector embeddings.',
    Icon: TbDatabaseSearch,
    accent: '#7C3AED',
  },
  {
    name: 'Rasa NLU',
    category: 'AI & Multimodal',
    description: 'Open-source conversational AI framework for intent classification and dialogue policy management.',
    Icon: SiRasa,
    accent: '#7C3AED',
  },
  {
    name: 'Transformers',
    category: 'AI & Multimodal',
    description: 'State-of-the-art Hugging Face library providing pre-trained transformer attention architectures.',
    Icon: SiHuggingface,
    accent: '#7C3AED',
  },
  {
    name: 'PyTorch',
    category: 'AI & Multimodal',
    description: 'Dynamic deep learning tensor framework for building, training, and deploying neural networks.',
    Icon: SiPytorch,
    accent: '#7C3AED',
  },
  {
    name: 'scikit-learn',
    category: 'AI & Multimodal',
    description: 'Standard Python library for classical machine learning algorithms, classification, and regression.',
    Icon: SiScikitlearn,
    accent: '#7C3AED',
  },
  {
    name: 'OpenCV',
    category: 'AI & Multimodal',
    description: 'Real-time computer vision toolkit for lane detection, image filtering, and video spatial analysis.',
    Icon: SiOpencv,
    accent: '#7C3AED',
  },
  {
    name: 'MediaPipe',
    category: 'AI & Multimodal',
    description: 'Cross-platform multimodal perception pipeline toolkit for real-time facial and hand landmarking.',
    Icon: TbScan,
    accent: '#7C3AED',
  },
  {
    name: 'TensorFlow',
    category: 'AI & Multimodal',
    description: 'Comprehensive open-source ecosystem for training, optimizing, and deploying deep neural models.',
    Icon: SiTensorflow,
    accent: '#7C3AED',
  },
  {
    name: 'DeepFace',
    category: 'AI & Multimodal',
    description: 'Lightweight facial recognition and facial attribute analysis library for emotion and affect tracking.',
    Icon: TbFaceId,
    accent: '#7C3AED',
  },
  {
    name: 'Librosa',
    category: 'AI & Multimodal',
    description: 'Audio and music analysis library extracting pitch, prosody, and spectral features for speech AI.',
    Icon: TbWaveSine,
    accent: '#7C3AED',
  },

  // 5. Tools & Cloud (5)
  {
    name: 'SpeechRecognition',
    category: 'Tools & Cloud',
    description: 'Speech processing library capturing, transcribing, and validating voice audio input into text.',
    Icon: TbMicrophone,
    accent: '#D97706', // Amber
  },
  {
    name: 'Docker',
    category: 'Tools & Cloud',
    description: 'Containerization engine packaging applications and runtime environments for reliable deployment.',
    Icon: SiDocker,
    accent: '#D97706',
  },
  {
    name: 'Git',
    category: 'Tools & Cloud',
    description: 'Distributed version control system tracking codebase changes, branching, and team collaboration.',
    Icon: SiGit,
    accent: '#D97706',
  },
  {
    name: 'Linux',
    category: 'Tools & Cloud',
    description: 'Unix-like operating system foundation for server environments, shell automation, and deployment.',
    Icon: SiLinux,
    accent: '#D97706',
  },
  {
    name: 'Google Cloud Platform',
    category: 'Tools & Cloud',
    description: 'Cloud infrastructure suite for compute engine instances, storage buckets, and AI deployment.',
    Icon: SiGooglecloud,
    accent: '#D97706',
  },
];

const categoryList = [
  'All',
  'Languages',
  'Frameworks',
  'Data & Databases',
  'AI & Multimodal',
  'Tools & Cloud',
] as const;

const N = technologies.length;

export const TechCarousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // High-frequency animation values stored in refs to avoid re-renders
  const progressRef = useRef<number>(0);
  const targetIndexRef = useRef<number>(0);
  const isHoveredRef = useRef<boolean>(false);
  const isInteractingRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ x: number; progress: number }>({ x: 0, progress: 0 });
  const tiltRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  const lastActiveIndexRef = useRef<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsPaused(true);
    }
  }, []);

  // Responsive breakpoint tracking
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update card transform in the 3D space
  const updateCards = useCallback(() => {
    const currentProgress = progressRef.current;
    const mobile = window.innerWidth < 640;
    const tablet = window.innerWidth >= 640 && window.innerWidth < 1024;

    const maxDelta = mobile ? 1.6 : tablet ? 2.5 : 3.5;
    const spacingX = mobile ? 140 : tablet ? 190 : 240;
    const depthZ = mobile ? 55 : tablet ? 75 : 90;
    const maxRot = mobile ? 28 : 24;

    for (let i = 0; i < N; i++) {
      const card = cardsRef.current[i];
      if (!card) continue;

      let delta = ((i - currentProgress) % N + N + N / 2) % N - N / 2;
      const absDelta = Math.abs(delta);

      if (absDelta > maxDelta) {
        card.style.opacity = '0';
        card.style.visibility = 'hidden';
        card.style.pointerEvents = 'none';
        continue;
      }

      card.style.visibility = 'visible';
      card.style.pointerEvents = 'auto';

      const sign = Math.sign(delta);
      const x = sign * Math.pow(absDelta, 0.86) * spacingX;
      const z = -Math.pow(absDelta, 1.25) * depthZ;
      const rotateY = -sign * Math.min(60, Math.pow(absDelta, 0.9) * maxRot);
      const scale = Math.max(0.62, 1 - absDelta * (mobile ? 0.16 : 0.12));
      const opacity = Math.max(0, 1 - Math.pow(absDelta / maxDelta, 1.9));
      const zIndex = Math.round(100 - absDelta * 18);

      card.style.transform = `translate3d(calc(-50% + ${x.toFixed(1)}px), -50%, ${z.toFixed(
        1
      )}px) rotateY(${rotateY.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
      card.style.opacity = opacity.toFixed(3);
      card.style.zIndex = zIndex.toString();
    }
  }, []);

  // Animation frame loop
  useEffect(() => {
    let animationFrameId: number;

    const loop = () => {
      // 1. Auto-rotation or smooth interpolation to target
      if (isDraggingRef.current) {
        targetIndexRef.current = progressRef.current;
      } else if (isHoveredRef.current || isPaused || isInteractingRef.current) {
        // Smoothly lerp towards targetIndex
        const diff = targetIndexRef.current - progressRef.current;
        let shortestDiff = ((diff % N) + N + N / 2) % N - N / 2;
        if (Math.abs(shortestDiff) > 0.002) {
          progressRef.current += shortestDiff * 0.08;
        } else {
          progressRef.current = targetIndexRef.current;
        }
      } else {
        // Continuous smooth auto-rotation (~5.5 seconds per card)
        progressRef.current = (progressRef.current + 0.003) % N;
        targetIndexRef.current = progressRef.current;
      }

      // Keep progressRef in [0, N)
      progressRef.current = ((progressRef.current % N) + N) % N;

      // 2. Mouse tilt interpolation
      tiltRef.current.x += (tiltRef.current.targetX - tiltRef.current.x) * 0.08;
      tiltRef.current.y += (tiltRef.current.targetY - tiltRef.current.y) * 0.08;

      if (stageRef.current) {
        stageRef.current.style.transform = `rotateX(${tiltRef.current.x.toFixed(
          2
        )}deg) rotateY(${tiltRef.current.y.toFixed(2)}deg)`;
      }

      // 3. Render cards in 3D
      updateCards();

      // 4. Update active index state for counter/label only when card changes
      const rounded = ((Math.round(progressRef.current) % N) + N) % N;
      if (rounded !== lastActiveIndexRef.current) {
        lastActiveIndexRef.current = rounded;
        setActiveIndex(rounded);
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, updateCards]);

  // Mouse hover handlers
  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    tiltRef.current.targetX = 0;
    tiltRef.current.targetY = 0;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // Subtle responsive tilt
    tiltRef.current.targetX = -y * 8;
    tiltRef.current.targetY = x * 8;
  };

  // Pointer drag/swipe handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, progress: progressRef.current };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const sensitivity = isMobile ? 180 : 250;
    progressRef.current = dragStartRef.current.progress - deltaX / sensitivity;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture was already released
    }
    // Snap to nearest integer on release
    targetIndexRef.current = Math.round(progressRef.current);
  };

  // Navigation actions
  const handlePrev = () => {
    isInteractingRef.current = true;
    targetIndexRef.current = Math.round(progressRef.current) - 1;
    setTimeout(() => {
      isInteractingRef.current = false;
    }, 800);
  };

  const handleNext = () => {
    isInteractingRef.current = true;
    targetIndexRef.current = Math.round(progressRef.current) + 1;
    setTimeout(() => {
      isInteractingRef.current = false;
    }, 800);
  };

  const handleCardClick = (idx: number) => {
    isInteractingRef.current = true;
    let diff = ((idx - progressRef.current) % N + N + N / 2) % N - N / 2;
    targetIndexRef.current = progressRef.current + diff;
    setIsPaused(true); // pause so user can inspect the card
    setTimeout(() => {
      isInteractingRef.current = false;
    }, 800);
  };

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    if (category === 'All') return;

    const targetIdx = technologies.findIndex((t) => t.category === category);
    if (targetIdx !== -1) {
      isInteractingRef.current = true;
      let diff = ((targetIdx - progressRef.current) % N + N + N / 2) % N - N / 2;
      targetIndexRef.current = progressRef.current + diff;
      setTimeout(() => {
        isInteractingRef.current = false;
      }, 800);
    }
  };

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    } else if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      setIsPaused((p) => !p);
    }
  };

  const activeTech = technologies[activeIndex] || technologies[0];

  return (
    <div
      className="relative w-full select-none focus:outline-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="3D Technology Stack Showcase"
    >
      {/* Category Navigation Pills */}
      <div className="flex items-center justify-center flex-wrap gap-2 mb-8 px-2">
        {categoryList.map((cat) => {
          const isSelected =
            cat === 'All'
              ? activeCategory === 'All'
              : activeCategory === cat || activeTech.category === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategorySelect(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-[#0C0C0C] text-white shadow-sm scale-105'
                  : 'bg-[#0C0C0C]/[0.04] text-[#0C0C0C]/70 hover:bg-[#0C0C0C]/[0.08] hover:text-[#0C0C0C]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 3D Scene Viewport */}
      <div
        ref={containerRef}
        className="relative w-full h-[290px] sm:h-[320px] md:h-[340px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
        style={{ perspective: isMobile ? '700px' : '1100px' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Subtle background ambient glow for depth */}
        <div
          className="absolute w-[240px] sm:w-[320px] h-[160px] rounded-full blur-3xl pointer-events-none opacity-20 transition-colors duration-500"
          style={{ backgroundColor: activeTech.accent }}
        />

        {/* 3D Stage with tilt */}
        <div
          ref={stageRef}
          className="relative w-full h-full flex items-center justify-center pointer-events-none"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {technologies.map((tech, idx) => {
            const isCenter = idx === activeIndex;

            return (
              <div
                key={tech.name}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                onClick={() => handleCardClick(idx)}
                className={`absolute top-1/2 left-1/2 w-[220px] sm:w-[250px] md:w-[260px] h-[205px] sm:h-[215px] md:h-[225px] rounded-2xl p-4 sm:p-5 border transition-all duration-300 flex flex-col justify-between cursor-pointer pointer-events-auto ${
                  isCenter
                    ? 'bg-[#111318] border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.4)]'
                    : 'bg-[#151821] border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.25)]'
                }`}
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  willChange: 'transform, opacity',
                  boxShadow: isCenter
                    ? `0 24px 50px -10px ${tech.accent}40, 0 0 0 1px ${tech.accent}60`
                    : undefined,
                }}
                role="button"
                tabIndex={0}
                aria-label={`${tech.name}, ${tech.category}: ${tech.description}`}
              >
                {/* Top Row: Category pill and Logo icon */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase truncate max-w-[155px] border"
                    style={{
                      backgroundColor: `${tech.accent}20`,
                      color: tech.accent,
                      borderColor: `${tech.accent}35`,
                    }}
                  >
                    {tech.category}
                  </span>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border"
                    style={{
                      backgroundColor: `${tech.accent}1A`,
                      color: tech.accent,
                      borderColor: `${tech.accent}33`,
                    }}
                  >
                    <tech.Icon size={18} />
                  </div>
                </div>

                {/* Middle Content: Technology Title and Description */}
                <div className="my-auto py-1">
                  <h4 className="text-white font-black text-lg sm:text-xl tracking-tight leading-tight mb-1 truncate">
                    {tech.name}
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#D7E2EA]/75 leading-relaxed font-light line-clamp-3">
                    {tech.description}
                  </p>
                </div>

                {/* Bottom Row: Item sequence index and verified status */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-[#D7E2EA]/50">
                  <span className="font-mono font-medium">#{String(idx + 1).padStart(2, '0')}</span>
                  <span className="flex items-center gap-1.5 font-medium" style={{ color: tech.accent }}>
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: tech.accent }}
                    />
                    <span>Active Skill</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls Bar */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6">
        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous technology"
          className="w-10 h-10 rounded-full border border-[rgba(12,12,12,0.12)] bg-white text-[#0C0C0C] flex items-center justify-center hover:bg-[#0C0C0C] hover:text-white transition-all shadow-sm cursor-pointer active:scale-95"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Active Technology Counter & Name */}
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0C0C0C]/[0.03] border border-[rgba(12,12,12,0.08)] shadow-xs">
          <span className="font-mono text-xs font-bold text-[#0C0C0C]">
            {String(activeIndex + 1).padStart(2, '0')} / {N}
          </span>
          <span className="text-xs text-[#0C0C0C]/30">•</span>
          <span className="text-xs font-semibold text-[#0C0C0C] max-w-[140px] truncate">
            {activeTech.name}
          </span>
        </div>

        {/* Play / Pause Toggle */}
        <button
          type="button"
          onClick={() => setIsPaused((p) => !p)}
          aria-label={isPaused ? 'Resume auto-rotation' : 'Pause auto-rotation'}
          className="w-10 h-10 rounded-full border border-[rgba(12,12,12,0.12)] bg-white text-[#0C0C0C] flex items-center justify-center hover:bg-[#0C0C0C] hover:text-white transition-all shadow-sm cursor-pointer active:scale-95"
        >
          {isPaused ? <Play size={16} /> : <Pause size={16} />}
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next technology"
          className="w-10 h-10 rounded-full border border-[rgba(12,12,12,0.12)] bg-white text-[#0C0C0C] flex items-center justify-center hover:bg-[#0C0C0C] hover:text-white transition-all shadow-sm cursor-pointer active:scale-95"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default TechCarousel;
