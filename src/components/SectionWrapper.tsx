import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  label?: string;
}

export default function SectionWrapper({ id, className = '', children, label }: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      aria-label={label}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
