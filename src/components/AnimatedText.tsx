import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharacterProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0 select-none">{char === ' ' ? '\u00A0' : char}</span>
      <motion.span
        style={{ opacity }}
        className="absolute inset-0 select-none pointer-events-none"
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </span>
  );
};

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const totalCharacters = text.length;

  let globalCharIndex = 0;

  return (
    <p
      ref={containerRef}
      className={`text-center font-medium leading-relaxed max-w-[560px] text-[#D7E2EA] text-[clamp(1rem,2vw,1.35rem)] ${className}`}
    >
      {words.map((word, wordIndex) => {
        const characters = word.split('');
        const wordElement = (
          <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap">
            {characters.map((char, charIdx) => {
              const start = globalCharIndex / totalCharacters;
              const end = Math.min(1, (globalCharIndex + 1) / totalCharacters);
              globalCharIndex++;

              return (
                <Character
                  key={`char-${charIdx}-${globalCharIndex}`}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </span>
        );

        // Account for trailing space between words
        if (wordIndex < words.length - 1) {
          const spaceStart = globalCharIndex / totalCharacters;
          const spaceEnd = Math.min(1, (globalCharIndex + 1) / totalCharacters);
          globalCharIndex++;

          return (
            <React.Fragment key={`frag-${wordIndex}`}>
              {wordElement}
              <Character
                key={`space-${wordIndex}`}
                char=" "
                progress={scrollYProgress}
                range={[spaceStart, spaceEnd]}
              />
            </React.Fragment>
          );
        }

        return wordElement;
      })}
    </p>
  );
};

export default AnimatedText;
