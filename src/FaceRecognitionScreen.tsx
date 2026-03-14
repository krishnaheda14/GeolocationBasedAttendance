import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, db } from '../app/firebaseConfig'; // Adjust the import based on your file structure
import { collection, addDoc } from 'firebase/firestore';

const FaceRecognition: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Save the image URI to state
    }
  };

  const uploadImage = async () => {
    if (!image) {
      Alert.alert('Please select an image first.');
      return;
    }
  
    setUploading(true);
    try {
      // Fetch the image and convert to blob
      const response = await fetch(image);
      const blob = await response.blob();
  
      // Use a simple file name for testing
      const storageRef = ref(storage, `test_image.jpg`);
  
      // Upload the file
      await uploadBytes(storageRef, blob);
  
      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);
  
      // Store in Firestore
      await addDoc(collection(db, 'images'), {
        url: downloadURL,
        name: 'test_image.jpg',
        createdAt: new Date(),
      });
  
      Alert.alert('Upload Successful', `Image uploaded and metadata saved!`);
    } catch (error) {
      console.error('Error uploading image:', JSON.stringify(error));
      //Alert.alert('Upload Error', error.message || 'An unknown error occurred');
    } finally {
      setUploading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Face Recognition</Text>
      <Button title="Select an Image" onPress={pickImage} />
      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="contain"
        />
      )}
      <Button
        title={uploading ? 'Uploading...' : 'Upload Image'}
        onPress={uploadImage}
        disabled={uploading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 300,
    marginTop: 20,
  },
});

export default FaceRecognition;
