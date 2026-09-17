import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { useTheme } from '../../context/ThemeContext';
import ThreeBackground from '../../components/landing/ThreeBackground';
import LandingNavbar from '../../components/landing/LandingNavbar';
import HeroSection from '../../components/landing/HeroSection';
import SolutionsSection from '../../components/landing/SolutionsSection';
import IndustriesSection from '../../components/landing/IndustriesSection';
import WhyUsSection from '../../components/landing/WhyUsSection';
import ContactSection from '../../components/landing/ContactSection';
import LandingFooter from '../../components/landing/LandingFooter';
import MobileBottomBar from '../../components/landing/MobileBottomBar';
import '../../styles/landing.css';

export const LandingPage: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    // Initialize Lenis Ultra-Smooth Momentum Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    window.__lenis = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return (
    <div className={`landing-root theme-${theme}`}>
      {/* 3D WebGL Canvas Layer */}
      <ThreeBackground />

      {/* Decorative Brand Ambient Glowing Orbs */}
      <div className="landing-mesh-glow-1" />
      <div className="landing-mesh-glow-2" />

      {/* Foreground Website Sections */}
      <div className="landing-content">
        <LandingNavbar />
        <main>
          <HeroSection />
          <SolutionsSection />
          <IndustriesSection />
          <WhyUsSection />
          <ContactSection />
        </main>
        <LandingFooter />
        <MobileBottomBar />
      </div>
    </div>
  );
};

export default LandingPage;
