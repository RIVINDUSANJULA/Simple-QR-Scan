import { Stack } from 'expo-router';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import '../global.css';

// 1. Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  
  // 2. Hide the splash screen as soon as this layout loads
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#09090b', // zinc-950 dark background
        },
        headerTintColor: '#22c55e', // Tailwind green-500
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {/* This needs to point to "(tabs)" since your index file 
        redirects the user to the tabs folder 
      */}
      <Stack.Screen 
        name="(tabs)" 
        options={{ headerShown: false }} 
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