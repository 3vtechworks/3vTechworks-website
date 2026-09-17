import React from 'react';
import { Layout, Dropdown, Avatar, Space, Typography, MenuProps, Button } from 'antd';
import {
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const { Header } = Layout;
const { Text } = Typography;

interface AppHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ collapsed, onToggle }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems: MenuProps['items'] = [
    {
      key: 'user-info',
      label: (
        <div style={{ padding: '4px 8px' }}>
          <div style={{ fontWeight: 600 }}>{user?.name || 'Administrator'}</div>
          <div style={{ fontSize: 12, color: '#64748b' }}>{user?.email}</div>
        </div>
      ),
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Sign Out Admin',
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <Header
      style={{
        padding: '0 24px',
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #f1f5f9',
        height: 64,
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <div
        onClick={onToggle}
        style={{
          cursor: 'pointer',
          fontSize: 18,
          display: 'flex',
          alignItems: 'center',
          color: '#475569',
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>

      <Space size={16} align="center">
        {isAuthenticated && user ? (
          /* Logged-in Administrator */
          <Dropdown menu={{ items: menuItems }} placement="bottomRight" arrow>
            <Space style={{ cursor: 'pointer' }}>
              <Avatar
                style={{ backgroundColor: '#2563eb' }}
                icon={<UserOutlined />}
              >
                {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
              </Avatar>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                <Text strong style={{ fontSize: 14 }}>
                  {user.name}
                </Text>
                <Text type="secondary" style={{ fontSize: 11, color: '#dc2626', fontWeight: 600 }}>
                  ADMINISTRATOR
                </Text>
              </div>
            </Space>
          </Dropdown>
        ) : (
          /* Public Visitor: Provide Admin Login button */
          <Button
            type="primary"
            danger
            ghost
            icon={<LockOutlined />}
            onClick={() => navigate('/admin/login')}
            style={{ fontWeight: 600, borderRadius: 6 }}
          >
            Admin Login
          </Button>
        )}
      </Space>
    </Header>
  );
};

export default AppHeader;
