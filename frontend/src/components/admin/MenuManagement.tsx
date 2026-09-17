import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Form,
  Input,
  InputNumber,
  Switch,
  Tag,
  Popconfirm,
  message,
  Space,
  Typography,
  Radio,
  Tooltip,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  AppstoreOutlined,
  SafetyCertificateOutlined,
  GlobalOutlined,
  CodeOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { menuApi, MenuItem, CreateMenuData } from '../../api/menu.api';
import { DynamicIcon } from '../common/DynamicIcon';
import { IconPickerModal } from './IconPickerModal';
import { AppModal } from '../common/AppModal';

const { Text } = Typography;

export const MenuManagement: React.FC = () => {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [iconPickerOpen, setIconPickerOpen] = useState<boolean>(false);
  const [editingMenu, setEditingMenu] = useState<MenuItem | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [filterRole, setFilterRole] = useState<'all' | 'admin' | 'user'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [form] = Form.useForm();
  const watchedIcon = Form.useWatch('icon', form);

  const fetchMenus = async (showFeedback = false) => {
    setLoading(true);
    try {
      const response = await menuApi.getMenus();
      if (response.data?.items) {
        setMenus(response.data.items);
      }
      if (showFeedback && response?.message) {
        message.success(response.message);
      }
    } catch (err: any) {
      if (err?.message) {
        message.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus(false);
  }, []);

  // Calculate next menu ID automatically (e.g. if MENU0001 exists, return MENU0002)
  const calculateNextMenuId = (menuList: MenuItem[]) => {
    let maxNum = 0;
    for (const m of menuList) {
      const match = m.menuId?.match(/^MENU(\d+)$/i);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxNum) {
          maxNum = num;
        }
      }
    }
    const nextNum = maxNum + 1;
    return `MENU${String(nextNum).padStart(4, '0')}`;
  };

  // Automatically populate form values whenever the modal opens for editing or creating
  useEffect(() => {
    if (modalOpen) {
      if (editingMenu) {
        form.setFieldsValue({
          menuId: editingMenu.menuId,
          menuName: editingMenu.menuName,
          role: editingMenu.role,
          path: editingMenu.path || '',
          icon: editingMenu.icon || 'AppstoreOutlined',
          order: editingMenu.order ?? 0,
          isActive: editingMenu.isActive ?? true,
        });
      } else {
        const nextId = calculateNextMenuId(menus);
        form.setFieldsValue({
          menuId: nextId,
          menuName: '',
          role: 'admin',
          order: 0,
          isActive: true,
          path: '',
          icon: 'AppstoreOutlined',
        });
        menuApi
          .getNextMenuId()
          .then((res) => {
            if (res.data?.nextMenuId) {
              form.setFieldValue('menuId', res.data.nextMenuId);
            }
          })
          .catch(() => {});
      }
    }
  }, [modalOpen, editingMenu]);

  const handleOpenCreate = () => {
    setEditingMenu(null);
    form.resetFields();
    setModalOpen(true);
  };

  const handleOpenEdit = (record: MenuItem) => {
    setEditingMenu(record);
    setModalOpen(true);
    // Explicitly set fields immediately as well
    form.setFieldsValue({
      menuId: record.menuId,
      menuName: record.menuName,
      role: record.role,
      path: record.path || '',
      icon: record.icon || 'AppstoreOutlined',
      order: record.order ?? 0,
      isActive: record.isActive ?? true,
    });
  };

  const handleCancelModal = () => {
    setModalOpen(false);
    setEditingMenu(null);
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);

      // Clean and normalize path: /admin/pathname for admin, /pathname for user
      let cleanPath = (values.path || values.menuName || '')
        .trim()
        .replace(/[^a-zA-Z0-9-_\/#:]+/g, '-');

      if (values.role === 'admin') {
        const slug = cleanPath.replace(/^\/admin\//, '').replace(/^\//, '');
        values.path = `/admin/${slug || 'module'}`;
      } else {
        if (!cleanPath.startsWith('#') && !cleanPath.startsWith('http')) {
          const slug = cleanPath.replace(/^\//, '');
          values.path = `/${slug || 'module'}`;
        } else {
          values.path = cleanPath;
        }
      }

      if (editingMenu) {
        // Update existing menu
        const response = await menuApi.updateMenu(editingMenu._id, values);
        if (response?.message) {
          message.success(response.message);
        }
      } else {
        // Create new menu
        const response = await menuApi.createMenu(values as CreateMenuData);
        if (response?.message) {
          message.success(response.message);
        }
      }

      setModalOpen(false);
      form.resetFields();
      await fetchMenus(false);

      // Broadcast global event so sidebar and landing navbar update immediately
      window.dispatchEvent(new CustomEvent('menu-updated'));
    } catch (err: any) {
      if (err?.message) {
        message.error(err.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (record: MenuItem) => {
    try {
      const response = await menuApi.deleteMenu(record._id);
      if (response?.message) {
        message.success(response.message);
      }
      setMenus((prev) => prev.filter((item) => item._id !== record._id));
      window.dispatchEvent(new CustomEvent('menu-updated'));
    } catch (err: any) {
      if (err?.message) {
        message.error(err.message);
      }
    }
  };

  const handleToggleStatus = async (record: MenuItem, checked: boolean) => {
    try {
      const response = await menuApi.updateMenu(record._id, { isActive: checked });
      if (response?.message) {
        message.success(response.message);
      }
      setMenus((prev) =>
        prev.map((item) => (item._id === record._id ? { ...item, isActive: checked } : item))
      );
      window.dispatchEvent(new CustomEvent('menu-updated'));
    } catch (err: any) {
      if (err?.message) {
        message.error(err.message);
      }
    }
  };

  // Filter menus based on selected role and search query
  const filteredMenus = menus.filter((item) => {
    const matchesRole = filterRole === 'all' ? true : item.role === filterRole;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.menuName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.menuId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const columns = [
    {
      title: 'Menu Name',
      key: 'menuName',
      render: (_: any, record: MenuItem) => (
        <div>
          <Text strong style={{ fontSize: 13, color: '#0f172a' }}>
            {record.menuName}
          </Text>
          <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>
            <CodeOutlined style={{ marginRight: 4 }} />
            <code>{record.menuId}</code>
          </div>
        </div>
      ),
    },
    {
      title: 'Icon',
      dataIndex: 'icon',
      key: 'icon',
      width: 70,
      align: 'center' as const,
      render: (icon: string) => (
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 6,
            backgroundColor: '#f1f5f9',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            color: '#0284c7',
          }}
          title={icon || 'AppstoreOutlined'}
        >
          <DynamicIcon icon={icon} />
        </div>
      ),
    },
    {
      title: 'Role / Target',
      dataIndex: 'role',
      key: 'role',
      width: 170,
      render: (role: string) => {
        if (role === 'admin') {
          return (
            <Tag color="purple" icon={<SafetyCertificateOutlined />} style={{ fontWeight: 600 }}>
              Admin Dashboard
            </Tag>
          );
        }
        return (
          <Tag color="cyan" icon={<GlobalOutlined />} style={{ fontWeight: 600 }}>
            Public Website
          </Tag>
        );
      },
    },
    {
      title: 'URL Path',
      dataIndex: 'path',
      key: 'path',
      width: 190,
      render: (path: string, record: MenuItem) => {
        const displayPath =
          path ||
          (record.role === 'admin'
            ? `/admin/${record.menuName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
            : `/${record.menuName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`);
        return <code style={{ fontSize: 12, color: '#0284c7' }}>{displayPath}</code>;
      },
    },
    {
      title: 'Order',
      dataIndex: 'order',
      key: 'order',
      width: 80,
      align: 'center' as const,
      render: (order: number) => <Tag>{order ?? 0}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      width: 110,
      render: (isActive: boolean, record: MenuItem) => (
        <Switch
          checked={isActive}
          onChange={(checked) => handleToggleStatus(record, checked)}
          checkedChildren="Active"
          unCheckedChildren="Off"
          size="small"
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 130,
      align: 'center' as const,
      render: (_: any, record: MenuItem) => (
        <Space size="small">
          <Tooltip title="Edit Menu">
            <Button
              type="text"
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleOpenEdit(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Delete this menu?"
            description={`Are you sure you want to remove menu '${record.menuName}'?`}
            onConfirm={() => handleDelete(record)}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Delete Menu">
              <Button type="text" danger icon={<DeleteOutlined />} size="small" />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      id="menu-management-card"
      bordered={false}
      className="dashboard-main-card"
      style={{ marginTop: 24 }}
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <AppstoreOutlined style={{ color: '#00b4d8', fontSize: 18 }} />
          <div>
            <span style={{ fontSize: 16, fontWeight: 700 }}>Menu & Navigation Manager</span>
            <div style={{ fontSize: 12, color: '#64748b', fontWeight: 400 }}>
              Create dynamic menus for Admin Dashboard (role: admin) or Public Website Navbar (role: user)
            </div>
          </div>
        </div>
      }
      extra={
        <Space wrap>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => fetchMenus(true)}
            loading={loading}
          >
            Refresh
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleOpenCreate}
            style={{
              background: 'linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)',
              borderColor: '#0077b6',
            }}
          >
            Create Menu
          </Button>
        </Space>
      }
    >
      {/* Search & Filter Toolbar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <Radio.Group
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          buttonStyle="solid"
          size="middle"
        >
          <Radio.Button value="all">All Menus ({menus.length})</Radio.Button>
          <Radio.Button value="admin">
            Admin Dashboard ({menus.filter((m) => m.role === 'admin').length})
          </Radio.Button>
          <Radio.Button value="user">
            Landing Page ({menus.filter((m) => m.role === 'user').length})
          </Radio.Button>
        </Radio.Group>

        <Input.Search
          placeholder="Search by name or menuId..."
          allowClear
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ maxWidth: 280 }}
        />
      </div>

      <div className="dashboard-table-wrapper">
        <Table
          columns={columns}
          dataSource={filteredMenus}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 8, responsive: true }}
          size="middle"
          scroll={{ x: 720 }}
        />
      </div>

      {/* Create / Edit Modal */}
      <AppModal
        title={editingMenu ? 'Edit Menu' : 'Create New Menu'}
        subtitle="Configure menu properties. Menus with role: admin appear in the Admin Dashboard; menus with role: user appear on the Landing Page Navbar."
        icon={editingMenu ? <EditOutlined /> : <PlusOutlined />}
        open={modalOpen}
        onCancel={handleCancelModal}
        onOk={handleSubmit}
        confirmLoading={submitting}
        okText={editingMenu ? 'Save Changes' : 'Create Menu'}
        destroyOnClose
        width={580}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label={
              <Space>
                <span>Menu ID</span>
                <Tag color="cyan" style={{ fontSize: 11, fontWeight: 600 }}>
                  Auto Generated
                </Tag>
              </Space>
            }
            name="menuId"
            extra={
              <span style={{ fontSize: 12, color: '#64748b' }}>
                🔒 Automatically generated system ID (e.g. <strong>MENU0001</strong>, <strong>MENU0002</strong>). User input disabled.
              </span>
            }
          >
            <Input
              disabled
              prefix={<LockOutlined style={{ color: '#94a3b8' }} />}
              style={{
                backgroundColor: '#f8fafc',
                color: '#0f172a',
                fontWeight: 700,
                letterSpacing: '0.04em',
              }}
            />
          </Form.Item>

          <Form.Item
            label="Menu Display Name"
            name="menuName"
            rules={[{ required: true, message: 'Menu display name is required' }]}
          >
            <Input placeholder="e.g. Cloud Monitoring, Careers, Solutions" />
          </Form.Item>

          <Form.Item
            label="Target Audience / Role"
            name="role"
            rules={[{ required: true, message: 'Please select a role' }]}
          >
            <Radio.Group style={{ width: '100%' }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Radio value="admin" style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 6, width: '100%' }}>
                  <Space>
                    <SafetyCertificateOutlined style={{ color: '#7c3aed' }} />
                    <div>
                      <Text strong>Admin Dashboard</Text>
                      <div style={{ fontSize: 12, color: '#64748b' }}>
                        Shows in Admin Dashboard sidebar below Dashboard
                      </div>
                    </div>
                  </Space>
                </Radio>
                <Radio value="user" style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 6, width: '100%' }}>
                  <Space>
                    <GlobalOutlined style={{ color: '#00b4d8' }} />
                    <div>
                      <Text strong>Public Website (User)</Text>
                      <div style={{ fontSize: 12, color: '#64748b' }}>
                        Shows in Public Landing Page Navbar
                      </div>
                    </div>
                  </Space>
                </Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Form.Item
              label="Route / Anchor Path"
              name="path"
              tooltip="Use #section-id for landing anchors (e.g. #solutions, #contact), or an admin path like /admin/reports"
            >
              <Input placeholder="e.g. #solutions or /admin/reports" />
            </Form.Item>

            <Form.Item
              label="Menu Icon"
              name="icon"
              tooltip="Select from free open-source icons or input an icon name"
            >
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div
                  onClick={() => setIconPickerOpen(true)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '5px 12px',
                    border: '1px solid #d9d9d9',
                    borderRadius: 6,
                    backgroundColor: '#f8fafc',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  title="Click to browse open-source icons"
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      backgroundColor: '#e0f2fe',
                      color: '#0284c7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 16,
                    }}
                  >
                    <DynamicIcon icon={watchedIcon || 'AppstoreOutlined'} />
                  </div>
                  <Text strong style={{ fontSize: 13, color: '#0f172a' }}>
                    {watchedIcon || 'AppstoreOutlined'}
                  </Text>
                </div>
                <Button
                  type="primary"
                  ghost
                  onClick={() => setIconPickerOpen(true)}
                  style={{ borderColor: '#0284c7', color: '#0284c7' }}
                >
                  Browse Icons
                </Button>
              </div>
            </Form.Item>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Form.Item label="Display Order" name="order">
              <InputNumber min={0} max={999} style={{ width: '100%' }} placeholder="0" />
            </Form.Item>

            <Form.Item label="Active Status" name="isActive" valuePropName="checked">
              <Switch checkedChildren="Active" unCheckedChildren="Disabled" />
            </Form.Item>
          </div>
        </Form>
      </AppModal>

      {/* Open-Source Icon Picker Modal */}
      <IconPickerModal
        open={iconPickerOpen}
        onCancel={() => setIconPickerOpen(false)}
        currentValue={watchedIcon || 'AppstoreOutlined'}
        onSelect={(selectedIconName) => {
          form.setFieldValue('icon', selectedIconName);
        }}
      />
    </Card>
  );
};

export default MenuManagement;
