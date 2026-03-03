import { Stack } from 'expo-router';
// import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  
  return (
    <Stack
      screenOptions={{
          headerStyle: {
          backgroundColor: '#f4511e',
        },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'QR Scanner',
          headerShown: true 
        }} 
      />

      <Stack.Screen 
        name="modal" 
        options={{ 
          presentation: 'modal',
          title: 'App Information' 
        }} 
      />
    </Stack>
  );
}