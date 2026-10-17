import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Sparkles, Clock, ArrowRight } from 'lucide-react';
import ContactButton from './ContactButton';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

const tiers = [
  {
    name: 'Agentic Workflows',
    price: 'LangGraph',
    turnaround: 'Active Research',
    description: 'Autonomous multi-step agents, dynamic tool invocation, planning trees, and LangGraph workflow orchestration.',
    features: [
      'Multi-agent cyclical state graphs',
      'Structured Pydantic tool outputs',
      'Contextual retrieval & memory layers',
      'FastAPI async integration endpoints',
      'Docker containerized testing sandboxes',
    ],
    highlight: true,
  },
  {
    name: 'Data Intelligence',
    price: 'Text-to-SQL',
    turnaround: 'DataNova Engine',
    description: 'Transforming natural language questions into safe SQL queries, automated schema mapping, and interactive Plotly analytics.',
    features: [
      'Natural-language to SQL translation',
      'Multi-dialect query generation',
      'Schema introspection & AST parsing',
      'Interactive Plotly and Streamlit dashboards',
      'Execution guardrails & validation',
    ],
    highlight: false,
  },
  {
    name: 'Conversational NLP',
    price: 'Rasa & LLMs',
    turnaround: 'Dialogue Systems',
    description: 'Dialogue management policies, intent recognition matrix, supportive conversational agents, and empathetic dialogue.',
    features: [
      'Dialogue state machine management',
      'NLU intent & entity extraction',
      'Supportive wellbeing conversation flows',
      'Transformer fine-tuning & evaluation',
      'REST & webhook integration pipelines',
    ],
    highlight: false,
  },
];

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose, onOpenContact }) => {
  return (
    <AnimatePresence>
      {isOpen && (
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
            className="relative w-full max-w-5xl bg-[#121317] border border-[#2A2E35] rounded-3xl p-6 sm:p-8 md:p-10 text-[#D7E2EA] shadow-2xl z-10 my-auto max-h-[92vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-[#D7E2EA]/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs uppercase tracking-widest text-[#B600A8] font-semibold">Engineering Focus</span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mt-1">
                Technical Capabilities
              </h2>
              <p className="text-sm text-[#D7E2EA]/70 mt-2 font-light">
                Core architectural domains and engineering specializations in artificial intelligence and intelligent systems.
              </p>
            </div>

            {/* Tiers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tiers.map((tier, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl p-6 flex flex-col justify-between transition-all ${
                    tier.highlight
                      ? 'bg-[#181a22] border-2 border-[#BBCCD7] shadow-xl relative'
                      : 'bg-[#15161b] border border-white/10 hover:border-white/20'
                  }`}
                >
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white text-[11px] font-semibold uppercase tracking-wider">
                      Core Focus
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-bold uppercase text-white tracking-wide">{tier.name}</h3>
                    <div className="mt-3 flex items-baseline gap-1.5">
                      <span className="text-2xl sm:text-3xl font-black text-white">{tier.price}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-[#BBCCD7] mt-2 mb-4 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{tier.turnaround}</span>
                    </div>

                    <p className="text-xs text-[#D7E2EA]/75 font-light leading-relaxed mb-6">
                      {tier.description}
                    </p>

                    <div className="space-y-2.5 pt-4 border-t border-white/10 mb-6">
                      {tier.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-[#D7E2EA]/90">
                          <Check className="w-3.5 h-3.5 text-[#BBCCD7] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenContact();
                    }}
                    className={`w-full py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      tier.highlight
                        ? 'bg-white text-black hover:bg-[#D7E2EA]'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <span>Connect On This Area</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Custom scope callout */}
            <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10 text-center text-xs text-[#D7E2EA]/70">
              Interested in collaborating on AI research, open-source projects, or software engineering?{' '}
              <button
                onClick={() => {
                  onClose();
                  onOpenContact();
                }}
                className="text-white underline underline-offset-2 hover:text-[#BBCCD7] font-medium cursor-pointer"
              >
                Let&apos;s connect &rarr;
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PricingModal;
