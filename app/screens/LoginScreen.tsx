import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Adjust the import path as needed

interface LoginScreenProps {
  navigation: any;
  setUser: (user: any) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser(user);
      console.log('Login successful');
      navigation.navigate('TabNavigator'); // Ensure TabNavigator is a valid route
    } catch (error: any) {
      console.error(error);
      Alert.alert('Login Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Login</Text>
        
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Enter your email"
        />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Enter your password"
        />

        <Button title="Login" onPress={handleLogin} color="#007bff" />

        <View style={styles.signupContainer}>
          <Button
            title="Don't have an account? Sign Up"
            onPress={() => navigation.navigate('Signup')}
            color="#6c757d"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    paddingVertical: 10,
    fontSize: 16,
  },
  signupContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default LoginScreen;
