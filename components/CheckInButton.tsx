import React from 'react';
import { Button, Alert } from 'react-native';
import * as Location from 'expo-location';

const CheckInButton: React.FC = () => {
  const handleCheckIn = async () => {
    // Request location permission
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location access is required for check-in.');
      return;
    }

    // Get the current location
    const location = await Location.getCurrentPositionAsync({});
    if (location) {
      const { latitude, longitude } = location.coords;
      console.log(`Check-In at Latitude: ${latitude}, Longitude: ${longitude}`);
      Alert.alert('Check-In Success', `Location: ${latitude}, ${longitude}`);
    } else {
      Alert.alert('Error', 'Could not retrieve location');
    }
  };

  return <Button
