import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  WorkHours: undefined;
  FaceRecognition: undefined;
  Help: undefined;
  CheckInOut: undefined;
};

type HomeScreenProps = BottomTabScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Screen!</Text>
      <Button title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
      <Button title="Go to Work Hours" onPress={() => navigation.navigate('WorkHours')} />
      <Button title="Go to Face Recognition" onPress={() => navigation.navigate('FaceRecognition')} />
      <Button title="Go to Help" onPress={() => navigation.navigate('Help')} />
      <Button title="Go to Check In/Out" onPress={() => navigation.navigate('CheckInOut')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
