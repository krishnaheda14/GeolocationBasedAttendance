import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig'; // Adjust the path accordingly
import LoginScreenWrapper from '../app/screens/LoginScreenWrapper'; // Adjust the path accordingly
import SignupScreen from '../app/screens/SignupScreen'; // Adjust the path accordingly
import TabNavigator from '../src/TabNavigator'; // Adjust the path accordingly
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Unmatched: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is already authenticated
    const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
      console.log('Authenticated User:', authenticatedUser); // Debugging
      setUser(authenticatedUser);
      setLoading(false); // Stop loading when authentication state is resolved
    });

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, []);

  if (loading) {
    // Show a loading spinner while checking the authentication state
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Debugging: Check user state before rendering screens
  console.log('User State:', user);

  // Define stack navigator based on authentication state
  return (
    <Stack.Navigator>
      {user === null ? (
        <>
          <Stack.Screen name="Login" component={LoginScreenWrapper} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      ) : (
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default Unmatched;
