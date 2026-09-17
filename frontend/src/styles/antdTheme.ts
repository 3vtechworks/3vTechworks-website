import { ThemeConfig } from 'antd';

export const customTheme: ThemeConfig = {
  token: {
    colorPrimary: '#2563eb', // Modern vibrant royal blue
    colorSuccess: '#10b981',
    colorWarning: '#f59e0b',
    colorError: '#ef4444',
    colorInfo: '#3b82f6',
    borderRadius: 8,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: 14,
    wireframe: false,
  },
  components: {
    Button: {
      controlHeight: 38,
      borderRadius: 6,
      fontWeight: 500,
    },
    Input: {
      controlHeight: 40,
      borderRadius: 6,
    },
    Card: {
      borderRadiusLG: 12,
    },
    Layout: {
      bodyBg: '#f8fafc',
      headerBg: '#ffffff',
      siderBg: '#0f172a',
    },
    Menu: {
      darkItemBg: '#0f172a',
      darkItemSelectedBg: '#2563eb',
      darkItemHoverBg: '#1e293b',
    },
  },
};
