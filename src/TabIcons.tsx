import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface TabIconProps {
  name: string;
  color: string;
  size: number;
}

const TabIcon: React.FC<TabIconProps> = ({ name, color, size }) => {
  let iconName: keyof typeof Ionicons.glyphMap;

  switch (name) {
    case 'home':
      iconName = 'home-outline';
      break;
    case 'settings':
      iconName = 'settings-outline';
      break;
    case 'work-hours':
      iconName = 'time-outline'; // Changed to better fit the work hours context
      break;
    case 'history':
      iconName = 'time'; // Changed to a more suitable icon for history
      break;
    case 'help':
      iconName = 'help-circle-outline';
      break;
    case 'check-in-out':
      iconName = 'log-in'; // Changed to a more suitable icon for check-in/check-out
      break;
    case 'face-recognition':
      iconName = 'camera'; // Changed to a more suitable icon for face recognition
      break;
    default:
      iconName = 'alert-circle-outline'; // Fallback icon for unknown cases
      break;
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

export default TabIcon;
