import React, { useState, useMemo } from 'react';
import { Input, Radio, Typography, Empty, Space, Tag, Button } from 'antd';
import { SearchOutlined, CheckOutlined } from '@ant-design/icons';
import * as AntdIcons from '@ant-design/icons';
import { DynamicIcon } from '../common/DynamicIcon';
import { AppModal } from '../common/AppModal';

const { Text } = Typography;

export interface IconItem {
  name: string;
  label: string;
  category: string;
}

const CATEGORIES = [
  'All',
  'General',
  'Tech & Cloud',
  'Business',
  'Security',
  'Communication',
  'Users & Team',
  'Content & Files',
  'Tools & Settings',
];

// Curated collection of open-source free icons from Ant Design
const OPEN_SOURCE_ICONS: IconItem[] = [
  // General & Web
  { name: 'HomeOutlined', label: 'Home', category: 'General' },
  { name: 'GlobalOutlined', label: 'Global', category: 'General' },
  { name: 'AppstoreOutlined', label: 'Appstore', category: 'General' },
  { name: 'CompassOutlined', label: 'Compass', category: 'General' },
  { name: 'RocketOutlined', label: 'Rocket', category: 'General' },
  { name: 'FireOutlined', label: 'Fire / Trending', category: 'General' },
  { name: 'CrownOutlined', label: 'Crown / VIP', category: 'General' },
  { name: 'StarOutlined', label: 'Star', category: 'General' },
  { name: 'HeartOutlined', label: 'Heart', category: 'General' },
  { name: 'BulbOutlined', label: 'Idea / Bulb', category: 'General' },
  { name: 'BellOutlined', label: 'Notification', category: 'General' },
  { name: 'TagOutlined', label: 'Tag', category: 'General' },
  { name: 'LinkOutlined', label: 'Link', category: 'General' },
  { name: 'FlagOutlined', label: 'Flag', category: 'General' },
  { name: 'EnvironmentOutlined', label: 'Location', category: 'General' },

  // Tech & Cloud
  { name: 'CloudServerOutlined', label: 'Cloud Server', category: 'Tech & Cloud' },
  { name: 'CloudOutlined', label: 'Cloud', category: 'Tech & Cloud' },
  { name: 'CodeOutlined', label: 'Code / Dev', category: 'Tech & Cloud' },
  { name: 'ThunderboltOutlined', label: 'Thunderbolt', category: 'Tech & Cloud' },
  { name: 'ApiOutlined', label: 'API / Webhook', category: 'Tech & Cloud' },
  { name: 'DatabaseOutlined', label: 'Database', category: 'Tech & Cloud' },
  { name: 'ClusterOutlined', label: 'Cluster / Node', category: 'Tech & Cloud' },
  { name: 'BranchesOutlined', label: 'Git Branches', category: 'Tech & Cloud' },
  { name: 'DeploymentUnitOutlined', label: 'Deployment', category: 'Tech & Cloud' },
  { name: 'DesktopOutlined', label: 'Desktop', category: 'Tech & Cloud' },
  { name: 'LaptopOutlined', label: 'Laptop', category: 'Tech & Cloud' },
  { name: 'MobileOutlined', label: 'Mobile Device', category: 'Tech & Cloud' },
  { name: 'WifiOutlined', label: 'Network / Wifi', category: 'Tech & Cloud' },
  { name: 'RobotOutlined', label: 'AI / Bot', category: 'Tech & Cloud' },
  { name: 'BugOutlined', label: 'Bug / QA', category: 'Tech & Cloud' },
  { name: 'ConsoleSqlOutlined', label: 'SQL / Query', category: 'Tech & Cloud' },
  { name: 'PartitionOutlined', label: 'Architecture', category: 'Tech & Cloud' },
  { name: 'GatewayOutlined', label: 'Gateway', category: 'Tech & Cloud' },

  // Business & Finance
  { name: 'DashboardOutlined', label: 'Dashboard', category: 'Business' },
  { name: 'BarChartOutlined', label: 'Bar Chart', category: 'Business' },
  { name: 'LineChartOutlined', label: 'Line Chart', category: 'Business' },
  { name: 'PieChartOutlined', label: 'Pie Chart', category: 'Business' },
  { name: 'FundOutlined', label: 'Analytics', category: 'Business' },
  { name: 'BankOutlined', label: 'Bank / Enterprise', category: 'Business' },
  { name: 'DollarOutlined', label: 'Finance / Dollar', category: 'Business' },
  { name: 'WalletOutlined', label: 'Wallet', category: 'Business' },
  { name: 'CreditCardOutlined', label: 'Billing / Card', category: 'Business' },
  { name: 'ShoppingCartOutlined', label: 'Cart / Store', category: 'Business' },
  { name: 'ShopOutlined', label: 'Marketplace', category: 'Business' },
  { name: 'TrophyOutlined', label: 'Awards / Trophy', category: 'Business' },
  { name: 'RiseOutlined', label: 'Growth / Rise', category: 'Business' },
  { name: 'ScheduleOutlined', label: 'Schedule / Plan', category: 'Business' },
  { name: 'AuditOutlined', label: 'Audit / Report', category: 'Business' },

  // Security & Governance
  { name: 'SafetyCertificateOutlined', label: 'Security Certificate', category: 'Security' },
  { name: 'SafetyOutlined', label: 'Safety / Protection', category: 'Security' },
  { name: 'ShieldOutlined', label: 'Shield / Firewall', category: 'Security' },
  { name: 'LockOutlined', label: 'Lock / Access', category: 'Security' },
  { name: 'UnlockOutlined', label: 'Open Access', category: 'Security' },
  { name: 'KeyOutlined', label: 'API Key / Secret', category: 'Security' },
  { name: 'VerifiedOutlined', label: 'Verified / Trust', category: 'Security' },
  { name: 'SecurityScanOutlined', label: 'Security Scan', category: 'Security' },
  { name: 'FileProtectOutlined', label: 'Encrypted File', category: 'Security' },

  // Communication & Social
  { name: 'PhoneOutlined', label: 'Phone / Contact', category: 'Communication' },
  { name: 'MailOutlined', label: 'Email / Newsletter', category: 'Communication' },
  { name: 'MessageOutlined', label: 'Message / Chat', category: 'Communication' },
  { name: 'CommentOutlined', label: 'Feedback / Review', category: 'Communication' },
  { name: 'CustomerServiceOutlined', label: 'Support / Helpdesk', category: 'Communication' },
  { name: 'NotificationOutlined', label: 'Alerts', category: 'Communication' },
  { name: 'SoundOutlined', label: 'Audio / Voice', category: 'Communication' },
  { name: 'VideoCameraOutlined', label: 'Video / Meeting', category: 'Communication' },
  { name: 'SendOutlined', label: 'Send / Dispatch', category: 'Communication' },

  // Users & Team
  { name: 'UserOutlined', label: 'Single User', category: 'Users & Team' },
  { name: 'TeamOutlined', label: 'Team / Group', category: 'Users & Team' },
  { name: 'UsergroupAddOutlined', label: 'Community', category: 'Users & Team' },
  { name: 'IdcardOutlined', label: 'Profile / ID Card', category: 'Users & Team' },
  { name: 'SmileOutlined', label: 'Customer Success', category: 'Users & Team' },
  { name: 'ContactsOutlined', label: 'Directory', category: 'Users & Team' },
  { name: 'UserSwitchOutlined', label: 'Roles / Switch', category: 'Users & Team' },

  // Content & Files
  { name: 'FileTextOutlined', label: 'Document / Docs', category: 'Content & Files' },
  { name: 'FolderOutlined', label: 'Folder / Storage', category: 'Content & Files' },
  { name: 'FolderOpenOutlined', label: 'Open Folder', category: 'Content & Files' },
  { name: 'BookOutlined', label: 'Knowledge Base', category: 'Content & Files' },
  { name: 'ReadOutlined', label: 'Learning / Guides', category: 'Content & Files' },
  { name: 'FilePdfOutlined', label: 'PDF Document', category: 'Content & Files' },
  { name: 'ProfileOutlined', label: 'Specifications', category: 'Content & Files' },
  { name: 'SnippetsOutlined', label: 'Snippets / Notes', category: 'Content & Files' },
  { name: 'ContainerOutlined', label: 'Repository', category: 'Content & Files' },

  // Tools & Settings
  { name: 'SettingOutlined', label: 'Settings', category: 'Tools & Settings' },
  { name: 'ToolOutlined', label: 'Tools', category: 'Tools & Settings' },
  { name: 'ControlOutlined', label: 'Controls', category: 'Tools & Settings' },
  { name: 'SlidersOutlined', label: 'Parameters', category: 'Tools & Settings' },
  { name: 'ExperimentOutlined', label: 'Lab / Beta', category: 'Tools & Settings' },
  { name: 'SyncOutlined', label: 'Sync / Refresh', category: 'Tools & Settings' },
  { name: 'CheckCircleOutlined', label: 'Success / Done', category: 'Tools & Settings' },
  { name: 'InfoCircleOutlined', label: 'Information', category: 'Tools & Settings' },
];

