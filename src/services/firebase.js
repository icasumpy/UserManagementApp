import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

/**
 * Cấu hình Firebase được đọc từ biến môi trường EXPO_PUBLIC_*.
 * Không hardcode khóa bí mật và không sửa file .env từ mã nguồn.
 */
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

export const missingFirebaseEnvKeys = Object.entries(firebaseConfig)
  .filter(([, value]) => !value)
  .map(([key]) => key);

export const isFirebaseConfigured = missingFirebaseEnvKeys.length === 0;

if (!isFirebaseConfigured) {
  console.warn(
    `[firebase] Thiếu cấu hình môi trường: ${missingFirebaseEnvKeys.join(', ')}. ` +
      'Hãy kiểm tra file .env trước khi sử dụng Firebase.'
  );
}

// Tái sử dụng app khi Fast Refresh để tránh khởi tạo Firebase nhiều lần.
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
