import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { setGoogleUser } from '@/store/reducers/user-slice';
import { restoreAuthSession } from '@/utils/google-auth';

/**
 * Hook to restore authentication session on app mount
 * @returns isCheckingAuth - true while checking for cached auth token
 */
export const useAuthRestore = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const restoreAuth = async () => {
      // Skip if already authenticated
      if (isAuthenticated) {
        setIsCheckingAuth(false);
        return;
      }

      try {
        const userInfo = await restoreAuthSession();
        if (userInfo) {
          dispatch(setGoogleUser(userInfo));
          console.log('✓ Auth session restored for:', userInfo.email);
        } else {
          console.log('No cached auth session found');
        }
      } catch (error) {
        console.error('Failed to restore auth session:', error);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    restoreAuth();
  }, [dispatch, isAuthenticated]);

  return { isCheckingAuth };
};
