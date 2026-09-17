import React from 'react';
import { Row, Col } from 'antd';
import {
  SafetyCertificateOutlined,
  ThunderboltOutlined,
  SyncOutlined,
  TeamOutlined,
  RocketOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons';

export const WhyUsSection: React.FC = () => {
  const pillars = [
    {
      icon: <RocketOutlined />,
      title: 'High-Velocity Engineering',
      desc: 'Agile sprints with rapid functional prototypes. We turn your product requirements into live, production-ready systems without unnecessary overhead.',
    },
    {
      icon: <ThunderboltOutlined />,
      title: 'Microsecond Performance',
      desc: 'Optimized algorithms, hardware acceleration, and lightweight bundles ensure 60fps animations and near-instant response times on all devices.',
    },
    {
      icon: <SafetyCertificateOutlined />,
      title: 'Enterprise-Grade Security',
      desc: 'Built-in role-based access control (RBAC), end-to-end data encryption, and vulnerability testing complying with international standards.',
    },
    {
      icon: <SyncOutlined />,
      title: 'Seamless Cross-Platform Sync',
      desc: 'Unified codebases and cloud synchronization linking your mobile apps, web portals, and Windows desktop workstations in real time.',
    },
    {
      icon: <TeamOutlined />,
      title: 'Dedicated Senior Architects',
      desc: 'Direct pair-programming and communication with veteran software architects. No junior intermediary delays or guesswork.',
    },
    {
      icon: <CustomerServiceOutlined />,
      title: '24/7 SLA Production Support',
      desc: 'Continuous telemetry, automatic health checks, database backups, and rapid incident response guarantees complete operational peace of mind.',
    },
  ];

  return (
    <section id="why-us" className="landing-section">
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div className="landing-badge">
          <SafetyCertificateOutlined style={{ color: '#00e5ff' }} />
          <span>The 3vTechworks Advantage</span>
        </div>
        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            margin: '12px 0 16px',
            color: 'var(--3v-text-primary)',
          }}
        >
          Why Enterprises Trust <span className="landing-title-gradient">3vTechworks</span>
        </h2>
        <p className="landing-subtitle">
          We combine cutting-edge modern engineering with strict enterprise durability, giving your business an insurmountable technological edge.
        </p>
      </div>

      <Row gutter={[28, 28]}>
        {pillars.map((p, idx) => (
          <Col xs={24} sm={12} lg={8} key={idx}>
            <div
              className="landing-card-3d"
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}
            >
              <div className="service-icon-box">{p.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--3v-text-primary)', marginBottom: 10 }}>
                {p.title}
              </h3>
              <p style={{ color: 'var(--3v-text-secondary)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                {p.desc}
              </p>
            </div>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default WhyUsSection;
