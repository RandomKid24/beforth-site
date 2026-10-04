import React from 'react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

/**
 * Content is shown immediately. The site is deliberately plain: nothing fades
 * or slides in on scroll. The component is kept so call sites stay unchanged.
 */
export default function Reveal({ children, className }: RevealProps) {
  return <div className={className}>{children}</div>;
}
