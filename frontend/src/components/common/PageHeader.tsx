import React, { ReactNode } from 'react';
import { Typography } from 'antd';

const { Title, Text } = Typography;

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  extra?: ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, extra }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
        marginBottom: 24,
      }}
    >
      <div style={{ flex: '1 1 260px' }}>
        <Title
          level={3}
          style={{
            margin: 0,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            fontSize: 'clamp(1.2rem, 3.5vw, 1.65rem)',
          }}
        >
          {title}
        </Title>
        {subtitle && (
          <Text type="secondary" style={{ fontSize: 13, display: 'block', marginTop: 4 }}>
            {subtitle}
          </Text>
        )}
      </div>
      {extra && <div style={{ flexShrink: 0 }}>{extra}</div>}
    </div>
  );
};

export default PageHeader;
