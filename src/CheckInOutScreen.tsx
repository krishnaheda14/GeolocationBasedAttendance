import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as Location from 'expo-location';
import { doc, setDoc, getDoc, collection, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../app/firebaseConfig';

const REFERENCE_LOCATION = { latitude: 18.4636, longitude: 73.8682 };
const MAX_DISTANCE_METERS = 200;

type LocationData = {
  latitude: number;
  longitude: number;
  timestamp: any;
};

const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371e3;
  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lon2 - lon1);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

const CheckInOutScreen = () => {
  const [checkInLocation, setCheckInLocation] = useState<LocationData | null>(null);
  const [checkOutLocation, setCheckOutLocation] = useState<LocationData | null>(null);
  const [checkInCount, setCheckInCount] = useState<number>(0);

  const handleCheckIn = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    const distance = getDistance(latitude, longitude, REFERENCE_LOCATION.latitude, REFERENCE_LOCATION.longitude);

    if (distance <= MAX_DISTANCE_METERS) {
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, 'geolocation', user.uid), {
          userId: user.uid,
          checkInLocation: {
            latitude,
            longitude,
            timestamp: serverTimestamp(),
          },
        }, { merge: true });

        setCheckInLocation({ latitude, longitude, timestamp: new Date() });
        Alert.alert('Check-In Successful');
        updateCheckInCount(); // Update the check-in count after a successful check-in
      } else {
        Alert.alert('User not logged in');
      }
    } else {
      Alert.alert('You are not within 200 meters of the specified location');
    }
  };

  const handleCheckOut = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    const distance = getDistance(latitude, longitude, REFERENCE_LOCATION.latitude, REFERENCE_LOCATION.longitude);

    if (distance <= MAX_DISTANCE_METERS) {
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, 'geolocation', user.uid), {
          checkOutLocation: {
            latitude,
            longitude,
            timestamp: serverTimestamp(),
          },
        }, { merge: true });

        setCheckOutLocation({ latitude, longitude, timestamp: new Date() });
        Alert.alert('Check-Out Successful');
        updateCheckInCount(); 
      } else {
        Alert.alert('User not logged in');
      }
    } else {
      Alert.alert('You are not within 200 meters of the specified location');
    }
  };

  const fetchLocations = async () => {
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, 'geolocation', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.checkInLocation) {
          setCheckInLocation(data.checkInLocation);
        }
        if (data.checkOutLocation) {
          setCheckOutLocation(data.checkOutLocation);
        }

        if (data.checkInLocation && data.checkOutLocation) {
          const checkInTime = data.checkInLocation.timestamp.toDate();
          const checkOutTime = data.checkOutLocation.timestamp.toDate();
          const totalTime = (checkOutTime.getTime() - checkInTime.getTime()) / 1000 / 60 / 60; // in hours

          await setDoc(doc(db, 'geolocation', user.uid), {
            totalTime,
          }, { merge: true });

          Alert.alert(`Total Time: ${totalTime.toFixed(2)} hours`);
        }
      }
    }
  };

  const getCurrentCheckInCount = async () => {
    const q = query(collection(db, 'geolocation'), where('checkOutLocation', '==', null));
    const querySnapshot = await getDocs(q);
    setCheckInCount(querySnapshot.size);
  };

  const updateCheckInCount = async () => {
    await getCurrentCheckInCount();
  };

  useEffect(() => {
    updateCheckInCount();
  }, []);

  return (
    <View>
      <Button title="Check In" onPress={handleCheckIn} />
      <Button title="Check Out" onPress={handleCheckOut} />

      <View style={{ marginVertical: 20 }}>
        <Text>Check-In Location: {checkInLocation ? `(${checkInLocation.latitude}, ${checkInLocation.longitude})` : 'Not checked in yet'}</Text>
        <Text>Check-Out Location: {checkOutLocation ? `(${checkOutLocation.latitude}, ${checkOutLocation.longitude})` : 'Not checked out yet'}</Text>
      </View>

      <View style={{ marginVertical: 20 }}>
        
      </View>
    </View>
  );
};

export default CheckInOutScreen;
