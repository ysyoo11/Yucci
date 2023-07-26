import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

import { ENV } from '../utils/env';

const firebaseConfig = {
  apiKey: ENV.REACT_APP_FIREBASE_API_KEY,
  authDomain: `${ENV.REACT_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: ENV.REACT_APP_FIREBASE_DB_URL,
  projectId: ENV.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: ENV.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: ENV.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: ENV.REACT_APP_FIREBASE_APP_ID,
  measurementId: ENV.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const db = getFirestore(firebaseApp);

export default firebaseApp;
