const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const path = require('path');

const serviceAccountPath = path.resolve(process.cwd(), 'firebase-admin-key.json');

try {
  initializeApp({
    credential: cert(serviceAccountPath)
  });

  const db = getFirestore();
  
  async function testConnection() {
    console.log('Testing Firebase connection...');
    try {
      const testRef = db.collection('test_connection').doc('status');
      await testRef.set({
        connectedAt: new Date().toISOString(),
        message: "Firebase is successfully connected to the consolidated project!"
      });
      
      const doc = await testRef.get();
      if (doc.exists) {
        console.log('✅ SUCCESS: Firebase is connected! Document written and read successfully:');
        console.log(doc.data());
      } else {
        console.log('❌ ERROR: Document was written but could not be read back.');
      }
    } catch (e) {
      console.error('❌ ERROR: Could not connect to Firebase Firestore:', e);
    }
    process.exit(0);
  }

  testConnection();
} catch (e) {
  console.error('❌ ERROR: Initialization failed:', e);
}
