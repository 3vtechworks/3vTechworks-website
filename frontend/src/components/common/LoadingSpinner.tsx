import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface LoadingSpinnerProps {
  tip?: string;
  size?: number;
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  tip = 'Loading...',
  size = 36,
  fullScreen = false,
}) => {
  const antIcon = <LoadingOutlined style={{ fontSize: size }} spin />;

  const containerStyle: React.CSSProperties = fullScreen
    ? {
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 9999,
      }
    : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px',
        width: '100%',
      };

  return (
    <div style={containerStyle}>
      <Spin indicator={antIcon} tip={tip} />
    </div>
  );
};
