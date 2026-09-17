import React from 'react';
import { Row, Col, Tag, Button } from 'antd';
import {
  MobileOutlined,
  GlobalOutlined,
  WindowsOutlined,
  CloudServerOutlined,
  ArrowRightOutlined,
  ThunderboltFilled,
} from '@ant-design/icons';
import { smoothScrollTo } from '../../utils/scroll';

interface SolutionItem {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  highlights: string[];
}

export const SolutionsSection: React.FC = () => {
  const solutions: SolutionItem[] = [
    {
      icon: <MobileOutlined />,
      title: 'Mobile App Development',
      subtitle: 'iOS & Android Native & Cross-Platform',
      description:
        'We engineer frictionless, responsive mobile experiences designed for hyper-growth. Built with offline-first caching, biometric security, and fluid native animations.',
      techStack: ['React Native', 'Flutter', 'iOS Swift', 'Android Kotlin', 'Firebase'],
      highlights: [
        'Smooth 60fps Micro-Animations',
        'Offline Sync & Local DB Storage',
        'Push Notifications & Analytics',
        'App Store & Play Store Deployment',
      ],
    },
    {
      icon: <GlobalOutlined />,
      title: 'Website & Web Apps',
      subtitle: 'Scalable Full-Stack SaaS & Portals',
      description:
        'Ultra-fast, SEO-optimized web applications with modern micro-frontend architecture. Engineered to scale effortlessly from early users to millions of concurrent sessions.',
      techStack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'GraphQL', 'Tailwind'],
      highlights: [
        'Lightning 99+ Lighthouse Speed Score',
        'Modern Responsive Multi-Screen Layouts',
        'Role-Based Access Control (RBAC)',
        'Automated CI/CD Pipeline Deployment',
      ],
    },
    {
      icon: <WindowsOutlined />,
      title: 'Windows Applications',
      subtitle: 'High-Performance Desktop Software',
      description:
        'Industrial-strength Windows software for mission-critical desktop environments. Seamlessly integrates with local hardware, legacy peripherals, and enterprise databases.',
      techStack: ['WPF / .NET Core', 'C#', 'Electron', 'WinUI 3', 'SQLite'],
      highlights: [
        'Zero-Latency Native Processing',
        'Hardware & Device USB/Serial Drivers',
        'Multi-Threaded Background Workers',
        'Automated In-App Delta Updaters',
      ],
    },
    {
      icon: <CloudServerOutlined />,
      title: 'Cloud & API Architecture',
      subtitle: 'High-Availability Microservices',
      description:
        'Resilient backend infrastructure, RESTful & GraphQL APIs, and real-time streaming architectures. Built to ensure your software never misses a beat.',
      techStack: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS'],
      highlights: [
        'Auto-Scaling Cloud Clustering',
        'Sub-Millisecond Redis Caching',
        'Encrypted JWT & OAuth2 Security',
        'Real-Time WebSocket Streams',
      ],
    },
  ];

  return (
    <section id="solutions" className="landing-section">
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div className="landing-badge">
          <ThunderboltFilled style={{ color: '#00b4d8' }} />
          <span>Core Capabilities</span>
        </div>
        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            margin: '12px 0 16px',
            color: 'var(--3v-text-primary)',
          }}
        >
          Engineered for <span className="landing-title-gradient">Excellence</span> Across Every Device
        </h2>
        <p className="landing-subtitle">
          From pocket smartphones and browser tabs to intensive Windows workstations, 3vTechworks delivers tailored digital architecture.
        </p>
      </div>

      {/* Solutions Cards Grid */}
      <Row gutter={[28, 28]}>
        {solutions.map((item, idx) => (
          <Col xs={24} md={12} key={idx}>
            <div className="landing-card-3d" style={{ height: '100%' }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                <div className="service-icon-box">{item.icon}</div>
                <Tag
                  style={{
                    backgroundColor: 'rgba(0, 180, 216, 0.12)',
                    borderColor: 'var(--3v-border)',
                    color: '#00b4d8',
                    borderRadius: 12,
                    fontSize: 11,
                    padding: '2px 10px',
                    fontWeight: 600,
                  }}
                >
                  ENGINEERING
                </Tag>
              </div>

              <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--3v-text-primary)', marginBottom: 4 }}>
                {item.title}
              </h3>
              <div style={{ fontSize: 13, color: '#0077b6', fontWeight: 600, marginBottom: 14 }}>
                {item.subtitle}
              </div>

              <p style={{ color: 'var(--3v-text-secondary)', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                {item.description}
              </p>

              {/* Feature Highlights */}
              <div style={{ marginBottom: 20, borderTop: '1px solid var(--3v-border)', paddingTop: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--3v-text-primary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Key Capabilities
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 8 }}>
                  {item.highlights.map((h, i) => (
                    <div key={i} style={{ fontSize: 12, color: 'var(--3v-text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ color: '#00b4d8' }}>•</span> {h}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto' }}>
                {item.techStack.map((tech, i) => (
                  <span
                    key={i}
                    style={{
                      background: 'var(--3v-card-inner)',
                      border: '1px solid var(--3v-border)',
                      padding: '4px 10px',
                      borderRadius: 6,
                      fontSize: 11,
                      color: 'var(--3v-text-secondary)',
                      fontWeight: 500,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Bottom Consultation Banner */}
      <div
        className="landing-card-3d"
        style={{
          marginTop: 48,
          textAlign: 'center',
          borderColor: 'var(--3v-border)',
        }}
      >
        <Row align="middle" justify="space-between" gutter={[24, 24]}>
          <Col xs={24} md={16} style={{ textAlign: 'left' }}>
            <h4 style={{ fontSize: 20, fontWeight: 700, color: 'var(--3v-text-primary)', margin: 0 }}>
              Need a bespoke cross-platform solution?
            </h4>
            <p style={{ color: 'var(--3v-text-secondary)', margin: '6px 0 0', fontSize: 14 }}>
              Our engineering team will assess your workflow and produce a full architectural roadmap within 48 hours.
            </p>
          </Col>
          <Col xs={24} md={8} style={{ textAlign: 'right' }}>
            <Button
              className="btn-3v-primary"
              size="large"
              style={{ borderRadius: 8 }}
              onClick={() => smoothScrollTo('contact', -70)}
            >
              Discuss Your Project <ArrowRightOutlined />
            </Button>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default SolutionsSection;
