import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../app/firebaseConfig'; // Import Firebase auth
import * as Battery from 'expo-battery'; // Import Battery module

export default function SettingsScreen() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isBatterySaverEnabled, setIsBatterySaverEnabled] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState<number>(0);
  const [isLowPowerMode, setIsLowPowerMode] = useState<boolean>(false);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchBatteryStatus = async () => {
      const batteryLevel = await Battery.getBatteryLevelAsync();
      const isLowPowerMode = await Battery.isLowPowerModeEnabledAsync();
      setBatteryLevel(batteryLevel);
      setIsLowPowerMode(isLowPowerMode);
    };

    fetchBatteryStatus();

    const batteryLevelListener = Battery.addBatteryLevelListener(({ batteryLevel }) => {
      setBatteryLevel(batteryLevel);
    });

    const lowPowerModeListener = Battery.addLowPowerModeListener(({ isLowPowerMode }) => {
      setIsLowPowerMode(isLowPowerMode);
    });

    return () => {
      batteryLevelListener.remove();
      lowPowerModeListener.remove();
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme((prevState) => !prevState);
    Alert.alert(
      'Theme Changed',
      `You have switched to ${!isDarkTheme ? 'Dark' : 'Light'} Theme.`
    );
  };

  const toggleNotifications = () => {
    setIsNotificationsEnabled((prevState) => !prevState);
    Alert.alert(
      'Notifications',
      `Notifications have been ${isNotificationsEnabled ? 'disabled' : 'enabled'}.`
    );
  };

  const toggleBatterySaver = () => {
    setIsBatterySaverEnabled((prevState) => !prevState);
    Alert.alert(
      'Battery Saver Mode',
      `Battery Saver Mode has been ${isBatterySaverEnabled ? 'disabled' : 'enabled'}.`
    );
  };

  const clearCache = () => {
    Alert.alert('Clear Cache', 'Are you sure you want to clear the cache?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', onPress: () => console.log('Cache cleared') },
    ]);
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: async () => {
          try {
            await auth.signOut(); // Sign out the user
            console.log('User logged out');
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }], // Reset navigation stack to Login
            });
          } catch (error) {
            console.error('Error logging out: ', error);
          }
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, isDarkTheme && styles.darkContainer]}>
      <Text style={[styles.title, isDarkTheme && styles.darkText]}>Settings</Text>

      <View style={styles.settingRow}>
        <Text style={[styles.settingLabel, isDarkTheme && styles.darkText]}>Dark Theme</Text>
        <Switch
          onValueChange={toggleTheme}
          value={isDarkTheme}
        />
      </View>

      <View style={styles.settingRow}>
        <Text style={[styles.settingLabel, isDarkTheme && styles.darkText]}>Enable Notifications</Text>
        <Switch
          onValueChange={toggleNotifications}
          value={isNotificationsEnabled}
        />
      </View>

      

      <View style={styles.settingRow}>
        <Text style={[styles.settingLabel, isDarkTheme && styles.darkText]}>
          Battery Level: {Math.round(batteryLevel * 100)}%
        </Text>
        <Text style={[styles.settingLabel, isDarkTheme && styles.darkText]}>
          Low Power Mode: {isLowPowerMode ? 'Enabled' : 'Disabled'}
        </Text>
      </View>

      
      <Button title="Logout" color="#ff5c5c" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 18,
    color: '#000',
  },
});
