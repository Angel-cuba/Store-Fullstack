import { View, type DimensionValue } from 'react-native';
import { MotiView } from 'moti';

function SkeletonRect({
  width,
  height,
  radius = 4,
  delay = 0,
}: {
  width: DimensionValue;
  height: number;
  radius?: number;
  delay?: number;
}) {
  return (
    <MotiView
      from={{ opacity: 0.35 }}
      animate={{ opacity: 0.8 }}
      transition={{
        type: 'timing',
        duration: 750,
        delay,
        loop: true,
        repeatReverse: true,
      }}
      style={{ width, height, borderRadius: radius, backgroundColor: '#e5e7eb' }}
    />
  );
}

function SkeletonCard({ delay }: { delay: number }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#f3f4f6',
        marginBottom: 8,
      }}
    >
      <SkeletonRect width="100%" height={140} radius={0} delay={delay} />
      <View style={{ padding: 12 }}>
        <SkeletonRect width="70%" height={12} delay={delay + 100} />
        <View style={{ marginTop: 8 }}>
          <SkeletonRect width="40%" height={12} delay={delay + 150} />
        </View>
        <View style={{ marginTop: 10 }}>
          <SkeletonRect width="100%" height={32} radius={8} delay={delay + 200} />
        </View>
      </View>
    </View>
  );
}

export function Loading() {
  const pairs = [0, 1, 2];

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: 56 }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12 }}>
        <SkeletonRect width={130} height={24} radius={6} />
        <View style={{ marginTop: 12 }}>
          <SkeletonRect width="100%" height={42} radius={12} delay={50} />
        </View>
      </View>
      <View style={{ paddingHorizontal: 8 }}>
        {pairs.map((row) => (
          <View key={row} style={{ flexDirection: 'row', gap: 8, marginBottom: 0 }}>
            <View style={{ flex: 1 }}>
              <SkeletonCard delay={row * 120} />
            </View>
            <View style={{ flex: 1 }}>
              <SkeletonCard delay={row * 120 + 60} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
