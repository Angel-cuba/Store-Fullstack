import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { MotiView } from 'moti';
import { registerRequest } from '../../shared/api/signIn';
import type { AppDispatch } from '../../shared/redux/store';

export default function RegisterScreen() {
  const [form, setForm] = useState({ name: '', lastname: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const set = (key: keyof typeof form) => (val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleRegister = async () => {
    if (!form.name || !form.lastname || !form.email || !form.password) {
      Alert.alert('Missing fields', 'Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await registerRequest(form, router, dispatch);
    } catch {
      Alert.alert('Error', 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-1 bg-white justify-center px-6 py-10">
          <MotiView
            from={{ opacity: 0, translateY: -24 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 600 }}
            style={{ marginBottom: 32 }}
          >
            <Text className="text-4xl font-bold text-primary text-center">Store</Text>
            <Text className="text-gray-500 text-center mt-2 text-base">Create your account</Text>
          </MotiView>

          <MotiView
            from={{ opacity: 0, translateY: 24 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 600, delay: 200 }}
          >
            <TextInput
              className="border border-gray-200 rounded-xl px-4 py-3 text-base bg-gray-50 mb-3"
              placeholder="First name"
              value={form.name}
              onChangeText={set('name')}
              autoComplete="given-name"
            />
            <TextInput
              className="border border-gray-200 rounded-xl px-4 py-3 text-base bg-gray-50 mb-3"
              placeholder="Last name"
              value={form.lastname}
              onChangeText={set('lastname')}
              autoComplete="family-name"
            />
            <TextInput
              className="border border-gray-200 rounded-xl px-4 py-3 text-base bg-gray-50 mb-3"
              placeholder="Email"
              value={form.email}
              onChangeText={set('email')}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
            />
            <TextInput
              className="border border-gray-200 rounded-xl px-4 py-3 text-base bg-gray-50 mb-4"
              placeholder="Password"
              value={form.password}
              onChangeText={set('password')}
              secureTextEntry
              autoComplete="new-password"
            />
            <TouchableOpacity
              className="bg-primary rounded-xl py-4 items-center mb-4"
              onPress={handleRegister}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text className="text-white font-semibold text-base">
                {loading ? 'Creating account…' : 'Create Account'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center" onPress={() => router.back()}>
              <Text className="text-gray-500">
                Already have an account?{' '}
                <Text className="text-primary font-semibold">Sign in</Text>
              </Text>
            </TouchableOpacity>
          </MotiView>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
