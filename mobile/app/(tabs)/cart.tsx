import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { MotiView } from 'moti';
import { AppState, AppDispatch } from '../../shared/redux/store';
import { ADD_CART, REMOVE_FROM_CART } from '../../shared/types/CartActions';

export default function CartScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((s: AppState) => s.cart.inCart);

  const total = cart.reduce((acc: number, item) => acc + item.price * item.amount, 0);

  if (cart.length === 0) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text style={{ fontSize: 56, marginBottom: 12 }}>🛒</Text>
        <Text className="text-lg font-semibold text-gray-700">Your cart is empty</Text>
        <Text className="text-gray-400 mt-1">Add some products to get started</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View className="px-4 pt-14 pb-4 border-b border-gray-100">
        <Text className="text-2xl font-bold text-primary">Cart</Text>
      </View>
      <FlatList
        data={cart}
        keyExtractor={(item) => item._id ?? item.name}
        contentContainerStyle={{ padding: 16, paddingBottom: 0 }}
        renderItem={({ item, index }) => (
          <MotiView
            from={{ opacity: 0, translateX: -20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: 'timing', duration: 300, delay: index * 50 }}
          >
            <View className="flex-row items-center bg-gray-50 rounded-xl p-3 mb-3 border border-gray-100">
              <View style={{ flex: 1 }}>
                <Text className="font-semibold text-gray-900" numberOfLines={1}>
                  {item.name}
                </Text>
                <Text className="text-primary font-bold mt-0.5">${item.price}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <TouchableOpacity
                  style={{
                    width: 32, height: 32, borderRadius: 16,
                    backgroundColor: '#e5e7eb', alignItems: 'center', justifyContent: 'center',
                  }}
                  onPress={() => dispatch({ type: REMOVE_FROM_CART, payload: item })}
                >
                  <Text style={{ fontWeight: 'bold', color: '#374151' }}>−</Text>
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', color: '#111827', minWidth: 20, textAlign: 'center' }}>
                  {item.amount}
                </Text>
                <TouchableOpacity
                  style={{
                    width: 32, height: 32, borderRadius: 16,
                    backgroundColor: '#001a4f', alignItems: 'center', justifyContent: 'center',
                  }}
                  onPress={() => dispatch({ type: ADD_CART, payload: item })}
                >
                  <Text style={{ fontWeight: 'bold', color: '#ffffff' }}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </MotiView>
        )}
      />
      <View className="px-4 pb-8 pt-4 border-t border-gray-100">
        <View className="flex-row justify-between mb-4">
          <Text className="text-gray-500 text-base">Total</Text>
          <Text className="text-xl font-bold text-primary">${total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          className="bg-primary rounded-xl py-4 items-center"
          activeOpacity={0.8}
          onPress={() => Alert.alert('Checkout', 'Stripe payment — coming in next sprint')}
        >
          <Text className="text-white font-bold text-base">Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
