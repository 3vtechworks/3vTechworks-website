import React, { useState } from 'react';
import { Form, Input, Button, Typography, Checkbox, Alert } from 'antd';
import { MailOutlined, LockOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LoginCredentials } from '../../types/auth.types';

const { Title, Text } = Typography;

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (values: LoginCredentials) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      await login(values);
      navigate('/dashboard');
    } catch (err: any) {
      setErrorMessage(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: 12,
            backgroundColor: '#eff6ff',
            color: '#2563eb',
            fontSize: 24,
            marginBottom: 12,
          }}
        >
          <AppstoreOutlined />
        </div>
        <Title level={3} style={{ margin: 0, fontWeight: 700 }}>
          Welcome back
        </Title>
        <Text type="secondary">Sign in to your 3vTechworks workspace</Text>
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
        initialValues={{
          email: 'admin@3vtechworks.com',
          password: 'password123',
          remember: true,
        }}
      >
        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email address' },
          ]}
        >
          <Input
            prefix={<MailOutlined style={{ color: '#94a3b8' }} />}
            placeholder="you@company.com"
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
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a style={{ fontSize: 13, color: '#2563eb' }} href="#forgot">
              Forgot password?
            </a>
          </div>
        </Form.Item>

        <Form.Item style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
            style={{ fontWeight: 600 }}
          >
            Sign In
          </Button>
        </Form.Item>

        <div style={{ textAlign: 'center' }}>
          <Text type="secondary" style={{ fontSize: 13 }}>
            Don't have an account?{' '}
            <Link to="/auth/register" style={{ color: '#2563eb', fontWeight: 600 }}>
              Create an account
            </Link>
          </Text>
        </div>
      </Form>
    </div>
  );
};
