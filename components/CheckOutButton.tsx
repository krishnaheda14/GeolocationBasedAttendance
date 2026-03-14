import React from 'react';
import { Button, Alert } from 'react-native';
import * as Location from 'expo-location';

const CheckOutButton: React.FC = () => {
  const handleCheckOut = async () => {
    // Request location permission
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location access is required for check-out.');
      return;
    }

    // Get the current location
    const location = await Location.getCurrentPositionAsync({});
    if (location) {
      const { latitude, longitude } = location.coords;
      console.log(`Check-Out at Latitude: ${latitude}, Longitude: ${longitude}`);
      Alert.alert('Check-Out Success', `Location: ${latitude}, ${longitude}`);
    } else {
      Alert.alert('Error', 'Could not retrieve location');
    }
  };

  return <Button title="Check Out" onPress={handleCheckOut} />;
};

export { CheckOutButton };
