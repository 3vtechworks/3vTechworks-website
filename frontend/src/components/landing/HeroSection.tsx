import React from 'react';
import { Button, Row, Col } from 'antd';
import {
  RocketOutlined,
  ArrowRightOutlined,
  MobileOutlined,
  GlobalOutlined,
  WindowsOutlined,
  CheckCircleFilled,
  SafetyCertificateOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';
import { smoothScrollTo } from '../../utils/scroll';

export const HeroSection: React.FC = () => {
  const { logo, isDark } = useTheme();

  const scrollTo = (id: string) => {
    smoothScrollTo(id, -70);
  };

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 88,
        paddingBottom: 24,
        overflow: 'hidden',
      }}
    >
      <div className="landing-section" style={{ width: '100%', paddingTop: 12, paddingBottom: 16 }}>
        <Row gutter={[48, 48]} align="middle">
          {/* Left Column: Brand Hero Text */}
          <Col xs={24} lg={14}>
            {/* Logo Sub-Badge */}
            <div className="landing-badge">
              <RocketOutlined style={{ color: '#00b4d8' }} />
              <span>Engineering The Future of Software</span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                margin: '12px 0 16px',
                letterSpacing: '-0.03em',
                color: 'var(--3v-text-primary)',
              }}
            >
              Transforming Ideas Into{' '}
              <span className="landing-title-gradient">Mission-Critical</span>{' '}
              Digital Realities.
            </h1>

            {/* Sub-headline */}
            <p
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                color: 'var(--3v-text-secondary)',
                lineHeight: 1.6,
                marginBottom: 20,
                maxWidth: 640,
              }}
            >
              At <strong style={{ color: '#00b4d8' }}>3vTechworks</strong>, we build high-performance{' '}
              <span style={{ color: 'var(--3v-text-primary)', fontWeight: 600 }}>Mobile Applications</span>,{' '}
              <span style={{ color: 'var(--3v-text-primary)', fontWeight: 600 }}>Scalable Web Platforms</span>, and{' '}
              <span style={{ color: 'var(--3v-text-primary)', fontWeight: 600 }}>Robust Windows Desktop Systems</span>{' '}
              tailored for education, healthcare & medicine, and global enterprise operations.
            </p>

            {/* Core Capability Cards (Native App-Style Cards) */}
            <div className="app-cards-container">
              {[
                {
                  icon: <MobileOutlined />,
                  title: 'Mobile App Development',
                  desc: 'iOS • Android • Cross-Platform & Flutter',
                },
                {
                  icon: <GlobalOutlined />,
                  title: 'Website & Cloud Portals',
                  desc: 'High-Scale SaaS • Next.js & React',
                },
                {
                  icon: <WindowsOutlined />,
                  title: 'Windows Applications',
                  desc: 'C# • WPF • POS & Desktop Systems',
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="app-feature-card"
                  onClick={() => scrollTo('solutions')}
                >
                  <div className="app-feature-card-icon">{card.icon}</div>
                  <div className="app-feature-card-content">
                    <div className="app-feature-card-title">{card.title}</div>
                    <div className="app-feature-card-desc">{card.desc}</div>
                  </div>
                  <div className="app-feature-card-arrow">
                    <RightOutlined />
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div
              className="hero-buttons-wrapper"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                flexWrap: 'wrap',
                marginTop: 8,
                marginBottom: 24,
              }}
            >
              <Button
                type="primary"
                size="large"
                className="btn-3v-primary"
                onClick={() => scrollTo('solutions')}
                style={{
                  height: 50,
                  padding: '0 32px',
                  fontSize: 15,
                  borderRadius: 12,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                Explore Solutions <ArrowRightOutlined />
              </Button>

              <Button
                size="large"
                className="btn-3v-secondary"
                onClick={() => scrollTo('contact')}
                style={{
                  height: 50,
                  padding: '0 28px',
                  fontSize: 15,
                  borderRadius: 12,
                }}
              >
                Consult Our Engineers
              </Button>
            </div>

            {/* Trust Points */}
            <div
              style={{
                marginTop: 20,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 20,
                fontSize: 13,
                color: 'var(--3v-text-muted)',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircleFilled style={{ color: '#00b4d8' }} /> ISO-Grade Quality Code
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircleFilled style={{ color: '#00b4d8' }} /> 100% On-Time Delivery
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircleFilled style={{ color: '#00b4d8' }} /> 24/7 SLA Production Support
              </span>
            </div>
          </Col>

          {/* Right Column: 3D Holographic Showcase Card */}
          <Col xs={24} lg={10}>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* Central Glowing Branding Card */}
              <div
                className="landing-card-3d"
                style={{
                  width: '100%',
                  maxWidth: 440,
                  padding: '40px 32px',
                  textAlign: 'center',
                  borderColor: 'var(--3v-border)',
                  boxShadow: 'var(--3v-card-shadow)',
                }}
              >
                {/* Official Logo Display */}
                <div
                  style={{
                    background: isDark
                      ? 'radial-gradient(circle, rgba(0, 180, 216, 0.15) 0%, transparent 70%)'
                      : 'radial-gradient(circle, rgba(0, 180, 216, 0.08) 0%, transparent 70%)',
                    padding: '24px 16px',
                    borderRadius: 16,
                    marginBottom: 20,
                  }}
                >
                  <img
                    src={logo}
                    alt="3vTechworks Logo"
                    style={{
                      width: '100%',
                      maxHeight: 110,
                      objectFit: 'contain',
                      filter: isDark
                        ? 'drop-shadow(0 4px 16px rgba(0, 229, 255, 0.4))'
                        : 'drop-shadow(0 4px 16px rgba(0, 119, 182, 0.15))',
                    }}
                  />
                </div>

                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: 'var(--3v-text-primary)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  Engineering The Future
                </div>
                <div style={{ fontSize: 13, color: 'var(--3v-text-secondary)', marginTop: 6 }}>
                  Full-Cycle Digital Architecture & Bespoke Software Development
                </div>

                <div
                  style={{
                    margin: '24px 0',
                    height: 1,
                    background: 'linear-gradient(90deg, transparent, rgba(0, 180, 216, 0.3), transparent)',
                  }}
                />

                {/* Key Metrics Grid */}
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <div
                      style={{
                        background: 'var(--3v-card-inner)',
                        padding: '12px 8px',
                        borderRadius: 10,
                        border: '1px solid var(--3v-border)',
                      }}
                    >
                      <div style={{ color: '#00b4d8', fontSize: 22, fontWeight: 800 }}>50+</div>
                      <div style={{ color: 'var(--3v-text-secondary)', fontSize: 11 }}>Solutions Built</div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div
                      style={{
                        background: 'var(--3v-card-inner)',
                        padding: '12px 8px',
                        borderRadius: 10,
                        border: '1px solid var(--3v-border)',
                      }}
                    >
                      <div style={{ color: '#00b4d8', fontSize: 22, fontWeight: 800 }}>99.9%</div>
                      <div style={{ color: 'var(--3v-text-secondary)', fontSize: 11 }}>System Uptime</div>
                    </div>
                  </Col>
                </Row>
              </div>

              {/* Floating Stat Badge 1 (Top Left) */}
              <div
                className="floating-stat-badge"
                style={{
                  position: 'absolute',
                  top: -24,
                  left: -20,
                  display: 'none',
                }}
                id="hero-floating-badge-1"
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: 'rgba(0, 180, 216, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#00b4d8',
                    fontSize: 18,
                  }}
                >
                  <SafetyCertificateOutlined />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--3v-text-primary)' }}>
                    Enterprise Security
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--3v-text-secondary)' }}>HIPAA & GDPR Ready</div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <style>{`
        @media (min-width: 992px) {
          #hero-floating-badge-1 {
            display: flex !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
