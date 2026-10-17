import React from 'react';
import { motion } from 'framer-motion';
import FadeIn from './FadeIn';
import AnimatedText from './AnimatedText';
import ContactButton from './ContactButton';

import neuralBrainImg from '../assets/images/ai_neural_brain.png';
import chipProcessorImg from '../assets/images/ai_chip_processor.png';
import vectorLatticeImg from '../assets/images/ai_vector_lattice.png';
import agentOrbImg from '../assets/images/ai_agent_orb.png';

interface AboutSectionProps {
  onOpenContact: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenContact }) => {
  const bioText =
    "I'm Aryaa, a Computer Science Engineering student specializing in Artificial Intelligence. I enjoy exploring how AI, software, data, and intelligent agents work together to turn ideas into useful products. My projects are a way to learn by building, experiment with emerging technologies, and develop stronger engineering skills.";

  return (
    <section
      id="about"
      className="relative min-h-screen w-full bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* 4 Decorative 3D AI / ML Graphics in Corners */}

      {/* Top-Left: 3D Neural Network Brain Core */}
      <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-10 pointer-events-none select-none">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 2, 0, -2, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <img
              src={neuralBrainImg}
              alt="3D Neural Network Synaptic Brain"
              referrerPolicy="no-referrer"
              className="w-[120px] sm:w-[170px] md:w-[220px] object-contain drop-shadow-[0_15px_35px_rgba(124,58,237,0.35)]"
            />
          </motion.div>
        </FadeIn>
      </div>

      {/* Bottom-Left: 3D Vector Embedding Polyhedron Lattice */}
      <div className="absolute bottom-[8%] left-[2%] sm:left-[5%] md:left-[8%] z-10 pointer-events-none select-none">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <motion.div
            animate={{
              y: [0, 12, 0],
              rotate: [0, -3, 0, 3, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
          >
            <img
              src={vectorLatticeImg}
              alt="3D Vector Embedding Polyhedron Lattice"
              referrerPolicy="no-referrer"
              className="w-[110px] sm:w-[160px] md:w-[200px] object-contain drop-shadow-[0_15px_35px_rgba(5,150,105,0.3)]"
            />
          </motion.div>
        </FadeIn>
      </div>

      {/* Top-Right: 3D AI Tensor Processor Core */}
      <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-10 pointer-events-none select-none">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <motion.div
            animate={{
              y: [0, 10, 0],
              rotate: [0, -2, 0, 2, 0],
            }}
            transition={{
              duration: 6.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.2,
            }}
          >
            <img
              src={chipProcessorImg}
              alt="3D AI Tensor Core Processor"
              referrerPolicy="no-referrer"
              className="w-[120px] sm:w-[170px] md:w-[220px] object-contain drop-shadow-[0_15px_35px_rgba(2,132,199,0.3)]"
            />
          </motion.div>
        </FadeIn>
      </div>

      {/* Bottom-Right: 3D Autonomous AI Agent Drone Orb */}
      <div className="absolute bottom-[8%] right-[2%] sm:right-[5%] md:right-[8%] z-10 pointer-events-none select-none">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <motion.div
            animate={{
              y: [0, -12, 0],
              rotate: [0, 3, 0, -3, 0],
            }}
            transition={{
              duration: 7.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.7,
            }}
          >
            <img
              src={agentOrbImg}
              alt="3D Autonomous AI Agent Orb"
              referrerPolicy="no-referrer"
              className="w-[120px] sm:w-[170px] md:w-[220px] object-contain drop-shadow-[0_15px_35px_rgba(217,119,6,0.3)]"
            />
          </motion.div>
        </FadeIn>
      </div>

      {/* Center Content Column */}
      <div className="relative z-20 flex flex-col items-center max-w-4xl mx-auto w-full">
        {/* Heading */}
        <FadeIn delay={0} y={40} className="w-full text-center mb-10 sm:mb-14 md:mb-16">
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center text-[clamp(3rem,12vw,160px)]">
            About me
          </h2>
        </FadeIn>

        {/* Animated paragraph */}
        <div className="w-full flex justify-center px-4">
          <AnimatedText text={bioText} />
        </div>

        {/* Contact button below the text block */}
        <div className="mt-16 sm:mt-20 md:mt-24">
          <FadeIn delay={0.35} y={20}>
            <ContactButton onClick={onOpenContact} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
