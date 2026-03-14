import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, SafeAreaView, ScrollView } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const SignupScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add additional user data to Firestore
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        email: user.email,
        // Add other user details if needed
      });

      Alert.alert('Signup successful');
      navigation.navigate('Login'); // Navigate to Login screen after successful signup
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Signup failed', error.message);
      } else {
        Alert.alert('Signup failed', 'An unknown error occurred');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Sign Up</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <Button title="Sign Up" onPress={handleSignup} color="#007bff" />
        
        <View style={styles.loginContainer}>
          <Button
            title="Already have an account? Login"
            onPress={() => navigation.navigate('Login')}
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
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    paddingVertical: 10,
    fontSize: 16,
  },
  loginContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default SignupScreen;
