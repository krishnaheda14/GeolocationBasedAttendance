import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../app/firebaseConfig'; // Adjust the path accordingly
import LoginScreenWrapper from '../app/screens/LoginScreenWrapper'; // Adjust the path accordingly
import TabNavigator from '../src/TabNavigator'; // Adjust the path accordingly

const Stack = createStackNavigator();

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
      setUser(authenticatedUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    //return <LoadingScreen />; // Define a loading screen component if needed
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreenWrapper} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
