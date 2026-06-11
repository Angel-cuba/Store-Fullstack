import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import { MotiView } from 'moti';
import type { IProducts } from '../shared/types/types';

type Props = {
  item: IProducts;
  index: number;
  onAddToCart: (item: IProducts) => void;
};

export function ProductCard({ item, index, onAddToCart }: Props) {
  const handleAdd = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onAddToCart(item);
  };

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'timing', duration: 350, delay: (index % 10) * 50 }}
      style={{ flex: 1 }}
    >
      <View className="bg-white rounded-2xl overflow-hidden border border-gray-100 mb-2">
        <Image
          source={{ uri: item.image }}
          style={{ width: '100%', height: 140 }}
          contentFit="cover"
          transition={300}
        />
        <View className="p-3">
          <Text className="font-semibold text-gray-900 text-sm" numberOfLines={1}>
            {item.name}
          </Text>
          <Text className="text-primary font-bold mt-1">${item.price}</Text>
          <TouchableOpacity
            className="bg-primary rounded-lg py-2 mt-2 items-center"
            onPress={handleAdd}
            activeOpacity={0.8}
          >
            <Text className="text-white text-xs font-semibold">Add to cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </MotiView>
  );
}
