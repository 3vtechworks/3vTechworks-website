import React, { useState, useEffect } from 'react';
import { Button, Drawer, Space, Tooltip } from 'antd';
import {
  MenuOutlined,
  AppstoreOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { smoothScrollTo } from '../../utils/scroll';
import { menuApi, MenuItem } from '../../api/menu.api';
import { DynamicIcon } from '../common/DynamicIcon';

export const LandingNavbar: React.FC = () => {
  const navigate = useNavigate();
  const { toggleTheme, logo, isDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenus, setUserMenus] = useState<MenuItem[]>([]);

  const fetchUserMenus = async () => {
    try {
      const response = await menuApi.getMenus({ role: 'user', isActive: true });
      if (response.data?.items) {
        setUserMenus(response.data.items);
      } else {
        setUserMenus([]);
      }
    } catch {
      setUserMenus([]);
    }
  };

  useEffect(() => {
    fetchUserMenus();

    const handleMenuUpdated = () => {
      fetchUserMenus();
    };

    window.addEventListener('menu-updated', handleMenuUpdated);
    return () => {
      window.removeEventListener('menu-updated', handleMenuUpdated);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper to format clean user path (e.g. /pathname or #section) without menuId
  const getUserPath = (item: MenuItem): string => {
    let raw = item.path?.trim() || '';
    if (raw.startsWith('#') || raw.startsWith('http://') || raw.startsWith('https://')) {
      return raw;
    }
    if (!raw) {
      raw = item.menuName
        .toLowerCase()
        .replace(/[^a-z0-9-_]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    raw = raw.replace(/^\//, '');
    return `/${raw}`;
  };

  const handleNavClick = (item: { label: string; path?: string }) => {
    setMobileMenuOpen(false);

    if (item.path && (item.path.startsWith('http://') || item.path.startsWith('https://'))) {
      window.open(item.path, '_blank', 'noopener,noreferrer');
      return;
    }

    if (item.path?.startsWith('#')) {
      const targetId = item.path.substring(1);
      setTimeout(() => {
        smoothScrollTo(targetId, -70);
      }, 150);
      return;
    }

    if (item.path && item.path.startsWith('/')) {
      const candidateId = item.path.replace(/^\//, '');
      const targetElement = document.getElementById(candidateId);
      if (targetElement) {
        setTimeout(() => {
          smoothScrollTo(candidateId, -70);
        }, 150);
        return;
      }
      navigate(item.path);
      return;
    }

    navigate(item.path || '/');
  };

  // Dynamic user menus loaded directly from MongoDB
  const activeNavItems = userMenus.map((m) => ({
    label: m.menuName,
    key: m.menuId || m.menuName,
    path: getUserPath(m),
    icon: <DynamicIcon icon={m.icon} fallback={<AppstoreOutlined />} />,
  }));

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        background: scrolled
          ? (isDark ? 'rgba(6, 13, 23, 0.92)' : 'rgba(255, 255, 255, 0.92)')
          : (isDark ? 'rgba(6, 13, 23, 0.45)' : 'rgba(255, 255, 255, 0.6)'),
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: scrolled
          ? '1px solid var(--3v-border)'
          : '1px solid rgba(0, 180, 216, 0.1)',
        boxShadow: scrolled
          ? (isDark ? '0 10px 30px rgba(0, 0, 0, 0.5)' : '0 10px 30px rgba(0, 119, 182, 0.08)')
          : 'none',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Logo & Name */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            cursor: 'pointer',
          }}
        >
          <img
            src={logo}
            alt="3vTechworks Logo"
            style={{
              height: 44,
              width: 'auto',
              objectFit: 'contain',
              filter: isDark
                ? 'drop-shadow(0 2px 8px rgba(0, 229, 255, 0.35))'
                : 'drop-shadow(0 2px 8px rgba(0, 119, 182, 0.2))',
            }}
          />
        </div>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: 32,
          }}
          className="desktop-nav"
        >
          {activeNavItems.map((link) => (
            <span
              key={link.key}
              onClick={() => handleNavClick(link)}
              style={{
                color: 'var(--3v-text-secondary)',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'color 0.2s ease',
                position: 'relative',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#00b4d8')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--3v-text-secondary)')}
            >
              {link.label}
            </span>
          ))}
        </nav>

        {/* Right Actions: Theme Toggle + Consultation CTA */}
        <div style={{ display: 'none', alignItems: 'center', gap: 14 }} className="desktop-actions">
          {/* Theme Toggle Button */}
          <Tooltip title={isDark ? 'Switch to White / Bright Theme' : 'Switch to Dark Theme'}>
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              aria-label="Toggle Theme"
              style={{
                background: isDark ? 'rgba(11, 26, 48, 0.8)' : 'rgba(240, 249, 255, 0.9)',
                border: '1px solid var(--3v-border)',
                color: isDark ? '#00e5ff' : '#0077b6',
              }}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </Tooltip>
        </div>

        {/* Mobile Actions: Theme Toggle + Menu Button */}
        <div style={{ display: 'none', alignItems: 'center', gap: 10 }} className="mobile-actions">
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            style={{ width: 36, height: 36, fontSize: 16 }}
            aria-label="Toggle Theme"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: 20, color: '#00b4d8' }} />}
            onClick={() => setMobileMenuOpen(true)}
          />
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        className={isDark ? 'drawer-dark' : 'drawer-light'}
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src={logo} alt="3vTechworks" style={{ height: 32 }} />
          </div>
        }
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        closeIcon={<CloseOutlined style={{ color: isDark ? '#ffffff' : '#0f172a', fontSize: 18 }} />}
        styles={{
          body: {
            background: isDark ? '#070e18' : '#ffffff',
            color: isDark ? '#f8fafc' : '#0f172a',
            padding: '24px 16px',
          },
          header: {
            background: isDark ? '#0b1a30' : '#f8fafc',
            borderBottom: '1px solid var(--3v-border)',
          },
        }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {activeNavItems.map((link) => (
            <div
              key={link.key}
              onClick={() => handleNavClick(link)}
              style={{
                fontSize: 16,
                color: 'var(--3v-text-primary)',
                padding: '12px 8px',
                borderBottom: '1px solid rgba(0, 180, 216, 0.1)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <span style={{ color: '#00b4d8' }}>{link.icon}</span>
              {link.label}
            </div>
          ))}

          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Button
              className="btn-3v-secondary"
              block
              size="large"
              onClick={toggleTheme}
            >
              {isDark ? '☀️ Switch to White Theme' : '🌙 Switch to Dark Theme'}
            </Button>
          </div>
        </Space>
      </Drawer>

      <style>{`
        @media (min-width: 860px) {
          .desktop-nav { display: flex !important; }
          .desktop-actions { display: flex !important; }
          .mobile-actions { display: none !important; }
        }
        @media (max-width: 859px) {
          .desktop-nav { display: none !important; }
          .desktop-actions { display: none !important; }
          .mobile-actions { display: flex !important; }
        }
      `}</style>
    </header>
  );
};

export default LandingNavbar;
