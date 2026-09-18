import React, { useState } from 'react';
import { Row, Col, Form, Input, Select, Button, message, Alert } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  SendOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';
import { contactApi } from '../../api/contact.api';

const { TextArea } = Input;
const { Option } = Select;

export const ContactSection: React.FC = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (values: any) => {
    setSubmitting(true);
    try {
      const res = await contactApi.submitInquiry(values);
      setSubmitted(true);
      if (res?.message) {
        message.success(res.message);
      }
      form.resetFields();
    } catch (err: any) {
      if (err?.message) {
        message.error(err.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="landing-section">
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div className="landing-badge">
          <SendOutlined style={{ color: '#00b4d8' }} />
          <span>Start Your Project</span>
        </div>
        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            margin: '12px 0 16px',
            color: 'var(--3v-text-primary)',
          }}
        >
          Let's Build Something <span className="landing-title-gradient">Extraordinary</span>
        </h2>
        <p className="landing-subtitle">
          Have an app idea, a web platform requirement, or an enterprise Windows software project? Schedule a free architectural consult today.
        </p>
      </div>

      <div
        className="landing-card-3d"
        style={{
          padding: 'clamp(24px, 4vw, 48px)',
        }}
      >
        <Row gutter={[48, 48]}>
          {/* Left Column: Contact Details & Value Promise */}
          <Col xs={24} lg={10}>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: 'var(--3v-text-primary)', marginBottom: 16 }}>
              Engineering Consultation
            </h3>
            <p style={{ color: 'var(--3v-text-secondary)', fontSize: 14, lineHeight: 1.6, marginBottom: 32 }}>
              Speak directly with our technical lead. We assess your timeline, tech feasibility, and cost models to deliver an actionable software roadmap.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: 'rgba(0, 180, 216, 0.15)',
                    border: '1px solid var(--3v-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#00b4d8',
                    fontSize: 18,
                  }}
                >
                  <MailOutlined />
                </div>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--3v-text-secondary)' }}>Email Inquiries</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--3v-text-primary)' }}>
                    support@3vtechworks.com
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: 'rgba(0, 180, 216, 0.15)',
                    border: '1px solid var(--3v-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#00b4d8',
                    fontSize: 18,
                  }}
                >
                  <PhoneOutlined />
                </div>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--3v-text-secondary)' }}>Direct Enterprise Line</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--3v-text-primary)' }}>
                    +91-8431496329 / +91-63618 88927
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: 'rgba(0, 180, 216, 0.15)',
                    border: '1px solid var(--3v-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#00b4d8',
                    fontSize: 18,
                  }}
                >
                  <EnvironmentOutlined />
                </div>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--3v-text-secondary)' }}>Global Headquarters</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--3v-text-primary)' }}>
                    Bengaluru, Karnataka, India - 560061
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 36,
                padding: '16px 20px',
                background: 'var(--3v-card-inner)',
                borderRadius: 12,
                border: '1px solid var(--3v-border)',
              }}
            >
              <div style={{ color: '#00b4d8', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>
                🔒 Non-Disclosure Agreement (NDA)
              </div>
              <div style={{ color: 'var(--3v-text-secondary)', fontSize: 12, lineHeight: 1.5 }}>
                Your intellectual property is protected by strict corporate confidentiality from day one.
              </div>
            </div>
          </Col>

          {/* Right Column: Inquiry Form */}
          <Col xs={24} lg={14}>
            {submitted && (
              <Alert
                message="Inquiry Dispatched Successfully"
                description="Thank you for reaching out to 3vTechworks. Our lead solutions architect has been notified and will review your technical requirements immediately."
                type="success"
                showIcon
                icon={<CheckCircleFilled style={{ color: '#10b981' }} />}
                style={{ marginBottom: 24, borderRadius: 10 }}
                closable
                onClose={() => setSubmitted(false)}
              />
            )}

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{
                serviceType: 'mobile-app',
                timeline: '1-3-months',
              }}
            >
              <Row gutter={[16, 0]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="name"
                    label={<span style={{ color: 'var(--3v-text-primary)', fontWeight: 500 }}>Full Name</span>}
                    rules={[{ required: true, message: 'Please enter your name' }]}
                  >
                    <Input placeholder="Jane Doe" style={{ height: 44, borderRadius: 8 }} />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    name="email"
                    label={<span style={{ color: 'var(--3v-text-primary)', fontWeight: 500 }}>Corporate Email</span>}
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email' },
                    ]}
                  >
                    <Input placeholder="jane@enterprise.com" style={{ height: 44, borderRadius: 8 }} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 0]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="serviceType"
                    label={<span style={{ color: 'var(--3v-text-primary)', fontWeight: 500 }}>Solution Needed</span>}
                    rules={[{ required: true }]}
                  >
                    <Select style={{ height: 44 }}>
                      <Option value="mobile-app">📱 Mobile App (iOS / Android)</Option>
                      <Option value="web-app">🌐 Website & Cloud Portal</Option>
                      <Option value="windows-app">💻 Windows Desktop Software</Option>
                      <Option value="education-lms">🎓 Education / LMS System</Option>
                      <Option value="medical-system">🏥 Healthcare / Medicine Platform</Option>
                      <Option value="enterprise-erp">🏢 Enterprise ERP & Automation</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    name="timeline"
                    label={<span style={{ color: 'var(--3v-text-primary)', fontWeight: 500 }}>Estimated Timeline</span>}
                  >
                    <Select style={{ height: 44 }}>
                      <Option value="urgent">⚡ Immediate (Under 1 month)</Option>
                      <Option value="1-3-months">🗓️ 1 to 3 Months</Option>
                      <Option value="3-6-months">📅 3 to 6 Months</Option>
                      <Option value="exploring">🔍 Strategic Exploration</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="projectDetails"
                label={<span style={{ color: 'var(--3v-text-primary)', fontWeight: 500 }}>Project Scope & Goals</span>}
                rules={[{ required: true, message: 'Please provide a brief summary of your project' }]}
              >
                <TextArea
                  rows={4}
                  placeholder="Tell us about the problem you are solving, key features needed, and target users..."
                  style={{ borderRadius: 8 }}
                />
              </Form.Item>

              <Form.Item style={{ marginBottom: 0 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={submitting}
                  size="large"
                  className="btn-3v-primary"
                  block
                  style={{
                    height: 48,
                    fontSize: 15,
                    borderRadius: 8,
                    fontWeight: 700,
                  }}
                >
                  Send Consultation Request
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default ContactSection;
