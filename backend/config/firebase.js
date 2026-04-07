// import admin from "firebase-admin";
// import "dotenv/config";
// let firebaseApp;

// try {
//   if (process.env.FIREBASE_SERVICE_ACCOUNT) {
//     // Use environment variable (JSON string)
//     const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
//     firebaseApp = admin.initializeApp({
//       credential: admin.credential.cert(serviceAccount),
//       storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//     });
//   } else {
//     // Use service account file
//     const serviceAccountPath = "./firebase-service-account.json";
//     firebaseApp = admin.initializeApp({
//       credential: admin.credential.cert(serviceAccountPath),
//       storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "cash-sensie.firebasestorage.app",
//     });
//   }
// } catch (error) {
//   console.error("Firebase Admin initialization error:", error);
//   throw error;
// }

// export const storage = firebaseApp.storage();
// export const db = firebaseApp.firestore();
// export default admin;
