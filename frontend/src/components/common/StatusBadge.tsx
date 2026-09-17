import React from 'react';
import { Tag } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

interface StatusBadgeProps {
  isActive: boolean;
  activeText?: string;
  inactiveText?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  isActive,
  activeText = 'Active',
  inactiveText = 'Inactive',
}) => {
  return isActive ? (
    <Tag icon={<CheckCircleOutlined />} color="success">
      {activeText}
    </Tag>
  ) : (
    <Tag icon={<CloseCircleOutlined />} color="error">
      {inactiveText}
    </Tag>
  );
};
