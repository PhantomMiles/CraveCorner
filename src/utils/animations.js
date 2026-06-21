// CSS animation class helpers for scroll-reveal
export const fadeInUp = 'opacity-0 translate-y-8 transition-all duration-700 ease-out';
export const fadeInUpVisible = 'opacity-100 translate-y-0';

export const fadeIn = 'opacity-0 transition-opacity duration-700 ease-out';
export const fadeInVisible = 'opacity-100';

export const slideInLeft = 'opacity-0 -translate-x-8 transition-all duration-700 ease-out';
export const slideInLeftVisible = 'opacity-100 translate-x-0';

export const slideInRight = 'opacity-0 translate-x-8 transition-all duration-700 ease-out';
export const slideInRightVisible = 'opacity-100 translate-x-0';

export const scaleIn = 'opacity-0 scale-90 transition-all duration-700 ease-out';
export const scaleInVisible = 'opacity-100 scale-100';

// Stagger delay helper (returns inline style)
export const staggerDelay = (index, baseDelay = 100) => ({
  transitionDelay: `${index * baseDelay}ms`,
});
