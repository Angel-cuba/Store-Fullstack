import '../global.css';
import { Stack } from 'expo-router/stack';
import { useRouter, useSegments, useRootNavigationState } from 'expo-router';
import { useEffect, useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { StripeProvider } from '@stripe/stripe-react-native';
import { tokenStorage } from '../shared/utils/tokenStorage';
import { verifyTokenExpiration, decodeJwtPayload } from '../shared/utils/tokenExpired';
import { store } from '../shared/redux/store';
import { LOGIN_USER } from '../shared/types/UserActions';
import type { AppDispatch } from '../shared/redux/store';
import type { DataOfUser } from '../shared/types/types';

const STRIPE_KEY = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '';

function AuthGuard({ children }: { children: React.ReactNode }) {
  // undefined = still loading, null = no token, string = valid token
  const [token, setToken] = useState<string | null | undefined>(undefined);
  const segments = useSegments();
  const router = useRouter();
  const navState = useRootNavigationState();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      const raw = await tokenStorage.getToken();
      if (!raw) { setToken(null); return; }

      const { isVerified, decodedUser } = await verifyTokenExpiration(raw);
      if (!isVerified) { setToken(null); return; }

      // Rehydrate Redux user from stored token + SecureStore role
      if (decodedUser) {
        const role = await tokenStorage.getUserRole();
        const payload: DataOfUser = {
          id: (decodedUser.id as string) ?? '',
          email: (decodedUser.email as string) ?? '',
          role: role ?? (decodedUser.role as string) ?? 'USER',
          picture: (decodedUser.picture as string) ?? '',
        };
        dispatch({ type: LOGIN_USER, payload });
      }

      setToken(raw);
    })();
  }, []);

  useEffect(() => {
    if (token === undefined) return;     // still loading
    if (!navState?.key) return;          // navigator not mounted yet

    const inAuthGroup = segments[0] === '(auth)';
    if (!token && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (token && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [token, segments, navState?.key]);

  if (token === undefined) return null;
  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={STRIPE_KEY}>
        <AuthGuard>
          <Stack screenOptions={{ headerShown: false }} />
        </AuthGuard>
      </StripeProvider>
    </Provider>
  );
}
