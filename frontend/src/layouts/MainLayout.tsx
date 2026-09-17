import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { AppHeader } from '../components/navigation/AppHeader';
import { AppSidebar } from '../components/navigation/AppSidebar';

const { Content, Footer } = Layout;

export const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 992 : false;
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setCollapsed(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppSidebar collapsed={collapsed} />
      <Layout>
        <AppHeader
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        />
        <Content className="main-layout-content">
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            color: '#94a3b8',
            fontSize: 12,
            padding: '20px 16px',
          }}
        >
          3vTechworks Platform ©{new Date().getFullYear()} — Enterprise Infrastructure
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
