import React from 'react';
import * as AntdIcons from '@ant-design/icons';

interface DynamicIconProps {
  icon?: string;
  className?: string;
  style?: React.CSSProperties;
  fallback?: React.ReactNode;
}

/**
 * Dynamically resolves and renders any open-source Ant Design icon by its string name,
 * completely avoiding hardcoded icon mappings in navigation and bottom bars.
 */
export const DynamicIcon: React.FC<DynamicIconProps> = ({
  icon,
  className,
  style,
  fallback,
}) => {
  if (!icon || typeof icon !== 'string') {
    return <>{fallback || <AntdIcons.GlobalOutlined className={className} style={style} />}</>;
  }

  const trimmed = icon.trim();
  const iconsMap = AntdIcons as Record<string, any>;

  // 1. Direct match (e.g. 'RocketOutlined')
  let IconComponent = iconsMap[trimmed];

  // 2. Try adding 'Outlined' suffix if user saved without suffix (e.g. 'Rocket' -> 'RocketOutlined')
  if (!IconComponent) {
    const outlinedName = `${trimmed}Outlined`;
    if (iconsMap[outlinedName]) {
      IconComponent = iconsMap[outlinedName];
    }
  }

  // 3. Fallback to Capitalized with Outlined (e.g. 'rocket' -> 'RocketOutlined')
  if (!IconComponent) {
    const capitalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
    if (iconsMap[`${capitalized}Outlined`]) {
      IconComponent = iconsMap[`${capitalized}Outlined`];
    } else if (iconsMap[capitalized]) {
      IconComponent = iconsMap[capitalized];
    }
  }

  if (IconComponent && (typeof IconComponent === 'function' || typeof IconComponent === 'object')) {
    const Component = IconComponent;
    return <Component className={className} style={style} />;
  }

  return <>{fallback || <AntdIcons.GlobalOutlined className={className} style={style} />}</>;
};

export default DynamicIcon;
