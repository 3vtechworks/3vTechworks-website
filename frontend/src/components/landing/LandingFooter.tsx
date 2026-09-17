import React from 'react';
import { Row, Col, Space } from 'antd';
import {
  GithubOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  HeartFilled,
} from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';
import { smoothScrollTo } from '../../utils/scroll';

export const LandingFooter: React.FC = () => {
  const { logo, isDark } = useTheme();

  const scrollTo = (id: string) => {
    smoothScrollTo(id, -70);
  };

  return (
    <footer
      style={{
        background: 'var(--3v-footer-bg)',
        borderTop: '1px solid var(--3v-border)',
        padding: '40px 24px 24px',
        color: 'var(--3v-text-secondary)',
        position: 'relative',
        zIndex: 1,
        transition: 'background-color 0.4s ease, border-color 0.4s ease',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Row gutter={[40, 40]} justify="space-between">
          {/* Brand Col */}
          <Col xs={24} md={8}>
            <div style={{ marginBottom: 16 }}>
              <img
                src={logo}
                alt="3vTechworks"
                style={{
                  height: 48,
                  objectFit: 'contain',
                  filter: isDark
                    ? 'drop-shadow(0 2px 10px rgba(0, 229, 255, 0.35))'
                    : 'drop-shadow(0 2px 8px rgba(0, 119, 182, 0.15))',
                }}
              />
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--3v-text-secondary)', maxWidth: 320 }}>
              Pioneering high-velocity software engineering across mobile apps, cloud web ecosystems, and Windows desktop infrastructure.
            </p>

            <Space size="middle" style={{ marginTop: 12 }}>
              <a href="#github" style={{ color: '#00b4d8', fontSize: 18 }}><GithubOutlined /></a>
              <a href="#linkedin" style={{ color: '#00b4d8', fontSize: 18 }}><LinkedinOutlined /></a>
              <a href="#twitter" style={{ color: '#00b4d8', fontSize: 18 }}><TwitterOutlined /></a>
            </Space>
          </Col>

          {/* Solutions Col */}
          <Col xs={12} sm={6} md={4}>
            <div style={{ color: 'var(--3v-text-primary)', fontWeight: 700, fontSize: 14, marginBottom: 16 }}>
              Solutions
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
              <span onClick={() => scrollTo('solutions')} style={{ cursor: 'pointer' }}>Mobile Apps</span>
              <span onClick={() => scrollTo('solutions')} style={{ cursor: 'pointer' }}>Web Applications</span>
              <span onClick={() => scrollTo('solutions')} style={{ cursor: 'pointer' }}>Windows Software</span>
              <span onClick={() => scrollTo('solutions')} style={{ cursor: 'pointer' }}>Cloud Architecture</span>
            </div>
          </Col>

          {/* Industries Col */}
          <Col xs={12} sm={6} md={4}>
            <div style={{ color: 'var(--3v-text-primary)', fontWeight: 700, fontSize: 14, marginBottom: 16 }}>
              Industries
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
              <span onClick={() => scrollTo('industries')} style={{ cursor: 'pointer' }}>Healthcare & Medicine</span>
              <span onClick={() => scrollTo('industries')} style={{ cursor: 'pointer' }}>Education & EdTech</span>
              <span onClick={() => scrollTo('industries')} style={{ cursor: 'pointer' }}>Enterprise Operations</span>
              <span onClick={() => scrollTo('industries')} style={{ cursor: 'pointer' }}>FinTech & POS</span>
            </div>
          </Col>

          {/* Legal & Trust */}
          <Col xs={24} sm={12} md={5}>
            <div style={{ color: 'var(--3v-text-primary)', fontWeight: 700, fontSize: 14, marginBottom: 16 }}>
              Trust & Standards
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
              <span>Enterprise Data Security</span>
              <span style={{ color: 'var(--3v-text-muted)' }}>SOC2 & ISO Compliant</span>
              <span style={{ color: 'var(--3v-text-muted)' }}>Privacy & Security Policy</span>
              <span style={{ color: 'var(--3v-text-muted)' }}>24/7 SLA Operational Uptime</span>
            </div>
          </Col>
        </Row>

        <div
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: '1px solid rgba(0, 180, 216, 0.15)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 12,
            gap: 12,
          }}
        >
          <div>
            © {new Date().getFullYear()} <strong>3vTechworks</strong>. All rights reserved. Engineering the Future.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--3v-text-muted)' }}>
            Crafted with precision & <HeartFilled style={{ color: '#00b4d8' }} /> for next-gen enterprises.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
