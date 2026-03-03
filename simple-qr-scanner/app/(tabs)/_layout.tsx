import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: true,
      tabBarStyle: { backgroundColor: 'black', borderTopWidth: 0 },
      tabBarActiveTintColor: '#00FF00',
    }}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Scanner',
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
          tabBarIcon: () => <Text>📷</Text> 
        }} 
      />
    </Tabs>
  );
}