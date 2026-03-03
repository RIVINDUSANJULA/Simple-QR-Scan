import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: false,
      tabBarStyle: { backgroundColor: 'black', borderTopWidth: 1, borderTopColor: '#333' },
      tabBarActiveTintColor: '#00FF00',
      tabBarInactiveTintColor: 'gray',
    }}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Scanner',
          tabBarIcon: ({ color }) => <Text>📷</Text> 
        }} 
      />
      <Tabs.Screen 
        name="history" 
        options={{ 
          title: 'History',
          tabBarIcon: ({ color }) => <Text>🕒</Text> 
        }} 
      />
    </Tabs>
  );
}