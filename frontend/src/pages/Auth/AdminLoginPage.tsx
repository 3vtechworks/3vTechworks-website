import React, { useState } from 'react';
import { Form, Input, Button, Typography, Checkbox, Alert, Space } from 'antd';
import { MailOutlined, LockOutlined, SafetyCertificateOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LoginCredentials } from '../../types/auth.types';

const { Title } = Typography;

export const AdminLoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    (location.state as { error?: string })?.error || null
  );

  const fromLocation = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin/dashboard';

  const handleSubmit = async (values: LoginCredentials) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      await login(values);
      navigate(fromLocation, { replace: true });
    } catch (err: unknown) {
      const error = err as { message?: string };
      setErrorMessage(error.message || 'Invalid administrator credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 52,
            height: 52,
            borderRadius: 14,
            backgroundColor: '#fef2f2',
            color: '#dc2626',
            fontSize: 26,
            marginBottom: 12,
            boxShadow: '0 4px 12px rgba(220, 38, 38, 0.15)',
          }}
        >
          <SafetyCertificateOutlined />
        </div>
        <Title level={3} style={{ margin: 0, fontWeight: 700 }}>
          Admin Authentication
        </Title>
        
      </div>

      

      {errorMessage && (
        <Alert
          message={errorMessage}
          type="error"
          showIcon
          style={{ marginBottom: 20 }}
        />
      )}

      <Form
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="email"
          label="Admin Email Address"
          rules={[
            { required: true, message: 'Please enter your admin email' },
            { type: 'email', message: 'Please enter a valid email address' },
          ]}
        >
          <Input
            prefix={<MailOutlined style={{ color: '#94a3b8' }} />}
            placeholder="example@gmail.com"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: '#94a3b8' }} />}
            placeholder="••••••••"
          />
        </Form.Item>

        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember session</Checkbox>
            </Form.Item>
            
          </div>
        </Form.Item>

        <Form.Item style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            danger
            htmlType="submit"
            loading={loading}
            block
            size="large"
            style={{ fontWeight: 600 }}
          >
            Access Admin Console
          </Button>
        </Form.Item>

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Space>
            <ArrowLeftOutlined style={{ color: '#2563eb', fontSize: 12 }} />
            <Link to="/" style={{ color: '#2563eb', fontWeight: 600, fontSize: 13 }}>
              Back to Home Page
            </Link>
          </Space>
        </div>
      </Form>
    </div>
  );
};

export default AdminLoginPage;
