import React from 'react';
import FadeIn from './FadeIn';
import Magnet from './Magnet';
import ContactButton from './ContactButton';
import characterCutout from '../assets/images/aryaa_portrait_cutout.png';

interface HeroSectionProps {
  onOpenContact: () => void;
  onOpenPrice?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  const handleNavClick = (link: string) => {
    if (link === 'Stack') {
      const el = document.getElementById('stack');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (link === 'Contact') {
      onOpenContact();
    } else if (link === 'About') {
      const el = document.getElementById('about');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (link === 'Experience') {
      const el = document.getElementById('experience');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (link === 'Projects') {
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = ['About', 'Stack', 'Experience', 'Projects', 'Contact'];

  return (
    <section className="relative h-screen w-full flex flex-col justify-between overflow-x-clip bg-[#0C0C0C] select-none">
      {/* 1. Navbar */}
      <FadeIn delay={0} y={-20} className="w-full z-20">
        <header className="w-full px-6 md:px-10 pt-6 md:pt-8">
          <nav className="w-full flex items-center justify-between">
            {navLinks.map((link) => (
              <button
                key={link}
                type="button"
                onClick={() => handleNavClick(link)}
                className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer"
              >
                {link}
              </button>
            ))}
          </nav>
        </header>
      </FadeIn>

      {/* 2. Hero Heading */}
      <div className="w-full overflow-hidden flex items-center justify-center my-auto z-0 pointer-events-none">
        <FadeIn delay={0.15} y={40} className="w-full text-center">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5 select-none">
            Hi, i&apos;m Aryaa
          </h1>
        </FadeIn>
      </div>

      {/* 3. Hero Portrait with Magnet effect */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto">
        <FadeIn delay={0.6} y={30} className="w-full flex justify-center">
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full"
          >
            <div
              className="relative flex justify-center items-end w-full max-w-[460px] aspect-[896/1200]"
            >
              <img
                src={characterCutout}
                alt="Aryaa -- 3D Creator Portrait"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain pointer-events-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
              />
            </div>
          </Magnet>
        </FadeIn>
      </div>

      {/* 4. Bottom Bar */}
      <footer className="w-full px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 flex justify-between items-end z-20 pointer-events-auto">
        <FadeIn delay={0.35} y={20}>
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-[clamp(0.75rem,1.4vw,1.5rem)] max-w-[160px] sm:max-w-[220px] md:max-w-[260px]">
            CSE (AI) student exploring artificial intelligence, agentic systems, and software engineering. Building intelligent systems that solve real problems.
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton onClick={onOpenContact} />
        </FadeIn>
      </footer>
    </section>
  );
};

export default HeroSection;
