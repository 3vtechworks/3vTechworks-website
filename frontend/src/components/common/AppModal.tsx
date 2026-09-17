import React from 'react';
import { Modal, Button, Space } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

export interface AppModalProps {
  open: boolean;
  onCancel: () => void;
  onOk?: () => void;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  tag?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode | null;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  confirmLoading?: boolean;
  okButtonProps?: any;
  cancelButtonProps?: any;
  width?: number | string;
  destroyOnClose?: boolean;
  centered?: boolean;
  className?: string;
  maskClosable?: boolean;
  closable?: boolean;
  style?: React.CSSProperties;
}

/**
 * Reusable, unified modern AppModal component for all modals across the application.
 * Ensures consistent design, responsive sizing, elegant headers with icons/tags,
 * and unified footers.
 */
export const AppModal: React.FC<AppModalProps> = ({
  open,
  onCancel,
  onOk,
  title,
  subtitle,
  icon,
  tag,
  children,
  footer,
  okText = 'Confirm',
  cancelText = 'Cancel',
  confirmLoading = false,
  okButtonProps,
  cancelButtonProps,
  width = 580,
  destroyOnClose = true,
  centered = true,
  className = '',
  maskClosable = false,
  closable = true,
  style,
}) => {
  // Custom header rendering with icon, title, subtitle, and tag
  const customHeader = (
    <div style={{ paddingBottom: subtitle ? 4 : 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingRight: 24 }}>
        <Space size="middle" style={{ alignItems: 'center' }}>
          {icon && (
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: 'linear-gradient(135deg, rgba(0, 180, 216, 0.15) 0%, rgba(0, 119, 182, 0.2) 100%)',
                color: '#0077b6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                flexShrink: 0,
              }}
            >
              {icon}
            </div>
          )}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: '#0f172a',
                  letterSpacing: '-0.01em',
                }}
              >
                {title}
              </span>
              {tag}
            </div>
          </div>
        </Space>
      </div>

      {subtitle && (
        <div style={{ marginTop: 6, fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>
          {subtitle}
        </div>
      )}
    </div>
  );

  // Default footer with modern styled buttons
  const defaultFooter = (
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 10 }}>
      <Button onClick={onCancel} {...cancelButtonProps}>
        {cancelText}
      </Button>
      {onOk && (
        <Button
          type="primary"
          onClick={onOk}
          loading={confirmLoading}
          style={{
            background: 'linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)',
            border: 'none',
            boxShadow: '0 2px 8px rgba(0, 180, 216, 0.3)',
            ...okButtonProps?.style,
          }}
          {...okButtonProps}
        >
          {okText}
        </Button>
      )}
    </div>
  );

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title={customHeader}
      footer={footer !== undefined ? footer : defaultFooter}
      width={width}
      destroyOnClose={destroyOnClose}
      centered={centered}
      maskClosable={maskClosable}
      closable={closable}
      closeIcon={<CloseOutlined style={{ fontSize: 14, color: '#64748b' }} />}
      className={`app-custom-modal ${className}`}
      style={{
        maxWidth: '94vw',
        ...style,
      }}
      styles={{
        content: {
          borderRadius: 16,
          padding: '22px 24px',
          boxShadow: '0 20px 45px rgba(15, 23, 42, 0.18)',
        },
        header: {
          marginBottom: 16,
          borderBottom: subtitle ? '1px solid #f1f5f9' : 'none',
          paddingBottom: subtitle ? 12 : 0,
        },
      }}
    >
      {children}
    </Modal>
  );
};

export default AppModal;