interface IconPickerModalProps {
  open: boolean;
  onCancel: () => void;
  onSelect: (iconName: string) => void;
  currentValue?: string;
}

export const IconPickerModal: React.FC<IconPickerModalProps> = ({
  open,
  onCancel,
  onSelect,
  currentValue = 'AppstoreOutlined',
}) => {
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedIcon, setSelectedIcon] = useState<string>(currentValue);

  // Sync with current value when opened
  React.useEffect(() => {
    if (open) {
      setSelectedIcon(currentValue || 'AppstoreOutlined');
      setSearch('');
      setSelectedCategory('All');
    }
  }, [open, currentValue]);

  // Filtered icons
  const filteredIcons = useMemo(() => {
    const q = search.trim().toLowerCase();

    // Base list matching category
    let list = OPEN_SOURCE_ICONS.filter((item) => {
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.label.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });

    // If search term was provided, also check if it matches ANY valid Ant Design icon directly!
    if (q) {
      const iconsMap = AntdIcons as Record<string, any>;
      // Check if user typed direct icon name like 'GiftOutlined'
      const matchedKeys = Object.keys(iconsMap).filter((k) => {
        return (
          k.toLowerCase().includes(q) &&
          (k.endsWith('Outlined') || k.endsWith('Filled')) &&
          typeof iconsMap[k] === 'object'
        );
      });

      // Merge and deduplicate
      const existingNames = new Set(list.map((i) => i.name));
      for (const k of matchedKeys.slice(0, 30)) {
        if (!existingNames.has(k)) {
          list.push({
            name: k,
            label: k.replace(/(Outlined|Filled|TwoTone)$/, ''),
            category: 'Search Result',
          });
          existingNames.add(k);
        }
      }
    }

    return list;
  }, [search, selectedCategory]);

  const handleConfirm = () => {
    onSelect(selectedIcon);
    onCancel();
  };

  return (
    <AppModal
      open={open}
      onCancel={onCancel}
      title="Choose Open-Source Icon"
      subtitle="Search and select from free open-source Ant Design icons for your menu navigation"
      tag={
        <Tag color="blue" style={{ fontSize: 11, fontWeight: 600 }}>
          Ant Design Free Icons
        </Tag>
      }
      icon={<DynamicIcon icon={selectedIcon} />}
      width={760}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="confirm"
          type="primary"
          icon={<CheckOutlined />}
          onClick={handleConfirm}
          style={{ background: 'linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)', border: 'none' }}
        >
          Use Icon: {selectedIcon}
        </Button>,
      ]}
      destroyOnClose
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Search Bar */}
        <Input
          prefix={<SearchOutlined style={{ color: '#94a3b8' }} />}
          placeholder="Search icons by name or concept (e.g. phone, cloud, chart, user, shield, code)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          allowClear
          size="middle"
        />

        {/* Category Pills */}
        <div style={{ overflowX: 'auto', paddingBottom: 4 }}>
          <Radio.Group
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            size="small"
            buttonStyle="solid"
          >
            {CATEGORIES.map((cat) => (
              <Radio.Button key={cat} value={cat}>
                {cat}
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>

        {/* Icon Grid */}
        <div
          style={{
            maxHeight: 360,
            overflowY: 'auto',
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            padding: 12,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
            gap: 10,
            backgroundColor: '#f8fafc',
          }}
        >
          {filteredIcons.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', padding: '30px 0' }}>
              <Empty description="No matching icons found. Try another search term." />
            </div>
          ) : (
            filteredIcons.map((item) => {
              const isSelected = selectedIcon === item.name;
              return (
                <div
                  key={item.name}
                  onClick={() => setSelectedIcon(item.name)}
                  onDoubleClick={() => {
                    setSelectedIcon(item.name);
                    onSelect(item.name);
                    onCancel();
                  }}
                  title={`${item.label} (${item.name})`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '10px 6px',
                    borderRadius: 8,
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                    border: isSelected ? '2px solid #00b4d8' : '1px solid #e2e8f0',
                    backgroundColor: isSelected ? '#e0f2fe' : '#ffffff',
                    boxShadow: isSelected ? '0 2px 8px rgba(0, 180, 216, 0.25)' : 'none',
                    transform: isSelected ? 'scale(1.03)' : 'scale(1)',
                  }}
                >
                  <div
                    style={{
                      fontSize: 22,
                      color: isSelected ? '#0077b6' : '#334155',
                      marginBottom: 4,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 28,
                    }}
                  >
                    <DynamicIcon icon={item.name} />
                  </div>
                  <Text
                    ellipsis
                    style={{
                      fontSize: 11,
                      fontWeight: isSelected ? 600 : 400,
                      color: isSelected ? '#0077b6' : '#64748b',
                      maxWidth: '100%',
                      textAlign: 'center',
                    }}
                  >
                    {item.label}
                  </Text>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Icon Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: 6,
          }}
        >
          <Space>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Selected Icon:
            </Text>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                backgroundColor: '#0077b6',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
              }}
            >
              <DynamicIcon icon={selectedIcon} />
            </div>
            <code style={{ fontSize: 12, fontWeight: 600, color: '#0077b6' }}>{selectedIcon}</code>
          </Space>
          <Text type="secondary" style={{ fontSize: 11 }}>
            Double-click an icon to select & close
          </Text>
        </div>
      </div>
    </AppModal>
  );
};

export default IconPickerModal;
