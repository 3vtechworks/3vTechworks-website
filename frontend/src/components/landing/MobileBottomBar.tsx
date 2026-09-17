import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  SunOutlined,
  MoonOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { smoothScrollTo } from '../../utils/scroll';
import { menuApi, MenuItem } from '../../api/menu.api';
import { DynamicIcon } from '../common/DynamicIcon';

export const MobileBottomBar: React.FC = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>('home');
  const [userMenus, setUserMenus] = useState<MenuItem[]>([]);
  const dockScrollRef = useRef<HTMLDivElement>(null);
  const isClickingRef = useRef<boolean>(false);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchMenus = async () => {
    try {
      const res = await menuApi.getMenus({ role: 'user', isActive: true });
      if (res.data?.items) {
        setUserMenus(res.data.items);
      } else {
        setUserMenus([]);
      }
    } catch {
      setUserMenus([]);
    }
  };

  useEffect(() => {
    fetchMenus();

    const handleMenuUpdated = () => {
      fetchMenus();
    };

    window.addEventListener('menu-updated', handleMenuUpdated);
    return () => {
      window.removeEventListener('menu-updated', handleMenuUpdated);
    };
  }, []);

  // Convert dynamic user menus from DB with dynamic open-source icons
  const dockNavItems = useMemo(() => {
    return userMenus.map((m) => {
      const rawPath = m.path || `#${m.menuName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      const cleanId = (m.path || m.menuName).replace(/^[/#]+/, '').toLowerCase();
      return {
        label: m.menuName,
        path: rawPath,
        icon: (
          <DynamicIcon
            icon={m.icon}
            className="mobile-dock-icon"
            fallback={<GlobalOutlined className="mobile-dock-icon" />}
          />
        ),
        id: cleanId,
      };
    });
  }, [userMenus]);

  // Accurate Scroll-Spy to reflect active section background without jerking
  useEffect(() => {
    if (dockNavItems.length === 0) return;

    const handleScroll = () => {
      if (isClickingRef.current) return;

      const scrollY = window.scrollY;

      // 1. If at top of page (first 100px)
      if (scrollY < 100) {
        setActiveSection(dockNavItems[0]?.id || 'home');
        return;
      }

      // 2. If near bottom of document (activate last item like contact)
      const isBottom =
        window.innerHeight + scrollY >= document.documentElement.scrollHeight - 80;
      if (isBottom) {
        setActiveSection(dockNavItems[dockNavItems.length - 1].id);
        return;
      }

      // 3. Scan sections from viewport: find which section currently occupies viewport
      const scrollPosition = scrollY + 220;
      let matchedId = '';
      let maxOffset = -1;

      for (const item of dockNavItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (top <= scrollPosition && top > maxOffset) {
            maxOffset = top;
            matchedId = item.id;
          }
        }
      }

      if (matchedId) {
        setActiveSection(matchedId);
      }
    };

    const handleUserInterruption = () => {
      // If user physically touches or scrolls with wheel, release click lock immediately
      if (isClickingRef.current) {
        isClickingRef.current = false;
        if (clickTimeoutRef.current) {
          clearTimeout(clickTimeoutRef.current);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleUserInterruption, { passive: true });
    window.addEventListener('touchstart', handleUserInterruption, { passive: true });

    handleScroll(); // Initial check on load

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleUserInterruption);
      window.removeEventListener('touchstart', handleUserInterruption);
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, [dockNavItems]);

  // Keep active pill centered in scroll track on mobile
  useEffect(() => {
    if (activeSection && dockScrollRef.current) {
      const activeElement = dockScrollRef.current.querySelector<HTMLElement>('.mobile-dock-item.active');
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeSection]);

  const handleNavClick = (pathOrId: string) => {
    const cleanId = pathOrId.replace(/^[/#]+/, '').toLowerCase();
    setActiveSection(cleanId);

    // Lock scroll-spy updates during the programmatic smooth scroll
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    isClickingRef.current = true;
    clickTimeoutRef.current = setTimeout(() => {
      isClickingRef.current = false;
    }, 1000);

    if (cleanId === 'home' || pathOrId === '/' || pathOrId === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (pathOrId.startsWith('http://') || pathOrId.startsWith('https://')) {
      isClickingRef.current = false;
      window.open(pathOrId, '_blank', 'noopener,noreferrer');
      return;
    }

    const el = document.getElementById(cleanId);
    if (el) {
      smoothScrollTo(cleanId, -70);
      return;
    }

    if (pathOrId.startsWith('/')) {
      isClickingRef.current = false;
      navigate(pathOrId);
      return;
    }

    smoothScrollTo(cleanId, -70);
  };

  return (
    <nav className="mobile-app-dock" aria-label="Mobile Dock Navigation">
      {/* Scrollable Track for all dynamic menu items */}
      <div className="mobile-dock-scroll-container" ref={dockScrollRef}>
        {dockNavItems.map((item) => (
          <div
            key={item.id}
            className={`mobile-dock-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => handleNavClick(item.path)}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="mobile-dock-divider" />

      {/* Fixed Theme Toggle Tab */}
      <div
        className="mobile-dock-item mobile-dock-theme-toggle"
        onClick={toggleTheme}
        title={isDark ? 'Switch to Bright Theme' : 'Switch to Dark Theme'}
      >
        {isDark ? (
          <SunOutlined className="mobile-dock-icon" style={{ color: '#ffb703' }} />
        ) : (
          <MoonOutlined className="mobile-dock-icon" style={{ color: '#0077b6' }} />
        )}
        <span>{isDark ? 'Bright' : 'Dark'}</span>
      </div>
    </nav>
  );
};

export default MobileBottomBar;
