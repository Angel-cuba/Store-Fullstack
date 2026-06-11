import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { MotiView } from 'moti';
import { useAuth } from '../../hooks/useAuth';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Sign out', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign out', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <View className="flex-1 bg-white">
      <View className="px-4 pt-14 pb-4 border-b border-gray-100">
        <Text className="text-2xl font-bold text-primary">Profile</Text>
      </View>
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 400 }}
        style={{ flex: 1, paddingHorizontal: 16, paddingTop: 24 }}
      >
        <View className="items-center mb-8">
          <View
            style={{
              width: 80, height: 80, borderRadius: 40,
              backgroundColor: '#001a4f', alignItems: 'center', justifyContent: 'center',
              marginBottom: 12,
            }}
          >
            <Text style={{ color: '#ffffff', fontSize: 28, fontWeight: 'bold' }}>
              {user?.email?.[0]?.toUpperCase() ?? '?'}
            </Text>
          </View>
          <Text className="text-gray-500">{user?.email ?? 'Not signed in'}</Text>
        </View>

        <View className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
          <View className="px-4 py-3 flex-row justify-between border-b border-gray-100">
            <Text className="text-gray-500">Email</Text>
            <Text className="font-medium text-gray-900" numberOfLines={1}>{user?.email ?? '—'}</Text>
          </View>
          <View className="px-4 py-3 flex-row justify-between">
            <Text className="text-gray-500">Role</Text>
            <Text className="font-medium text-gray-900 capitalize">{user?.role ?? '—'}</Text>
          </View>
        </View>

        <TouchableOpacity
          className="mt-6 border border-red-200 rounded-xl py-4 items-center"
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text className="text-red-500 font-semibold text-base">Sign out</Text>
        </TouchableOpacity>
      </MotiView>
    </View>
  );
}
