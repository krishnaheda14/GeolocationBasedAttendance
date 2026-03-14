import { initializeApp } from 'firebase/app';
import { initializeAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// @ts-ignore
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCd20AATyvJxxiQOoTMGvZIgmdwjsZ0IX8",
  authDomain: "geolocationapp-dca3e.firebaseapp.com",
  projectId: "geolocationapp-dca3e",
  storageBucket: "geolocationapp-dca3e.appspot.com",
  messagingSenderId: "277103136944",
  appId: "1:277103136944:android:d85c497d8a3bf24e24ab75",
  measurementId: "YOUR_MEASUREMENT_ID"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getFirestore(app);

export { auth, db };
export {storage};