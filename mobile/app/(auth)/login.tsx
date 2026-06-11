import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { MotiView } from 'moti';
import * as AuthSession from 'expo-auth-session';
import { loginRequest, googleSignInRequest } from '../../shared/api/signIn';
import type { AppDispatch } from '../../shared/redux/store';

const GOOGLE_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID ?? '';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const discovery = AuthSession.useAutoDiscovery('https://accounts.google.com');
  const redirectUri = AuthSession.makeRedirectUri();

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: GOOGLE_CLIENT_ID,
      scopes: ['openid', 'profile', 'email'],
      redirectUri,
      usePKCE: true,
    },
    discovery
  );

  useEffect(() => {
    if (response?.type !== 'success') return;
    if (!discovery || !request?.codeVerifier) return;

    const code = response.params.code;
    if (!code) return;

    const codeVerifier = request.codeVerifier;
    setGoogleLoading(true);

    AuthSession.exchangeCodeAsync(
      {
        clientId: GOOGLE_CLIENT_ID,
        redirectUri,
        code,
        extraParams: { code_verifier: codeVerifier },
      },
      discovery
    )
      .then(async (tokenResponse) => {
        if (!tokenResponse.idToken) throw new Error('No ID token in response');
        await googleSignInRequest(tokenResponse.idToken, router, dispatch);
      })
      .catch(() => Alert.alert('Google Sign In', 'Authentication failed. Please try again.'))
      .finally(() => setGoogleLoading(false));
  }, [response, discovery, request, redirectUri]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await loginRequest(email, password, router, dispatch);
    } catch {
      Alert.alert('Error', 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const googleEnabled = !!GOOGLE_CLIENT_ID && !!request;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View className="flex-1 bg-white justify-center px-6">
        <MotiView
          from={{ opacity: 0, translateY: -24 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600 }}
          style={{ marginBottom: 40 }}
        >
          <Text className="text-4xl font-bold text-primary text-center">Store</Text>
          <Text className="text-gray-500 text-center mt-2 text-base">Sign in to your account</Text>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 24 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 200 }}
        >
          <TextInput
            className="border border-gray-200 rounded-xl px-4 py-3 text-base bg-gray-50 mb-3"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
          />
          <TextInput
            className="border border-gray-200 rounded-xl px-4 py-3 text-base bg-gray-50 mb-4"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="password"
          />
          <TouchableOpacity
            className="bg-primary rounded-xl py-4 items-center mb-3"
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Text className="text-white font-semibold text-base">
              {loading ? 'Signing in…' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          {googleEnabled && (
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: '#e5e7eb',
                borderRadius: 12,
                paddingVertical: 14,
                alignItems: 'center',
                marginBottom: 16,
                opacity: googleLoading ? 0.6 : 1,
              }}
              onPress={() => promptAsync()}
              disabled={googleLoading}
              activeOpacity={0.8}
            >
              <Text style={{ color: '#374151', fontWeight: '600', fontSize: 15 }}>
                {googleLoading ? 'Connecting…' : 'Continue with Google'}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            className="items-center"
            onPress={() => router.push('/(auth)/register')}
          >
            <Text className="text-gray-500">
              No account?{' '}
              <Text className="text-primary font-semibold">Create one</Text>
            </Text>
          </TouchableOpacity>
        </MotiView>
      </View>
    </KeyboardAvoidingView>
  );
}
