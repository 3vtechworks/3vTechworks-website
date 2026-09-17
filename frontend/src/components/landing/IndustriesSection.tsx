import React, { useState } from 'react';
import { Row, Col, Button, Tag } from 'antd';
import {
  MedicineBoxOutlined,
  ReadOutlined,
  BankOutlined,
  ShopOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';
import { smoothScrollTo } from '../../utils/scroll';

interface IndustryData {
  id: string;
  name: string;
  badge: string;
  icon: React.ReactNode;
  tagline: string;
  description: string;
  features: string[];
  metrics: { value: string; label: string }[];
  caseStudyHighlight: string;
}

export const IndustriesSection: React.FC = () => {
  const { isDark } = useTheme();

  const industries: IndustryData[] = [
    {
      id: 'medicine',
      name: 'Medicine & Healthcare',
      badge: 'Healthcare Suite',
      icon: <MedicineBoxOutlined />,
      tagline: 'HIPAA-Compliant Clinical & Telemedicine Ecosystems',
      description:
        'We develop patient-centric software that bridges hospital facilities, private practices, and remote telemedicine clinics. From Electronic Health Records (EHR) to automated lab diagnostics, our solutions prioritize data security and medical accuracy.',
      features: [
        'Secure Telehealth Video Consultations & Chat',
        'Electronic Medical Records (EMR/EHR) with HL7/FHIR Standards',
        'Hospital Bed Allocation & Doctor Scheduling',
        'Pharmacy Prescription & Drug Inventory Automation',
        'Diagnostic Lab Imaging & Multi-Device Report Generation',
      ],
      metrics: [
        { value: '100%', label: 'HIPAA/GDPR Data Encryption' },
        { value: '2.5x', label: 'Faster Patient Intake Time' },
        { value: '99.99%', label: 'Clinical Uptime SLA' },
      ],
      caseStudyHighlight: 'Delivered an integrated hospital management suite handling over 10,000 outpatient visits monthly with zero records loss.',
    },
    {
      id: 'education',
      name: 'Education & EdTech',
      badge: 'EdTech Architecture',
      icon: <ReadOutlined />,
      tagline: 'Modern Virtual Classrooms, LMS & Campus ERP Platforms',
      description:
        'Transforming educational institutions through intuitive software. We empower universities, K-12 school districts, and EdTech startups with interactive course portals, automated grading engines, and real-time student performance analytics.',
      features: [
        'Cloud Learning Management Systems (LMS)',
        'Automated Examinations, Proctoring & Instant Grading',
        'Student Information Systems (SIS) & Lifecycle Tracking',
        'Parent-Teacher Collaborative Dashboards & Alerts',
        'Fee Billing, Digital Payment Gateways & Receipt Generation',
      ],
      metrics: [
        { value: '45k+', label: 'Active Students Empowered' },
        { value: '80%', label: 'Reduction in Manual Administrative Work' },
        { value: '4.9/5', label: 'Student Experience Rating' },
      ],
      caseStudyHighlight: 'Deployed a statewide academic portal connecting 24 campuses with automated student report card generation.',
    },
    {
      id: 'enterprise',
      name: 'Enterprise & ERP',
      badge: 'Operations Hub',
      icon: <BankOutlined />,
      tagline: 'Mission-Critical Resource Planning & Workflow Automation',
      description:
        'Unifying fragmented operational siloes into real-time business telemetry. We build custom ERPs, supply chain logistics monitors, and human capital platforms engineered specifically for modern organizational speed.',
      features: [
        'Real-Time Warehouse & Multi-Location Inventory',
        'Automated Invoice Processing & Purchase Orders',
        'Payroll, Attendance & Employee Performance HRMS',
        'Executive Analytics & Boardroom KPI Telemetry',
        'Role-Based Multi-Branch Permission Hierarchies',
      ],
      metrics: [
        { value: '65%', label: 'Operational Cost Reduction' },
        { value: 'Sub-Sec', label: 'Inventory Synchronization' },
        { value: 'Zero', label: 'Data Discrepancy Audits' },
      ],
      caseStudyHighlight: 'Custom ERP deployment replacing legacy spreadsheet infrastructure for an enterprise distribution network.',
    },
    {
      id: 'retail',
      name: 'FinTech & Commerce',
      badge: 'High-Volume Systems',
      icon: <ShopOutlined />,
      tagline: 'Secure High-Throughput Point-of-Sale & Commerce Systems',
      description:
        'Accelerating transaction velocities and customer retention. From touchscreen Windows POS terminals to responsive mobile commerce applications, our systems process high-velocity financial streams with enterprise protection.',
      features: [
        'Custom Windows & Tablet Touchscreen POS Systems',
        'Multi-Currency Payment Gateway Integrations',
        'Automated Loyalty Programs & Customer Retention',
        'Fraud Prevention & Audit Log Telemetry',
        'Omnichannel Real-Time Order Management',
      ],
      metrics: [
        { value: '$10M+', label: 'Transactions Processed Safely' },
        { value: '<250ms', label: 'Payment Checkout Latency' },
        { value: 'Bank-Grade', label: 'PCI-DSS Compliance' },
      ],
      caseStudyHighlight: 'Engineered a unified POS and online ordering system deployed across 85 retail storefront locations.',
    },
  ];

  const [activeTab, setActiveTab] = useState<string>('medicine');
  const currentIndustry = industries.find((ind) => ind.id === activeTab) || industries[0];
  const currentIndex = industries.findIndex((ind) => ind.id === activeTab);

  const goToNextTab = () => {
    const nextIdx = (currentIndex + 1) % industries.length;
    const nextTabId = industries[nextIdx].id;
    setActiveTab(nextTabId);
    setTimeout(() => {
      document.getElementById(`industry-tab-${nextTabId}`)?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }, 50);
  };

  const goToPrevTab = () => {
    const prevIdx = (currentIndex - 1 + industries.length) % industries.length;
    const prevTabId = industries[prevIdx].id;
    setActiveTab(prevTabId);
    setTimeout(() => {
      document.getElementById(`industry-tab-${prevTabId}`)?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }, 50);
  };

  return (
    <section id="industries" className="landing-section">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div className="landing-badge">
          <BankOutlined style={{ color: '#00b4d8' }} />
          <span>Industry Solutions</span>
        </div>
        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            margin: '12px 0 16px',
            color: 'var(--3v-text-primary)',
          }}
        >
          Specialized Software for <span className="landing-title-gradient">Every Sector</span>
        </h2>
        <p className="landing-subtitle">
          Whether pioneering digital health platforms or modernizing educational campuses, 3vTechworks delivers deep domain-specific engineering.
        </p>
      </div>

      {/* 1. Desktop Tabs (PC / Laptop screens >= 860px) */}
      <div className="desktop-industry-tabs">
        <div className="industry-tabs-bar" role="tablist" aria-label="Industry Solutions">
          {industries.map((ind) => {
            const isActive = activeTab === ind.id;
            return (
              <button
                id={`industry-tab-${ind.id}`}
                key={ind.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(ind.id)}
                className={`industry-tab-btn ${isActive ? 'active' : ''}`}
              >
                <span style={{ fontSize: 16 }}>{ind.icon}</span>
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Mobile & Small Screen Unified Sector Switcher (< 860px) - No half-cut tabs */}
      <div className="mobile-industry-switcher">
        <div className="mobile-switcher-card">
          {/* Active Sector Chip */}
          <div className="mobile-switcher-active-item" key={currentIndustry.id}>
            <div className="mobile-switcher-icon">{currentIndustry.icon}</div>
            <div className="mobile-switcher-info">
              <div className="mobile-switcher-title">{currentIndustry.name}</div>
              <div className="mobile-switcher-counter">Sector {currentIndex + 1} of {industries.length}</div>
            </div>
          </div>

          {/* Forward & Backward Controls */}
          <div className="mobile-switcher-nav-controls" aria-label="Sector switcher controls">
            <button
              type="button"
              onClick={goToPrevTab}
              className="mobile-switcher-arrow-btn"
              aria-label="Previous Sector"
              title="Previous Sector"
            >
              <LeftOutlined />
            </button>
            <button
              type="button"
              onClick={goToNextTab}
              className="mobile-switcher-arrow-btn active-next"
              aria-label="Next Sector"
              title="Next Sector"
            >
              <RightOutlined />
            </button>
          </div>
        </div>

        {/* Interactive Pagination Indicator Dots */}
        <div className="mobile-switcher-dots" role="tablist" aria-label="Sector pagination">
          {industries.map((ind, idx) => (
            <button
              key={ind.id}
              onClick={() => setActiveTab(ind.id)}
              className={`mobile-switcher-dot ${idx === currentIndex ? 'active' : ''}`}
              aria-label={`Jump to ${ind.name}`}
              title={ind.name}
            />
          ))}
        </div>
      </div>

      {/* Industry Detail Showcase */}
      <div
        className="landing-card-3d industry-detail-card"
        style={{
          padding: '40px',
        }}
      >
        <Row key={activeTab} className="industry-detail-content" gutter={[40, 40]} align="middle">
          {/* Left Column: Description and Key Capabilities */}
          <Col xs={24} lg={14}>
            <Tag
              style={{
                backgroundColor: 'rgba(0, 180, 216, 0.12)',
                borderColor: 'var(--3v-border)',
                color: '#00b4d8',
                borderRadius: 12,
                fontSize: 12,
                padding: '3px 12px',
                marginBottom: 16,
                fontWeight: 600,
              }}
            >
              {currentIndustry.badge}
            </Tag>

            <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--3v-text-primary)', marginBottom: 16 }}>
              {currentIndustry.tagline}
            </h3>

            <p style={{ color: 'var(--3v-text-secondary)', fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
              {currentIndustry.description}
            </p>

            {/* Feature List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
              {currentIndustry.features.map((feat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, color: 'var(--3v-text-primary)', fontSize: 14 }}>
                  <CheckCircleOutlined style={{ color: '#00b4d8', fontSize: 16, marginTop: 3 }} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <Button
              className="btn-3v-primary"
              size="large"
              style={{ borderRadius: 8 }}
              onClick={() => smoothScrollTo('contact', -70)}
            >
              Request {currentIndustry.name} Demo <ArrowRightOutlined />
            </Button>
          </Col>

          {/* Right Column: Key Industry Metrics & Case Highlights */}
          <Col xs={24} lg={10}>
            <div
              style={{
                background: 'var(--3v-card-inner)',
                borderRadius: 16,
                padding: 28,
                border: '1px solid var(--3v-border)',
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#00b4d8',
                  fontWeight: 700,
                  marginBottom: 20,
                }}
              >
                Measurable Impact
              </div>

              {/* Metrics */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {currentIndustry.metrics.map((m, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid var(--3v-border)',
                      paddingBottom: 12,
                    }}
                  >
                    <span style={{ color: 'var(--3v-text-secondary)', fontSize: 13 }}>{m.label}</span>
                    <span style={{ color: 'var(--3v-text-primary)', fontSize: 24, fontWeight: 800 }}>{m.value}</span>
                  </div>
                ))}
              </div>

              {/* Case Study Callout */}
              <div
                style={{
                  marginTop: 24,
                  background: isDark ? 'rgba(0, 119, 182, 0.15)' : 'rgba(0, 180, 216, 0.08)',
                  border: '1px dashed var(--3v-border)',
                  borderRadius: 10,
                  padding: 16,
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 700, color: '#00b4d8', marginBottom: 6 }}>
                  PROVEN CLIENT MILESTONE
                </div>
                <div style={{ fontSize: 13, color: 'var(--3v-text-secondary)', lineHeight: 1.5 }}>
                  "{currentIndustry.caseStudyHighlight}"
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default IndustriesSection;
