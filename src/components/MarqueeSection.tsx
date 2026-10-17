import React, { useRef, useState, useEffect } from 'react';
import datanovaImg from '../assets/images/datanova_bi_1792177067040.jpg';
import astrostocksImg from '../assets/images/astrostocks_ai_1792177068289.jpg';
import ignitiaImg from '../assets/images/ignitia_agentic_1792177068326.jpg';
import rasaImg from '../assets/images/rasa_dialogue_1792177088130.jpg';
import chapsImg from '../assets/images/chaps_monitoring.jpg';
import ragPipelineImg from '../assets/images/rag_pipeline_diagram_1792178226403.jpg';

// Helper to generate crisp dark-mode technical diagram SVGs for AI/ML engineering
function svgCard(title: string, tag: string, desc: string, accent: string, graphSvg: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="270" viewBox="0 0 420 270" fill="none">
    <rect width="420" height="270" fill="#0E1015"/>
    <defs>
      <linearGradient id="g-${title.replace(/\s+/g, '')}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#7621B0" stop-opacity="0.4"/>
      </linearGradient>
      <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="420" height="270" fill="url(#grid)"/>
    <rect x="1" y="1" width="418" height="268" rx="16" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    
    <!-- Header -->
    <rect x="24" y="24" width="8" height="8" rx="2" fill="${accent}"/>
    <text x="40" y="32" fill="${accent}" font-family="sans-serif" font-size="11" font-weight="700" letter-spacing="1.5">${tag.toUpperCase()}</text>
    <text x="24" y="58" fill="#FFFFFF" font-family="sans-serif" font-size="19" font-weight="800" letter-spacing="0.5">${title}</text>
    <text x="24" y="76" fill="rgba(215,226,234,0.6)" font-family="sans-serif" font-size="11" font-weight="400">${desc}</text>
    
    <!-- Graphic Illustration Slot -->
    <g transform="translate(24, 96)">
      ${graphSvg}
    </g>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const AI_VISUALS: string[] = [
  // 1. DataNova
  datanovaImg,
  // 2. RAG Pipeline Architecture (Targeted tile)
  ragPipelineImg,
  // 3. AstroStocks
  astrostocksImg,
  // 4. Text-to-SQL Engine
  svgCard('Text-to-SQL Pipeline', 'DataNova Core', 'NL parsing -> AST validation -> execution sandbox', '#10B981', `
    <rect width="372" height="140" rx="10" fill="#141720" stroke="rgba(255,255,255,0.06)"/>
    <rect x="15" y="20" width="105" height="100" rx="8" fill="#162220" stroke="#10B981" stroke-width="1.5"/>
    <text x="67" y="42" fill="#10B981" font-family="monospace" font-size="9" font-weight="bold" text-anchor="middle">NL QUERY</text>
    <text x="25" y="65" fill="#D7E2EA" font-family="monospace" font-size="8">"Show top 5</text>
    <text x="25" y="80" fill="#D7E2EA" font-family="monospace" font-size="8">revenue regions</text>
    <text x="25" y="95" fill="#D7E2EA" font-family="monospace" font-size="8">in Q4 2025"</text>
    <path d="M120 70 L155 70" stroke="#10B981" stroke-width="2" marker-end="url(#arrow)"/>
    <rect x="155" y="20" width="200" height="100" rx="8" fill="#171A21" stroke="rgba(255,255,255,0.1)"/>
    <text x="170" y="42" fill="#BBCCD7" font-family="monospace" font-size="9" font-weight="bold">SYNTHESIZED SQL</text>
    <text x="170" y="65" fill="#38BDF8" font-family="monospace" font-size="9">SELECT region, SUM(rev)</text>
    <text x="170" y="80" fill="#F472B6" font-family="monospace" font-size="9">FROM sales GROUP BY 1</text>
    <text x="170" y="95" fill="#FBBF24" font-family="monospace" font-size="9">ORDER BY 2 DESC LIMIT 5;</text>
  `),
  // 5. Ignitia
  ignitiaImg,
  // 6. Rasa Conversational AI
  rasaImg,
  // 7. RAG Vector Retrieval
  svgCard('RAG Retrieval Matrix', 'Semantic Search', 'Dense embeddings, FAISS indexing, re-ranking', '#A855F7', `
    <rect width="372" height="140" rx="10" fill="#141720" stroke="rgba(255,255,255,0.06)"/>
    <g transform="translate(25, 20)">
      <circle cx="30" cy="30" r="16" fill="#A855F7" fill-opacity="0.3" stroke="#A855F7" stroke-width="2"/>
      <circle cx="90" cy="40" r="22" fill="#00D2FF" fill-opacity="0.2" stroke="#00D2FF" stroke-width="1.5"/>
      <circle cx="160" cy="25" r="14" fill="#A855F7" fill-opacity="0.4" stroke="#A855F7" stroke-width="2"/>
      <circle cx="120" cy="80" r="28" fill="#7621B0" fill-opacity="0.25" stroke="#7621B0" stroke-width="2"/>
      <line x1="30" y1="30" x2="90" y2="40" stroke="rgba(255,255,255,0.2)" stroke-dasharray="2 2"/>
      <line x1="90" y1="40" x2="160" y2="25" stroke="rgba(255,255,255,0.2)" stroke-dasharray="2 2"/>
      <line x1="90" y1="40" x2="120" y2="80" stroke="#00D2FF" stroke-width="2"/>
      <text x="220" y="35" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="bold">Cosine Similarity</text>
      <text x="220" y="55" fill="#A855F7" font-family="monospace" font-size="12">Score: 0.942</text>
      <text x="220" y="75" fill="rgba(255,255,255,0.6)" font-family="sans-serif" font-size="9">Top-K Chunk Retained</text>
    </g>
  `),
  // 8. CHAPS Patient Monitoring
  chapsImg,
  // 9. Neural Network Architecture
  svgCard('Deep Neural Networks', 'Core AI/ML', 'Multi-layer perceptron & backprop loss telemetry', '#EC4899', `
    <rect width="372" height="140" rx="10" fill="#141720" stroke="rgba(255,255,255,0.06)"/>
    <g transform="translate(40, 20)">
      <circle cx="20" cy="20" r="9" fill="#EC4899"/>
      <circle cx="20" cy="50" r="9" fill="#EC4899"/>
      <circle cx="20" cy="80" r="9" fill="#EC4899"/>
      <circle cx="100" cy="15" r="9" fill="#8B5CF6"/>
      <circle cx="100" cy="45" r="9" fill="#8B5CF6"/>
      <circle cx="100" cy="75" r="9" fill="#8B5CF6"/>
      <circle cx="100" cy="105" r="9" fill="#8B5CF6"/>
      <circle cx="180" cy="35" r="9" fill="#06B6D4"/>
      <circle cx="180" cy="65" r="9" fill="#06B6D4"/>
      <circle cx="260" cy="50" r="10" fill="#10B981"/>
      <line x1="20" y1="20" x2="100" y2="15" stroke="rgba(255,255,255,0.15)"/>
      <line x1="20" y1="50" x2="100" y2="45" stroke="rgba(255,255,255,0.2)"/>
      <line x1="20" y1="80" x2="100" y2="75" stroke="rgba(255,255,255,0.15)"/>
      <line x1="100" y1="45" x2="180" y2="35" stroke="rgba(255,255,255,0.2)"/>
      <line x1="100" y1="45" x2="180" y2="65" stroke="rgba(255,255,255,0.2)"/>
      <line x1="180" y1="35" x2="260" y2="50" stroke="#10B981" stroke-width="1.5"/>
    </g>
  `),
  // 10. Computer Vision OpenCV
  svgCard('Computer Vision', 'OpenCV & YOLO', 'Edge detection, feature extraction & spatial tensors', '#F59E0B', `
    <rect width="372" height="140" rx="10" fill="#141720" stroke="rgba(255,255,255,0.06)"/>
    <rect x="25" y="20" width="140" height="95" rx="6" fill="#1D2330" stroke="#F59E0B" stroke-dasharray="4 2"/>
    <rect x="45" y="35" width="60" height="65" rx="4" fill="none" stroke="#10B981" stroke-width="2"/>
    <text x="50" y="30" fill="#10B981" font-family="monospace" font-size="8">obj: 98.4%</text>
    <circle cx="75" cy="55" r="12" fill="none" stroke="#F59E0B" stroke-width="1.5"/>
    <text x="195" y="45" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="bold">Feature Maps</text>
    <text x="195" y="65" fill="#BBCCD7" font-family="monospace" font-size="9">Conv2D 3x3 s=1</text>
    <text x="195" y="85" fill="#F59E0B" font-family="monospace" font-size="9">Channels: 512</text>
  `),
  // 11. Backend API & Docker
  svgCard('FastAPI Microservices', 'Backend Systems', 'High-throughput async endpoints & Docker runtime', '#38BDF8', `
    <rect width="372" height="140" rx="10" fill="#141720" stroke="rgba(255,255,255,0.06)"/>
    <rect x="20" y="20" width="330" height="30" rx="6" fill="#1F2937"/>
    <text x="35" y="39" fill="#10B981" font-family="monospace" font-size="10" font-weight="bold">POST</text>
    <text x="75" y="39" fill="#FFFFFF" font-family="monospace" font-size="10">/api/v1/agent/orchestrate</text>
    <text x="290" y="39" fill="#38BDF8" font-family="monospace" font-size="10">200 OK</text>
    <rect x="20" y="65" width="155" height="55" rx="6" fill="#171E2B" stroke="#38BDF8" stroke-width="1"/>
    <text x="32" y="85" fill="#38BDF8" font-family="monospace" font-size="9" font-weight="bold">Docker Container</text>
    <text x="32" y="102" fill="rgba(255,255,255,0.7)" font-family="sans-serif" font-size="8">uvicorn + python:3.11</text>
    <rect x="190" y="65" width="160" height="55" rx="6" fill="#171E2B" stroke="#10B981" stroke-width="1"/>
    <text x="202" y="85" fill="#10B981" font-family="monospace" font-size="9" font-weight="bold">PostgreSQL Engine</text>
    <text x="202" y="102" fill="rgba(255,255,255,0.7)" font-family="sans-serif" font-size="8">pgvector + asyncpg</text>
  `),
  // 12. AstroStocks Financial Analytics
  astrostocksImg,
  // 13. DataNova Schema Introspector
  datanovaImg,
  // 14. Ignitia Workflow Runner
  ignitiaImg,
  // 15. Transformers Self-Attention
  svgCard('Self-Attention Maps', 'Transformers NLP', 'Multi-head query-key-value dot product matrix', '#8B5CF6', `
    <rect width="372" height="140" rx="10" fill="#141720" stroke="rgba(255,255,255,0.06)"/>
    <g transform="translate(30, 20)">
      <rect x="0" y="0" width="22" height="22" fill="#8B5CF6" fill-opacity="0.9"/>
      <rect x="26" y="0" width="22" height="22" fill="#8B5CF6" fill-opacity="0.4"/>
      <rect x="52" y="0" width="22" height="22" fill="#8B5CF6" fill-opacity="0.1"/>
      <rect x="78" y="0" width="22" height="22" fill="#8B5CF6" fill-opacity="0.7"/>
      <rect x="0" y="26" width="22" height="22" fill="#8B5CF6" fill-opacity="0.3"/>
      <rect x="26" y="26" width="22" height="22" fill="#8B5CF6" fill-opacity="0.8"/>
      <rect x="52" y="26" width="22" height="22" fill="#8B5CF6" fill-opacity="0.5"/>
      <rect x="78" y="26" width="22" height="22" fill="#8B5CF6" fill-opacity="0.2"/>
      <rect x="0" y="52" width="22" height="22" fill="#8B5CF6" fill-opacity="0.2"/>
      <rect x="26" y="52" width="22" height="22" fill="#8B5CF6" fill-opacity="0.6"/>
      <rect x="52" y="52" width="22" height="22" fill="#8B5CF6" fill-opacity="0.9"/>
      <rect x="78" y="52" width="22" height="22" fill="#8B5CF6" fill-opacity="0.4"/>
      <text x="130" y="35" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="bold">Attention Matrix</text>
      <text x="130" y="55" fill="#BBCCD7" font-family="monospace" font-size="9">Softmax(QK^T / sqrt(d))</text>
      <text x="130" y="75" fill="#8B5CF6" font-family="monospace" font-size="9">Heads: 12 | Layers: 12</text>
    </g>
  `),
  // 16. Rasa Dialogue Tree
  rasaImg,
  // 17. CHAPS Clinical Telemetry
  chapsImg,
  // 18. Loss Convergence Curve
  svgCard('Model Training Telemetry', 'Optimization', 'Cross-entropy loss minimization with AdamW', '#06B6D4', `
    <rect width="372" height="140" rx="10" fill="#141720" stroke="rgba(255,255,255,0.06)"/>
    <path d="M 30 110 Q 70 90, 110 50 T 200 30 T 320 25" fill="none" stroke="#06B6D4" stroke-width="2.5"/>
    <path d="M 30 110 Q 70 85, 110 65 T 200 48 T 320 40" fill="none" stroke="#EC4899" stroke-width="1.5" stroke-dasharray="4 2"/>
    <text x="35" y="25" fill="#06B6D4" font-family="monospace" font-size="9">Train Loss: 0.041</text>
    <text x="180" y="25" fill="#EC4899" font-family="monospace" font-size="9">Val Loss: 0.052</text>
  `),
  // 19. Data Visualization Plotly
  svgCard('Dynamic Data Insights', 'DataNova BI', 'Interactive multi-series charts & metrics', '#F59E0B', `
    <rect width="372" height="140" rx="10" fill="#141720" stroke="rgba(255,255,255,0.06)"/>
    <rect x="40" y="80" width="28" height="40" rx="4" fill="#3B82F6"/>
    <rect x="85" y="50" width="28" height="70" rx="4" fill="#8B5CF6"/>
    <rect x="130" y="30" width="28" height="90" rx="4" fill="#10B981"/>
    <rect x="175" y="45" width="28" height="75" rx="4" fill="#F59E0B"/>
    <rect x="220" y="65" width="28" height="55" rx="4" fill="#EC4899"/>
    <text x="270" y="60" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="bold">Revenue</text>
    <text x="270" y="80" fill="#10B981" font-family="monospace" font-size="14" font-weight="bold">+28.4%</text>
  `),
  // 20. Ignitia Code Executor
  ignitiaImg,
  // 21. Astrological Market Engine
  astrostocksImg,
];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollOffset, setScrollOffset] = useState<number>(0);

  // Row 1: first 11 images (tripled)
  const row1Base = AI_VISUALS.slice(0, 11);
  const row1Images = [...row1Base, ...row1Base, ...row1Base];

  // Row 2: remaining 10 images (tripled)
  const row2Base = AI_VISUALS.slice(11);
  const row2Images = [...row2Base, ...row2Base, ...row2Base];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setScrollOffset(offset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const row1Translate = scrollOffset - 200;
  const row2Translate = -(scrollOffset - 200);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden select-none"
    >
      <div className="flex flex-col gap-3">
        {/* Row 1: Moves RIGHT on scroll (translateX(offset - 200)) */}
        <div
          className="flex gap-3 flex-nowrap"
          style={{
            transform: `translateX(${row1Translate}px)`,
            willChange: 'transform',
          }}
        >
          {row1Images.map((src, index) => (
            <div
              key={`row1-${index}`}
              className="w-[420px] h-[270px] min-w-[420px] shrink-0 rounded-2xl overflow-hidden bg-[#181a20] border border-white/5 relative group"
            >
              <img
                src={src}
                alt={`AI & Systems Showcase ${index + 1}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Row 2: Moves LEFT on scroll (translateX(-(offset - 200))) */}
        <div
          className="flex gap-3 flex-nowrap"
          style={{
            transform: `translateX(${row2Translate}px)`,
            willChange: 'transform',
          }}
        >
          {row2Images.map((src, index) => (
            <div
              key={`row2-${index}`}
              className="w-[420px] h-[270px] min-w-[420px] shrink-0 rounded-2xl overflow-hidden bg-[#181a20] border border-white/5 relative group"
            >
              <img
                src={src}
                alt={`AI & Systems Showcase ${index + 12}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
