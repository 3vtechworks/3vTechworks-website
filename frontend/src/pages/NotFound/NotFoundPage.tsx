import React from 'react';
import { Button } from 'antd';
import {
  HomeOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import ThreeBackground from '../../components/landing/ThreeBackground';
import './NotFoundPage.css';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, logo } = useTheme();

  return (
    <div className={`not-found-page-wrapper theme-${theme}`}>
      {/* 1. Interactive 3D WebGL Particle Constellation Layer */}
      <ThreeBackground />

      {/* 2. Ambient Theme Animated Glowing Mesh Orbs */}
      <div className="not-found-orb not-found-orb-1" aria-hidden="true" />
      <div className="not-found-orb not-found-orb-2" aria-hidden="true" />
      <div className="not-found-orb not-found-orb-center" aria-hidden="true" />

      {/* 3. Cyber Grid Tech Overlay */}
      <div className="not-found-grid-overlay" aria-hidden="true" />

     
      

      {/* 5. Central Holographic Glassmorphic 3D Card */}
      <main className="not-found-card">
        {/* Floating Brand Logo with Theme Halo Animation */}
        <div
          className="not-found-logo-container"
          onClick={() => navigate('/')}
          title="Go to Home"
        >
          <div className="not-found-logo-halo" />
          <img
            src={logo}
            alt="3vTechworks Logo"
            className="not-found-logo-img"
          />
        </div>

        {/* Status Beacon Badge */}
        <div>
          <div className="not-found-status-badge">
            <span className="not-found-status-dot" />
            <span>Error 404 • Coordinate Not Found</span>
          </div>
        </div>

        {/* Electric Gradient 404 Code */}
        <h1 className="not-found-code">404</h1>

        {/* Title & Description */}
        <h2 className="not-found-title">Lost in Digital Orbit</h2>
        <p className="not-found-description">
          The requested system node or page does not exist or has been shifted within
          the <strong>3vTechworks</strong> cloud network. Verify the URL or return to safety.
        </p>

        {/* Action Buttons */}
        <div className="not-found-actions">
          <Button
            type="primary"
            className="not-found-btn-primary"
            icon={<HomeOutlined />}
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>

          
        </div>

        {/* Helpful Footer Hint */}
        <div className="not-found-footer-hint">
          <span>Need technical assistance?</span>
          <span
            className="not-found-footer-link"
            onClick={() => {
              navigate('/');
              setTimeout(() => {
                const contactEl = document.getElementById('contact');
                if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
              }, 200);
            }}
          >
            Contact Support
          </span>
        </div>
      </main>
    </div>
  );
};

export default NotFoundPage;
