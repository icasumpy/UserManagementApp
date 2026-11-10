import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { auth, isFirebaseConfigured } from '@/services/firebase';

/**
 * Theo dõi trạng thái đăng nhập hiện tại của Firebase Authentication.
 *
 * Lưu ý: hook chỉ cung cấp user/loading để các màn hình sử dụng sau này.
 * Luồng đăng nhập, đăng ký và bảo vệ route chưa được triển khai.
 *
 * @returns {{
 *   user: import('firebase/auth').User | null,
 *   loading: boolean,
 *   isAuthenticated: boolean,
 * }}
 */
export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      (nextUser) => {
        setUser(nextUser);
        setLoading(false);
      },
      (error) => {
        console.warn('[useAuth] Không thể theo dõi trạng thái đăng nhập:', error.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return {
    user,
    loading,
    isAuthenticated: Boolean(user),
  };
}
