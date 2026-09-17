// Global smooth scroll helper with Lenis integration

declare global {
  interface Window {
    __lenis?: any;
  }
}

export const smoothScrollTo = (target: string | HTMLElement, offset: number = -70) => {
  if (typeof window === 'undefined') return;

  // 1. Check for top / home
  if (typeof target === 'string') {
    const cleanId = target.replace(/^#/, '');
    if (cleanId === 'home' || cleanId === 'top' || cleanId === '') {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 1.0 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const element =
      document.getElementById(cleanId) ||
      document.querySelector(`#${cleanId}`) ||
      document.querySelector(target);

    if (element) {
      if (window.__lenis) {
        window.__lenis.scrollTo(element, {
          offset,
          duration: 1.0,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        const top = element.getBoundingClientRect().top + window.pageYOffset + offset;
        window.scrollTo({
          top,
          behavior: 'smooth',
        });
      }
    } else {
      console.warn(`[smoothScrollTo] Element not found for target: "${target}"`);
    }
  } else if (target instanceof HTMLElement) {
    if (window.__lenis) {
      window.__lenis.scrollTo(target, {
        offset,
        duration: 1.0,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const top = target.getBoundingClientRect().top + window.pageYOffset + offset;
      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    }
  }
};

export default smoothScrollTo;
