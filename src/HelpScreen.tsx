// src/HelpScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function HelpScreen() {
  const handleCall = () => {
    Linking.openURL('tel:+919922253469');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:hedakrishna1412@gmail.com');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Help & Support</Text>
      <View style={styles.contactContainer}>
        <TouchableOpacity style={styles.contactItem} onPress={handleCall}>
          <FontAwesome name="phone" size={24} color="green" />
          <Text style={styles.contactText}>Call Us: +91 9922254569</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactItem} onPress={handleEmail}>
          <FontAwesome name="envelope" size={24} color="blue" />
          <Text style={styles.contactText}>Email: hedakrishna1412@gmail.com</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contactContainer: {
    width: '100%',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 20,
  },
  contactText: {
    marginLeft: 10,
    fontSize: 18,
  },
});
