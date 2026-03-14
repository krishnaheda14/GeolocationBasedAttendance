// app.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import LoginScreenWrapper from '../app/screens/LoginScreenWrapper';
import SignupScreen from '../app/screens/SignupScreen';
import TabNavigator from './TabNavigator';
import { RootStackParamList } from './types'; // Import route types

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreenWrapper} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
