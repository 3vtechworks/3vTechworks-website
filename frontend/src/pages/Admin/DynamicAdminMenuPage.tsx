import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Typography, Tag, Space, Spin } from 'antd';
import {
  ArrowLeftOutlined,
  AppstoreOutlined,
  SafetyCertificateOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { PageHeader } from '../../components/common/PageHeader';
import { menuApi, MenuItem } from '../../api/menu.api';
import { MenuManagement } from '../../components/admin/MenuManagement';
import { DynamicIcon } from '../../components/common/DynamicIcon';

const { Text, Title, Paragraph } = Typography;

export const DynamicAdminMenuPage: React.FC = () => {
  const { menuPath } = useParams<{ menuPath: string }>();
  const navigate = useNavigate();
  const [menu, setMenu] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // If this screen is /admin/menus, render the full MenuManagement component!
  if (menuPath === 'menus') {
    return (
      <div style={{ maxWidth: 1400, margin: '0 auto', paddingBottom: 40 }}>
        <PageHeader
          title="Menus"
          subtitle="Admin module route: /admin/menus"
          extra={
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/admin/dashboard')}>
              Back to Dashboard
            </Button>
          }
        />
        <MenuManagement />
      </div>
    );
  }

  useEffect(() => {
    const fetchMenuDetails = async () => {
      setLoading(true);
      try {
        const response = await menuApi.getMenus({ role: 'admin' });
        if (response.data?.items) {
          const current = response.data.items.find((item) => {
            const cleanItemPath = (item.path || item.menuName || '')
              .toLowerCase()
              .replace(/^\/admin\//, '')
              .replace(/^\//, '')
              .replace(/\s+/g, '-');
            const targetSlug = (menuPath || '')
              .toLowerCase()
              .replace(/^\/admin\//, '')
              .replace(/^\//, '')
              .replace(/\s+/g, '-');
            return cleanItemPath === targetSlug;
          });
          setMenu(current || null);
        }
      } catch {
        setMenu(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuDetails();
  }, [menuPath]);

  const displayName =
    menu?.menuName ||
    (menuPath
      ? menuPath
          .split('-')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ')
      : 'Admin Module');

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', paddingBottom: 40 }}>
      <PageHeader
        title={`${displayName}`}
        subtitle={`Admin module route: /admin/${menuPath}`}
        extra={
          <Space>
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/admin/dashboard')}>
              Back to Dashboard
            </Button>
          </Space>
        }
      />

      <Card
        bordered={false}
        style={{
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          background: '#ffffff',
          marginTop: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 20, borderBottom: '1px solid #f1f5f9', paddingBottom: 16 }}>
          <Space size="middle">
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: 22,
              }}
            >
              <DynamicIcon icon={menu?.icon} fallback={<AppstoreOutlined />} />
            </div>
            <div>
              <Title level={4} style={{ margin: 0, color: '#0f172a' }}>
                {displayName}
              </Title>
              <Text type="secondary" style={{ fontSize: 13 }}>
                Live Path: <code>/admin/{menuPath}</code>
              </Text>
            </div>
          </Space>

          <Space size="small">
            <Tag color="purple" icon={<SafetyCertificateOutlined />}>
              Admin Role
            </Tag>
            <Tag color="green">Active</Tag>
          </Space>
        </div>

        <Paragraph style={{ color: '#475569', fontSize: 14 }}>
          This administrative view is active for <code>/admin/{menuPath}</code>.
        </Paragraph>

        <Button
          type="primary"
          icon={<DashboardOutlined />}
          onClick={() => navigate('/admin/dashboard')}
          style={{ background: 'linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)', borderColor: '#0077b6', marginTop: 12 }}
        >
          Return to Dashboard
        </Button>
      </Card>
    </div>
  );
};

export default DynamicAdminMenuPage;
