import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import WorkHoursScreen from './WorkHoursScreen';
import HelpScreen from './HelpScreen';
import CheckInOutScreen from './CheckInOutScreen';
import TabIcon from './TabIcons'; // Importing the TabIcon component
import FaceRecognitionScreen from './FaceRecognitionScreen';

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => (
          <TabIcon name={route.name.toLowerCase()} color={color} size={size} />
        ),
      })}
      
    >
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="WorkHours" component={WorkHoursScreen} />
      <Tab.Screen name="FaceRecognition" component={FaceRecognitionScreen} />
      <Tab.Screen name="Help" component={HelpScreen} />
      <Tab.Screen name="CheckInOut" component={CheckInOutScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
