import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  Statistic,
  Progress,
  Table,
  Tag,
  Typography,
  Button,
  Popconfirm,
  message,
  Empty,
  Badge,
} from 'antd';
import {
  MailOutlined,
  CloudServerOutlined,
  ThunderboltOutlined,
  DeleteOutlined,
  ReloadOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import { PageHeader } from '../../components/common/PageHeader';
import { useAuth } from '../../hooks/useAuth';
import { contactApi, ContactInquiry } from '../../api/contact.api';
import './DashboardPage.css';

const { Title, Text, Paragraph } = Typography;

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchInquiries = async (showFeedback = false) => {
    setLoading(true);
    try {
      const response = await contactApi.getInquiries();
      if (response.data?.items) {
        setInquiries(response.data.items);
      }
      if (showFeedback && response?.message) {
        message.success(response.message);
      }
    } catch (err: any) {
      if (err?.message) {
        message.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries(false);
  }, []);

  const handleDeleteInquiry = async (id: string) => {
    try {
      const response = await contactApi.deleteInquiry(id);
      if (response?.message) {
        message.success(response.message);
      }
      setInquiries((prev) => prev.filter((item) => item._id !== id));
    } catch (err: any) {
      if (err?.message) {
        message.error(err.message);
      }
    }
  };

  const columns = [
    {
      title: 'Sender',
      key: 'sender',
      width: 170,
      render: (_: any, record: ContactInquiry) => (
        <div>
          <Text strong style={{ fontSize: 13, color: '#0f172a' }}>
            {record.name}
          </Text>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 2, wordBreak: 'break-all' }}>
            <a href={`mailto:${record.email}`} style={{ color: '#0077b6' }}>
              {record.email}
            </a>
          </div>
        </div>
      ),
    },
    {
      title: 'Solution',
      dataIndex: 'serviceType',
      key: 'serviceType',
      width: 130,
      render: (service: string) => (
        <Tag color="cyan" style={{ textTransform: 'capitalize', fontWeight: 600, fontSize: 11 }}>
          {service ? service.replace('-', ' ') : 'General'}
        </Tag>
      ),
    },
    {
      title: 'Timeline',
      dataIndex: 'timeline',
      key: 'timeline',
      width: 120,
      render: (timeline: string) => (
        <Tag color="blue" style={{ textTransform: 'capitalize', fontSize: 11 }}>
          {timeline ? timeline.replace('-', ' ') : 'Flexible'}
        </Tag>
      ),
    },
    {
      title: 'Project Scope & Details',
      dataIndex: 'projectDetails',
      key: 'projectDetails',
      render: (details: string) => (
        <Paragraph
          ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}
          style={{ marginBottom: 0, color: '#334155', fontSize: 13 }}
        >
          {details}
        </Paragraph>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 125,
      render: (date: string) => (
        <Text type="secondary" style={{ fontSize: 12, whiteSpace: 'nowrap' }}>
          {new Date(date).toLocaleString(undefined, {
            dateStyle: 'short',
            timeStyle: 'short',
          })}
        </Text>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 85,
      fixed: 'right' as const,
      render: (_: any, record: ContactInquiry) => (
        <Popconfirm
          title="Delete this inquiry?"
          description="Are you sure you want to remove this client inquiry?"
          onConfirm={() => handleDeleteInquiry(record._id)}
          okText="Delete"
          cancelText="Cancel"
          okButtonProps={{ danger: true }}
        >
          <Button type="text" danger icon={<DeleteOutlined />} size="small">
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="dashboard-container">
      <PageHeader
        title={`Welcome back, ${user?.name || 'Administrator'} 👋`}
        subtitle="Live command center for 3vTechworks website inquiries, cluster health, and cloud services."
        extra={
          <Button
            type="primary"
            ghost
            icon={<ReloadOutlined />}
            onClick={() => fetchInquiries(true)}
            loading={loading}
          >
            Refresh
          </Button>
        }
      />

      {/* Metrics Row: 2x2 grid on mobile, 4 in a row on desktop */}
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={12} md={12} lg={6}>
          <Card bordered={false} hoverable className="dashboard-stat-card">
            <Statistic
              title="Client Inquiries"
              value={inquiries.length}
              prefix={<MailOutlined style={{ color: '#00b4d8' }} />}
              valueStyle={{ color: '#0f172a', fontWeight: 700 }}
              suffix={
                <span style={{ fontSize: 11, color: '#10b981', fontWeight: 600, marginLeft: 4 }}>
                  Active
                </span>
              }
            />
          </Card>
        </Col>

        <Col xs={12} sm={12} md={12} lg={6}>
          <Card bordered={false} hoverable className="dashboard-stat-card">
            <Statistic
              title="API Uptime"
              value={99.98}
              precision={2}
              suffix="%"
              prefix={<ThunderboltOutlined style={{ color: '#10b981' }} />}
              valueStyle={{ color: '#0f172a', fontWeight: 700 }}
            />
          </Card>
        </Col>

        <Col xs={12} sm={12} md={12} lg={6}>
          <Card bordered={false} hoverable className="dashboard-stat-card">
            <Statistic
              title="Mongo Latency"
              value={14}
              suffix="ms"
              prefix={<CloudServerOutlined style={{ color: '#6366f1' }} />}
              valueStyle={{ color: '#0f172a', fontWeight: 700 }}
            />
          </Card>
        </Col>

        <Col xs={12} sm={12} md={12} lg={6}>
          <Card bordered={false} hoverable className="dashboard-stat-card">
            <Statistic
              title="Admin Session"
              value="Active"
              prefix={<SafetyCertificateOutlined style={{ color: '#10b981' }} />}
              valueStyle={{ color: '#10b981', fontWeight: 600 }}
            />
          </Card>
        </Col>
      </Row>

      {/* Website Inquiries & System Status */}
      <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
        {/* Inquiries Table Card */}
        <Col xs={24} xl={16}>
          <Card
            className="dashboard-main-card"
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>Website Contact Inquiries</span>
                <Badge count={inquiries.length} style={{ backgroundColor: '#00b4d8' }} />
              </div>
            }
            bordered={false}
          >
            <div className="dashboard-table-wrapper">
              <Table
                columns={columns}
                dataSource={inquiries}
                rowKey="_id"
                loading={loading}
                pagination={{
                  pageSize: 5,
                  responsive: true,
                  showTotal: (total) => `Total ${total} inquiries`,
                }}
                size="middle"
                scroll={{ x: 740 }}
                locale={{
                  emptyText: (
                    <Empty
                      description="No client inquiries yet. When visitors submit the Contact form on the website, they will appear here live."
                    />
                  ),
                }}
              />
            </div>
          </Card>
        </Col>

        {/* Infrastructure & Status Card */}
        <Col xs={24} xl={8}>
          <Card title="Infrastructure Telemetry" bordered={false} className="dashboard-main-card">
            <div style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <Text style={{ fontSize: 13 }}>CPU Workload</Text>
                <Text strong style={{ fontSize: 13 }}>24%</Text>
              </div>
              <Progress percent={24} strokeColor="#00b4d8" showInfo={false} size="small" />
            </div>

            <div style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <Text style={{ fontSize: 13 }}>Memory (RAM)</Text>
                <Text strong style={{ fontSize: 13 }}>52%</Text>
              </div>
              <Progress percent={52} strokeColor="#f59e0b" showInfo={false} size="small" />
            </div>

            <div style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <Text style={{ fontSize: 13 }}>Database Storage</Text>
                <Text strong style={{ fontSize: 13 }}>31%</Text>
              </div>
              <Progress percent={31} strokeColor="#10b981" showInfo={false} size="small" />
            </div>

            <Card size="small" className="dashboard-endpoint-box">
              <Title level={5} style={{ margin: 0, fontSize: 13, fontWeight: 700 }}>
                Live Deployment Endpoints
              </Title>
              <div style={{ marginTop: 8, fontSize: 12, lineHeight: 1.8, color: '#475569' }}>
                <div>Client Website: <code>http://localhost:3000</code></div>
                <div>REST API: <code>http://localhost:5000/api/v1</code></div>
                <div>Contact Form: <code>/api/v1/contact</code></div>
              </div>
            </Card>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
