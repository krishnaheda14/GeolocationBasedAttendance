import React, { useState } from 'react';
import LoginScreen from './LoginScreen'; // Adjust import path as needed

const LoginScreenWrapper: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [user, setUser] = useState<any>(null);

  return (
    <LoginScreen navigation={navigation} setUser={setUser} />
  );
};

export default LoginScreenWrapper;
