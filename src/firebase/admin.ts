import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';
import path from 'path';
import fs from 'fs';

let credential;

try {
  // 1. Try Environment Variable (if they pasted JSON there)
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    credential = cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT));
  } else {
    // 2. Try Render's default Secret File path
    const renderSecretPath = '/etc/secrets/firebase-admin-key.json';
    // 3. Try Local path
    const localPath = path.resolve(process.cwd(), 'firebase-admin-key.json');

    if (fs.existsSync(renderSecretPath)) {
      credential = cert(renderSecretPath);
    } else if (fs.existsSync(localPath)) {
      credential = cert(localPath);
    } else {
      console.warn('Firebase Admin credentials not found. Skipping initialization during build phase.');
    }
  }
} catch (error) {
  console.warn('Error loading Firebase Admin credentials:', error.message);
}

const app = getApps().length === 0 && credential
  ? initializeApp({
      credential,
      storageBucket: 'black-pearl-games-b0384.firebasestorage.app'
    }) 
  : getApps()[0];

export const adminDb = app ? getFirestore(app) : null;
export const adminAuth = app ? getAuth(app) : null;
export const adminStorage = app ? getStorage(app) : null;

export default app;
