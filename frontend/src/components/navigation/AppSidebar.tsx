import React, { useState, useEffect } from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import {
  DashboardOutlined,
  AppstoreOutlined,
  FolderOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { menuApi, MenuItem } from '../../api/menu.api';
import { DynamicIcon } from '../common/DynamicIcon';

const { Sider } = Layout;

interface AppSidebarProps {
  collapsed: boolean;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [adminMenus, setAdminMenus] = useState<MenuItem[]>([]);

  const fetchAdminMenus = async () => {
    try {
      const response = await menuApi.getMenus({ role: 'admin', isActive: true });
      if (response.data?.items) {
        setAdminMenus(response.data.items);
      }
    } catch {
      // If error or offline, keep existing state
    }
  };

  useEffect(() => {
    fetchAdminMenus();

    const handleMenuUpdated = () => {
      fetchAdminMenus();
    };

    window.addEventListener('menu-updated', handleMenuUpdated);
    return () => {
      window.removeEventListener('menu-updated', handleMenuUpdated);
    };
  }, []);

  // Helper to construct clean admin path without menuId (e.g. /admin/analytics)
  const getAdminPath = (item: MenuItem): string => {
    let raw = (item.path || item.menuName || '')
      .toLowerCase()
      .trim()
      .replace(/^\/admin\//, '')
      .replace(/^\//, '')
      .replace(/[^a-z0-9-_]+/g, '-')
      .replace(/(^-|-$)/g, '');

    if (!raw) raw = 'page';
    return `/admin/${raw}`;
  };

  // Base fixed menu item: Dashboard
  const dynamicAdminItems: MenuProps['items'] = adminMenus.map((item) => {
    const itemKey = getAdminPath(item);
    return {
      key: itemKey,
      icon: <DynamicIcon icon={item.icon} style={{ fontSize: 16 }} fallback={<FolderOutlined style={{ fontSize: 16 }} />} />,
      label: item.menuName,
    };
  });

  // If menus exist in DB, display them directly (removes duplicate hardcoded items).
  // Only fall back to default Dashboard if the database has no admin menus yet.
  const menuItems: MenuProps['items'] =
    dynamicAdminItems.length > 0
      ? dynamicAdminItems
      : [
          {
            key: '/admin/dashboard',
            icon: <DashboardOutlined style={{ fontSize: 16 }} />,
            label: 'Dashboard',
          },
        ];

  const activeKey =
    location.pathname === '/dashboard' || location.pathname === '/admin'
      ? '/admin/dashboard'
      : location.pathname;

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key.startsWith('/admin')) {
      navigate(key);
    } else if (key.startsWith('#')) {
      navigate('/admin/dashboard');
      const el = document.getElementById(key.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      collapsedWidth={0}
      width={240}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        top: 0,
        left: 0,
        background: '#0f172a',
        zIndex: 100,
      }}
    >
      <div
        style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          padding: collapsed ? '0' : '0 24px',
          gap: 12,
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          cursor: 'pointer',
        }}
        onClick={() => navigate('/admin/dashboard')}
      >
        <AppstoreOutlined style={{ fontSize: 24, color: '#38bdf8' }} />
        {!collapsed && (
          <span
            style={{
              color: '#ffffff',
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              whiteSpace: 'nowrap',
            }}
          >
            3vTechworks
          </span>
        )}
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[activeKey]}
        items={menuItems}
        onClick={handleMenuClick}
        style={{
          borderRight: 0,
          paddingTop: 12,
        }}
      />
    </Sider>
  );
};

export default AppSidebar;
