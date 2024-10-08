import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from "@env";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,

  authDomain: FIREBASE_AUTH_DOMAIN,

  projectId: FIREBASE_PROJECT_ID,

  storageBucket: FIREBASE_STORAGE_BUCKET,

  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,

  appId: FIREBASE_APP_ID,
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIRESTORE_COLLECTION_ORDER = collection(FIREBASE_DB, "pesanan");
export const FIRESTORE_COLLECTION_HISTORY = collection(
  FIREBASE_DB,
  "histori_pesanan"
);
export const FIRESTORE_COLLECTION_USERS = collection(FIREBASE_DB, "users");
