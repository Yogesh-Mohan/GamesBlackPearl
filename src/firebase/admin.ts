import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';
import path from 'path';

// For local development, we point to the downloaded JSON key.
// In production, you would parse the private key from an environment variable.
const serviceAccountPath = path.resolve(process.cwd(), 'firebase-admin-key.json');

const app = getApps().length === 0 
  ? initializeApp({
      credential: cert(serviceAccountPath),
      storageBucket: 'black-pearl-games-b0384.firebasestorage.app'
    }) 
  : getApps()[0];

export const adminDb = getFirestore(app);
export const adminAuth = getAuth(app);
export const adminStorage = getStorage(app);

export default app;
