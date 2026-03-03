import React, { useState } from 'react';
import { Text, View, Alert, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    return (
      <View>
        <Text>Loading permissions...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View>
        <Text>
          We need camera permissions to scan QR codes.
        </Text>
        <TouchableOpacity 
          onPress={requestPermission}
        >
          <Text>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }


  const saveScanToHistory = async (data: string) => {
    try {
      const existingHistory = await AsyncStorage.getItem('qr-history');
      let historyArray = existingHistory ? JSON.parse(existingHistory) : [];
      
      const newScan = {
        id: Date.now().toString(),
        data: data,
        date: new Date().toLocaleString(),
      };
      
      historyArray.unshift(newScan);
      await AsyncStorage.setItem('qr-history', JSON.stringify(historyArray));
    } catch (e) {
      console.error("Failed to save history", e);
    }
  };

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    saveScanToHistory(data);
    Alert.alert(
      "QR Code Scanned!", 
      data, 
      [{ text: "Scan Again", onPress: () => setScanned(false) }]
    );
  };
  

  return (
    <View>
      <CameraView
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
      >
        <View>
          {scanned && (
            <TouchableOpacity 
              onPress={() => setScanned(false)}
            >
              <Text>Tap to Scan Again</Text>
            </TouchableOpacity>
          )}

          <Link href="/modal">
            <Text>App Info</Text>
          </Link>

        </View>
      </CameraView>
    </View>
  );
}