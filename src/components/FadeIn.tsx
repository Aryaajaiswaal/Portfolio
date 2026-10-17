import React from 'react';
import { motion, TargetAndTransition, Transition } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  as?: string;
  style?: React.CSSProperties;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = '',
  as = 'div',
  style,
}) => {
  const initial = {
    opacity: 0,
    x,
    y,
  };

  const whileInView: TargetAndTransition = {
    opacity: 1,
    x: 0,
    y: 0,
  };

  const transition: Transition = {
    duration,
    delay,
    ease: [0.25, 0.1, 0.25, 1],
  };

  // Support dynamic tag types cleanly using motion[tag] or motion.div
  const MotionComponent = (motion as unknown as Record<string, React.ComponentType<any>>)[as] || motion.div;

  return (
    <MotionComponent
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={transition}
      className={className}
      style={style}
    >
      {children}
    </MotionComponent>
  );
};

export default FadeIn;
