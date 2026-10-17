import React from 'react';
import { ArrowUp, Mail, Globe } from 'lucide-react';
import ContactButton from './ContactButton';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#0C0C0C] text-[#D7E2EA] border-t border-white/10 px-6 md:px-12 py-16 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & summary */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
          <div className="text-2xl font-black uppercase tracking-tight text-white">
            ARYAA JAISWAL <span className="font-light text-white/50 text-base">/ AI/ML ENGINEER</span>
          </div>
          <p className="text-sm font-semibold text-white uppercase tracking-wider">
            Let&apos;s build something meaningful.
          </p>
          <p className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-light max-w-md">
            Curious about AI, intelligent systems, and software that solves real problems? Explore my work or connect with me.
          </p>
        </div>

        {/* CTA & Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://github.com/Aryaajaiswaal"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/aaryaa-jaiswwall-7n/?isSelfProfile=true"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5"
          >
            LinkedIn
          </a>
          <ContactButton onClick={onOpenContact} label="Connect With Me" />
          <button
            onClick={scrollToTop}
            className="w-11 h-11 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#D7E2EA] transition-all hover:-translate-y-1 cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D7E2EA]/50">
        <div>&copy; {new Date().getFullYear()} Aryaa Jaiswal. All rights reserved.</div>
        <div className="flex items-center gap-4 sm:gap-6 font-mono uppercase tracking-wider flex-wrap justify-center">
          <span className="hover:text-white transition-colors">Python</span>
          <span>·</span>
          <span className="hover:text-white transition-colors">LangGraph</span>
          <span>·</span>
          <span className="hover:text-white transition-colors">FastAPI</span>
          <span>·</span>
          <span className="hover:text-white transition-colors">PyTorch</span>
          <span>·</span>
          <span className="hover:text-white transition-colors">Docker</span>
          <span>·</span>
          <span className="hover:text-white transition-colors">PostgreSQL</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
