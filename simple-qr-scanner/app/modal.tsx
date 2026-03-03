import { View, Text } from 'react-native';

export default function ModalScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-zinc-900 p-6">
      <Text className="text-3xl font-bold text-green-500 mb-4">
        Scanner Info
      </Text>
      <Text className="text-zinc-300 text-center text-lg leading-relaxed">
        This is a lightweight, cross-platform QR scanner built with Expo Router and styled beautifully using Tailwind CSS.
      </Text>
    </View>
  );
}